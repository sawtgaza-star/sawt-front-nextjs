import { useEffect, useState, type RefObject } from "react";

/** How many reels a list draws at a time. */
export const REEL_BATCH = 10;

/* Draws a reel list in batches, so the page doesn't mount (and fetch) every
   video at once. The next batch is added when the list's last drawn card
   comes near view — that card is watched directly, so no sentinel element is
   added and the markup/CSS stay exactly as they were.

   `scrollRoot`: the container is itself the scroller (the horizontal "الأكثر
   مشاهدة" track), so nearness is measured along it instead of the page.
   `resetKey` changes when the list does (filter / sort) — back to one batch. */
export function useReelBatches(
  total: number,
  containerRef: RefObject<HTMLElement | null>,
  { resetKey, scrollRoot = false }: { resetKey: string; scrollRoot?: boolean },
) {
  const [count, setCount] = useState(REEL_BATCH);
  const [key, setKey] = useState(resetKey);
  if (key !== resetKey) {
    setKey(resetKey);
    setCount(REEL_BATCH);
  }
  const shown = Math.min(count, total);

  useEffect(() => {
    const box = containerRef.current;
    const last = box?.lastElementChild;
    if (!box || !last || shown >= total || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) setCount((c) => c + REEL_BATCH);
      },
      scrollRoot
        ? { root: box, rootMargin: "0px 600px" }
        : { rootMargin: "600px 0px" },
    );
    io.observe(last);
    return () => io.disconnect();
  }, [shown, total, scrollRoot, containerRef]);

  /** Make sure reel `i` is drawn — the viewer can swipe past the last batch. */
  const reveal = (i: number) => setCount((c) => Math.max(c, i + 1));

  return { shown, reveal };
}
