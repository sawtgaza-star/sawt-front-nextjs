"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import ReelThumbCard from "./ReelThumbCard";
import ReelViewer from "./ReelViewer";
import ContentGridMore from "./ContentGridMore";
import type { Reel } from "./content-data";
import { useReelBatches } from "./use-reel-batches";
import { useGridColumns } from "./use-grid-columns";
import { useSmoothExpand } from "./use-smooth-expand";

/** Rows shown before the "عرض المزيد" button, at every width — and the rows
    each press of it adds (4 reels on a phone's two columns, 10 on desktop). */
const PREVIEW_ROWS = 2;

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
   time (useReelBatches); the viewer still gets the whole list. Only the
   first PREVIEW_ROWS rows show (as many reels as the grid has columns,
   twice); each press of "عرض المزيد" adds that many again, and once every
   reel is out the button becomes "عرض أقل" — back to the first rows then,
   and on every new filter / sort.

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
  const columns = useGridColumns(gridRef, 5);
  const preview = PREVIEW_ROWS * columns;
  // presses of "عرض المزيد" so far; each opens `preview` more reels
  const [steps, setSteps] = useState(0);
  const [stepsKey, setStepsKey] = useState(resetKey);
  if (stepsKey !== resetKey) {
    setStepsKey(resetKey);
    setSteps(0);
  }
  const limit = preview * (steps + 1);
  const hasMore = reels.length > limit;
  // batches stop at the open rows — else they'd keep loading unseen
  const total = Math.min(reels.length, limit);
  const { shown, reveal: revealBatch } = useReelBatches(total, gridRef, { resetKey });
  // "عرض المزيد" draws the next rows in the same render that opens them
  const showMore = useSmoothExpand(gridRef, steps, columns, () =>
    reveal(Math.min(reels.length, limit + preview) - 1),
  );
  /* "عرض أقل": fold back to the preview rows. The rows above the button
     vanish, which would leave the visitor far down the page — so the button
     is held at the same spot on screen and the preview rows end right above
     it. Measured before the fold, corrected in a layout effect after it (no
     painted jump in between). */
  const moreRef = useRef<HTMLDivElement>(null);
  const foldFrom = useRef<number | null>(null);
  const showLess = () => {
    foldFrom.current = moreRef.current?.getBoundingClientRect().top ?? null;
    setSteps(0);
  };
  useLayoutEffect(() => {
    const before = foldFrom.current;
    foldFrom.current = null;
    if (steps || before === null || !moreRef.current) return;
    const after = moreRef.current.getBoundingClientRect().top;
    window.scrollBy({ top: after - before, behavior: "instant" as ScrollBehavior });
  }, [steps]);

  /** Make sure reel `i` is drawn — past the open rows, that opens enough more. */
  const reveal = (i: number) => {
    if (preview > 0) setSteps((s) => Math.max(s, Math.ceil((i + 1) / preview) - 1));
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
      {reels.length > preview && (
        <ContentGridMore
          ref={moreRef}
          open={!hasMore}
          onToggle={hasMore ? showMore : showLess}
        />
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
