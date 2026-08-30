"use client";
import { useEffect, useRef, useState } from "react";
import { UNTOLD_STORIES } from "./untold-stories-data";

const GAP = 20; // must match .sp-stories-track gap in support.css
/* how far a press must travel before it counts as a drag rather than a click */
const SLOP = 6;

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
  // px offset of an in-progress pointer drag (null = not dragging)
  const [dragDelta, setDragDelta] = useState<number | null>(null);
  const dragStartX = useRef(0);
  /* whether the press has travelled far enough to be a drag, and whether the
     click it ends on has to be thrown away because of that */
  const dragMoved = useRef(false);
  const swallowClick = useRef(false);
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onResize = () => setPerView(perViewFor(window.innerWidth));
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const maxIndex = Math.max(0, UNTOLD_STORIES.length - perView);
  // Clamp when the breakpoint shrinks the number of reachable slides.
  const safeIndex = Math.min(index, maxIndex);

  /* Mouse/touch swiping: the track follows the pointer live, and on release a
     drag past the threshold turns into one slide. In RTL the track advances
     with a POSITIVE translateX (the next card waits on the left), so dragging
     right = next; [dir="ltr"] mirrors that. */
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    dragStartX.current = e.clientX;
    dragMoved.current = false;
    swallowClick.current = false;
    setDragDelta(0);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragDelta === null) return;
    const dx = e.clientX - dragStartX.current;
    if (!dragMoved.current) {
      // a few pixels of slack, so a press that doesn't travel stays a click
      if (Math.abs(dx) < SLOP) return;
      dragMoved.current = true;
      /* Captured only now, not on pointerdown: capturing a pointer retargets
         the mouse events derived from it, so the click ending a plain press
         landed on this viewport and the card's link never saw it — the card
         looked dead. A committed drag has no click to lose. */
      e.currentTarget.setPointerCapture(e.pointerId);
    }
    setDragDelta(dx);
  };
  const endDrag = () => {
    if (dragDelta === null) return;
    // a drag that actually moved swallows the click it ends on, so releasing
    // over a card doesn't open the story
    if (dragMoved.current) swallowClick.current = true;
    const width = viewportRef.current?.offsetWidth ?? 0;
    const threshold = Math.min(60, width / 4);
    const rtl = document.documentElement.dir !== "ltr";
    const towardNext = rtl ? dragDelta : -dragDelta;
    if (towardNext > threshold) {
      setIndex(Math.min(maxIndex, safeIndex + 1));
    } else if (towardNext < -threshold) {
      setIndex(Math.max(0, safeIndex - 1));
    }
    setDragDelta(null);
  };
  const onClickCapture = (e: React.MouseEvent) => {
    if (!swallowClick.current) return;
    swallowClick.current = false;
    e.preventDefault();
    e.stopPropagation();
  };

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

          <div
            className="sp-stories-viewport"
            ref={viewportRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onClickCapture={onClickCapture}
            onDragStart={(e) => e.preventDefault()}
          >
            <div
              className="sp-stories-track"
              style={{
                transform: `translateX(calc(${safeIndex} * (100% + ${GAP}px) / ${perView} + ${dragDelta ?? 0}px))`,
                transition: dragDelta !== null ? "none" : undefined,
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
                        href={`/stories/${s.slug}`}
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

        {/* mobile mock: the side chevrons give way to this dot pager — CSS
            hides it on desktop and hides the chevrons under 768px */}
        <div className="sp-stories-dots">
          {Array.from({ length: maxIndex + 1 }, (_, i) => (
            <button
              key={i}
              type="button"
              className={"sp-stories-dot" + (i === safeIndex ? " active" : "")}
              aria-label={`الشريحة ${i + 1}`}
              onClick={() => setIndex(i)}
            ></button>
          ))}
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
            <a href="/support/methods" className="sp-btn-green">
              <span data-i18n="support_untold_cta_btn">إدعم المنصة الآن</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
