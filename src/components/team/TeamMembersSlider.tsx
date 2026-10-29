"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import TeamMemberCard from "./TeamMemberCard";
import type { TeamCardMember } from "./team-data";
import { useSnapSlider } from "@/components/media/useSnapSlider";

/* Cards per desktop row — past this the row becomes a slider. Keep in step
   with team.css (.team-members-row.is-slider). */
const ROW_SIZE = 5;

/* team.css turns the row into the centre-snapping track below this width */
const PHONE_QUERY = "(max-width: 767.98px)";

/* The "اعضاء الفريق" row. On phones the CSS turns it into a centre-snapping
   track, so this leaf says which card is currently centred (the neighbours
   sit back, scaled and dimmed, like the mock); the track opens on the second
   card so the section is first seen with a card flanked on both sides.

   On phones the track also loops, so it can be swiped either way without
   ever reaching an end: the roster is rendered three times, the track opens
   on the middle copy, and whenever it comes to rest in an outer copy it is
   moved — instantly, with snapping and the card transition off — onto the
   same card in the middle copy. The cards are identical, so the jump can't
   be seen.

   On desktop up to ROW_SIZE members stay a centred grid. More than that (the
   member page now lists the whole active team) and the row becomes one
   scroll-snap line — five in view, three on a tablet — with a round arrow on
   each side, outside the cards, like the incubator's experts. The arrows are
   PHYSICAL (left scrolls left), so the language toggle needs no flipping, and
   each greys out (disabled, never hidden) at its end of the row. */
export default function TeamMembersSlider({
  members,
}: {
  members: TeamCardMember[];
}) {
  const n = members.length;
  const [loop, setLoop] = useState(false);
  const list = loop ? [...members, ...members, ...members] : members;
  const { trackRef, activeSlide, onScroll, dragProps } = useSnapSlider(list.length, 1);
  const slider = n > ROW_SIZE;
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);
  const settle = useRef<number | null>(null);
  const touching = useRef(false);

  // the loop only exists on phones, where the row is a swipe track
  useEffect(() => {
    const mq = window.matchMedia(PHONE_QUERY);
    const sync = () => setLoop(mq.matches && n > 1);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [n]);

  /* Shift the track by whole copies of the roster: card `from` → card `to`,
     measured from the cards themselves so RTL and LTR need no special case. */
  const shift = (from: number, to: number) => {
    const el = trackRef.current;
    const a = el?.children[from] as HTMLElement | undefined;
    const b = el?.children[to] as HTMLElement | undefined;
    if (!el || !a || !b) return;
    el.classList.add("is-looping");
    el.style.scrollSnapType = "none";
    el.scrollLeft += b.getBoundingClientRect().left - a.getBoundingClientRect().left;
    // long enough for the scroll event and the `.active` re-render to land
    window.setTimeout(() => {
      el.style.removeProperty("scroll-snap-type");
      el.classList.remove("is-looping");
    }, 80);
  };

  // open on the middle copy's second card once the loop is switched on
  useLayoutEffect(() => {
    if (loop) shift(1, n + 1);
    // shift only reads the ref
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loop, n]);

  /* the card nearest the track's centre */
  const centred = () => {
    const el = trackRef.current;
    if (!el) return -1;
    const mid = el.getBoundingClientRect().left + el.clientWidth / 2;
    let best = -1;
    let bestD = Infinity;
    Array.from(el.children).forEach((child, i) => {
      const r = child.getBoundingClientRect();
      const d = Math.abs(r.left + r.width / 2 - mid);
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    });
    return best;
  };

  /* once the track has come to rest (and no finger is on it), bring an outer
     copy back to the middle one */
  const recentre = () => {
    if (!loop || touching.current) return;
    const i = centred();
    if (i < 0) return;
    if (i < n) shift(i, i + n);
    else if (i >= 2 * n) shift(i, i - n);
  };

  const scheduleRecentre = () => {
    if (!loop) return;
    if (settle.current !== null) clearTimeout(settle.current);
    settle.current = window.setTimeout(recentre, 140);
  };

  useEffect(
    () => () => {
      if (settle.current !== null) clearTimeout(settle.current);
    },
    []
  );

  /* `scrollLeft` runs 0 → -max in an RTL row and 0 → max in an LTR one */
  const measure = () => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const x = el.scrollLeft;
    const rtl = getComputedStyle(el).direction === "rtl";
    setCanLeft(max > 1 && (rtl ? x > -max + 1 : x > 1));
    setCanRight(max > 1 && (rtl ? x < -1 : x < max - 1));
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!slider || !el) return;
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    // the language toggle flips <html dir> without resizing anything
    const mo = new MutationObserver(measure);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["dir"] });
    return () => {
      ro.disconnect();
      mo.disconnect();
    };
    // measure only reads the ref
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slider, n]);

  /* one card (plus the gap) per click; scroll-snap lines the row back up */
  const scroll = (dir: -1 | 1) => {
    const el = trackRef.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollBy({ left: dir * (card.getBoundingClientRect().width + gap), behavior: "smooth" });
  };

  const row = (
    <div
      className={"team-members-row" + (slider ? " is-slider" : "")}
      ref={trackRef}
      /* a mouse can't pan a scroll track whose scrollbar is hidden, so it is
         dragged by hand (useSnapSlider) — touch keeps the native swipe */
      {...dragProps}
      onScroll={() => {
        onScroll();
        if (slider) measure();
        scheduleRecentre();
      }}
      onTouchStart={() => {
        touching.current = true;
      }}
      onTouchEnd={() => {
        touching.current = false;
        scheduleRecentre();
      }}
      onTouchCancel={() => {
        touching.current = false;
        scheduleRecentre();
      }}
    >
      {list.map((m, i) => (
        <TeamMemberCard
          key={`${m.uuid || i % n}-${Math.floor(i / n)}`}
          member={m}
          className={i === activeSlide ? "active" : undefined}
        />
      ))}
    </div>
  );

  if (!slider) return row;

  return (
    <div className="team-members-slider">
      <button
        type="button"
        className="team-members-arrow team-members-arrow-left"
        aria-label="Previous"
        disabled={!canLeft}
        onClick={() => scroll(-1)}
      >
        <i className="fa-solid fa-angle-left"></i>
      </button>
      {row}
      <button
        type="button"
        className="team-members-arrow team-members-arrow-right"
        aria-label="Next"
        disabled={!canRight}
        onClick={() => scroll(1)}
      >
        <i className="fa-solid fa-angle-right"></i>
      </button>
    </div>
  );
}
