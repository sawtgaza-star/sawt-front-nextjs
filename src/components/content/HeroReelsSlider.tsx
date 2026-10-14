"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";

/* The fan is a fixed table, not a formula: one exact transform per position
   away from the focused poster. Key = steps from the focused slide; the page is
   steps are Swiper's slide progress, which is POSITIVE for the posters to the
   RIGHT here (measured — despite the page being dir="rtl").

   Matched to the reference strip: the focused poster upright and a little in
   front; its neighbours almost flat, barely set back; the outer pair smaller,
   their OUTER edge turned away so the row faces the middle (a poster on the
   right takes a positive rotateY, its mirror on the left a negative one).
   Five show at once, so only ±2 is used; ±3/±4 continue the same curve. */
const FAN_MAX = 2;

/** Shown in place of a cover that can't be loaded (an expired link). */
const FALLBACK_POSTER = "/assets/images/1.png";
const FAN: Record<number, string> = {
  4: "translateX(140px) translateZ(-260px) rotateY(16deg)",
  3: "translateX(90px) translateZ(-190px) rotateY(14deg)",
  /* pushed back to ~0.9 of the focused size; moving back in z also draws a
     poster toward the middle, so translateX takes it out again to the
     reference's wider outer gap */
  2: "translateX(30px) translateZ(-120px) rotateY(10deg)",
  1: "translateZ(-14px) rotateY(4deg)",
  // the focused poster stands a little out of the row, toward the viewer
  0: "translateZ(40px) rotateY(0deg)",
  [-1]: "translateZ(-14px) rotateY(-4deg)",
  [-2]: "translateX(-30px) translateZ(-120px) rotateY(-10deg)",
  [-3]: "translateX(-90px) translateZ(-190px) rotateY(-14deg)",
  [-4]: "translateX(-140px) translateZ(-260px) rotateY(-16deg)",
};

type FanSlide = HTMLElement & { progress?: number };

/* Fanned strip of reel posters at the bottom of the hero: the focused poster
   stands upright, a little forward and ringed in orange; the rest recede —
   pushed back in z and turned so their OUTER edge goes away, mirrored on each
   side — and are softly blurred (in content.css). Swiper's own
   coverflow effect bunches the outer posters together, so the transform is
   written per slide from its own progress: 0 for the focused slide, ±1 for its
   neighbours, ±2 for theirs …

   Sign note: a POSITIVE progress is a slide to the RIGHT of the focused one
   (see FAN).

   `slides` are the poster URLs the API's `hero.items` sent, already padded out
   for the loop by heroSlides() — see content-data. */
export default function HeroReelsSlider({ slides }: { slides: string[] }) {
  const fan = (swiper: SwiperClass) => {
    (swiper.slides as FanSlide[]).forEach((slide) => {
      /* round to the nearest position so a slide always wears one of the exact
         transforms above */
      const raw = Math.round(slide.progress ?? 0);
      const steps = Math.max(-FAN_MAX, Math.min(FAN_MAX, raw));
      slide.style.transform = FAN[steps];
      /* the fan is only five posters wide (the focused one plus two a side);
         anything past that would peek in at the edges, so hide it —
         opacity, not display, so Swiper's own layout is untouched */
      slide.style.opacity = Math.abs(raw) > FAN_MAX ? "0" : "1";
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
