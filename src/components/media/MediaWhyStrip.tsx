"use client";

import { useEffect, useRef } from "react";

/* The "لماذا صوت ميديا" strip. Whenever it is on screen it scrolls itself,
   in an endless loop (on request): the cards are rendered COPIES times in a
   row (the copies hidden from assistive tech), and once the drift has carried
   one whole set past, it steps back by exactly one set's width — the same
   cards are then in the same place, so the jump can't be seen. Three sets
   keep the rail long enough to wrap on the widest screens.

   It only stops while it is pressed (finger or mouse button held on it) and
   moves on the moment the press ends — no hover pause, no delay. The rail
   is not hand-scrollable either (overflow hidden, see .sm-why-strip in
   media.css) — a swipe's own momentum would fight the drift (iOS ignores
   scrollLeft writes mid-glide), so a finger on it just scrolls the page.
   Only prefers-reduced-motion keeps it still.

   Only this leaf is a Client Component; the section and its heading stay on the
   server. */

const SPEED = 0.9; // px per frame ≈ 54px/s
const TOUCH_SPEED = 0.7; // px per frame ≈ 42px/s
/** the set itself plus the repeats the loop scrolls through */
const COPIES = 3;

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

    /* The drift runs in the reading direction: through the cards from the
       start edge — right in Arabic, left in English. RTL scrollLeft runs
       0 → -max, LTR runs 0 → +max; keep the maths signless.
       The language toggle (initTranslate) flips <html dir> without remounting
       anything, so the direction is re-read whenever that attribute changes,
       and the loop starts over from the new start edge. */
    const readDir = () => (getComputedStyle(rail).direction === "rtl" ? -1 : 1);
    let dir = readDir();

    let raf = 0;
    let offset = 0;

    /* one set's width: from the first card to the first card of the next set
       (gaps included) — measured each frame, so a resize can't throw it off */
    const period = () => {
      const cards = rail.querySelectorAll<HTMLElement>(":scope > .sm-why-set > *");
      const perSet = cards.length / COPIES;
      if (!perSet || !cards[perSet]) return 0;
      return Math.abs(cards[perSet].offsetLeft - cards[0].offsetLeft);
    };

    const step = () => {
      const p = period();
      offset += speed;
      if (p > 0) offset %= p;
      rail.scrollLeft = dir * offset;
      raf = requestAnimationFrame(step);
    };

    const start = () => {
      if (raf || reduce.matches) return;
      offset = Math.abs(rail.scrollLeft);
      raf = requestAnimationFrame(step);
    };
    const stop = () => {
      if (!raf) return;
      cancelAnimationFrame(raf);
      raf = 0;
    };

    // drift while on screen and not pressed
    let visible = false;
    let pressed = false;
    const update = () => (visible && !pressed ? start() : stop());
    const onReduce = () => update();
    reduce.addEventListener("change", onReduce);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    observer.observe(rail);
    const dirWatch = new MutationObserver(() => {
      const next = readDir();
      if (next === dir) return;
      dir = next;
      offset = 0;
      rail.scrollLeft = 0;
    });
    dirWatch.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["dir", "lang"],
    });
    /* a press holds it; the release is heard on the window too, so a press
       that ends off the rail (or turns into a page scroll) still lets go */
    const press = () => {
      pressed = true;
      update();
    };
    const unpress = () => {
      if (!pressed) return;
      pressed = false;
      update();
    };
    rail.addEventListener("pointerdown", press);
    window.addEventListener("pointerup", unpress);
    window.addEventListener("pointercancel", unpress);

    return () => {
      stop();
      observer.disconnect();
      dirWatch.disconnect();
      rail.removeEventListener("pointerdown", press);
      window.removeEventListener("pointerup", unpress);
      window.removeEventListener("pointercancel", unpress);
      reduce.removeEventListener("change", onReduce);
    };
  }, []);

  return (
    <div className="sm-why-strip" ref={railRef}>
      {Array.from({ length: COPIES }, (_, copy) => (
        <div
          className="sm-why-set"
          key={copy}
          aria-hidden={copy > 0 ? true : undefined}
          inert={copy > 0 ? true : undefined}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
