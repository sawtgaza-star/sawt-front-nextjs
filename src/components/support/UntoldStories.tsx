"use client";
import { useEffect, useState } from "react";
import { UNTOLD_STORIES } from "./untold-stories-data";

const GAP = 20; // must match .sp-stories-track gap in support.css

/* Cards visible per view — mirrors the .sp-story-slide flex-basis breakpoints. */
function perViewFor(width: number) {
  if (width <= 767.98) return 1;
  if (width <= 991.98) return 2;
  return 3;
}

/* Chevron from the design; points inline-forward and is mirrored per button
   by the [dir] rules in support.css. */
function Chevron() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M8.46967 5.46966C8.76256 5.17677 9.23732 5.17679 9.53022 5.46966L15.5302 11.4697C15.8231 11.7626 15.8231 12.2373 15.5302 12.5302L9.53022 18.5302C9.23732 18.8231 8.76256 18.8231 8.46967 18.5302C8.17678 18.2373 8.17678 17.7625 8.46967 17.4697L13.9394 11.9999L8.46967 6.5302C8.17681 6.23732 8.17681 5.76254 8.46967 5.46966Z"
        fill="currentColor"
      />
    </svg>
  );
}

/* "أصوات لم نقدر على توصيلها" — self-contained RTL slider (no Owl/Swiper:
   this page loads neither). Cards reuse the home page's `.rs-card` markup so
   the slide-up hover story is identical. The track shifts by one card per
   click; in RTL a positive translateX reveals the next card. */
export default function UntoldStories() {
  const [index, setIndex] = useState(0);
  const [perView, setPerView] = useState(3);

  useEffect(() => {
    const onResize = () => setPerView(perViewFor(window.innerWidth));
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const maxIndex = Math.max(0, UNTOLD_STORIES.length - perView);
  // Clamp when the breakpoint shrinks the number of reachable slides.
  const safeIndex = Math.min(index, maxIndex);

  return (
    <section className="sp-section" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="cr-section-head">
          <h2 className="cr-section-title">
            <span data-i18n="support_untold_title_pre">أصوات لم نقدر على</span>{" "}
            <span className="cr-highlight" data-i18n="support_untold_title_hl">
              توصيلها
            </span>
          </h2>
          <p className="cr-section-sub" data-i18n="support_untold_sub">
            هذه قصص حقيقية من غزة لم تصل للعالم ـ لأن الموارد نفدت قبل أن نكمل
            روايتها
          </p>
        </div>

        <div className="sp-stories-wrap">
          <button
            type="button"
            className="sp-stories-nav sp-stories-prev"
            aria-label="السابق"
            data-i18n-title="support_prev"
            disabled={safeIndex === 0}
            onClick={() => setIndex(Math.max(0, safeIndex - 1))}
          >
            <Chevron />
          </button>

          <div className="sp-stories-viewport">
            <div
              className="sp-stories-track"
              style={{
                transform: `translateX(calc(${safeIndex} * (100% + ${GAP}px) / ${perView}))`,
              }}
            >
              {UNTOLD_STORIES.map((s) => (
                <div className="sp-story-slide" key={s.key}>
                  <div className="rs-card">
                    <img className="rs-card-bg" src={s.image} alt="" />
                    <div className="rs-card-info">
                      <div className="rs-card-text">
                        <span className="rs-badge" data-i18n="rs_badge">
                          قصة نجاح
                        </span>
                        <h5 className="rs-card-title" data-i18n={s.titleKey}>
                          {s.title}
                        </h5>
                        <p className="rs-card-desc" data-i18n="rs_card_desc">
                          من غزة الى الأردن وأمل لايمشي مجددا
                        </p>
                        <p className="rs-card-full" data-i18n={s.fullKey}>
                          {s.full}
                        </p>
                      </div>
                      <a
                        href="#"
                        className="rs-arrow"
                        aria-label="عرض القصة"
                        data-i18n-title="rs_view_story"
                      >
                        <i className="fa-solid fa-arrow-left"></i>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="sp-stories-nav sp-stories-next"
            aria-label="التالي"
            data-i18n-title="support_next"
            disabled={safeIndex >= maxIndex}
            onClick={() => setIndex(Math.min(maxIndex, safeIndex + 1))}
          >
            <Chevron />
          </button>
        </div>

        {/* .sp-stories-cta is the patterned frame; .sp-stories-strip is the
            olive-50 panel that sits on top of it — same treatment as .sp-banner */}
        <div className="sp-stories-cta">
          <div className="sp-stories-strip">
            <div>
              <h3
                className="sp-stories-strip-title"
                data-i18n="support_untold_cta_title"
              >
                دعمك يمنع القصة القادمة من الضياع
              </h3>
              <p
                className="sp-stories-strip-desc"
                data-i18n="support_untold_cta_desc"
              >
                تبرعك اليوم يضمن الصوت القادم لن يضيع
              </p>
            </div>
            <a href="#support-donate" className="sp-btn-green">
              <span data-i18n="support_untold_cta_btn">إدعم المنصة الآن</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
