"use client";
import { useEffect, useRef, useState } from "react";
import NewsCard from "@/components/news/NewsCard";
import { ALL_NEWS } from "@/components/news/news-data";

/* "أخبار ذات صلة" — the strip that closes the article. Same olive band, mic
   watermarks, heading treatment and "عرض جميع الأخبار" link as the home
   slider, but the detail page is not an owl page (LegacyInit only boots the
   carousels on "home"), so the track is a plain scroll container with the
   creators listing's circular nav buttons. */
/* six cards — three per view, so the nav buttons actually have somewhere to
   scroll (three filled the track exactly and left both arrows disabled) */
const RELATED = ALL_NEWS.slice(0, 6);

export default function RelatedNews() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  /* a nav button greys out once the track can't scroll further that way */
  /* the strip opens at its start, so that side's arrow renders disabled from
     the first paint; the effect below corrects both once the track measures */
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [dragging, setDragging] = useState(false);

  /* step = one card + gap; dir -1 goes back toward the start of the strip, +1
     toward its end. In RTL the browser's scrollLeft axis runs the other way
     (0 at the start, negative toward the end), so the sign is flipped there. */
  const scroll = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    const rtl = getComputedStyle(el).direction === "rtl";
    el.scrollBy({
      left: dir * (rtl ? -1 : 1) * el.clientWidth * 0.5,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const updateEdges = () => {
      const max = el.scrollWidth - el.clientWidth;
      if (max <= 1) {
        setAtStart(true);
        setAtEnd(true);
        return;
      }
      // RTL scrollLeft is negative; Math.abs turns both into 0..max from start
      const pos = Math.abs(el.scrollLeft);
      setAtStart(pos <= 1);
      setAtEnd(pos >= max - 1);
    };
    updateEdges();
    el.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      el.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, []);

  /* Click-and-drag panning for the mouse — same shape as the incubator's
     TestimonialsSlider. Touch keeps the browser's own momentum scrolling, and
     `moved` swallows the click that ends a drag so panning across a card does
     not open the article. */
  const drag = useRef({ startX: 0, startScroll: 0, moved: false });

  const onPointerDown = (e: React.PointerEvent) => {
    const el = trackRef.current;
    if (!el || e.pointerType !== "mouse" || e.button !== 0) return;
    drag.current = { startX: e.clientX, startScroll: el.scrollLeft, moved: false };
    setDragging(true);
    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const el = trackRef.current;
    if (!el || !dragging) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 6) drag.current.moved = true;
    /* content follows the cursor — same formula in LTR and RTL */
    el.scrollLeft = drag.current.startScroll - dx;
  };

  const onPointerUp = () => {
    if (dragging) setDragging(false);
  };

  /* a drag must not count as a click on the card's link */
  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  return (
    <section className="nws-related position-relative">
      <div className="bg-icon bg-icon-right">
        <img src="/assets/images/fa-solid_microphone-alt.png" alt="" />
      </div>
      <div className="bg-icon bg-icon-left">
        <img src="/assets/images/fa-solid_microphone-alt (1).png" alt="" />
      </div>

      <div className="container">
        <div className="text-center mb-2">
          <h2 className="fw-bold font-42 nws-related-title">
            <span data-i18n="nws_related_title_pre">أخبار ذات</span>{" "}
            <span className="who-us" data-i18n="nws_related_title_highlight">
              صلة
            </span>
          </h2>
          <p
            className="news-subtitle font-24"
            style={{ color: "rgba(90, 90, 90, 1)" }}
            data-i18n="news_subtitle"
          >
            شاهد أحدث القصص والفيديوهات من منصة صوت
          </p>
        </div>

        <div className="nws-related-slider">
          <button
            type="button"
            className="nws-related-nav nws-related-prev"
            onClick={() => scroll(-1)}
            disabled={atStart}
            aria-label="previous"
          >
            <i className="fa-solid fa-angle-right"></i>
          </button>
          <button
            type="button"
            className="nws-related-nav nws-related-next"
            onClick={() => scroll(1)}
            disabled={atEnd}
            aria-label="next"
          >
            <i className="fa-solid fa-angle-left"></i>
          </button>

          <div
            className={"nws-related-track" + (dragging ? " dragging" : "")}
            ref={trackRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onDragStart={(e) => e.preventDefault()}
            onClickCapture={onClickCapture}
          >
            {RELATED.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
        </div>

        <div className="text-center nws-related-more">
          <a href="/news" className="px-4 py-2 fw-bold show-more-news">
            <span data-i18n="view_all_news">عرض جميع الأخبار</span>{" "}
            <i className="fa-solid fa-angle-left me-2 arrow"></i>
          </a>
        </div>
      </div>
    </section>
  );
}
