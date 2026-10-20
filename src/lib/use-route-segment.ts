"use client";
/* The client half of ./route-segment: which segment the fallback page is
   standing in for. Kept apart so server pages can import FALLBACK_SEGMENT and
   withFallback() without them becoming client references. */

import { useSyncExternalStore } from "react";
import { FALLBACK_SEGMENT } from "./route-segment";

// The path never changes under a mounted page (a new segment is a new page).
const subscribe = () => () => {};

function lastPathSegment(): string {
  const parts = window.location.pathname.split("/").filter(Boolean);
  const last = (parts[parts.length - 1] || "").replace(/\.html$/, "");
  try {
    return decodeURIComponent(last);
  } catch {
    return last;
  }
}

/** The route segment to fetch: the prop as-is on a prebuilt page; on the
    fallback page, the one in the URL — "" on the server and during hydration,
    which the data hooks treat as "not yet" (they stay on the skeleton). */
export function useRouteSegment(segment: string): string {
  return useSyncExternalStore(
    subscribe,
    () => (segment === FALLBACK_SEGMENT ? lastPathSegment() : segment),
    () => (segment === FALLBACK_SEGMENT ? "" : segment),
  );
}
