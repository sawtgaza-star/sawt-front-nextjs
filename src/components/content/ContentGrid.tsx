"use client";
import { useEffect, useRef, useState } from "react";
import ReelThumbCard from "./ReelThumbCard";
import ReelViewer from "./ReelViewer";
import type { Reel } from "./content-data";
import { useReelBatches } from "./use-reel-batches";

/* The filtered reel grid — five posters per row on desktop. Each card is the
   reel's thumbnail (ReelThumbCard); clicking it opens the full-screen viewer —
   the creator page's — where the video plays. Cards are drawn a batch at a
   time (useReelBatches); the viewer still gets the whole list.

   An empty grid says why when the API does: `reels.message` (e.g. the
   Instagram account's token expired) replaces the stock "nothing here" line. */
export default function ContentGrid({
  reels,
  message = "",
  focus = null,
  open = null,
}: {
  reels: Reel[];
  /** the API's own explanation of an empty list, already localized */
  message?: string;
  /** a reel picked in the hero strip: scroll to its card and flash it. `n`
      changes on every pick, so picking the same reel again still scrolls. */
  focus?: { id: string; n: number } | null;
  /** a reel to open straight in the viewer (the share link's `?reel=`) */
  open?: { id: string; n: number } | null;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const { shown, reveal } = useReelBatches(reels.length, gridRef, {
    resetKey: reels.map((r) => r.id).join(","),
  });

  // a share link opens its reel in the viewer once the list holds it
  const openIndexReq = open ? reels.findIndex((r) => String(r.id) === open.id) : -1;
  useEffect(() => {
    if (openIndexReq < 0) return;
    reveal(openIndexReq);
    setOpenIndex(openIndexReq);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open?.n, openIndexReq]);

  // 1) make sure the picked reel's card is drawn (it may be past the batch)
  const focusIndex = focus ? reels.findIndex((r) => String(r.id) === focus.id) : -1;
  useEffect(() => {
    if (focusIndex >= 0) reveal(focusIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focus?.n, focusIndex]);

  // 2) once it is, bring it to the middle of the screen and flash it
  useEffect(() => {
    if (!focus || focusIndex < 0 || focusIndex >= shown) return;
    const card = gridRef.current?.querySelector<HTMLElement>(
      `[data-reel-id="${CSS.escape(focus.id)}"]`,
    );
    if (!card) return;
    card.scrollIntoView({ behavior: "smooth", block: "center" });
    /* `ct-focus-mode` on <body> lays a page-wide blur; the card itself can't
       rise above it (an ancestor's stacking context caps its z-index), so a
       sharp copy of it is pinned over the blur at exactly the card's spot.
       The copy is click-through to the real card; a scroll ends the moment
       early, since the copy would no longer sit on the card. */
    let clone: HTMLElement | null = null;
    const off = () => {
      document.body.classList.remove("ct-focus-mode");
      window.removeEventListener("scroll", off);
      const c = clone;
      clone = null;
      if (!c) return;
      c.classList.remove("is-shown");
      window.setTimeout(() => c.remove(), 300);
    };
    const on = () => {
      const r = card.getBoundingClientRect();
      clone = card.cloneNode(true) as HTMLElement;
      clone.removeAttribute("data-reel-id");
      clone.removeAttribute("tabindex");
      clone.setAttribute("aria-hidden", "true");
      clone.classList.add("ct-focus-clone");
      Object.assign(clone.style, {
        top: `${r.top}px`,
        left: `${r.left}px`,
        width: `${r.width}px`,
        height: `${r.height}px`,
      });
      document.body.appendChild(clone);
      void clone.offsetWidth;
      clone.classList.add("is-shown");
      document.body.classList.add("ct-focus-mode");
      window.addEventListener("scroll", off, { passive: true });
    };
    /* start the moment the smooth scroll lands: `scrollend` where the browser
       has it, else 60ms without a scroll event; 900ms at most, and at once if
       the card was already in place (no scroll at all) */
    let end = 0;
    let settle = 0;
    let started = false;
    const begin = () => {
      if (started) return;
      started = true;
      window.removeEventListener("scroll", waitScroll);
      window.removeEventListener("scrollend", begin);
      window.clearTimeout(settle);
      window.clearTimeout(cap);
      on();
      end = window.setTimeout(off, 3200);
    };
    const waitScroll = () => {
      window.clearTimeout(settle);
      settle = window.setTimeout(begin, 60);
    };
    window.addEventListener("scroll", waitScroll, { passive: true });
    window.addEventListener("scrollend", begin);
    settle = window.setTimeout(begin, 120);
    const cap = window.setTimeout(begin, 900);
    return () => {
      window.removeEventListener("scroll", waitScroll);
      window.removeEventListener("scrollend", begin);
      window.clearTimeout(settle);
      window.clearTimeout(cap);
      window.clearTimeout(end);
      off();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focus?.n, focusIndex >= 0 && focusIndex < shown]);

  if (!reels.length) {
    return message ? (
      <p className="ct-grid-empty">{message}</p>
    ) : (
      <p className="ct-grid-empty" data-i18n="content_grid_empty">
        لا يوجد محتوى في هذا التصنيف حاليًا.
      </p>
    );
  }

  return (
    <>
      <div className="ct-grid" ref={gridRef}>
        {reels.slice(0, shown).map((reel, i) => (
          <ReelThumbCard
            key={reel.id}
            reel={reel}
            index={i}
            onOpen={setOpenIndex}
          />
        ))}
      </div>

      {openIndex !== null && (
        <ReelViewer
          reels={reels}
          index={openIndex}
          onNavigate={(i) => {
            setOpenIndex(i);
            reveal(i);
          }}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </>
  );
}
