"use client";
import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";

/* The fan: a size GRADIENT out from the focused poster. Each whole step away
   (Swiper's slide progress: 0 for the focus, ±1 its neighbours, ±2 …; POSITIVE
   is a poster to the RIGHT — measured, despite the page being dir="rtl") has a
   fixed scale, turn and look; between two steps everything is interpolated
   from the exact progress, so a moving strip grows and shrinks continuously.

   - FAN_SCALE: the focus stands out a size up; each step out is a clear notch
     smaller than the last.
   - Shrinking a poster in place would leave a wider and wider gap beside it,
     so each one is drawn in toward the focus by exactly what keeps the visual
     gap between neighbours even (fanPose).
   - FAN_TURN: the outer edge turns away, so the row faces the middle.
   - FAN_BLUR: the further out, the softer (content.css reads it as
     --fan-blur), so the focus is the clear one. No darkening — the posters
     keep their full brightness. */
const FAN_SCALE = [1.06, 0.88, 0.76, 0.66, 0.58, 0.51, 0.45];
const FAN_TURN = [0, 3, 6, 8, 10, 11, 12]; // rotateY deg
const FAN_BLUR = [0, 0.8, 1.6, 2.2, 2.6, 3, 3]; // px
const FAN_LAST = FAN_SCALE.length - 1;
/** extra room either side of the focused poster, on top of the slider's gap */
const FOCUS_GAP = 8;
const TURN_GAP = 0.021;
/* at least this many positions a side stay fully shown (phones show one
   poster and slivers of its neighbours); more on a wide screen — fanMax */
const FAN_MAX = 2;

/** Where the poster k steps out sits (its centre, from the focus's centre)
    once the row is graded: half of each poster's scaled width plus the gap. */
function fanCentres(width: number, gap: number): number[] {
  const centres = [0];
  for (let k = 1; k <= FAN_LAST; k++) {
    /* a turned poster reads narrower in perspective on its inner side, which
       opened each gap a little more than the last — TURN_GAP takes that back
       (measured: ~2% of the poster width per step beyond the first) */
    const between = gap + (k === 1 ? FOCUS_GAP : 0) - TURN_GAP * (k - 1) * width;
    centres.push(centres[k - 1] + ((FAN_SCALE[k - 1] + FAN_SCALE[k]) / 2) * width + between);
  }
  return centres;
}

/** How many positions each side keep fully shown: every poster that starts
    inside the strip, so the graded row runs to both page edges. */
function fanMax(swiper: SwiperClass): number {
  const width = swiper.slidesSizesGrid[0] ?? 0;
  if (!width) return FAN_MAX;
  const centres = fanCentres(width, Number(swiper.params.spaceBetween ?? 0));
  let k = 0;
  while (k < FAN_LAST && centres[k + 1] - (FAN_SCALE[k + 1] * width) / 2 < swiper.width / 2) k++;
  return Math.max(FAN_MAX, k);
}

/** The pose of a poster at `progress` steps from the focus. */
function fanPose(progress: number, width: number, gap: number, centres: number[]) {
  const distance = Math.min(Math.abs(progress), FAN_LAST);
  const lower = Math.floor(distance);
  const upper = Math.min(lower + 1, FAN_LAST);
  const t = distance - lower;
  const mix = (steps: number[]) => steps[lower] + (steps[upper] - steps[lower]) * t;
  const sign = progress < 0 ? -1 : 1;
  // the graded centre minus where Swiper's even row already puts it
  const pull = mix(centres) - distance * (width + gap);
  return {
    distance,
    transform: `translateX(${sign * pull}px) rotateY(${sign * mix(FAN_TURN)}deg) scale(${mix(FAN_SCALE)})`,
    blur: mix(FAN_BLUR),
  };
}

/** Shown in place of a cover that can't be loaded (an expired link). */
const FALLBACK_POSTER = "/assets/images/1.png";

type FanSlide = HTMLElement & { progress?: number };

