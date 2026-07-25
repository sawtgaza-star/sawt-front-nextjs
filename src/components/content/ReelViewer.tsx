"use client";
import { createPortal } from "react-dom";
import ReelModal from "@/components/creators/creator-content/ReelModal";
import type { Reel } from "./content-data";

type Props = {
  reels: Reel[];
  index: number;
  onNavigate: (index: number) => void;
  onClose: () => void;
};

/* The full-screen reel viewer, portalled to <body> and wrapped in its own
   top-most layer: the hero header owns a z-index: 1000 stacking context, so a
   viewer rendered inside the page would be painted over by the navbar. */
export default function ReelViewer({
  reels,
  index,
  onNavigate,
  onClose,
}: Props) {
  if (typeof document === "undefined") return null;

  return createPortal(
    <div className="ct-reel-layer">
      <ReelModal
        cards={reels}
        index={index}
        onNavigate={onNavigate}
        onClose={onClose}
      />
    </div>,
    document.body,
  );
}
