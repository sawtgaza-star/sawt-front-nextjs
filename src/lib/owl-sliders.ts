/* Home sliders — the ORIGINAL Owl Carousel setup restored verbatim
   (the Swiper port caused issues, so we run the exact legacy configs). */
/* eslint-disable */
// @ts-nocheck
"use client";

export async function initOwlSliders() {
  if ((window as any).__owlSliders) return;
  (window as any).__owlSliders = true;

  const $ = (await import("jquery")).default;
  (window as any).$ = (window as any).jQuery = $;
  await import("owl.carousel");

  $(".creators-carousel").owlCarousel({
    loop: true,
    margin: 20,
    rtl: true, // مهم عشان العربي
    nav: true,
    dots: false,
    navText: [
      "<span class='arrow'>‹</span>",
      "<span class='arrow'>›</span>",
    ],
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      1000: { items: 3 },
    },
  });

  $(".creators-carousel2").owlCarousel({
    loop: true,
    margin: 25,
    rtl: true,
    nav: true,
    dots: false,
    navText: [
      "<span class='arrow'>‹</span>",
      "<span class='arrow'>›</span>",
    ],
    responsive: {
      // الجوال: بطاقة في المنتصف مع ظهور طرف البطاقتين المجاورتين، والتنقّل بالنقاط
      0: { items: 1, center: true, stagePadding: 58, margin: 12, nav: false, dots: true },
      600: { items: 2 },
      1100: { items: 3 },
      1300: { items: 4 },
      1500: { items: 5 },
    },
  });

  $(".real-stories-carousel").owlCarousel({
    loop: true,
    margin: 20,
    rtl: true,
    nav: false,
    dots: true,
    responsive: {
      0: { items: 1 },
      768: { items: 2 },
    },
  });

  const owl = $(".team-carousel");
  owl.owlCarousel({
    rtl: true,
    loop: true,
    margin: 20,
    nav: true,
    dots: false,
    navText: [
      "<i class='fas fa-chevron-right'></i>",
      "<i class='fas fa-chevron-left'></i>",
    ],
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      1000: { items: 4 },
    },
    onTranslated: highlightMiddle,
    onInitialized: highlightMiddle,
  });

  function highlightMiddle() {
    $(".team-carousel .owl-item").removeClass("center-highlight");
    var activeItems = $(".team-carousel .owl-item.active");
    if (activeItems.length === 4) {
      $(activeItems[1]).addClass("center-highlight");
      $(activeItems[2]).addClass("center-highlight");
    } else {
      activeItems.addClass("center-highlight");
    }
  }
}
