import type { CSSProperties } from "react";
import { IconRatingStar } from "./icons";

/* A row of rating stars filled from a number — 4 is four full stars, 4.5
   fills the fifth halfway. Each star is the hollow one with the yellow one
   laid over it and cut to the star's share of the rating; the cut runs from
   the start edge, so a half star fills from the right in RTL.

   Renders only the stars (a fragment): the caller keeps its own wrapper
   (.inc-testi-stars, .sm-testi-stars…), whose CSS sizes the svgs. */
const STAR: CSSProperties = {
  position: "relative",
  display: "inline-flex",
  lineHeight: 0,
};

const FILL: CSSProperties = {
  position: "absolute",
  insetBlock: 0,
  insetInlineStart: 0,
  display: "flex",
  justifyContent: "flex-start",
  overflow: "hidden",
};

/* holds the yellow star at full size while its box is cut narrower */
const FILL_STAR: CSSProperties = { flex: "0 0 auto", display: "inline-flex" };

/** Clamps whatever the API sent (null, "4.5", 7…) to 0..max. */
export function ratingValue(raw: unknown, max = 5): number {
  const n = Number(raw);
  return Number.isFinite(n) ? Math.min(max, Math.max(0, n)) : 0;
}

export default function RatingStars({ value, max = 5 }: { value: unknown; max?: number }) {
  const rating = ratingValue(value, max);

  return (
    <>
      {Array.from({ length: max }, (_, i) => {
        const share = Math.min(1, Math.max(0, rating - i));
        return (
          <span style={STAR} key={i}>
            <IconRatingStar filled={false} />
            {share > 0 ? (
              <span style={{ ...FILL, width: `${share * 100}%` }}>
                <span style={FILL_STAR}>
                  <IconRatingStar />
                </span>
              </span>
            ) : null}
          </span>
        );
      })}
    </>
  );
}
