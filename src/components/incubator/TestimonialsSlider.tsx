"use client";
import { useEffect, useRef, useState } from "react";
import {
  IconChevronDownBold,
  IconQuoteMarks,
  IconRatingStar,
} from "@/components/ui/icons";
import { localized } from "@/lib/api/pages";
import type { IncubatorTestimonial } from "@/lib/api/incubator-page";
import { t } from "@/lib/translations";
import { PLACEHOLDER } from "./incubator-page-view";

/* The testimonials section's card strip: a scroll-snap track paged by however
   many cards actually fit (two on the desktop panel, one on a phone) plus the
   dot pager under it. Mouse users can grab-drag the track (touch scrolls
   natively); the drag temporarily lifts scroll-snap via the `dragging` class
   and re-snaps to the nearest page on release. Client leaf — the static copy
   column stays in IncubatorTestimonials.

   Everything below is measured off the real boxes rather than assumed. A fixed
   `ceil(n / 2)` page count is what made the pager light the wrong dot on
   phones: there the cards are full-width, so the track has n stops and not
   n/2, and every dot after the first pointed at the wrong card.

   The cards are the API's `testimonials.items`; "اقرأ المزيد" is the payload's
   `read_more` label, and its "اقرأ أقل" twin (not in the payload) is t()'s. */
