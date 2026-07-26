"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { HERO_SLIDES } from "./content-data";

export default function HeroReelsSlider() {
  return (
    <div className="ct-hero-slider py-4 overflow-hidden" dir="ltr">
      <style jsx>{`
        .ct-hero-slide {
          transition: all 0.4s ease-in-out;
          opacity: 1 !important; 
          filter: none !important;
          transform: none !important;
        }

        /* القياسات الافتراضية للشاشات الصغيرة جداً (الهواتف المحمولة) */
        .ct-hero-thumb {
          width: 100px;
          height: 180px;
          border-radius: 0.6rem;
          overflow: hidden;
          transition: all 0.4s ease-in-out;
          filter: none !important;
        }

        /* الهواتف المتوسطة */
        @media (min-width: 480px) {
          .ct-hero-thumb {
            width: 115px;
            height: 210px;
            border-radius: 0.7rem;
          }
        }

        /* التابلت والشاشات الكبيرة */
        @media (min-width: 768px) {
          .ct-hero-thumb {
            width: 130px;
            height: 240px;
            border-radius: 0.75rem;
          }
        }

        .ct-hero-swiper .swiper-slide-active {
          z-index: 30;
        }

        /* حجم البطاقة النشطة في المنتصف للموبايل */
        .ct-hero-swiper .swiper-slide-active .ct-hero-thumb {
          width: 110px;
          height: 200px;
          border: 2px solid #FE712B;
          box-shadow: 0 0.4rem 1.2rem rgba(0, 0, 0, 0.3);
          border-radius: 0.6rem;
        }

        @media (min-width: 480px) {
          .ct-hero-swiper .swiper-slide-active .ct-hero-thumb {
            width: 130px;
            height: 235px;
            border: 2.5px solid #FE712B;
          }
        }

        @media (min-width: 768px) {
          .ct-hero-swiper .swiper-slide-active .ct-hero-thumb {
            width: 145px;
            height: 270px;
          }
        }
      `}</style>

      <Swiper
        className="ct-hero-swiper pb-4"
        modules={[Autoplay]}
        grabCursor
        centeredSlides
        loop
        watchSlidesProgress
        slidesPerView={2.5} 
        spaceBetween={8}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          // الهواتف الصغيرة جداً
          360: { slidesPerView: 2.8, spaceBetween: 8 },
          // الهواتف العادية
          480: { slidesPerView: 3.5, spaceBetween: 10 },
          // التابلت والأجهزة اللوحية
          768: { slidesPerView: 5.3, spaceBetween: 14 },
          // شاشات اللابتوب الصغيرة
          992: { slidesPerView: 7.3, spaceBetween: 16 },
          // الشاشات الكبيرة
          1200: { slidesPerView: 8.5, spaceBetween: 18 },
        }}
      >
        {HERO_SLIDES.map((slide) => (
          <SwiperSlide key={slide.id} className="ct-hero-slide d-flex justify-content-center align-items-center">
            <div className="ct-hero-thumb">
              <img src={slide.img} alt="reel poster" className="w-100 h-100 object-fit-cover" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}