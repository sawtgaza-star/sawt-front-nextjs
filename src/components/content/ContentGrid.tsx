"use client";
import { useEffect, useRef, useState } from "react";
import ReelThumbCard from "./ReelThumbCard";
import ReelViewer from "./ReelViewer";
import type { Reel } from "./content-data";
import { useReelBatches } from "./use-reel-batches";

/** Phones show this many reels, then a "عرض المزيد" button for the rest. */
const PHONE_PREVIEW = 4;
const PHONE_MEDIA = "(max-width: 767.98px)";

/* The hero-strip tap's highlight (see the focus effect): it starts once the
   card has held still for STILL_FRAMES frames — no sooner than LAND_MIN ms,
   no later than LAND_CAP ms — and a scroll of more than SCROLL_AWAY px ends it. */
const STILL_FRAMES = 4;
const LAND_MIN = 150;
const LAND_CAP = 1500;
const SCROLL_AWAY = 80;

/* The filtered reel grid — five posters per row on desktop. Each card is the
   reel's thumbnail (ReelThumbCard); clicking it opens the full-screen viewer —
   the creator page's — where the video plays. Cards are drawn a batch at a
   time (useReelBatches); the viewer still gets the whole list. On a phone
   only the first PHONE_PREVIEW show until "عرض المزيد" is tapped — back to
   that on every new filter / sort.

   An empty grid says why when the API does: `reels.message` (e.g. the
   Instagram account's token expired) replaces the stock "nothing here" line. */
