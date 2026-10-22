"use client";
/* Back / forward brings the visitor back to exactly where they were on the
   page — the news list they clicked a story in, the grid they opened a reel
   from — instead of the top. Rendered once, from the root layout.

   The browser's own restoration can't do it here: most internal links are
   plain <a> (full reloads, see CLAUDE.md "CSS groups"), and every page paints
   skeletons first and fills in from the API, so when the browser restores the
   position the page is still too short to hold it and the visitor lands near
   the top. So restoration is taken over (`scrollRestoration = "manual"`):

   - Save: the position is kept per URL in sessionStorage as the page scrolls,
     and pinned the moment a link is clicked — the outgoing page shrinking or
     being swapped must not overwrite it with a clamped value.
   - Restore: on a back/forward (or reload) arrival — a full page load, or a
     client-side popstate — the saved position is applied again and again as
     the content grows in, until the page is done loading (no skeleton left
     with aria-busy) and has held still at it for a moment.
   - It gives up at once if the visitor scrolls, taps, clicks or presses a
     key, so it never fights them; and after MAX_WAIT regardless.

   A back/forward served from the bfcache keeps its own position untouched,
   and a URL with a #hash is left to the browser. */

import { useEffect } from "react";

const PREFIX = "sawt-scroll:";
/** longest the restore keeps chasing the target while content loads */
const MAX_WAIT = 8000;
/** how long the page must hold still at the target before it counts as done */
const SETTLE = 400;
/** after a link click, scroll events are not saved for this long */
const PIN = 1500;

const keyOf = () => PREFIX + window.location.pathname + window.location.search;

function readSaved(key: string): number | null {
  try {
    const raw = window.sessionStorage.getItem(key);
    return raw === null ? null : Number(raw) || 0;
  } catch {
    return null;
  }
}

function writeSaved(key: string, y: number) {
  try {
    window.sessionStorage.setItem(key, String(Math.round(y)));
  } catch {
    // private mode / storage full — restoration simply won't happen
  }
}

export default function ScrollRestorer() {
  useEffect(() => {
    if (!("scrollRestoration" in window.history)) return;
    window.history.scrollRestoration = "manual";

    let pinnedUntil = 0;
    let saveFrame = 0;
    let restoring = false;
    let stopRestore = () => {};

    const onScroll = () => {
      if (restoring || saveFrame || performance.now() < pinnedUntil) return;
      saveFrame = window.requestAnimationFrame(() => {
        saveFrame = 0;
        if (!restoring && performance.now() >= pinnedUntil) writeSaved(keyOf(), window.scrollY);
      });
    };

    // a click on a link: pin this page's position before anything moves
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]");
      if (!a) return;
      stopRestore();
      writeSaved(keyOf(), window.scrollY);
      pinnedUntil = performance.now() + PIN;
    };

    // leaving the page any other way (reload, typed URL, a script redirect)
    const onPageHide = () => {
      if (!restoring && performance.now() >= pinnedUntil) writeSaved(keyOf(), window.scrollY);
    };

    const restore = (target: number) => {
      stopRestore();
      if (target <= 0) {
        window.scrollTo(0, 0);
        return;
      }
      restoring = true;
      const started = performance.now();
      let heldSince = 0;
      let frame = 0;

      const stop = () => {
        if (!restoring) return;
        restoring = false;
        window.cancelAnimationFrame(frame);
        INPUTS.forEach((type) => window.removeEventListener(type, stop, true));
        stopRestore = () => {};
        writeSaved(keyOf(), window.scrollY);
      };
      stopRestore = stop;

      const tick = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const want = Math.min(target, Math.max(0, max));
        if (Math.abs(window.scrollY - want) > 1) {
          window.scrollTo(0, want);
          heldSince = 0;
        }
        const loaded = !document.querySelector('[aria-busy="true"]');
        const reached = max >= target - 1;
        if (reached && loaded) {
          heldSince ||= performance.now();
          if (performance.now() - heldSince >= SETTLE) return stop();
        } else {
          heldSince = 0;
        }
        if (performance.now() - started >= MAX_WAIT) return stop();
        frame = window.requestAnimationFrame(tick);
      };

      INPUTS.forEach((type) =>
        window.addEventListener(type, stop, { capture: true, passive: true })
      );
      frame = window.requestAnimationFrame(tick);
    };

    // a client-side back / forward (Next's <Link> history)
    const onPopState = () => {
      if (window.location.hash) return;
      restore(readSaved(keyOf()) ?? 0);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", onClick, true);
    window.addEventListener("pagehide", onPageHide);
    window.addEventListener("popstate", onPopState);

    // a full page load that is a back / forward or a reload
    const nav = performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;
    if ((nav?.type === "back_forward" || nav?.type === "reload") && !window.location.hash) {
      const saved = readSaved(keyOf());
      if (saved) restore(saved);
    }

    return () => {
      stopRestore();
      window.cancelAnimationFrame(saveFrame);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("pagehide", onPageHide);
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  return null;
}

/** anything the visitor does that means "I'm moving the page myself" */
const INPUTS = ["wheel", "touchstart", "mousedown", "keydown"] as const;