export default function TestimonialsSlider({
  items,
  lang,
  readMore,
}: {
  items: IncubatorTestimonial[];
  lang: string;
  readMore: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [pages, setPages] = useState(1);
  /* Arabic is the document's default, so this starts true and the effect below
     corrects it when the language toggle flips <html dir> */
  const [rtl, setRtl] = useState(true);
  const [dragging, setDragging] = useState(false);
  /* indexes of the cards whose quote is expanded past the 3-line clamp */
  const [expanded, setExpanded] = useState<number[]>([]);
  const drag = useRef({ startX: 0, startScroll: 0, moved: false });

  /* how many whole cards the viewport shows at this width */
  const perView = () => {
    const el = trackRef.current;
    const first = el?.firstElementChild as HTMLElement | null;
    if (!el || !first) return 1;
    const w = first.getBoundingClientRect().width;
    if (!w) return 1;
    return Math.max(1, Math.round(el.clientWidth / w));
  };

  /* the card sitting on the track's start edge. Measured from geometry, not
     from a proportion of the scroll range: `scrollLeft` runs 0 → -max in RTL
     Chrome but max → 0 elsewhere, and neither maps cleanly onto card stops. */
  const startCard = () => {
    const el = trackRef.current;
    if (!el) return 0;
    const cards = Array.from(el.children) as HTMLElement[];
    if (!cards.length) return 0;
    const rtl = getComputedStyle(el).direction === "rtl";
    const box = el.getBoundingClientRect();
    const edge = rtl ? box.right : box.left;
    let best = 0;
    let bestDist = Infinity;
    cards.forEach((c, i) => {
      const r = c.getBoundingClientRect();
      const dist = Math.abs((rtl ? r.right : r.left) - edge);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    return best;
  };

  const nearestIndex = () => Math.floor(startCard() / perView());

  const onScroll = () => setActive(nearestIndex());

  /* the dot count follows the layout, so it changes with the breakpoint */
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const measure = () => {
      setPages(Math.max(1, Math.ceil(items.length / perView())));
      setActive(nearestIndex());
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
    /* perView / nearestIndex only read refs */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length]);

  /* Scroll the track only (scrollIntoView would drag the page along too), by
     the physical distance between the target card's start edge and the
     track's — `scrollLeft` is a physical offset in every direction mode, so
     one delta works for both. */
  const goTo = (page: number) => {
    const el = trackRef.current;
    if (!el) return;
    const i = Math.min(el.children.length - 1, page * perView());
    const card = el.children[i] as HTMLElement | undefined;
    if (!card) return;
    const rtl = getComputedStyle(el).direction === "rtl";
    const box = el.getBoundingClientRect();
    const r = card.getBoundingClientRect();
    const delta = rtl ? r.right - box.right : r.left - box.left;
    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  /* The pager arrows are PHYSICAL: the one pointing right always walks the
     dots rightwards and the one pointing left always walks them leftwards.
     Page indexes run start → end, so in Arabic (dots laid out right to left)
     "rightwards" is a step *down* the index. `step(1)` = move right. */
  const step = (toRight: number) => {
    const delta = rtl ? -toRight : toRight;
    goTo(Math.min(pages - 1, Math.max(0, active + delta)));
  };

  /* the language toggle only mutates <html dir>, so watch that attribute
     rather than re-reading direction on every render */
  useEffect(() => {
    const root = document.documentElement;
    const read = () => setRtl(root.getAttribute("dir") !== "ltr");
    read();
    const mo = new MutationObserver(read);
    mo.observe(root, { attributes: true, attributeFilter: ["dir"] });
    return () => mo.disconnect();
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    const el = trackRef.current;
    if (!el || e.pointerType !== "mouse") return;
    drag.current = { startX: e.clientX, startScroll: el.scrollLeft, moved: false };
    setDragging(true);
    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const el = trackRef.current;
    if (!el || !dragging) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 6) drag.current.moved = true;
    /* content follows the cursor — same formula in LTR and RTL */
    el.scrollLeft = drag.current.startScroll - dx;
  };

  const onPointerUp = () => {
    if (!dragging) return;
    setDragging(false);
    const i = nearestIndex();
    requestAnimationFrame(() => goTo(i));
  };

  const toggleQuote = (key: number) =>
    setExpanded((keys) =>
      keys.includes(key) ? keys.filter((k) => k !== key) : [...keys, key],
    );

  /* a drag must not count as a click on the card's link */
  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  return (
    <div className="inc-testi-slider">
      <div
        className={"inc-testi-track" + (dragging ? " dragging" : "")}
        ref={trackRef}
        onScroll={onScroll}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onClickCapture={onClickCapture}
      >
        {items.map((item, index) => {
          const isOpen = expanded.includes(index);
          const rating = Math.min(5, Math.max(0, Math.round(Number(item.rating) || 0)));
          return (
          <article
            className={"inc-testi-card" + (isOpen ? " is-open" : "")}
            key={index}
          >
            <span className="inc-testi-avatar">
              <img src={item.avatar_url || PLACEHOLDER.person} alt="" draggable={false} />
              <span className="inc-testi-quote-badge" aria-hidden="true">
                <IconQuoteMarks />
              </span>
            </span>

            <div className="inc-testi-stars" aria-hidden="true">
              {Array.from({ length: 5 }, (_, s) => (
                <IconRatingStar key={s} filled={s < rating} />
              ))}
            </div>

            <p className="inc-testi-text">{localized(item.quote, lang)}</p>

            {/* the mock's chevron control: it opens the quote past its 3-line
                clamp rather than navigating */}
            <button
              type="button"
              className="inc-testi-cta"
              aria-expanded={isOpen}
              onClick={() => toggleQuote(index)}
            >
              <span>
                {isOpen ? t("inc_testi_read_less") : readMore || t("inc_testi_read_more")}
              </span>
              <IconChevronDownBold />
            </button>

            <b className="inc-testi-name">{item.name}</b>
            <span className="inc-testi-meta">{localized(item.role, lang)}</span>
          </article>
          );
        })}
      </div>

      <div className="inc-testi-dots">
        <span className="inc-testi-dots-pill">
          {/* the phone mock flanks the dots with a pager arrow on each side —
              filled olive on the start (right) edge, outlined on the end
              (left) one. CSS hides both from sm up, where the dots stand
              alone, and swaps the two ends in English so this one — the
              right-pointing arrow — stays on the right. */}
          <button
            type="button"
            className="inc-testi-arrow inc-testi-arrow-next"
            aria-label={rtl ? "السابق" : "التالي"}
            onClick={() => step(1)}
          >
            <i className="fa-solid fa-angle-right"></i>
          </button>
          {Array.from({ length: pages }, (_, i) => (
            <button
              key={i}
              type="button"
              className={"inc-testi-dot" + (i === active ? " active" : "")}
              aria-label={`الصفحة ${i + 1}`}
              aria-current={i === active}
              onClick={() => goTo(i)}
            ></button>
          ))}
          <button
            type="button"
            className="inc-testi-arrow inc-testi-arrow-prev"
            aria-label={rtl ? "التالي" : "السابق"}
            onClick={() => step(-1)}
          >
            <i className="fa-solid fa-angle-left"></i>
          </button>
        </span>
      </div>
    </div>
  );
}
