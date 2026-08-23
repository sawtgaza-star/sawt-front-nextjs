"use client";

import { useEffect, useRef } from "react";

/* The "لماذا صوت ميديا" strip. It stays a normal `overflow-x: auto` rail — you
   can still drag/scroll it by hand — but while the pointer is over the cards it
   scrolls itself, looping seamlessly because MediaWhy renders the cards twice.

   The trigger is the rail, not the whole section, so the heading above it is
   inert; the rail (rather than each card) keeps the motion from stuttering as
   the pointer crosses the gaps between cards.

   Only this leaf is a Client Component; the section and its heading stay on the
   server. */

const SPEED = 1.8; // px per frame ≈ 108px/s

export default function MediaWhyStrip({
  children,
}: {
  children: React.ReactNode;
}) {
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    // RTL scrollLeft runs 0 → -max, LTR runs 0 → +max; keep the maths signless.
    const dir =
      getComputedStyle(rail).direction === "rtl" ? -1 : 1;

    let raf = 0;
    let offset = 0;

    /* One loop = the distance from a card to its clone, i.e. the width of one
       full set. Measured from layout so the rail's own padding never skews it. */
    const loopWidth = () => {
      const cards = rail.querySelectorAll<HTMLElement>(".sm-why-card");
      if (cards.length < 2) return 0;
      const clone = cards[cards.length / 2];
      return clone ? Math.abs(clone.offsetLeft - cards[0].offsetLeft) : 0;
    };

    const step = () => {
      const loop = loopWidth();
      if (loop > 0) {
        offset += SPEED;
        if (offset >= loop) offset -= loop;
        rail.scrollLeft = dir * offset;
      }
      raf = requestAnimationFrame(step);
    };

    const start = () => {
      if (raf || reduce.matches) return;
      offset = Math.abs(rail.scrollLeft); // pick up wherever a manual scroll left it
      raf = requestAnimationFrame(step);
    };
    const stop = () => {
      if (!raf) return;
      cancelAnimationFrame(raf);
      raf = 0;
    };

    rail.addEventListener("pointerenter", start);
    rail.addEventListener("pointerleave", stop);
    reduce.addEventListener("change", stop);

    return () => {
      stop();
      rail.removeEventListener("pointerenter", start);
      rail.removeEventListener("pointerleave", stop);
      reduce.removeEventListener("change", stop);
    };
  }, []);

  return (
    <div className="sm-why-strip" ref={railRef}>
      {children}
    </div>
  );
}
