/* The footer's drawn ornaments — all decorative, all aria-hidden. Shared by
   SiteFooter and FooterSkeleton so the loading footer wears the same ground
   and the page doesn't change colour when the content lands.
   Colours and sizes live in styles/site-footer.css. */

/** Grain texture and the torn top edge. */
export function FooterBackdrop() {
  return (
    <>
      <svg className="ft-grain" aria-hidden="true">
        <filter id="ft-grain-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#ft-grain-filter)" />
      </svg>
      <svg
        className="ft-torn"
        aria-hidden="true"
        viewBox="0 0 1440 26"
        preserveAspectRatio="none"
      >
        <path d="M0 0H1440V9L1408 13L1371 8L1336 15L1290 10L1252 16L1210 9L1168 14L1121 8L1082 13L1040 11L996 17L951 10L910 14L862 8L820 15L776 11L733 16L690 9L648 13L603 8L560 14L518 10L470 17L428 11L385 15L340 9L298 13L252 8L210 15L168 10L122 16L80 9L40 13L0 10Z" />
      </svg>
    </>
  );
}

/* Hand-drawn strokes under the column headings — three variants, one per
   column, so they don't read as a repeated stamp. */
const HEADING_STROKES = [
  "M2 5C18 2 36 6 58 3",
  "M2 4C20 6 38 2 58 4",
  "M2 3C22 5 40 6 58 3",
];

/** Orange brush stroke under a column heading. */
export function HeadingStroke({ variant = 0 }: { variant?: number }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 60 8" preserveAspectRatio="none">
      <path
        d={HEADING_STROKES[variant % HEADING_STROKES.length]}
        fill="none"
        stroke="#D9713C"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Wider brush stroke under the newsletter title's last word. */
export function TitleStroke() {
  return (
    <svg aria-hidden="true" viewBox="0 0 160 12" preserveAspectRatio="none">
      <path
        d="M3 8C28 4 55 10 84 6C110 3 136 5 157 7"
        fill="none"
        stroke="#D9713C"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Rough orange tag painted behind the brand name in the copyright line. */
export function TagStroke() {
  return (
    <svg aria-hidden="true" viewBox="0 0 100 30" preserveAspectRatio="none">
      <path
        d="M3 6C25 2 60 4 97 3L95 14L98 26C70 29 35 27 4 28L6 17z"
        fill="#B54F24"
      />
    </svg>
  );
}
