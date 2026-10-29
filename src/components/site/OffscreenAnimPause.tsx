"use client";
/* Pauses a page block's CSS animations while it is off screen (see
   mobile-scroll.css). Every <section>, <header> and <footer> is watched; the
   pages fill in from the API after the first paint, so blocks are picked up
   as they appear. Rendered once, from the root layout. */

import { useEffect } from "react";

const BLOCKS = "section, header, footer";
const ATTR = "data-anim-off";
/** start a block's animations a little before it scrolls into view */
const MARGIN = "150px 0px";

export default function OffscreenAnimPause() {
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) entry.target.toggleAttribute(ATTR, !entry.isIntersecting);
      },
      { rootMargin: MARGIN }
    );
    const watched = new WeakSet<Element>();
    const claim = () => {
      document.querySelectorAll(BLOCKS).forEach((el) => {
        if (watched.has(el)) return;
        watched.add(el);
        io.observe(el);
      });
    };
    claim();

    // coalesced to one pass per frame, like initCounters (scroll-effects.ts)
    let pending = 0;
    const mo = new MutationObserver(() => {
      if (pending) return;
      pending = window.requestAnimationFrame(() => {
        pending = 0;
        claim();
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      if (pending) window.cancelAnimationFrame(pending);
      io.disconnect();
      document.querySelectorAll(`[${ATTR}]`).forEach((el) => el.removeAttribute(ATTR));
    };
  }, []);

  return null;
}
