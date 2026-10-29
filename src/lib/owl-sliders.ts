/* Home sliders — the ORIGINAL Owl Carousel setup restored verbatim
   (the Swiper port caused issues, so we run the exact legacy configs). */
/* eslint-disable */
// @ts-nocheck
"use client";

/* Owl 2.3.4 bug: with `rtl + center` and no loop, coordinates(i) centres item
   i using the NEXT item's edge (_coordinates[i + 1]); the last item has none,
   so it reads 0 and the stage is sent ~half the track past the end — on the
   phone's صناع المحتوى slider, reaching the last creator emptied the whole
   row. The last item now sits one step past the item before it, which is
   exactly where the formula puts every other item. Patched once, on the
   prototype, and only for that combination. */
function patchRtlCenterLastItem($) {
  const Owl = $.fn.owlCarousel?.Constructor;
  if (!Owl || Owl.prototype.__rtlCenterLastFix) return;
  const coordinates = Owl.prototype.coordinates;
  Owl.prototype.coordinates = function (position) {
    const s = this.settings;
    if (
      position !== undefined &&
      position > 0 &&
      s.center &&
      s.rtl &&
      !s.loop &&
      this._coordinates[position + 1] === undefined
    ) {
      return (
        coordinates.call(this, position - 1) +
        Math.ceil(this._coordinates[position] - this._coordinates[position - 1])
      );
    }
    return coordinates.call(this, position);
  };
  Owl.prototype.__rtlCenterLastFix = true;
}

/* `edgeToEdge: <gutter px>` (our own option, set on the phone breakpoints):
   the strip runs from screen edge to screen edge and the stage is padded by
   the page's gutter (in CSS — Owl drops `stagePadding` under autoWidth; see
   home-news.css / home-creator-card.css). At rest the gutter sits before the first card (lined up with the
   page's content) and the next cards run off the other edge; the last stop
   is clamped so the last card ends one gutter short of that other edge —
   the gutter moves across as the row slides, instead of Owl stopping with
   the last card at the start and an empty strip after it. */
function patchEdgeToEdge($) {
  const Owl = $.fn.owlCarousel?.Constructor;
  if (!Owl || Owl.prototype.__edgeToEdge) return;
  const { coordinates, maximum } = Owl.prototype;
  const on = (owl) => owl.settings.edgeToEdge && !owl.settings.loop && !owl.settings.center;
  // how far the stage travels at most: every card + both gutters, less the view
  const limit = (owl) => {
    const c = owl._coordinates;
    if (!c.length) return 0;
    const pad = Number(owl.settings.edgeToEdge) || 0;
    const track = Math.abs(c[c.length - 1]) - owl.settings.margin;
    return Math.max(0, Math.ceil(track + 2 * pad - owl._width));
  };
  Owl.prototype.coordinates = function (position) {
    if (position === undefined || !on(this)) return coordinates.call(this, position);
    const c = coordinates.call(this, position);
    return Math.sign(c) * Math.min(Math.abs(c), limit(this));
  };
  Owl.prototype.maximum = function (relative) {
    if (!on(this)) return maximum.call(this, relative);
    const last = this._items.length - 1;
    const max = limit(this);
    let i = 0;
    while (i < last && Math.abs(coordinates.call(this, i)) < max) i++;
    return i;
  };
  Owl.prototype.__edgeToEdge = true;
}

/* the 10px phone gutter of every .container (style.css) */
const PHONE_GUTTER = 10;

