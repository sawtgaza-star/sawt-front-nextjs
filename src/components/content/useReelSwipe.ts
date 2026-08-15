"use client";
import { useCallback, useEffect, useRef } from "react";
import { flushSync } from "react-dom";
import type { PointerEvent as ReactPointerEvent, MouseEvent as ReactMouseEvent } from "react";

const LOCK_SLOP = 8; // px of movement before the gesture commits to an axis
const DISTANCE_RATIO = 0.18; // share of the reel height that counts as a swipe
const VELOCITY = 0.5; // px/ms — a quick flick counts even if it is short
const SLIDE_MS = 260; // keep in sync with the transition in content.css
const CLICK_GUARD_MS = 350; // clicks fired right after a drag are swallowed
const RUBBER = 0.28; // resistance when there is no reel in that direction

type Drag = {
  x: number;
  y: number;
  t: number;
  axis: "x" | "y" | null;
  pointerId: number;
};

type Options = {
  index: number;
  count: number;
  onNavigate: (index: number) => void;
};

/* Reels-style vertical navigation for the full-screen viewer: the reel follows
   the finger, and a swipe past the threshold (or a quick flick) slides it out
   while the neighbour slides in — up = next reel, down = previous.
   The drag offset is published as the `--ct-swipe` custom property on the
   viewer layer, so the shared ReelModal markup stays untouched and content.css
   owns the actual transform. Touch/pen only: a mouse keeps the side arrows. */
