"use client";
import { useRef, useState } from "react";
import ContentCard from "@/components/creators/creator-content/ContentCard";
import ReelViewer from "./ReelViewer";
import type { Reel } from "./content-data";
import { useReelBatches } from "./use-reel-batches";

/* The filtered reel grid — five posters per row on desktop. Cards and the
   full-screen viewer are the ones the creator page already uses. Cards are
   drawn a batch at a time (useReelBatches); the viewer still gets the whole
   list. */
export default function ContentGrid({ reels }: { reels: Reel[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const { shown, reveal } = useReelBatches(reels.length, gridRef, {
    resetKey: reels.map((r) => r.id).join(","),
  });

  if (!reels.length) {
    return (
      <p className="ct-grid-empty" data-i18n="content_grid_empty">
        لا يوجد محتوى في هذا التصنيف حاليًا.
      </p>
    );
  }

  return (
    <>
      <div className="ct-grid" ref={gridRef}>
        {reels.slice(0, shown).map((reel, i) => (
          <ContentCard
            key={reel.id}
            card={reel}
            index={i}
            onOpen={setOpenIndex}
          />
        ))}
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
    </>
  );
}
