"use client";
import { useEffect, useRef, useState } from "react";
import ContentCard from "@/components/creators/creator-content/ContentCard";
import ReelViewer from "./ReelViewer";
import type { Reel } from "./content-data";

/* "الأكثر مشاهدة" row: heading + "رؤية المزيد" link, then a horizontal track
   that starts at the container's right edge (RTL) and bleeds off the left of
   the viewport. Circular arrows scroll it; a card's play button opens the
   full-screen viewer. */
export default function MostWatchedSection({ reels }: { reels: Reel[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  // grey out an arrow once the track can't scroll any further that way
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const scroll = (dir: number) => {
    trackRef.current?.scrollBy({ left: dir * 560, behavior: "smooth" });
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
      // RTL scrollLeft can be negative; Math.abs normalizes to 0..max
      const pos = Math.abs(el.scrollLeft);
      setAtEnd(pos <= 1); // scroll(+1) direction exhausted
      setAtStart(pos >= max - 1); // scroll(-1) direction exhausted
    };
    updateEdges();
    el.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      el.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, []);

  return (
    <section className="ct-mw-section">
      <div className="container">
        <div className="ct-mw-head">
          <h2 className="ct-mw-title">
            <span data-i18n="content_most_watched_pre">الأكثر</span>{" "}
            <span className="cr-highlight" data-i18n="content_most_watched_hl">
              مشاهدة
            </span>
          </h2>
          <a className="ct-mw-more" href="#" data-i18n="content_view_more">
            رؤية المزيد
          </a>
        </div>
      </div>

      <div className="ct-mw-slider">
        <button
          type="button"
          className="ct-mw-nav ct-mw-prev"
          onClick={() => scroll(-1)}
          disabled={atStart}
          aria-label="previous"
        >
          <i className="fa-solid fa-angle-right"></i>
        </button>
        <button
          type="button"
          className="ct-mw-nav ct-mw-next"
          onClick={() => scroll(1)}
          disabled={atEnd}
          aria-label="next"
        >
          <i className="fa-solid fa-angle-left"></i>
        </button>

        <div className="ct-mw-track" ref={trackRef}>
          {reels.map((reel, i) => (
            <ContentCard
              key={reel.id}
              card={reel}
              index={i}
              onOpen={setOpenIndex}
            />
          ))}
        </div>
      </div>

      {openIndex !== null && (
        <ReelViewer
          reels={reels}
          index={openIndex}
          onNavigate={setOpenIndex}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </section>
  );
}
