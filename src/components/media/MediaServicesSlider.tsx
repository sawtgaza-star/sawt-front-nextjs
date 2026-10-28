"use client";
import { useEffect, useRef, useState } from "react";
import MediaServiceCard from "./MediaServiceCard";
import MediaServicesRail from "./MediaServicesRail";
import type { ServiceCard } from "./MediaServiceCard";

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

   Autoplay runs as soon as the section is on screen; it stops while a mouse
   button or a finger is held down on the deck (hovering alone doesn't), while
   something in it has keyboard focus, while dragging, while the section is
   off-screen, and under prefers-reduced-motion. It moves on again once the
   button/finger lifts. Each card is held for INTERVAL on a wide screen; on a
   phone the first one turns quickly (PHONE_FIRST) and every later one is held
   for PHONE_INTERVAL, long enough to read on a small screen. A stop doesn't
   reset the card's time: it picks up where it left off, and so does the
   rail's fill. */
const INTERVAL = 3000;
const PHONE_FIRST = 3000;
const PHONE_INTERVAL = 7000;
const PHONE_MEDIA = "(max-width: 767.98px)";
/* how far a drag must travel to count as a page turn, and as a real drag */
const SNAP = 70;
const SLOP = 6;

export default function MediaServicesSlider({ cards }: { cards: ServiceCard[] }) {
  const count = cards.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [dragging, setDragging] = useState(false);
  /* a mouse button or a finger held down on the deck */
  const [held, setHeld] = useState(false);
  const [dir, setDir] = useState<"up" | "down" | null>(null);
  /* the countdown to the next card, for the rail's filling tick: a fresh `key`
     per card, so the fill starts over only when the card changes; `running`
     false freezes it mid-way while autoplay is stopped */
  const [countdown, setCountdown] = useState<{
    key: number;
    ms: number;
    running: boolean;
  } | null>(null);
  /* how long the current card has already been on its timer, across stops */
  const spent = useRef({ card: -1, ms: 0, key: 0 });
  const viewRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ id: number; y: number; moved: boolean } | null>(null);
  const swallowClick = useRef(false);

  /* A mouse button can be let go anywhere — off the deck, or after a click
     that never captured the pointer — so the hold is released from window. */
  useEffect(() => {
    if (!held) return;
    const release = () => setHeld(false);
    window.addEventListener("pointerup", release);
    window.addEventListener("pointercancel", release);
    return () => {
      window.removeEventListener("pointerup", release);
      window.removeEventListener("pointercancel", release);
    };
  }, [held]);

  useEffect(() => {
    const el = viewRef.current;
    if (!el) return;
    /* A single high threshold never fires when the deck is taller than the
       window — its ratio can't reach 0.35 — and the section then sat still
       forever. So: a third of the deck on screen, OR the deck filling a third
       of the window, whichever comes first. The threshold list is only there to
       get callbacks as it scrolls through. */
    const io = new IntersectionObserver(
      ([e]) => {
        const covers = e.intersectionRect.height >= window.innerHeight * 0.33;
        setVisible(e.isIntersecting && (e.intersectionRatio >= 0.33 || covers));
      },
      { threshold: [0, 0.15, 0.33, 0.6, 1] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCountdown(null);
      return;
    }
    const s = spent.current;
    if (s.card !== active) spent.current = { card: active, ms: 0, key: s.key + 1 };
    const { key } = spent.current;
    const phone = window.matchMedia(PHONE_MEDIA).matches;
    const ms = !phone ? INTERVAL : active > 0 ? PHONE_INTERVAL : PHONE_FIRST;
    if (paused || held || dragging || !visible) {
      /* freeze the fill where it is (none yet before the first run) */
      setCountdown((c) => (c ? { key, ms, running: false } : null));
      return;
    }
    setCountdown({ key, ms, running: true });
    const start = Date.now();
    const id = window.setTimeout(
      () => setActive((i) => (i + 1) % count),
      Math.max(0, ms - spent.current.ms)
    );
    return () => {
      window.clearTimeout(id);
      if (spent.current.card === active) spent.current.ms += Date.now() - start;
    };
  }, [paused, held, dragging, visible, count, active]);

  /* dragging up pulls the next card in, dragging down pushes the top one off */
  const setOffset = (dy: number) => {
    const el = viewRef.current;
    if (!el) return;
    el.style.setProperty("--sm-drag-up", (dy < 0 ? dy : 0) + "px");
    el.style.setProperty("--sm-drag-down", (dy > 0 ? dy : 0) + "px");
    setDir(dy < 0 ? "up" : dy > 0 ? "down" : null);
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") {
      setHeld(true);
      return;
    }
    if (e.button !== 0) return;
    setHeld(true);
    swallowClick.current = false;
    drag.current = { id: e.pointerId, y: e.clientY, moved: false };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || e.pointerId !== d.id) return;
    let dy = e.clientY - d.y;
    /* a few pixels of slack, so a plain click on the card's CTA is still a
       click: the pointer is captured only once the drag is committed, because
       capturing retargets the click and the link under it would never fire */
    if (!d.moved && Math.abs(dy) < SLOP) return;
    if (!d.moved) {
      d.moved = true;
      setDragging(true);
      e.currentTarget.setPointerCapture(d.id);
    }
    /* nothing to deal past the ends — let the deck resist instead */
    if ((active === 0 && dy > 0) || (active === count - 1 && dy < 0)) dy /= 3.5;
    setOffset(dy);
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    /* the finger lifted (or the browser took it over to scroll the page) */
    if (e.pointerType === "touch") setHeld(false);
    const d = drag.current;
    if (!d || e.pointerId !== d.id) return;
    drag.current = null;
    if (!d.moved) return;
    /* a drag that actually moved swallows the click it ends on */
    swallowClick.current = true;
    if (e.currentTarget.hasPointerCapture(d.id))
      e.currentTarget.releasePointerCapture(d.id);
    const dy = e.clientY - d.y;
    setDragging(false);
    setOffset(0);
    if (dy <= -SNAP) setActive((i) => Math.min(count - 1, i + 1));
    else if (dy >= SNAP) setActive((i) => Math.max(0, i - 1));
  };

  /* Only keyboard focus pauses: a mouse click focuses the rail's buttons and
     the card's CTA too, and that would leave the deck stopped until the user
     happened to click somewhere else. */
  const onFocus = (e: React.FocusEvent<HTMLDivElement>) => {
    if (e.target.matches(":focus-visible")) setPaused(true);
  };

  /* a drag that ended on a link/button must not also trigger it */
  const onClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!swallowClick.current) return;
    swallowClick.current = false;
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div
      className="sm-services-body"
      onFocusCapture={onFocus}
      onBlurCapture={() => setPaused(false)}
    >
      <MediaServicesRail
        titles={cards.map((card) => card.title)}
        active={active}
        countdown={countdown}
        onSelect={setActive}
      />

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
        {cards.map((card, i) => (
          <div
            className="sm-svc-slide"
            key={i}
            data-state={i === active ? "current" : i < active ? "prev" : "next"}
            data-adj={Math.abs(i - active) === 1 ? "1" : undefined}
            /* later cards stack over earlier ones: that is the deal order */
            style={{ zIndex: i + 1 }}
            aria-hidden={i === active ? undefined : true}
            inert={i === active ? undefined : true}
          >
            <MediaServiceCard service={card} reverse={i % 2 === 1} />
          </div>
        ))}
      </div>
    </div>
  );
}
