"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";

/* "فريق خبراء متخصص" once there are more experts than one row holds (see
   ExpertsTeam): the cards stay on a single scroll-snap row — four in view on
   desktop, two on a tablet — with a round arrow on each side. Phones are
   untouched: their swipe strip is the plain row's own (<576px in
   incubator.css), so the arrows are hidden there.

   The arrows are PHYSICAL — the left one scrolls the row left, the right one
   right — so they need no flipping when the language toggle turns the page
   around. Both sit level with the middle of the cards and stay on screen; at
   its end of the row an arrow is disabled (greyed out), never hidden. */
export default function ExpertsSlider({ children }: { children: ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  /* `scrollLeft` runs 0 → -max in an RTL row and 0 → max in an LTR one */
  const measure = () => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const x = el.scrollLeft;
    const rtl = getComputedStyle(el).direction === "rtl";
    setCanLeft(max > 1 && (rtl ? x > -max + 1 : x > 1));
    setCanRight(max > 1 && (rtl ? x < -1 : x < max - 1));
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    // the language toggle flips <html dir> without resizing anything
    const mo = new MutationObserver(measure);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["dir"] });
    return () => {
      ro.disconnect();
      mo.disconnect();
    };
  }, []);

  /* one card (plus the gap) per click; scroll-snap lines the row back up */
  const scroll = (dir: -1 | 1) => {
    const el = trackRef.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollBy({ left: dir * (card.getBoundingClientRect().width + gap), behavior: "smooth" });
  };

  return (
    <div className="inc-expert-slider">
      <button
        type="button"
        className="inc-expert-arrow inc-expert-arrow-left"
        aria-label="Previous"
        disabled={!canLeft}
        onClick={() => scroll(-1)}
      >
        <i className="fa-solid fa-angle-left"></i>
      </button>

      <div className="inc-expert-row is-slider" ref={trackRef} onScroll={measure}>
        {children}
      </div>

      <button
        type="button"
        className="inc-expert-arrow inc-expert-arrow-right"
        aria-label="Next"
        disabled={!canRight}
        onClick={() => scroll(1)}
      >
        <i className="fa-solid fa-angle-right"></i>
      </button>
    </div>
  );
}