export function useReelSwipe({ index, count, onNavigate }: Options) {
  const layerRef = useRef<HTMLDivElement | null>(null);
  const drag = useRef<Drag | null>(null);
  const sliding = useRef(false);
  const lastDragEnd = useRef(0);
  const timers = useRef<number[]>([]);

  useEffect(
    () => () => {
      timers.current.forEach((id) => window.clearTimeout(id));
      timers.current = [];
    },
    [],
  );

  const after = useCallback((ms: number, fn: () => void) => {
    timers.current.push(window.setTimeout(fn, ms));
  }, []);

  const setOffset = useCallback((px: number) => {
    layerRef.current?.style.setProperty("--ct-swipe", `${px}px`);
  }, []);

  const setAnim = useCallback((on: boolean) => {
    const el = layerRef.current;
    if (!el) return;
    if (on) el.setAttribute("data-swipe-anim", "1");
    else el.removeAttribute("data-swipe-anim");
  }, []);

  const reelHeight = useCallback(() => {
    const el = layerRef.current?.querySelector<HTMLElement>(".cr-reel");
    return el?.getBoundingClientRect().height || window.innerHeight;
  }, []);

  /* snap back to centre — the swipe did not travel far or fast enough */
  const settle = useCallback(() => {
    setAnim(true);
    setOffset(0);
    after(SLIDE_MS, () => setAnim(false));
  }, [after, setAnim, setOffset]);

  /* is the neighbour the swipe is heading for actually on screen? it is only
     rendered as a stacked pane on the mobile (full-bleed) layout — the centred
     card layouts hide it */
  const hasStackedNeighbour = useCallback((dir: 1 | -1) => {
    const el = layerRef.current?.querySelector<HTMLElement>(
      dir === 1 ? ".ct-reel-peek-next" : ".ct-reel-peek-prev",
    );
    return !!el && getComputedStyle(el).display !== "none";
  }, []);

  /* slide the current reel out and swap the index under the neighbour that
     took its place */
  const slideTo = useCallback(
    (target: number, dir: 1 | -1) => {
      sliding.current = true;
      // one full reel is exactly where the stacked neighbour sits (mobile); on
      // a wider screen the reel is a centred card, so a whole viewport is what
      // it takes to push it off
      const travel = Math.max(reelHeight(), window.innerHeight);
      // with the stack up, the pane sliding into the centre IS the arrival —
      // the index swap has to land silently underneath it. Ride the incoming
      // reel in from the far side only where there is no pane to hand over to,
      // otherwise the gesture reads as two steps: neighbour in, then reel in.
      const handoff = hasStackedNeighbour(dir);
      setAnim(true);
      setOffset(dir === 1 ? -travel : travel);
      after(SLIDE_MS, () => {
        if (handoff) {
          // committed synchronously so the swap and the offset reset land in
          // the same frame — the outgoing reel must never paint back at centre
          flushSync(() => onNavigate(target));
          setAnim(false);
          setOffset(0);
          sliding.current = false;
          return;
        }
        onNavigate(target);
        // drop the incoming reel on the opposite side with no transition…
        setAnim(false);
        setOffset(dir === 1 ? travel : -travel);
        // …then let it ride back to centre once the browser has painted it
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            setAnim(true);
            setOffset(0);
            after(SLIDE_MS, () => {
              setAnim(false);
              sliding.current = false;
            });
          }),
        );
      });
    },
    [after, hasStackedNeighbour, onNavigate, reelHeight, setAnim, setOffset],
  );

  const onPointerDown = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" || sliding.current) return;
    const target = e.target as HTMLElement | null;
    // only the reel itself drags — the backdrop still closes the viewer, the
    // scrubber owns its own pointer gesture, and the comment / share sheets
    // must be free to scroll without flicking to the next reel
    if (
      !target?.closest(".cr-reel") ||
      target.closest(".cr-reel-progress") ||
      target.closest(".cr-reel-panel")
    )
      return;
    drag.current = {
      x: e.clientX,
      y: e.clientY,
      t: Date.now(),
      axis: null,
      pointerId: e.pointerId,
    };
  }, []);

  const onPointerMove = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      const d = drag.current;
      if (!d || d.pointerId !== e.pointerId) return;
      const dy = e.clientY - d.y;
      const dx = e.clientX - d.x;

      if (d.axis === null) {
        if (Math.abs(dx) < LOCK_SLOP && Math.abs(dy) < LOCK_SLOP) return;
        d.axis = Math.abs(dy) > Math.abs(dx) ? "y" : "x";
        if (d.axis !== "y") return;
        setAnim(false);
        // captured only once the drag is committed, so a plain tap still
        // reaches the button underneath it
        try {
          e.currentTarget.setPointerCapture(e.pointerId);
        } catch {
          /* the pointer is already gone — nothing to capture */
        }
      }
      if (d.axis !== "y") return;

      const atEnd = (dy < 0 && index >= count - 1) || (dy > 0 && index <= 0);
      setOffset(atEnd ? dy * RUBBER : dy);
    },
    [count, index, setAnim, setOffset],
  );

  const onPointerUp = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      const d = drag.current;
      if (!d || d.pointerId !== e.pointerId) return;
      drag.current = null;
      if (d.axis !== "y") return;

      lastDragEnd.current = Date.now();
      const dy = e.clientY - d.y;
      const dt = Math.max(1, Date.now() - d.t);
      const dir: 1 | -1 = dy < 0 ? 1 : -1; // swipe up reveals the next reel
      const target = index + dir;
      const far = Math.abs(dy) > reelHeight() * DISTANCE_RATIO;
      const flick = Math.abs(dy) / dt > VELOCITY && Math.abs(dy) > LOCK_SLOP * 3;

      if ((far || flick) && target >= 0 && target < count) slideTo(target, dir);
      else settle();
    },
    [count, index, reelHeight, settle, slideTo],
  );

  const onPointerCancel = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      const d = drag.current;
      if (!d || d.pointerId !== e.pointerId) return;
      drag.current = null;
      if (d.axis === "y") {
        lastDragEnd.current = Date.now();
        settle();
      }
    },
    [settle],
  );

  /* a drag that ends over a control must not also fire that control */
  const onClickCapture = useCallback((e: ReactMouseEvent<HTMLDivElement>) => {
    if (Date.now() - lastDragEnd.current < CLICK_GUARD_MS) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, []);

  return {
    layerRef,
    swipeHandlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel,
      onClickCapture,
    },
  };
}
