"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";
import { HERO_SLIDES } from "./content-data";

/* The fan is a fixed table, not a formula: one exact transform per position
   away from the focused poster. Key = steps from the focused slide; the page is
   dir="rtl", so POSITIVE steps are the posters to the LEFT and negative ones
   those to the right. Positions past ±4 reuse the outermost transform. */
const FAN_MAX = 4;
const FAN: Record<number, string> = {
  4: "translateZ(-146.996px) rotateY(15.9988deg) rotate(-1.19983deg)",
  3: "translateZ(-91.9416px) rotateY(18.9825deg) rotate(0.10253deg)",
  2: "translateZ(-47.0487px) rotateY(13.0146deg) rotate(-0.60211deg)",
  1: "translateZ(-26.9942px) rotateY(15.99825deg) rotate(-0.29975deg)",
  0: "translateZ(0px) rotateY(0deg) rotate(0deg)",
  [-1]: "translateZ(26.0467px) rotateY(-15.98598deg) rotate(0.29798deg)",
  [-2]: "translateZ(-47.0078px) rotateY(-13.0023deg) rotate(0.60034deg)",
  [-3]: "translateZ(-91.0623px) rotateY(-18.0187deg) rotate(0.9027deg)",
  [-4]: "translateZ(-146.955px) rotateY(-15.9866deg) rotate(1.19806deg)",
};

type FanSlide = HTMLElement & { progress?: number };

/* Fanned strip of reel posters at the bottom of the hero: the focused poster
   stands upright, scaled up and ringed in orange; the rest recede — each one
   turned so its INNER edge sinks into the page and pushed back in z, mirrored
   on each side — and are softly blurred (in content.css). Swiper's own
   coverflow effect bunches the outer posters together, so the transform is
   written per slide from its own progress: 0 for the focused slide, ±1 for its
   neighbours, ±2 for theirs …

   Sign note: the page is dir="rtl", so a POSITIVE progress puts a slide to the
   LEFT of the focused one. rotateY of the same sign sends that slide's right
   (inner) edge backwards — which is the recede we want on both sides. */
export default function HeroReelsSlider() {
  const fan = (swiper: SwiperClass) => {
    (swiper.slides as FanSlide[]).forEach((slide) => {
      /* round to the nearest position so a slide always wears one of the exact
         transforms above */
      const raw = Math.round(slide.progress ?? 0);
      const steps = Math.max(-FAN_MAX, Math.min(FAN_MAX, raw));
      slide.style.transform = FAN[steps];
      /* the fan is only nine posters wide (the focused one plus four a side);
         anything past that would peek in at the screen edges, so hide it —
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
           edges to end on a whole card; 9 across = the focused one plus the
           four fanned positions on each side */
        slidesPerView={3}
        spaceBetween={12}
        breakpoints={{
          768: { slidesPerView: 5, spaceBetween: 12 },
          992: { slidesPerView: 9, spaceBetween: 12 },
        }}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        onAfterInit={fan}
        onProgress={fan}
        onSetTranslate={fan}
        onResize={fan}
      >
        {HERO_SLIDES.map((slide) => (
          <SwiperSlide key={slide.id} className="ct-hero-slide">
            <div className="ct-hero-thumb">
              <img src={slide.img} alt="" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