export default function ContentGrid({
  reels,
  message = "",
  focus = null,
  open = null,
  onFocusDone,
  onOpenDone,
}: {
  reels: Reel[];
  /** the API's own explanation of an empty list, already localized */
  message?: string;
  /** a reel picked in the hero strip: scroll to its card and flash it. `n`
      changes on every pick, so picking the same reel again still scrolls. */
  focus?: { id: string; n: number } | null;
  /** a reel to open straight in the viewer (the share link's `?reel=`) */
  open?: { id: string; n: number } | null;
  /* Each request is handled once and then cleared by the page — the grid
     unmounts while a new filter / sort loads, and a request still set when it
     mounts again would replay the scroll + blur (or reopen the viewer). */
  onFocusDone?: () => void;
  onOpenDone?: () => void;
}) {
  /* `openIndex` indexes `reels` (the grid). The viewer only gets the reels
     that can play — a card whose cover failed (expired Instagram link) goes
     to Instagram instead — so its index is mapped through `playable`. */
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [broken, setBroken] = useState<ReadonlySet<string>>(new Set());
  const markBroken = (id: string) =>
    setBroken((s) => (s.has(id) ? s : new Set(s).add(id)));
  const playable = reels.filter((r) => !broken.has(String(r.id)));
  const toViewer = (i: number) =>
    playable.findIndex((r) => r.id === reels[i]?.id);
  const gridRef = useRef<HTMLDivElement>(null);
  const resetKey = reels.map((r) => r.id).join(",");
  const { shown: batch, reveal: revealBatch } = useReelBatches(reels.length, gridRef, {
    resetKey,
  });

  const [phone, setPhone] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(PHONE_MEDIA);
    const sync = () => setPhone(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  const [expanded, setExpanded] = useState(false);
  const [expandedKey, setExpandedKey] = useState(resetKey);
  if (expandedKey !== resetKey) {
    setExpandedKey(resetKey);
    setExpanded(false);
  }
  const collapsed = phone && !expanded && reels.length > PHONE_PREVIEW;
  const shown = collapsed ? Math.min(batch, PHONE_PREVIEW) : batch;
  /** Make sure reel `i` is drawn — past the phone preview, that opens it up. */
  const reveal = (i: number) => {
    if (i >= PHONE_PREVIEW) setExpanded(true);
    revealBatch(i);
  };

  // a share link opens its reel in the viewer once the list holds it
  const openIndexReq = open ? reels.findIndex((r) => String(r.id) === open.id) : -1;
  useEffect(() => {
    if (openIndexReq < 0) return;
    reveal(openIndexReq);
    setOpenIndex(openIndexReq);
    onOpenDone?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open?.n, openIndexReq]);

  // 1) make sure the picked reel's card is drawn (it may be past the batch)
  const focusIndex = focus ? reels.findIndex((r) => String(r.id) === focus.id) : -1;
  useEffect(() => {
    if (focusIndex >= 0) reveal(focusIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focus?.n, focusIndex]);

  /* 2) once it is, bring it to the middle of the screen and highlight it.
     The highlight's teardown lives in a ref, not in the effect's cleanup: the
     page clears `focus` right after (onFocusDone), and that dependency change
     must not cut the highlight short. It runs on the next highlight or when
     the grid unmounts. */
  const stopHighlight = useRef<(() => void) | null>(null);
  useEffect(() => () => stopHighlight.current?.(), []);
  useEffect(() => {
    if (!focus || focusIndex < 0 || focusIndex >= shown) return;
    const card = gridRef.current?.querySelector<HTMLElement>(
      `[data-reel-id="${CSS.escape(focus.id)}"]`,
    );
    if (!card) return;
    stopHighlight.current?.();
    card.scrollIntoView({ behavior: "smooth", block: "center" });
    onFocusDone?.();
    /* `ct-focus-mode` on <body> lays a page-wide blur; the card itself can't
       rise above it (an ancestor's stacking context caps its z-index), so a
       sharp copy of it is pinned over the blur at exactly the card's spot.
       The copy is click-through to the real card and follows it through
       small scrolls (a phone's address bar showing / hiding, the last px of
       a momentum scroll); the visitor scrolling away ends the moment early. */
    let clone: HTMLElement | null = null;
    let landedY = 0;
    const pin = () => {
      if (!clone) return;
      const r = card.getBoundingClientRect();
      Object.assign(clone.style, {
        top: `${r.top}px`,
        left: `${r.left}px`,
        width: `${r.width}px`,
        height: `${r.height}px`,
      });
    };
    const onScroll = () => {
      if (Math.abs(window.scrollY - landedY) > SCROLL_AWAY) off();
      else pin();
    };
    const off = () => {
      document.body.classList.remove("ct-focus-mode");
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", pin);
      const c = clone;
      clone = null;
      if (!c) return;
      c.classList.remove("is-shown");
      window.setTimeout(() => c.remove(), 300);
    };
    const on = () => {
      clone = card.cloneNode(true) as HTMLElement;
      clone.removeAttribute("data-reel-id");
      clone.removeAttribute("tabindex");
      clone.setAttribute("aria-hidden", "true");
      clone.classList.add("ct-focus-clone");
      pin();
      document.body.appendChild(clone);
      void clone.offsetWidth;
      clone.classList.add("is-shown");
      document.body.classList.add("ct-focus-mode");
      landedY = window.scrollY;
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", pin);
    };
    /* start the moment the smooth scroll has really landed: the card holds
       still for a few frames in a row. Scroll-event gaps are no guide — a
       phone's smooth scroll can stall longer than a frame mid-way, and the
       moment then started too early and the rest of the scroll ended it.
       LAND_CAP ms at most, and almost at once if the card was already in
       place (no scroll at all). */
    let end = 0;
    let frame = 0;
    let started = false;
    let lastTop = Number.NaN;
    let still = 0;
    const begin = () => {
      if (started) return;
      started = true;
      window.cancelAnimationFrame(frame);
      window.clearTimeout(cap);
      on();
      end = window.setTimeout(off, 3200);
    };
    const watch = () => {
      const top = card.getBoundingClientRect().top;
      still = Math.abs(top - lastTop) < 0.5 ? still + 1 : 0;
      lastTop = top;
      // a smooth scroll can take a frame or two to start moving at all
      if (still >= STILL_FRAMES && performance.now() - asked > LAND_MIN) begin();
      else frame = window.requestAnimationFrame(watch);
    };
    const asked = performance.now();
    frame = window.requestAnimationFrame(watch);
    const cap = window.setTimeout(begin, LAND_CAP);
    stopHighlight.current = () => {
      stopHighlight.current = null;
      window.cancelAnimationFrame(frame);
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
            onBroken={markBroken}
          />
        ))}
      </div>
      {collapsed && (
        <div className="ct-grid-more-wrap">
          <button type="button" className="ct-grid-more" onClick={() => setExpanded(true)}>
            <span data-i18n="view_more">عرض المزيد</span>
            <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
          </button>
        </div>
      )}

      {openIndex !== null && toViewer(openIndex) >= 0 && (
        <ReelViewer
          reels={playable}
          index={toViewer(openIndex)}
          onNavigate={(i) => {
            const at = reels.findIndex((r) => r.id === playable[i]?.id);
            setOpenIndex(at);
            reveal(at);
          }}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </>
  );
}
