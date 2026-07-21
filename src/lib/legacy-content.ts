/* Ported from content.html inline scripts — Swiper inits kept verbatim */
/* eslint-disable */
// @ts-nocheck
"use client";
import Swiper from "swiper/bundle";

export function initContentInline() {
  if ((window as any).__initContentInline) return;
  (window as any).__initContentInline = true;

      var swiper = new Swiper(".mySwiper", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        loop: true,
        // الإعدادات الافتراضية (للشاشات الكبيرة)
        slidesPerView: 6,

        autoplay: { delay: 3000 },
        coverflowEffect: {
          depth: 200, // تقليل العمق ليتناسب مع شاشة الجوال الصغيرة
          rotate: 10,
          stretch: 0,
          modifier: 1,
          slideShadows: true,
        },

        // التغيير حسب حجم الشاشة
        breakpoints: {
          // لما تكون الشاشة أصغر من 768px (جوال)
          320: {
            slidesPerView: 3,
            coverflowEffect: {
              depth: 100, // تقليل العمق ليتناسب مع شاشة الجوال الصغيرة
              rotate: 15,
            },
          },
          // لما تكون الشاشة أكبر من 992px (كمبيوتر)
          992: {
            slidesPerView: 6,
          },
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
      });
    



      // تهيئة السويبر الثاني
      var swiper2 = new Swiper(".mySwiper2", {
        slidesPerView: 1.3,
        spaceBetween: 25,
        rtl: true,
        grabCursor: true,
        loop: false, // اجعله true إذا أردت تكرار لا نهائي
        navigation: {
          nextEl: ".btn-next-2",
          prevEl: ".btn-prev-2",
        },
        breakpoints: {
          576: { slidesPerView: 2.3 },
          768: { slidesPerView: 3.3 },
          1024: { slidesPerView: 4.3 },
          1400: { slidesPerView: 5.3 },
        },
      });
      // تهيئة السويبر الثاني
      var swiper2 = new Swiper(".mySwiper3", {
        slidesPerView: 1.3,
        spaceBetween: 25,
        rtl: true,
        Infinity: true,
        Infinity: true,
        grabCursor: true,
        loop: true, // اجعله true إذا أردت تكرار لا نهائي
        navigation: {
          nextEl: ".btn-next-3",
          prevEl: ".btn-prev-3",
        },
        breakpoints: {
          576: { slidesPerView: 2.3 },
          768: { slidesPerView: 3.3 },
          1024: { slidesPerView: 4.3 },
          1400: { slidesPerView: 5.3 },
        },
      });
    
}
