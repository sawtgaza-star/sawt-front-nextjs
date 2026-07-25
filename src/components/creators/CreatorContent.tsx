// @ts-nocheck
"use client";
/* eslint-disable */
import { useEffect, useRef, useState } from "react";
import { CATEGORIES, CARDS } from "./creator-content/data";
import ContentCard from "./creator-content/ContentCard";
import ReelModal from "./creator-content/ReelModal";

/* "المحتوى" — category filter pills + a horizontal slider of vertical
   reel-poster cards, with circular prev/next nav arrows. Self-contained
   (no legacy JS): pills are visual filters, arrows scroll the track. */
export default function CreatorContent() {
  const [active, setActive] = useState(0);
  const [openIndex, setOpenIndex] = useState(null);
  const trackRef = useRef(null);
  // disable a nav arrow once the track can't scroll any further that way
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const scroll = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 330, behavior: "smooth" });
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
    <section className="cr-content-detail-section ">


      <div className="container position-relative">
          <img
            src="/assets/images/leaf_cutout.png"
            className="olive-branch branch-left-top-creator-section"
            alt="Olive Branch"
          />


        <div className="cr-content-head">
          <ul className="cr-content-tabs">
            {CATEGORIES.map((c, i) => (
              <li key={c.key}>
                <button
                  type="button"
                  className={"cr-content-tab" + (i === active ? " active" : "")}
                  onClick={() => setActive(i)}
                  data-i18n={c.key}
                >
                  {c.label}
                </button>
              </li>
            ))}
          </ul>
          <h2 className="cr-content-title">
            <span className="cr-highlight">
              المحتوى
            </span>
          </h2>
        </div>

        <div className="cr-content-slider">
          <button
            type="button"
            className="cr-content-nav cr-content-prev"
            onClick={() => scroll(-1)}
            disabled={atStart}
            aria-label="previous"
          >
            <i className="fa-solid fa-angle-right"></i>
          </button>
          <button
            type="button"
            className="cr-content-nav cr-content-next"
            onClick={() => scroll(1)}
            disabled={atEnd}
            aria-label="next"
          >
            <i className="fa-solid fa-angle-left"></i>
          </button>

          <div className="cr-content-track" ref={trackRef} dir="rtl">
            {CARDS.map((card, i) => (
              <ContentCard card={card} index={i} key={card.id} onOpen={setOpenIndex} />
            ))}
          </div>
        </div>
      </div>

      {openIndex !== null && (
        <ReelModal
          cards={CARDS}
          index={openIndex}
          onNavigate={setOpenIndex}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </section>
  );
}
