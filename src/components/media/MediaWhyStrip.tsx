"use client";

import { useEffect, useRef } from "react";

/* The "لماذا صوت ميديا" strip. It stays a normal `overflow-x: auto` rail — you
   can still drag/scroll it by hand — but whenever it is on screen it scrolls
   itself towards the last card and stops there for good: no loop, no
   repeated set.

   With a mouse, hovering the rail pauses it so a card can be read; it picks up
   again from wherever it stopped (or a manual scroll left it) as the pointer
   leaves. The trigger is the rail, not the whole section, so the heading above
   it is inert; the rail (rather than each card) keeps it from stuttering as
   the pointer crosses the gaps between cards.

   Touch screens have no hover, so there the rail drifts slower, and a finger
   on it stops the drift so it can be swiped by hand. However it was swiped,
   the drift always comes back: TOUCH_RESUME ms after the rail has come to
   rest (the swipe's momentum glide included), from wherever it stopped.

   Only this leaf is a Client Component; the section and its heading stay on the
   server. */

const SPEED = 0.9; // px per frame ≈ 54px/s
const TOUCH_SPEED = 0.7; // px per frame ≈ 42px/s
/** how long the rail must sit still after a swipe before the drift resumes */
const TOUCH_RESUME = 2000;

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
    const touch = window.matchMedia("(hover: none)").matches;
    const speed = touch ? TOUCH_SPEED : SPEED;

    // RTL scrollLeft runs 0 → -max, LTR runs 0 → +max; keep the maths signless.
    const dir =
      getComputedStyle(rail).direction === "rtl" ? -1 : 1;

    let raf = 0;
    let offset = 0;
    /* the drift reached the last card — it never starts again */
    let done = false;

    const maxScroll = () => rail.scrollWidth - rail.clientWidth;

    const step = () => {
      const max = maxScroll();
      offset = Math.min(max, offset + speed);
      rail.scrollLeft = dir * offset;
      if (offset >= max) {
        done = true;
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(step);
    };

    const start = () => {
      if (raf || done || reduce.matches) return;
      // pick up wherever a manual scroll left it
      offset = Math.abs(rail.scrollLeft);
      raf = requestAnimationFrame(step);
    };
    const stop = () => {
      if (!raf) return;
      cancelAnimationFrame(raf);
      raf = 0;
    };

    // drift while on screen and not held (hovered, or a finger on it)
    let visible = false;
    let held = false;
    let resume = 0;
    const update = () => (visible && !held ? start() : stop());
    const onReduce = () => update();
    reduce.addEventListener("change", onReduce);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    observer.observe(rail);
    const hold = () => {
      window.clearTimeout(resume);
      held = true;
      update();
    };
    const release = () => {
      window.clearTimeout(resume);
      held = false;
      update();
    };
    if (!touch) {
      rail.addEventListener("pointerenter", hold);
      rail.addEventListener("pointerleave", release);
    }

    /* Touch: the finger stops the drift. Once it lifts, the swipe may still
       be gliding — every scroll the drift didn't make pushes the restart back,
       so it only resumes once the rail is at rest (iOS ignores scrollLeft
       writes mid-glide, so starting sooner would stall). The lift is heard on
       the window as well, so a touch that ends off the rail still counts. */
    let finger = false;
    let touched = false; // held by a touch, not by a hovering mouse
    const releaseLater = () => {
      window.clearTimeout(resume);
      resume = window.setTimeout(() => {
        if (finger) return;
        touched = false;
        release();
      }, TOUCH_RESUME);
    };
    const onTouchStart = () => {
      finger = true;
      touched = true;
      hold();
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (!finger || e.touches.length > 0) return;
      finger = false;
      releaseLater();
    };
    const onScroll = () => {
      // the drift's own writes land while it runs; anything else is the visitor
      if (raf || !touched || finger) return;
      releaseLater();
    };
    rail.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchEnd, { passive: true });
    rail.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      stop();
      window.clearTimeout(resume);
      observer.disconnect();
      rail.removeEventListener("pointerenter", hold);
      rail.removeEventListener("pointerleave", release);
      rail.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
      rail.removeEventListener("scroll", onScroll);
      reduce.removeEventListener("change", onReduce);
    };
  }, []);

  return (
    <div className="sm-why-strip" ref={railRef}>
      {children}
    </div>
  );
}