/* Entrance spin: on arriving at the page the strip rolls through at least
   SPIN_MIN_STEPS posters (whole laps, so it lands back on the first one),
   then normal autoplay takes over — in the same direction as autoplay, and
   Swiper follows the page's dir, i.e. the language.

   It is ONE continuous animation, not a chain of Swiper slides: every frame
   the eased position (in posters) is written straight to the strip with
   setTranslate, so the fan poses follow the exact same curve with no CSS
   transitions in between. Each time a poster passes the centre an instant
   slideNext(0) moves the active index on — which also lets Swiper re-arrange
   its loop — and the remaining fraction is re-applied on top, so the jump is
   invisible. */
const SPIN_MIN_STEPS = 18;
const SPIN_DURATION = 3400; // ms for the whole spin
const SPIN_DELAY = 300; // ms before it starts, so the page has painted

/** cubic-bezier(x1, y1, x2, y2) as a function of time — the CSS curve. */
function cubicBezier(x1: number, y1: number, x2: number, y2: number) {
  const at = (a: number, b: number, t: number) =>
    3 * a * t * (1 - t) * (1 - t) + 3 * b * t * t * (1 - t) + t * t * t;
  return (x: number) => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let lo = 0;
    let hi = 1;
    let t = x;
    for (let i = 0; i < 30; i++) {
      t = (lo + hi) / 2;
      if (at(x1, x2, t) < x) lo = t;
      else hi = t;
    }
    return at(y1, y2, t);
  };
}
/* a short, soft run-up, top speed early, then a long even glide to a stop */
const spinEase = cubicBezier(0.4, 0, 0.12, 1);

// both are public at runtime but missing from Swiper's typings
type LoopSwiper = SwiperClass & { loopFix: () => void; setTransition: (ms: number) => void };

/* Fanned strip of reel posters at the bottom of the hero: the focused poster
   stands upright, a little forward and ringed in orange; the rest recede —
   pushed back in z and turned so their OUTER edge goes away, mirrored on each
   side — and are softly blurred (in content.css). Swiper's own
   coverflow effect bunches the outer posters together, so the transform is
   written per slide from its own progress: 0 for the focused slide, ±1 for its
   neighbours, ±2 for theirs …

   Sign note: a POSITIVE progress is a slide to the RIGHT of the focused one
   (see FAN_STEPS).

   `slides` are the poster URLs the API's `hero.items` sent, already padded out
   for the loop by heroSlides() — see content-data. */
