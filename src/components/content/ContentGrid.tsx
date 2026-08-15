"use client";
import { useState } from "react";
import ContentCard from "@/components/creators/creator-content/ContentCard";
import ReelViewer from "./ReelViewer";
import type { Reel } from "./content-data";

/* The filtered reel grid — five posters per row on desktop. Cards and the
   full-screen viewer are the ones the creator page already uses. */
export default function ContentGrid({ reels }: { reels: Reel[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <div className="ct-grid">
        {reels.map((reel, i) => (
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
          onNavigate={setOpenIndex}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </>
  );
}
