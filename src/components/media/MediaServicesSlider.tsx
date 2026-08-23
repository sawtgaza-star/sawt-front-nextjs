"use client";
import { useEffect, useRef, useState } from "react";
import MediaServiceCard from "./MediaServiceCard";
import MediaServicesRail from "./MediaServicesRail";
import { MEDIA_SERVICES } from "./media-services-data";

/* The five service cards as a dealt deck: one card on screen at a time, the
   next one rising from below and coming to rest on top of the one it replaces,
   which stays put and dims underneath it. Every slide sits in the same grid
   cell, so the viewport is as tall as the tallest card and nothing jumps; the
   position relative to the active index (`data-state`) is what moves them, and
   stacking follows the card order so a card is always dealt over its
   predecessor — going back simply drops the top card off again.

   The deck can be dragged with the mouse: the distance is published as
   `--sm-drag-up` / `--sm-drag-down` and the one card that moves in that
   direction follows it live (transition off), then snaps on release. Touch
   pointers are left alone so a finger on the card still scrolls the page.

   Autoplay stops while the pointer/focus is on the section, while dragging,
   while the section is off-screen, and under prefers-reduced-motion. */
const INTERVAL = 3000;
/* how far a drag must travel to count as a page turn, and as a real drag */
const SNAP = 70;
const SLOP = 6;

export default function MediaServicesSlider() {
  const count = MEDIA_SERVICES.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [dir, setDir] = useState<"up" | "down" | null>(null);
  const viewRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const moved = useRef(false);

  useEffect(() => {
    const el = viewRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {
      threshold: 0.35,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (paused || dragging || !visible) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(
      () => setActive((i) => (i + 1) % count),
      INTERVAL
    );
    return () => window.clearInterval(id);
  }, [paused, dragging, visible, count]);

  /* dragging up pulls the next card in, dragging down pushes the top one off */
  const setOffset = (dy: number) => {
    const el = viewRef.current;
    if (!el) return;
    el.style.setProperty("--sm-drag-up", (dy < 0 ? dy : 0) + "px");
    el.style.setProperty("--sm-drag-down", (dy > 0 ? dy : 0) + "px");
    setDir(dy < 0 ? "up" : dy > 0 ? "down" : null);
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch" || e.button !== 0) return;
    startY.current = e.clientY;
    moved.current = false;
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    let dy = e.clientY - startY.current;
    if (Math.abs(dy) > SLOP) moved.current = true;
    /* nothing to deal past the ends — let the deck resist instead */
    if ((active === 0 && dy > 0) || (active === count - 1 && dy < 0)) dy /= 3.5;
    setOffset(dy);
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    const dy = e.clientY - startY.current;
    setDragging(false);
    setOffset(0);
    if (dy <= -SNAP) setActive((i) => Math.min(count - 1, i + 1));
    else if (dy >= SNAP) setActive((i) => Math.max(0, i - 1));
  };

  /* a drag that ended on a link/button must not also trigger it */
  const onClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    if (moved.current) {
      e.preventDefault();
      e.stopPropagation();
      moved.current = false;
    }
  };

  return (
    <div
      className="sm-services-body"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <MediaServicesRail active={active} onSelect={setActive} />

      <div
        className={
          "sm-services-view" +
          (dragging ? " is-dragging" : "") +
          (dragging && dir ? " is-drag-" + dir : "")
        }
        ref={viewRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
      >
        {MEDIA_SERVICES.map((s, i) => (
          <div
            className="sm-svc-slide"
            key={s.key}
            data-state={i === active ? "current" : i < active ? "prev" : "next"}
            data-adj={Math.abs(i - active) === 1 ? "1" : undefined}
            /* later cards stack over earlier ones: that is the deal order */
            style={{ zIndex: i + 1 }}
            aria-hidden={i === active ? undefined : true}
            inert={i === active ? undefined : true}
          >
            <MediaServiceCard service={s} reverse={i % 2 === 1} />
          </div>
        ))}
      </div>
    </div>
  );
}
