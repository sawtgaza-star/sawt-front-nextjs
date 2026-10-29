"use client";
import { useEffect, useState } from "react";
import type { Reel } from "./content-data";

/** How long a cover may take before it is treated as failed. */
const PROBE_TIMEOUT = 10000;

/* Keeps only the reels whose cover actually loads.

   Instagram's thumbnail links are signed and expire, and a reel without a
   cover is just an empty box — so every cover is probed once (a detached
   Image, which also warms the cache for the card's own <img>) and a reel is
   listed only after its cover has loaded. Reels with no `thumbnail`, or one
   that fails, never appear — in the grid, the "الأكثر مشاهدة" row or the
   viewer. The list keeps the API's order; reels join it as their covers
   arrive. `pending` is how many covers are still being probed. */
export function useLoadedThumbs(reels: Reel[]): { list: Reel[]; pending: number } {
  // poster URL → loaded (true) / failed (false); absent = still probing
  const [status, setStatus] = useState<Record<string, boolean>>({});

  const key = reels.map((r) => r.poster || "").join("|");
  useEffect(() => {
    let alive = true;
    const posters = Array.from(new Set(reels.map((r) => r.poster).filter(Boolean))) as string[];
    const timers: number[] = [];
    posters.forEach((src) => {
      const probe = new Image();
      probe.onload = () => alive && setStatus((s) => ({ ...s, [src]: true }));
      probe.onerror = () => alive && setStatus((s) => ({ ...s, [src]: false }));
      probe.src = src;
      // a request that never settles counts as failed, so `pending` reaches 0
      timers.push(
        window.setTimeout(() => {
          if (alive) setStatus((s) => (src in s ? s : { ...s, [src]: false }));
        }, PROBE_TIMEOUT),
      );
    });
    return () => {
      alive = false;
      timers.forEach((t) => window.clearTimeout(t));
    };
    // `key` stands for `reels`' covers — a new array with the same covers
    // (every render) must not probe again
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const list = reels.filter((r) => r.poster && status[r.poster] === true);
  const pending = reels.filter((r) => r.poster && !(r.poster in status)).length;
  return { list, pending };
}