export async function initOwlSliders() {
  const $ = (await import("jquery")).default;
  (window as any).$ = (window as any).jQuery = $;
  await import("owl.carousel");
  patchRtlCenterLastItem($);
  patchEdgeToEdge($);
  // the sliders run with the page: right-to-left in Arabic, left-to-right in
  // English (a language toggle remounts them — see HomeContent)
  const { getCurrentLang } = await import("./translations");
  const rtl = getCurrentLang() !== "en";

  // NO global run-once guard: on client-side navigation React mounts a brand new
  // (un-initialized) DOM, and Owl's CSS keeps `.owl-carousel` display:none until
  // it adds `.owl-loaded` — so a skipped init leaves the section blank until a
  // hard refresh. Instead we skip per element via `:not(.owl-loaded)`, which
  // makes repeat calls on an already-initialized carousel a no-op.
  // آخر الأخبار: حين تتسع الشاشة لكل الأخبار القادمة من الـ API (3 أو أقل على
  // الديسكتوب) لا يوجد ما يُسحب إليه — فلا loop ولا سحب ولا أسهم، وإلا كان
  // السحب يدوّر نسخاً مكرّرة من نفس البطاقات
  const $news = $(".creators-carousel:not(.owl-loaded)");
  // لا loop في السلايدرات (عدا الفريق — انظر أدناه): لا نسخ مكرّرة، ويتوقف عند
  // آخر بطاقة فيُعطَّل سهمه (Owl يضع .disabled على السهم — شكله في owl-preinit.css)
  const newsAt = (items, extra = {}) => {
    const fits = $news.children().length <= items;
    return {
      items,
      loop: false,
      mouseDrag: !fits,
      touchDrag: !fits,
      pullDrag: !fits,
      nav: !fits,
      ...extra,
    };
  };
  $news.owlCarousel({
    loop: false,
    rewind: false,
    margin: 20,
    rtl, // RTL in Arabic, LTR in English
    nav: true,
    dots: false,
    navText: [
      "<span class='arrow'>‹</span>",
      "<span class='arrow'>›</span>",
    ],
    responsive: {
      // الجوال: بطاقة كاملة + نصف البطاقة التالية (autoWidth + عرض البطاقة بالـ CSS)
      0: newsAt(1, { nav: false, loop: false, autoWidth: true, margin: 12, edgeToEdge: PHONE_GUTTER }),
      600: newsAt(2),
      1000: newsAt(3),
    },
  });

  // صناع المحتوى: يُعرض العدد الفعلي القادم من الـ API — لا تكرار بالـ loop حين
  // تتسع الشاشة لكل البطاقات (وإلا تُستنسخ نفس البطاقة لتملأ الصف)، وعندها
  // تتوسّط البطاقات بنفس عرضها بدل أن تلتصق بطرف واحد (cc-fits في home-creator-card.css)
  const $creators2 = $(".creators-carousel2:not(.owl-loaded)");
  const creatorsCount = $creators2.children(".item").length;
  const creatorsAt = (items, extra = {}) => ({
    items,
    loop: false,
    ...extra,
  });
  $creators2.on("initialized.owl.carousel refreshed.owl.carousel resized.owl.carousel", (e) => {
    // relatedTarget is the Owl instance — on `initialized` it isn't in .data() yet
    const owl = e.relatedTarget;
    if (!owl?.settings || e.target !== e.currentTarget) return;
    const fits = creatorsCount <= owl.settings.items;
    e.target.classList.toggle("cc-fits", fits);
    e.target.style.setProperty("--cc-gap", `${owl.settings.margin || 0}px`);
  });
  $creators2.owlCarousel({
    loop: false,
    rewind: false,
    margin: 25,
    rtl,
    nav: true,
    dots: false,
    // أيقونات الأسهم (chevron) بدل الرمزين ‹ › — تأخذ لون الزر عبر currentColor
    navText: [
      "<svg xmlns='http://www.w3.org/2000/svg' width='8' height='14' viewBox='8 5 8 14' fill='none'><path d='M8.46967 5.46966C8.76256 5.17677 9.23732 5.17679 9.53022 5.46966L15.5302 11.4697C15.8231 11.7626 15.8231 12.2373 15.5302 12.5302L9.53022 18.5302C9.23732 18.8231 8.76256 18.8231 8.46967 18.5302C8.17678 18.2373 8.17678 17.7625 8.46967 17.4697L13.9394 11.9999L8.46967 6.5302C8.17681 6.23732 8.17681 5.76254 8.46967 5.46966Z' fill='currentColor'/></svg>",
      "<svg xmlns='http://www.w3.org/2000/svg' width='8' height='14' viewBox='0 0 8 14' fill='none'><path d='M6.21964 0.219655C6.51253 -0.0732121 6.9873 -0.0732246 7.28019 0.219655C7.57305 0.512541 7.57305 0.987314 7.28019 1.2802L1.81046 6.74993L7.28019 12.2197C7.57308 12.5125 7.57308 12.9873 7.28019 13.2802C6.9873 13.5731 6.51253 13.5731 6.21964 13.2802L0.21964 7.2802C-0.073197 6.98731 -0.0732295 6.51253 0.21964 6.21966L6.21964 0.219655Z' fill='currentColor'/></svg>",
    ],
    responsive: {
      // الجوال: الشريط من حافة الشاشة لحافتها — أول بطاقة على حافة المحتوى والتالية
      // تظهر من الطرف الآخر (edgeToEdge أعلاه)؛ عرض البطاقة بالـ CSS (home-creator-card.css)
      0: creatorsAt(1, { autoWidth: true, edgeToEdge: PHONE_GUTTER, margin: 12, nav: false, dots: false }),
      600: creatorsAt(2),
      1100: creatorsAt(3),
      1300: creatorsAt(4),
      1500: creatorsAt(5),
    },
  });

  $(".real-stories-carousel:not(.owl-loaded)").owlCarousel({
    loop: false,
    rewind: false,
    margin: 20,
    rtl,
    nav: false,
    dots: true,
    responsive: {
      0: { items: 1 },
      768: { items: 2 },
    },
  });

  const owl = $(".team-carousel:not(.owl-loaded)");
  // الفريق هو الاستثناء الوحيد: يبقى loop — البطاقتان الوسطيان فقط واضحتان،
  // وبدون loop لا تصل الأولى ولا الأخيرة إلى الوسط إلا بترك خانات فارغة
  owl.owlCarousel({
    rtl,
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
