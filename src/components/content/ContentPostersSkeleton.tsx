"use client";
import { useLayoutEffect, useRef } from "react";
import { ARC_MEDIA, fanCentres, fanPose, measureArc } from "./hero-fan";

/** HeroReelsSlider shows five posters across below 992px; on desktop the
    fanned row runs to both page edges, so more blocks are laid out there
    (content-skeleton.css hides the extras on smaller screens). */
const POSTERS = 11;
/** HeroReelsSlider's spaceBetween from 992px up */
const DESKTOP_GAP = 18;

/** The fanned poster strip: HeroReelsSlider's swiper box with a row of slides
    in it (no Swiper instance — the widths are set in CSS). On desktop each
    block takes the exact pose its poster will — the same size gradient, the
    same bend along the backdrop's rim (./hero-fan) — so nothing moves when the
    payload lands. Below 992px the row stays flat, as before. */
export default function ContentPostersSkeleton() {
  const row = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const place = () => {
      const el = row.current;
      if (!el) return;
      const blocks = Array.from(el.children) as HTMLElement[];
      const desktop = window.matchMedia(ARC_MEDIA).matches;
      const width = blocks[0]?.offsetWidth ?? 0;
      const height = blocks[0]?.offsetHeight ?? 0;
      const arc = measureArc(el.closest(".ct-header"), el.getBoundingClientRect().top, height);
      const centres = fanCentres(width, DESKTOP_GAP);
      const middle = el.clientWidth / 2;
      blocks.forEach((block) => {
        /* steps from the centre, positive to the RIGHT as in Swiper's
           progress — read off the block's untransformed place, since the row
           runs right-to-left in Arabic and left-to-right in English */
        const progress = (block.offsetLeft + width / 2 - middle) / (width + DESKTOP_GAP);
        block.style.transform =
          desktop && width ? fanPose(progress, width, DESKTOP_GAP, centres, arc).transform : "";
      });
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, []);

  return (
    <div className="swiper ct-hero-swiper" aria-busy="true" aria-hidden="true">
      <div className="swiper-wrapper ct-posters-row" ref={row}>
        {Array.from({ length: POSTERS }, (_, i) => (
          <div key={i} className="ct-hero-slide ct-poster-block sk-shimmer" />
        ))}
      </div>
    </div>
  );
}
