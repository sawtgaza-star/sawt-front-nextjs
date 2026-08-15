"use client";
import { createPortal } from "react-dom";
import ReelModal from "@/components/creators/creator-content/ReelModal";
import { useReelSwipe } from "./useReelSwipe";
import type { Reel } from "./content-data";

/* the viewer only needs the reel's id + video — `Reel` (محتوانا) and the
   creator page's cards both satisfy it */
type ViewerReel = Pick<Reel, "id" | "video">;

type Props = {
  reels: ViewerReel[];
  index: number;
  onNavigate: (index: number) => void;
  onClose: () => void;
  /* namespaces the reel's social state: every list numbers its reels from 0 */
  scope?: string;
};

/* The full-screen reel viewer, portalled to <body> and wrapped in its own
   top-most layer: the hero header owns a z-index: 1000 stacking context, so a
   viewer rendered inside the page would be painted over by the navbar.
   The layer also carries the Reels-style swipe gesture (touch only) — see
   useReelSwipe and the `.ct-reel-layer` rules in content.css. */
export default function ReelViewer({
  reels,
  index,
  onNavigate,
  onClose,
  scope = "content",
}: Props) {
  const { layerRef, swipeHandlers } = useReelSwipe({
    index,
    count: reels.length,
    onNavigate,
  });

  if (typeof document === "undefined") return null;

  const prev = index > 0 ? reels[index - 1] : null;
  const next = index < reels.length - 1 ? reels[index + 1] : null;

  return createPortal(
    <div className="ct-reel-layer" ref={layerRef} {...swipeHandlers}>
      {/* the neighbouring reels, parked exactly one screen above / below the
          current one and carrying the same swipe offset — on a phone the drag
          then reads like Reels: the next video is already flush against the
          bottom edge instead of the page showing through. Hidden above the
          mobile breakpoint, where the viewer is a centred card with arrows. */}
      {prev && (
        <div className="ct-reel-peek ct-reel-peek-prev" aria-hidden="true">
          <video src={prev.video} muted playsInline preload="auto" tabIndex={-1} />
        </div>
      )}
      {next && (
        <div className="ct-reel-peek ct-reel-peek-next" aria-hidden="true">
          <video src={next.video} muted playsInline preload="auto" tabIndex={-1} />
        </div>
      )}

      <ReelModal
        cards={reels}
        index={index}
        onNavigate={onNavigate}
        onClose={onClose}
        scope={scope}
      />
    </div>,
    document.body,
  );
}
