"use client";
import { useCallback, useEffect, useRef } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";

const SLOP = 6; // px of downward movement before the drag is armed
const DISMISS_PX = 90; // drag further than this and the sheet goes
const VELOCITY = 0.5; // px/ms — a quick flick dismisses at any distance
const OUT_MS = 180; // keep in sync with the exit transition below

/* Drag-down-to-dismiss for the reel sheets (comments / share), matching the
   swipe the viewer itself has. The sheet follows the finger and is closed once
   the gesture passes the threshold, otherwise it springs back.

   The gesture is ignored when it starts on the comment list (which scrolls on
   its own) or on a control, so only the head, the grip and the sheet's own
   padding drag it. */
export function useSheetDismiss(onClose: () => void) {
  const sheetRef = useRef<HTMLDivElement | null>(null);
  const drag = useRef<{ y: number; t: number; id: number; armed: boolean } | null>(
    null,
  );
  const timer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timer.current) window.clearTimeout(timer.current);
    },
    [],
  );

  const setOffset = useCallback((px: number, animate = false) => {
    const el = sheetRef.current;
    if (!el) return;
    el.style.transition = animate ? `transform ${OUT_MS}ms ease` : "none";
    el.style.transform = px ? `translateY(${px}px)` : "";
  }, []);

  const onPointerDown = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement | null;
    if (target?.closest(".cr-reel-comment-list, input, button, a")) return;
    drag.current = {
      y: e.clientY,
      t: Date.now(),
      id: e.pointerId,
      armed: false,
    };
  }, []);

  const onPointerMove = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      const d = drag.current;
      if (!d || d.id !== e.pointerId) return;
      const dy = e.clientY - d.y;
      if (!d.armed) {
        if (dy < SLOP) return; // only a downward drag arms it
        d.armed = true;
        try {
          e.currentTarget.setPointerCapture(e.pointerId);
        } catch {
          /* the pointer is already gone — nothing to capture */
        }
      }
      setOffset(Math.max(0, dy));
    },
    [setOffset],
  );

  const onPointerUp = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      const d = drag.current;
      if (!d || d.id !== e.pointerId) return;
      drag.current = null;
      if (!d.armed) return;

      const dy = e.clientY - d.y;
      const dt = Math.max(1, Date.now() - d.t);
      if (dy > DISMISS_PX || dy / dt > VELOCITY) {
        // ride the rest of the way out, then unmount
        const height = sheetRef.current?.getBoundingClientRect().height ?? 400;
        setOffset(height, true);
        timer.current = window.setTimeout(onClose, OUT_MS);
      } else {
        setOffset(0, true);
      }
    },
    [onClose, setOffset],
  );

  const onPointerCancel = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      const d = drag.current;
      if (!d || d.id !== e.pointerId) return;
      drag.current = null;
      if (d.armed) setOffset(0, true);
    },
    [setOffset],
  );

  return {
    sheetRef,
    dismissHandlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel,
    },
  };
}
