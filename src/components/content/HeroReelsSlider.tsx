"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";

/* The fan: one pose per whole step away from the focused poster (FAN_STEPS),
   blended between steps. Steps are Swiper's slide progress, which is POSITIVE
   for the posters to the RIGHT here (measured — despite the page being
   dir="rtl").

   Matched to the reference strip: the focused poster upright and a little in
   front; its neighbours almost flat, barely set back; the outer pair smaller,
   their OUTER edge turned away so the row faces the middle (a poster on the
   right takes a positive rotateY, its mirror on the left a negative one).
   Five show at once, so ±2 is the last full pose; step 3 only exists for a
   poster fading in or out past the edge. */
const FAN_MAX = 2;

/** Shown in place of a cover that can't be loaded (an expired link). */
const FALLBACK_POSTER = "/assets/images/1.png";

/* One pose per whole step away from the focus, for a poster on the RIGHT
   (x px, z px, rotateY deg); the left side mirrors it. Between two steps the
   pose is interpolated from the slide's exact progress, so while the strip is
   dragged every poster turns and recedes continuously — written as fixed
   poses snapped to the nearest step, the row slid as one rigid block and then
   all jumped at once at the halfway point. */
const FAN_STEPS = [
  // the focused poster stands a little out of the row, toward the viewer
  { x: 0, z: 40, r: 0 },
  { x: 0, z: -14, r: 4 },
  /* pushed back to ~0.9 of the focused size; moving back in z also draws a
     poster toward the middle, so translateX takes it out again to the
     reference's wider outer gap */
  { x: 30, z: -120, r: 10 },
  { x: 90, z: -190, r: 14 },
];

function fanTransform(progress: number): string {
  const distance = Math.min(Math.abs(progress), FAN_STEPS.length - 1);
  const lower = Math.floor(distance);
  const upper = Math.min(lower + 1, FAN_STEPS.length - 1);
  const t = distance - lower;
  const mix = (key: "x" | "z" | "r") =>
    FAN_STEPS[lower][key] + (FAN_STEPS[upper][key] - FAN_STEPS[lower][key]) * t;
  const sign = progress < 0 ? -1 : 1;
  return `translateX(${sign * mix("x")}px) translateZ(${mix("z")}px) rotateY(${sign * mix("r")}deg)`;
}

type FanSlide = HTMLElement & { progress?: number };

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
  const fan = (swiper: SwiperClass) => {
    (swiper.slides as FanSlide[]).forEach((slide) => {
      const progress = slide.progress ?? 0;
      slide.style.transform = fanTransform(progress);
      /* the fan is only five posters wide (the focused one plus two a side);
         a sixth fades in/out over the next step instead of popping —
         opacity, not display, so Swiper's own layout is untouched */
      const beyond = Math.abs(progress) - FAN_MAX;
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
          992: { slidesPerView: 5, spaceBetween: 18 },
        }}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        onAfterInit={fan}
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
