"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";
import "swiper/css";
import { HERO_SLIDES } from "./content-data";

/* degrees of tilt added per step away from the focused poster, and the step at
   which the fan stops opening further */
const FAN_STEP = 1.3;
const FAN_MAX = 4;

type FanSlide = HTMLElement & { progress?: number };

/* Fanned strip of reel posters at the bottom of the hero: the focused poster
   stands upright, scaled up and ringed in orange; the rest tilt away from it —
   a rigid rotation, mirrored on each side — and are softly blurred (both in
   content.css). Swiper has no fan effect, and coverflow tilts in 3D, which
   foreshortens the posters and bunches the outer ones together, so the rotation
   is written per slide from its own progress: 0 for the focused slide, ±1 for
   its neighbours, ±2 for theirs … */
export default function HeroReelsSlider() {
  const fan = (swiper: SwiperClass) => {
    (swiper.slides as FanSlide[]).forEach((slide) => {
      const steps = Math.max(-FAN_MAX, Math.min(FAN_MAX, slide.progress ?? 0));
      slide.style.transform = `rotate(${-steps * FAN_STEP}deg)`;
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
        slidesPerView={3.3}
        spaceBetween={12}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          768: { slidesPerView: 5.3, spaceBetween: 16 },
          /* the mock: eight-and-a-bit posters across, ~20px apart */
          992: { slidesPerView: 8.3, spaceBetween: 20 },
        }}
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
