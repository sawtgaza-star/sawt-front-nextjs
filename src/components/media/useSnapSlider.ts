"use client";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type React from "react";

/* the parking below has to happen before the browser paints, or the track is
   first seen at its own start and then snaps sideways; on the server there is
   no layout to read, so it falls back to the plain effect */
const useBeforePaint = typeof window === "undefined" ? useEffect : useLayoutEffect;

/* Shared plumbing for the two arrow+dots carousels on /media (packages and
   testimonials): a scroll-snap track paged one slide at a time.

   The stops are measured from the slides themselves rather than assumed, and
   that is the whole point: the packages track shows three cards at desktop
   width, so five packages give only three resting positions — a dot per card
   would leave two dots that can never light up. Slides that clamp to the same
   offset therefore collapse into one stop, and the pager renders a dot per
   stop. On a one-card-wide track (testimonials, or either track on mobile)
   every slide is its own stop, so nothing changes there.

   Positions stay in raw `scrollLeft` space, which is 0 → max in an LTR track
   and 0 → -max in an RTL one; measuring the offset each slide needs to reach
   the middle keeps both cases on the same code path. */
type Stop = { slide: number; at: number };

/* A track whose slides can never share a stop (one full-width slide at a time)
   can say so, and then its dots are already in the server-rendered markup
   instead of appearing when the first measurement lands. */
const guessStops = (count: number, stopPerSlide: boolean): Stop[] =>
  stopPerSlide
    ? Array.from({ length: count }, (_, slide) => ({ slide, at: 0 }))
    : [];

export function useSnapSlider(
  count: number,
  initialSlide = 0,
  stopPerSlide = false
) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [stops, setStops] = useState<Stop[]>(() =>
    guessStops(count, stopPerSlide)
  );
  const [active, setActive] = useState(stopPerSlide ? initialSlide : 0);
  const placed = useRef(false);
  /* the scroll handler is bound once per render but has to read the stops as
     they are now — the first scroll happens during the very measurement that
     produces them, and a stale [] there would leave the highlight on the
     opening card while the track sits somewhere else */
  const stopsRef = useRef<Stop[]>([]);

  const measure = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const rtl = getComputedStyle(el).direction === "rtl";
    const mid = el.getBoundingClientRect().left + el.clientWidth / 2;

    const seen = new Set<number>();
    const next: Stop[] = [];
    for (let i = 0; i < count; i++) {
      const child = el.children[i] as HTMLElement | undefined;
      if (!child) continue;
      const rect = child.getBoundingClientRect();
      const raw = el.scrollLeft + (rect.left + rect.width / 2 - mid);
      const at = Math.round(
        rtl ? Math.min(0, Math.max(-max, raw)) : Math.max(0, Math.min(max, raw))
      );
      if (seen.has(at)) continue;
      seen.add(at);
      next.push({ slide: i, at });
    }
    stopsRef.current = next;
    setStops(next);

    /* Park the track on its opening slide once, before anyone has scrolled
       past the section: a track left at its own start shows the first card
       hard against the edge, while the design opens on a centred card with a
       neighbour either side. Instant, not smooth — this is the resting state
       the section is first seen in, not a movement. */
    if (!placed.current && next.length > 1) {
      placed.current = true;
      const i = Math.max(
        0,
        next.findIndex((s) => s.slide === initialSlide)
      );
      if (next[i].at !== el.scrollLeft) el.scrollLeft = next[i].at;
      setActive(i);
    }
  }, [count, initialSlide]);

  useBeforePaint(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  /* which stop the track is resting nearest right now */
  const nearestStop = useCallback(() => {
    const el = trackRef.current;
    const list = stopsRef.current;
    if (!el || list.length < 2) return 0;
    let best = 0;
    for (let i = 1; i < list.length; i++) {
      if (
        Math.abs(list[i].at - el.scrollLeft) <
        Math.abs(list[best].at - el.scrollLeft)
      ) {
        best = i;
      }
    }
    return best;
  }, []);

  const onScroll = () => setActive(nearestStop());

  const goTo = (i: number) => {
    const el = trackRef.current;
    const list = stopsRef.current;
    if (!el || list.length < 2) return;
    const stop = list[Math.max(0, Math.min(list.length - 1, i))];
    el.scrollTo({ left: stop.at, behavior: "smooth" });
  };

  /* "next" always means the arrow that advances the list, in either direction */
  const next = () => goTo(nearestStop() + 1);
  const prev = () => goTo(nearestStop() - 1);

  /* ---- drag to scroll ----
     A mouse has no fling of its own, so the track is dragged by hand: snapping
     is switched off for the duration (it fights a live drag) and the release
     lands on the nearest stop, the same one the arrows would reach. Touch is
     left alone — the browser's own panning is better than anything done here.
     A drag that actually moved swallows the click it ends on, so releasing
     over a card's CTA doesn't follow the link. */
  const drag = useRef<{ id: number; x: number; from: number; moved: boolean } | null>(
    null
  );
  const swallowClick = useRef(false);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!el || e.pointerType === "touch" || e.button !== 0) return;
    swallowClick.current = false;
    drag.current = { id: e.pointerId, x: e.clientX, from: el.scrollLeft, moved: false };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    const d = drag.current;
    if (!el || !d || e.pointerId !== d.id) return;
    const dx = e.clientX - d.x;
    /* a few pixels of slack, so a plain click on a card is still a click */
    if (!d.moved && Math.abs(dx) < 5) return;
    if (!d.moved) {
      d.moved = true;
      el.setPointerCapture(d.id);
      el.style.scrollSnapType = "none";
      el.classList.add("is-dragging");
    }
    el.scrollLeft = d.from - dx;
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    const d = drag.current;
    if (!el || !d || e.pointerId !== d.id) return;
    drag.current = null;
    if (!d.moved) return;
    swallowClick.current = true;
    if (el.hasPointerCapture(d.id)) el.releasePointerCapture(d.id);
    el.classList.remove("is-dragging");
    el.style.removeProperty("scroll-snap-type");
    goTo(nearestStop());
  };

  const onClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!swallowClick.current) return;
    swallowClick.current = false;
    e.preventDefault();
    e.stopPropagation();
  };

  const dragProps = {
    onPointerDown,
    onPointerMove,
    onPointerUp: endDrag,
    onPointerCancel: endDrag,
    onClickCapture,
  };

  /* which slide the current stop centres — the testimonials cards highlight
     themselves off this, while the pagers work in stops. Before the first
     measurement it answers with the opening slide, so the track is painted
     with that slide already at full size instead of growing into it. */
  const activeSlide = stops[active]?.slide ?? initialSlide;

  return {
    trackRef,
    stops,
    active,
    activeSlide,
    onScroll,
    goTo,
    next,
    prev,
    dragProps,
  };
}
