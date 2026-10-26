/* The four badges riding the hero's orbit — one outline family (24-unit
   grid, 1.8 stroke, round caps / joins), each a side of Sawt:
   the voice (mic), the content (a reel), the reach (the world) and the
   broadcast (the signal going out). Coloured by `currentColor`. */

type IconProps = { className?: string };

const base = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/** صوت — the voice */
export const OrbitMic = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <rect x="9" y="2.75" width="6" height="11.5" rx="3" />
    <path d="M5.5 11a6.5 6.5 0 0 0 13 0" />
    <path d="M12 17.5V21M9 21h6" />
  </svg>
);

/** المحتوى — a vertical reel with its play mark */
export const OrbitReel = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <rect x="5.75" y="2.75" width="12.5" height="18.5" rx="3" />
    <path d="M10.6 9.4v5.2l4.2-2.6z" fill="currentColor" />
  </svg>
);

/** الوصول — Gaza's story carried to the world */
export const OrbitGlobe = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 3c2.4 2.5 3.7 5.5 3.7 9s-1.3 6.5-3.7 9c-2.4-2.5-3.7-5.5-3.7-9S9.6 5.5 12 3z" />
    <path d="M3.6 9h16.8M3.6 15h16.8" />
  </svg>
);

/** البث — the signal going out */
export const OrbitBroadcast = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <circle cx="12" cy="12" r="1.9" fill="currentColor" />
    <path d="M8.5 8.5a5 5 0 0 0 0 7M15.5 8.5a5 5 0 0 1 0 7" />
    <path d="M5.6 5.6a9 9 0 0 0 0 12.8M18.4 5.6a9 9 0 0 1 0 12.8" />
  </svg>
);
