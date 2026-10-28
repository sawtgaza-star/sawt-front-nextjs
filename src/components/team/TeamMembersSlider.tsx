"use client";
import { useEffect, useState } from "react";
import TeamMemberCard from "./TeamMemberCard";
import type { TeamCardMember } from "./team-data";
import { useSnapSlider } from "@/components/media/useSnapSlider";

/* Cards per desktop row — past this the row becomes a slider. Keep in step
   with team.css (.team-members-row.is-slider). */
const ROW_SIZE = 5;

/* The "اعضاء الفريق" row. On phones the CSS turns it into a centre-snapping
   track, so this leaf says which card is currently centred (the neighbours
   sit back, scaled and dimmed, like the mock); the track opens on the second
   card so the section is first seen with a card flanked on both sides.

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
  const { trackRef, activeSlide, onScroll } = useSnapSlider(members.length, 1);
  const slider = members.length > ROW_SIZE;
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

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
  }, [slider, members.length]);

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
      onScroll={() => {
        onScroll();
        if (slider) measure();
      }}
    >
      {members.map((m, i) => (
        <TeamMemberCard
          key={m.uuid || i}
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
