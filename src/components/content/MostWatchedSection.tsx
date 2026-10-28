"use client";
import { useEffect, useRef, useState } from "react";
import ContentCard from "@/components/creators/creator-content/ContentCard";
import ReelViewer from "./ReelViewer";
import type { Reel } from "./content-data";
import { useReelBatches } from "./use-reel-batches";
import { useDragScroll } from "./use-drag-scroll";
import { splitHeading } from "./content-text";
import {
  MostWatchedCardsSkeleton,
  MostWatchedTitleSkeleton,
} from "./ContentSkeleton";

/* "الأكثر مشاهدة" row: the heading, then a horizontal track
   that starts at the container's right edge (RTL) and bleeds off the left of
   the viewport. Circular arrows scroll it; a card's play button opens the
   full-screen viewer — the same one the grid above opens.

   The heading and the reels come from the API's `reels` block — the same
   list the grid above draws. The block's `view_more` label is deliberately
   not rendered: the row has no "رؤية المزيد" link. The accent falls on the
   heading's last word; see splitHeading in ./content-text. */
export default function MostWatchedSection({
  reels,
  title = "",
  loading = false,
}: {
  reels: Reel[];
  title?: string;
  /** The payload is still on its way — hold the row with bars in its place. */
  loading?: boolean;
}) {
  const [titleHead, titleTail] = splitHeading(title, 1);
  const trackRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  // grey out an arrow once the track can't scroll any further that way
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  // cards are drawn a batch at a time as the track scrolls (useReelBatches)
  const { shown, reveal } = useReelBatches(reels.length, trackRef, {
    resetKey: reels.map((r) => r.id).join(","),
    scrollRoot: true,
  });

  // a new batch widens the track — re-check the arrows' edges
  useEffect(() => {
    trackRef.current?.dispatchEvent(new Event("scroll"));
  }, [shown]);

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

  useDragScroll(trackRef);

  return (
    <section className="ct-mw-section">
      <div className="container">
        <div className="ct-mw-head">
          {loading ? (
            <MostWatchedTitleSkeleton />
          ) : (
            title && (
              <h2 className="ct-mw-title">
                <span>{titleHead}</span>{" "}
                <span className="cr-highlight">{titleTail}</span>
              </h2>
            )
          )}
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
            {loading ? (
              <MostWatchedCardsSkeleton />
            ) : (
              reels.slice(0, shown).map((reel, i) => (
                <ContentCard
                  key={reel.id}
                  card={reel}
                  index={i}
                  onOpen={setOpenIndex}
                  fallbackPoster={null}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {openIndex !== null && (
        <ReelViewer
          reels={reels}
          index={openIndex}
          onNavigate={(i) => {
            setOpenIndex(i);
            reveal(i);
          }}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </section>
  );
}
