/* Line icons for the "أقسام المنصة" accordion — one per card, by position
   (the API's `icon_url` is still null; an upload takes over when it exists). */

type IconProps = { size?: number };

const base = (size: number) => ({
  xmlns: "http://www.w3.org/2000/svg",
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
});

/* منصة صوت */
export const IconMic = ({ size = 24 }: IconProps) => (
  <svg {...base(size)}>
    <rect x="9" y="2.5" width="6" height="12" rx="3" />
    <path d="M5.5 11a6.5 6.5 0 0 0 13 0" />
    <path d="M12 17.5v4" />
  </svg>
);

/* حاضنة صوت */
export const IconPeople = ({ size = 24 }: IconProps) => (
  <svg {...base(size)}>
    <circle cx="9" cy="7.5" r="3.5" />
    <circle cx="16.5" cy="8.5" r="2.75" />
    <path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" />
    <path d="M15.5 14.2c3.3-.3 6 1.8 6 5.3" />
  </svg>
);

/* صوت ميديا */
export const IconCamera = ({ size = 24 }: IconProps) => (
  <svg {...base(size)}>
    <rect x="2.5" y="6" width="13" height="12" rx="3" />
    <path d="m15.5 10.5 6-3.5v10l-6-3.5" />
  </svg>
);

export const SECTION_ICONS = [IconMic, IconPeople, IconCamera];
