/* Home sliders — the ORIGINAL Owl Carousel setup restored verbatim
   (the Swiper port caused issues, so we run the exact legacy configs). */
/* eslint-disable */
// @ts-nocheck
"use client";

export async function initOwlSliders() {
  const $ = (await import("jquery")).default;
  (window as any).$ = (window as any).jQuery = $;
  await import("owl.carousel");

  // NO global run-once guard: on client-side navigation React mounts a brand new
  // (un-initialized) DOM, and Owl's CSS keeps `.owl-carousel` display:none until
  // it adds `.owl-loaded` — so a skipped init leaves the section blank until a
  // hard refresh. Instead we skip per element via `:not(.owl-loaded)`, which
  // makes repeat calls on an already-initialized carousel a no-op.
  $(".creators-carousel:not(.owl-loaded)").owlCarousel({
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
      // الجوال: بطاقة كاملة + نصف البطاقة التالية (autoWidth + عرض البطاقة بالـ CSS)
      0: { items: 1, nav: false, loop: false, autoWidth: true, margin: 12 },
      600: { items: 2 },
      1000: { items: 3 },
    },
  });

  $(".creators-carousel2:not(.owl-loaded)").owlCarousel({
    loop: true,
    margin: 25,
    rtl: true,
    nav: true,
    dots: false,
    // أيقونات الأسهم (chevron) بدل الرمزين ‹ › — تأخذ لون الزر عبر currentColor
    navText: [
      "<svg xmlns='http://www.w3.org/2000/svg' width='8' height='14' viewBox='8 5 8 14' fill='none'><path d='M8.46967 5.46966C8.76256 5.17677 9.23732 5.17679 9.53022 5.46966L15.5302 11.4697C15.8231 11.7626 15.8231 12.2373 15.5302 12.5302L9.53022 18.5302C9.23732 18.8231 8.76256 18.8231 8.46967 18.5302C8.17678 18.2373 8.17678 17.7625 8.46967 17.4697L13.9394 11.9999L8.46967 6.5302C8.17681 6.23732 8.17681 5.76254 8.46967 5.46966Z' fill='currentColor'/></svg>",
      "<svg xmlns='http://www.w3.org/2000/svg' width='8' height='14' viewBox='0 0 8 14' fill='none'><path d='M6.21964 0.219655C6.51253 -0.0732121 6.9873 -0.0732246 7.28019 0.219655C7.57305 0.512541 7.57305 0.987314 7.28019 1.2802L1.81046 6.74993L7.28019 12.2197C7.57308 12.5125 7.57308 12.9873 7.28019 13.2802C6.9873 13.5731 6.51253 13.5731 6.21964 13.2802L0.21964 7.2802C-0.073197 6.98731 -0.0732295 6.51253 0.21964 6.21966L6.21964 0.219655Z' fill='currentColor'/></svg>",
    ],
    responsive: {
      // الجوال: بطاقة في المنتصف مع ظهور طرف البطاقتين المجاورتين، بدون نقاط تنقّل
      0: { items: 1, center: true, stagePadding: 58, margin: 12, nav: false, dots: false },
      600: { items: 2 },
      1100: { items: 3 },
      1300: { items: 4 },
      1500: { items: 5 },
    },
  });

  $(".real-stories-carousel:not(.owl-loaded)").owlCarousel({
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

  const owl = $(".team-carousel:not(.owl-loaded)");
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
      // الجوال: بطاقة في المنتصف مع نصف بطاقة على كل جانب (ضبابية)
      0: { items: 1, center: true, stagePadding: 70, margin: 10, nav: false },
      400: { items: 1, center: true, stagePadding: 95, margin: 10, nav: false },
      600: { items: 2 },
      1000: { items: 4 },
    },
    onTranslated: highlightMiddle,
    onInitialized: highlightMiddle,
    onRefreshed: highlightMiddle,
  });

  function highlightMiddle() {
    $(".team-carousel .owl-item").removeClass("center-highlight");
    // في وضع ‎center‎ (الجوال) يضيف Owl صنف ‎.center‎ للبطاقة الوسطى، بينما
    // ‎.active‎ يشمل الجارتين الظاهرتين ضمن ‎stagePadding‎ — فنعتمد ‎.center‎ وحدها
    var centered = $(".team-carousel .owl-item.center");
    if (centered.length) {
      centered.addClass("center-highlight");
      return;
    }
    var activeItems = $(".team-carousel .owl-item.active");
    if (activeItems.length === 4) {
      $(activeItems[1]).addClass("center-highlight");
      $(activeItems[2]).addClass("center-highlight");
    } else {
      activeItems.addClass("center-highlight");
    }
  }
}
