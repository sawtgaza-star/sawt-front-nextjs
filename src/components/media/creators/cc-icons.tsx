/* The reel card's round action buttons (save · like · share) and the
   picker's arrow — thin outlines in `currentColor`, per the mock. */

const base = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export const CcBookmark = ({ filled = false }: { filled?: boolean }) => (
  <svg {...base}>
    <path d="M6.5 4.75c0-.83.67-1.5 1.5-1.5h8c.83 0 1.5.67 1.5 1.5v15.5L12 16.5l-5.5 3.75V4.75z" fill={filled ? "currentColor" : "none"} />
  </svg>
);

export const CcHeart = ({ filled = false }: { filled?: boolean }) => (
  <svg {...base}>
    <path d="M12 20s-7.5-4.4-7.5-10.1A4.15 4.15 0 0 1 12 7.4a4.15 4.15 0 0 1 7.5 2.5C19.5 15.6 12 20 12 20z" fill={filled ? "currentColor" : "none"} />
  </svg>
);

export const CcShare = () => (
  <svg {...base}>
    <path d="M12 15V3.5M7.5 8 12 3.5 16.5 8" />
    <path d="M5 12.5v6.25c0 .97.78 1.75 1.75 1.75h10.5c.97 0 1.75-.78 1.75-1.75V12.5" />
  </svg>
);

export const CcPlay = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5.14v13.72a1 1 0 0 0 1.52.86l11.15-6.86a1 1 0 0 0 0-1.72L9.52 4.28A1 1 0 0 0 8 5.14Z" />
  </svg>
);

/** points to the inline end (left in RTL); flipped in LTR by the CSS */
export const CcArrow = () => (
  <svg {...base} strokeWidth={2}>
    <path d="M14.5 6 8.5 12l6 6" />
  </svg>
);
