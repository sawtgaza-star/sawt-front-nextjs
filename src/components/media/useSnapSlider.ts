"use client";
import { useRef, useState } from "react";

/* Shared plumbing for the two arrow+dots carousels on /media (packages and
   testimonials): a scroll-snap track paged one slide at a time.

   RTL is the whole reason this isn't three lines — Chrome reports scrollLeft
   as 0 → -max in an RTL track, so positions are computed from |scrollLeft|
   and written back with the sign the computed direction calls for. */
export function useSnapSlider(count: number) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const nearestIndex = () => {
    const el = trackRef.current;
    if (!el || count < 2) return 0;
    const max = el.scrollWidth - el.clientWidth;
    if (max <= 0) return 0;
    return Math.round((Math.abs(el.scrollLeft) / max) * (count - 1));
  };

  const onScroll = () => setActive(nearestIndex());

  const goTo = (i: number) => {
    const el = trackRef.current;
    if (!el || count < 2) return;
    const clamped = Math.max(0, Math.min(count - 1, i));
    const max = el.scrollWidth - el.clientWidth;
    if (max <= 0) return;
    const dist = (clamped / (count - 1)) * max;
    const rtl = getComputedStyle(el).direction === "rtl";
    el.scrollTo({ left: rtl ? -dist : dist, behavior: "smooth" });
  };

  /* "next" always means the arrow that advances the list, in either direction */
  const next = () => goTo(nearestIndex() + 1);
  const prev = () => goTo(nearestIndex() - 1);

  return { trackRef, active, onScroll, goTo, next, prev };
}
