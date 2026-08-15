"use client";
import { useRef, useState } from "react";
import {
  IconChevronDownBold,
  IconQuoteMarks,
  IconRatingStar,
} from "@/components/ui/icons";
import { TESTIMONIALS } from "./testimonials-data";

/* The testimonials section's card strip: a scroll-snap track paged two cards
   at a time (one per view on mobile) plus the bordered dot-pager pill under
   it. Mouse users can grab-drag the track (touch scrolls natively); the drag
   temporarily lifts scroll-snap via the `dragging` class and re-snaps to the
   nearest page on release. Client leaf — the static copy column stays in
   IncubatorTestimonials. */
const PAGES = Math.ceil(TESTIMONIALS.length / 2);

export default function TestimonialsSlider() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);
  const drag = useRef({ startX: 0, startScroll: 0, moved: false });

  /* RTL: Chrome reports scrollLeft as 0 → -max, so map by |distance| */
  const nearestIndex = () => {
    const el = trackRef.current;
    if (!el) return 0;
    const max = el.scrollWidth - el.clientWidth;
    if (max <= 0) return 0;
    return Math.round((Math.abs(el.scrollLeft) / max) * (PAGES - 1));
  };

  const onScroll = () => setActive(nearestIndex());

  /* Scroll the track only (scrollIntoView would drag the page along too).
     Equal-width pages spread evenly over the scroll range, and RTL browsers
     count scrollLeft 0 → -max. */
  const goTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    if (max <= 0) return;
    const dist = (i / (PAGES - 1)) * max;
    const rtl = getComputedStyle(el).direction === "rtl";
    el.scrollTo({ left: rtl ? -dist : dist, behavior: "smooth" });
  };

  const onPointerDown = (e: React.PointerEvent) => {
    const el = trackRef.current;
    if (!el || e.pointerType !== "mouse") return;
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
    if (!dragging) return;
    setDragging(false);
    const i = nearestIndex();
    requestAnimationFrame(() => goTo(i));
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
    <div className="inc-testi-slider">
      <div
        className={"inc-testi-track" + (dragging ? " dragging" : "")}
        ref={trackRef}
        onScroll={onScroll}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onClickCapture={onClickCapture}
      >
        {TESTIMONIALS.map((t) => (
          <article className="inc-testi-card" key={t.key}>
            <span className="inc-testi-avatar">
              <img src={t.photo} alt="" draggable={false} />
              <span className="inc-testi-quote-badge" aria-hidden="true">
                <IconQuoteMarks />
              </span>
            </span>

            <div className="inc-testi-stars" aria-hidden="true">
              {Array.from({ length: 5 }, (_, s) => (
                <IconRatingStar key={s} filled={s < t.rating} />
              ))}
            </div>

            <p className="inc-testi-text" data-i18n={t.quoteKey}>
              {t.quote}
            </p>

            <a className="inc-testi-cta" href={t.ctaHref}>
              <span data-i18n={t.ctaKey}>{t.cta}</span>
              <IconChevronDownBold />
            </a>

            <b className="inc-testi-name" data-i18n={t.nameKey}>
              {t.name}
            </b>
            <span className="inc-testi-meta" data-i18n={t.metaKey}>
              {t.meta}
            </span>
          </article>
        ))}
      </div>

      <div className="inc-testi-dots">
        <span className="inc-testi-dots-pill">
          {Array.from({ length: PAGES }, (_, i) => (
            <button
              key={i}
              type="button"
              className={"inc-testi-dot" + (i === active ? " active" : "")}
              aria-label={`الصفحة ${i + 1}`}
              onClick={() => goTo(i)}
            ></button>
          ))}
        </span>
      </div>
    </div>
  );
}
