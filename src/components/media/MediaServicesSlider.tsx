"use client";
import { useEffect, useRef, useState } from "react";
import MediaServiceCard from "./MediaServiceCard";
import type { ServiceCard } from "./MediaServiceCard";

/* The five service cards as a dealt deck: one card on screen at a time, the
   next one rising from below and coming to rest on top of the one it replaces,
   which stays put and dims underneath it. Every slide sits in the same grid
   cell, so the viewport is as tall as the tallest card and nothing jumps; the
   position relative to the active index (`data-state`) is what moves them, and
   stacking follows the card order so a card is always dealt over its
   predecessor — going back simply drops the top card off again.

   The page's own scroll moves the cards (no autoplay, on request), and moves
   them by exactly as much as it scrolls: the deck is pinned (`position:
   sticky`) inside a track taller than itself by one STEP per card, and over
   each STEP the next card — queued just below the deck, outside it — rises
   to rest on top — half a
   step scrolled, half the card up; stop scrolling and it stops where it is;
   scroll back and it slides back down. The page only moves on once the last
   card is fully up. The transforms are written straight to the slides each
   frame (no React re-render); `active` — the card mostly on top — only drives
   aria-hidden and inert. (The side rail of dots was removed on request.)

   What is pinned is the section heading AND the deck, so the heading doesn't
   scroll away while the cards change. Pinned top: centred in the window under
   the floating navbar when it all fits; otherwise (laptops, phones) it pins
   the moment the whole card is on screen, BOTTOM_GAP above the window's
   bottom edge, so the card stays readable. */
const NAV_ROOM = 96;
const EDGE = 16;
/* the room left under the card once it is pinned: the moment the whole card
   is on screen with this gap below it, the scroll starts dealing (on request) */
const BOTTOM_GAP = 44;
/* the space between a card and the one queued under it, while it waits */
const GAP = 24;
/* the card underneath shrinks this much once fully covered */
const COVERED_SCALE = 0.015;

/* scroll distance over which one card rises — long enough to steer it */
function stepFor(vh: number) {
  return Math.round(Math.min(640, Math.max(360, vh * 0.6)));
}

export default function MediaServicesSlider({
  cards,
  head,
}: {
  cards: ServiceCard[];
  /** the section heading, pinned together with the deck */
  head?: React.ReactNode;
}) {
  const count = cards.length;
  const [active, setActive] = useState(0);
  const [pin, setPin] = useState({ top: NAV_ROOM, step: 480, height: 0 });
  const trackRef = useRef<HTMLDivElement>(null);
  const stickRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  /* measure: where the deck pins and how long the track has to be */
  useEffect(() => {
    const stick = stickRef.current;
    if (!stick) return;
    const measure = () => {
      const vh = window.innerHeight;
      const h = stick.offsetHeight;
      /* centred under the navbar when everything fits; otherwise pinned as
         soon as the card's bottom edge is BOTTOM_GAP above the window's —
         the heading above may then be partly off the top */
      const top =
        h + NAV_ROOM + EDGE <= vh
          ? Math.max(NAV_ROOM, Math.round((vh - h) / 2 + NAV_ROOM / 2))
          : vh - h - BOTTOM_GAP;
      setPin({ top, step: stepFor(vh), height: h });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(stick);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  /* the scroll moves the cards */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const travelled = pin.top - track.getBoundingClientRect().top;
      /* 0 … count-1: how many cards are up, fractions included */
      const p = Math.max(0, Math.min(count - 1, travelled / pin.step));
      slideRefs.current.forEach((el, i) => {
        if (!el) return;
        /* cards still to come queue below, one card height + GAP apart and
           unclipped, so the next one is seen waiting under the current one
           and rises in from outside the deck (0 = on top of the stack) */
        const below = Math.max(0, i - p);
        const covered = Math.max(0, Math.min(1, p - i));
        el.style.transform =
          `translateY(calc(${below.toFixed(4)} * (100% + ${GAP}px)))` +
          ` scale(${(1 - covered * COVERED_SCALE).toFixed(4)})`;
      });
      setActive(Math.round(p));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pin, count]);

  return (
    <div
      className="sm-services-track"
      ref={trackRef}
      /* the deck's own height, one step of scrolling per card after the
         first, and a little dwell on the last one before the page moves on */
      style={
        pin.height
          ? { height: pin.height + (count - 1) * pin.step + pin.step * 0.4 }
          : undefined
      }
    >
      <div
        className="sm-services-stick"
        ref={stickRef}
        style={{ top: pin.top }}
      >
        {head}
        <div className="sm-services-body">
          <div className="sm-services-view is-scrubbed">
            {cards.map((card, i) => (
              <div
                className="sm-svc-slide"
                key={i}
                ref={(el) => {
                  slideRefs.current[i] = el;
                }}
                data-state={
                  i === active ? "current" : i < active ? "prev" : "next"
                }
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
      </div>
    </div>
  );
}
