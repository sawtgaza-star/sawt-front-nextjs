"use client";
import { useEffect, type RefObject } from "react";

/* Press-and-drag to scroll a reel row sideways; the content follows the
   pointer. The wheel is left alone so it keeps scrolling the page. Shared by
   محتوانا's "الأكثر مشاهدة" row and a creator's "المحتوى" row, which are the
   same slider. `deps` re-binds when the track element itself is replaced. */
export function useDragScroll(
  trackRef: RefObject<HTMLElement | null>,
  deps: unknown[] = [],
) {
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    let dragging = false;
    let moved = false;
    let startX = 0;
    let startScroll = 0;

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      dragging = true;
      moved = false;
      startX = e.clientX;
      startScroll = el.scrollLeft;
      // the CSS smooth scrolling the row relies on would lag the drag
      el.style.scrollBehavior = "auto";
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      if (!moved && Math.abs(dx) > 4) {
        moved = true; // ignore click jitter
        /* Captured here and not on pointerdown: capturing the pointer also
           retargets the mouse events derived from it, so the click that ends a
           plain press landed on the track instead of the card's play button and
           nothing played. By the time the pointer has travelled 4px this is a
           drag, and a drag has no click to lose. */
        el.setPointerCapture(e.pointerId);
      }
      if (moved) el.scrollLeft = startScroll - dx;
    };

    const endDrag = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      el.style.scrollBehavior = "";
      if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
    };

    // a drag that ends on a card must not also fire its play button
    const onClickCapture = (e: MouseEvent) => {
      if (!moved) return;
      moved = false;
      e.preventDefault();
      e.stopPropagation();
    };

    // stop the browser's native image-drag from hijacking the gesture
    const onDragStart = (e: Event) => e.preventDefault();

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", endDrag);
    el.addEventListener("pointercancel", endDrag);
    el.addEventListener("click", onClickCapture, true);
    el.addEventListener("dragstart", onDragStart);
    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", endDrag);
      el.removeEventListener("pointercancel", endDrag);
      el.removeEventListener("click", onClickCapture, true);
      el.removeEventListener("dragstart", onDragStart);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
