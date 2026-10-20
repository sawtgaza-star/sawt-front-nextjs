"use client";
import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";
import type { HeroSlide } from "./content-data";
import { FAN_LAST, FAN_SCALE, fanCentres, fanPose, measureArc as measureRim, type Arc } from "./hero-fan";

/* at least this many positions a side stay fully shown (phones show one
   poster and slivers of its neighbours); more on a wide screen — fanMax */
const FAN_MAX = 2;

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

/** The rim's place for the live strip (see measureRim). */
function measureArc(swiper: SwiperClass): Arc | undefined {
  const first = swiper.slides[0] as HTMLElement | undefined;
  return measureRim(
    swiper.el.closest(".ct-header"),
    swiper.wrapperEl.getBoundingClientRect().top,
    first?.offsetHeight ?? 0,
  );
}

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
/* The ease's tail crawls the last few dozen px for ~400ms, which already
   reads as stopped. So once the strip slows under SPIN_LAND_SPEED it lands:
   the ring and blur switch on at once, and the rest is a short CSS glide. */
const SPIN_LAND_SPEED = 0.18; // px per ms (~3px a frame)

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

   `slides` are the reels' thumbnails (else the API's `hero.items`), already
   padded out for the loop by heroSlides() — see content-data. A tap on a
   reel's poster calls `onSelect` with its id; Swiper's own click event only
   fires for a tap, never at the end of a drag. */
export default function HeroReelsSlider({
  slides,
  onSelect,
}: {
  slides: HeroSlide[];
  onSelect?: (reelId: string) => void;
}) {
  const spinFrame = useRef<number | undefined>(undefined);
  const arc = useRef<Arc | undefined>(undefined);
  useEffect(() => () => window.cancelAnimationFrame(spinFrame.current ?? 0), []);

  const introSpin = (swiper: SwiperClass) => {
    if (slides.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const steps = slides.length * Math.ceil(SPIN_MIN_STEPS / slides.length);
    const el = swiper.el;
    let start = 0;
    let done = 0; // posters already moved past the centre
    let stopped = false;
    let last: { now: number; px: number } | undefined; // the previous frame

    /** `glide`: px still to go and the speed (px/ms) to carry into them. */
    const finish = (settle: boolean, glide?: { px: number; speed: number }) => {
      if (stopped) return;
      stopped = true;
      window.cancelAnimationFrame(spinFrame.current ?? 0);
      /* the ring, glow and blur come back in the same frame the strip lands —
         `data-landing` keeps their transitions off while they switch on (else
         they faded in over the thumb's 0.4s), then lets go two frames later
         so autoplay's own slides animate as usual. The strip's own movement
         (wrapper + slide transforms) still transitions, for the glide. */
      el.dataset.landing = "";
      delete el.dataset.spinning;
      const land = () => {
        void el.offsetWidth; // commit the end state before transitions return
        window.requestAnimationFrame(() =>
          window.requestAnimationFrame(() => delete el.dataset.landing),
        );
      };
      if (swiper.destroyed) return land();
      // rebalance the loop on both sides (instant) and land exactly on the slot
      (swiper as LoopSwiper).loopFix();
      if (settle && glide && glide.px > 0.5) {
        // put the strip back where it visibly is, then glide the rest home
        const rest = -(swiper.snapGrid[swiper.snapIndex] ?? 0);
        (swiper as LoopSwiper).setTransition(0);
        swiper.setTranslate(rest + glide.px);
        void el.offsetWidth;
        // an ease-out starts at ~2x its average speed: match the spin's
        const ms = Math.min(450, Math.max(120, (2 * glide.px) / glide.speed));
        swiper.slideTo(swiper.activeIndex, ms, false);
      } else if (settle) {
        swiper.slideTo(swiper.activeIndex, 0, false);
      }
      fan(swiper);
      land();
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
      // the part of the way to the next poster: one slot = its width + the gap
      const slot =
        (swiper.slidesSizesGrid[swiper.activeIndex] ?? 0) + Number(swiper.params.spaceBetween ?? 0);
      const px = pos * slot;
      const speed = last && now > last.now ? (px - last.px) / (now - last.now) : Infinity;
      last = { now, px };
      if (t >= 1 || (t > 0.5 && speed < SPIN_LAND_SPEED)) {
        const remaining = (steps - pos) * slot;
        while (done < steps) {
          swiper.slideNext(0, false);
          done++;
        }
        return finish(true, { px: remaining, speed: Math.max(speed, 0.05) });
      }
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
      const pose = fanPose(slide.progress ?? 0, width, gap, centres, arc.current);
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
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        onAfterInit={(swiper) => {
          arc.current = measureArc(swiper);
          fan(swiper);
          introSpin(swiper);
        }}
        onProgress={fan}
        onSetTranslate={fan}
        onResize={(swiper) => {
          arc.current = measureArc(swiper);
          fan(swiper);
        }}
        onSetTransition={syncTransition}
        onClick={(swiper) => {
          const id = (swiper.clickedSlide as HTMLElement | undefined)?.dataset.reelId;
          if (id && onSelect) onSelect(id);
        }}
      >
        {slides.map(({ src, reelId }, index) => (
          <SwiperSlide
            key={index}
            className={"ct-hero-slide" + (reelId && onSelect ? " is-link" : "")}
            data-reel-id={reelId}
          >
            <div className="ct-hero-thumb">
              {/* only the API's image: one that fails to load is hidden, not
                  swapped for a stock poster */}
              <img
                src={src}
                alt=""
                onError={(e) => {
                  e.currentTarget.style.visibility = "hidden";
                }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