export default function HeroReelsSlider({ slides }: { slides: string[] }) {
  const spinFrame = useRef<number | undefined>(undefined);
  useEffect(() => () => window.cancelAnimationFrame(spinFrame.current ?? 0), []);

  const introSpin = (swiper: SwiperClass) => {
    if (slides.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const steps = slides.length * Math.ceil(SPIN_MIN_STEPS / slides.length);
    const el = swiper.el;
    let start = 0;
    let done = 0; // posters already moved past the centre
    let stopped = false;

    const finish = (settle: boolean) => {
      if (stopped) return;
      stopped = true;
      window.cancelAnimationFrame(spinFrame.current ?? 0);
      delete el.dataset.spinning;
      if (swiper.destroyed) return;
      // rebalance the loop on both sides (instant) and land exactly on the slot
      (swiper as LoopSwiper).loopFix();
      if (settle) swiper.slideTo(swiper.activeIndex, 0, false);
      fan(swiper);
      swiper.autoplay?.start();
    };

    const frame = (now: number) => {
      if (stopped || swiper.destroyed) return;
      if (!start) start = now;
      const t = Math.min(1, (now - start) / SPIN_DURATION);
      const pos = spinEase(t) * steps;
      const whole = Math.min(steps, Math.floor(pos));
      while (done < whole) {
        swiper.slideNext(0, false);
        done++;
      }
      if (t >= 1) return finish(true);
      // the part of the way to the next poster: one slot = its width + the gap
      const slot =
        (swiper.slidesSizesGrid[swiper.activeIndex] ?? 0) + Number(swiper.params.spaceBetween ?? 0);
      // measured from the active poster's own resting position, not the last
      // frame's (that already carries a fraction)
      const rest = -(swiper.snapGrid[swiper.snapIndex] ?? 0);
      swiper.setTranslate(rest - (pos - whole) * slot);
      spinFrame.current = window.requestAnimationFrame(frame);
    };

    swiper.autoplay?.stop();
    (swiper as LoopSwiper).setTransition(0);
    // a data attribute, not a class: Swiper React rewrites className on render
    el.dataset.spinning = "";
    // a finger or the mouse on the strip ends the spin; Swiper takes over
    swiper.once("touchStart", () => finish(false));
    window.setTimeout(() => {
      if (!stopped) spinFrame.current = window.requestAnimationFrame(frame);
    }, SPIN_DELAY);
  };

  const fan = (swiper: SwiperClass) => {
    const max = fanMax(swiper);
    const width = swiper.slidesSizesGrid[0] ?? 0;
    const gap = Number(swiper.params.spaceBetween ?? 0);
    const centres = fanCentres(width, gap);
    (swiper.slides as FanSlide[]).forEach((slide) => {
      const pose = fanPose(slide.progress ?? 0, width, gap, centres);
      slide.style.transform = pose.transform;
      slide.style.setProperty("--fan-blur", `${pose.blur.toFixed(2)}px`);
      // nearer posters on top, should a turned edge ever touch a neighbour
      slide.style.zIndex = String(100 - Math.round(pose.distance * 10));
      /* past the last shown position a poster fades in/out over one step
         instead of popping — opacity, not display, so Swiper's own layout is
         untouched */
      const beyond = pose.distance - max;
      slide.style.opacity = String(Math.max(0, Math.min(1, 1 - beyond)));
    });
  };

  /* The poses follow the strip frame by frame, so they move on Swiper's own
     clock: none while dragging (a CSS transition there would lag behind the
     finger), Swiper's speed when it settles or autoplays. */
  const syncTransition = (swiper: SwiperClass, duration: number) => {
    (swiper.slides as FanSlide[]).forEach((slide) => {
      slide.style.transitionDuration = `${duration}ms`;
    });
  };

  return (
    <div className="ct-hero-slider">
      <Swiper
        className="ct-hero-swiper"
        modules={[Autoplay]}
        grabCursor
        centeredSlides
        loop
        /* two spare posters past each edge, so the outer fan positions never
           run out mid-slide (the entrance spin moves a step every few frames) */
        loopAdditionalSlides={3}
        watchSlidesProgress
        /* the focused poster is centred, so the count has to be ODD for both
           edges to end on a whole card; 5 across = the focused one plus two
           fanned positions on each side, each poster large (the strip is
           capped in width in content.css, so they stay a sane height).
           On phones the mock shows ONE big poster instead: 1.6 across leaves the
           focused one ~61% of the screen and its neighbours as slivers at the
           two edges */
        slidesPerView={1.6}
        spaceBetween={12}
        breakpoints={{
          576: { slidesPerView: 2.2, spaceBetween: 12 },
          768: { slidesPerView: 5, spaceBetween: 12 },
          /* desktop: posters keep the size five had in the old 1320px strip
             (width set in content.css) and as many as fit fill the page */
          992: { slidesPerView: "auto", spaceBetween: 18 },
        }}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        onAfterInit={(swiper) => {
          fan(swiper);
          introSpin(swiper);
        }}
        onProgress={fan}
        onSetTranslate={fan}
        onResize={fan}
        onSetTransition={syncTransition}
      >
        {slides.map((src, index) => (
          <SwiperSlide key={index} className="ct-hero-slide">
            <div className="ct-hero-thumb">
              {/* an expired Instagram cover falls back to the stock poster */}
              <img
                src={src}
                alt=""
                onError={(e) => {
                  const img = e.currentTarget;
                  if (!img.src.endsWith(FALLBACK_POSTER)) img.src = FALLBACK_POSTER;
                }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
