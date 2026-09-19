// @ts-nocheck
/* eslint-disable */
/* The five icons of the hero stats bar, lifted verbatim from the legacy
   markup (3em, the size style.css lays the bar out around).

   The API sends each figure with a `key` — team / stories / views / videos /
   followers — and that key picks the icon here. An unknown key falls back to
   the team glyph rather than leaving a hole in the row.

   The team icon strokes in orange while the other four inherit `currentColor`:
   that is the legacy markup's own highlight on the first figure, kept as-is. */

const STAT_ICON_SIZE = "3em";

const IconStatTeam = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={STAT_ICON_SIZE} height={STAT_ICON_SIZE} viewBox="0 0 24 24"> <path d="M0 0h24v24H0z" fill="none"></path> <g fill="none" stroke="rgba(255, 116, 32, 1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"> <path d="M16.5 20v-2.03c0-1.242-.56-2.46-1.69-2.975C13.431 14.366 11.778 14 10 14s-3.431.366-4.81.995c-1.13.515-1.69 1.733-1.69 2.975V20m17 .001v-2.03c0-1.242-.56-2.46-1.69-2.975q-.39-.18-.81-.328"></path> <circle cx="10" cy="7.5" r="3.5"></circle> <path d="M15 4.145a3.502 3.502 0 0 1 0 6.71"></path> </g> </svg>
);

const IconStatStories = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={STAT_ICON_SIZE} height={STAT_ICON_SIZE} viewBox="0 0 24 24"> <path d="M0 0h24v24H0z" fill="none"></path> <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5.333 3c2.46-.003 4.836.887 6.667 2.5V21a10.07 10.07 0 0 0-6.667-2.5c-1.562 0-2.343 0-2.688-.22a1.16 1.16 0 0 1-.424-.425C2 17.51 2 16.895 2 15.663v-9.26c0-1.428 0-2.141.549-2.72c.548-.579 1.11-.609 2.234-.668Q5.056 3 5.333 3m13.334 0A10.07 10.07 0 0 0 12 5.5V21a10.07 10.07 0 0 1 6.667-2.5c1.562 0 2.343 0 2.688-.22c.207-.133.291-.218.424-.425c.221-.345.221-.96.221-2.192v-9.26c0-1.428 0-2.141-.549-2.72s-1.11-.609-2.234-.668Q18.944 3 18.667 3"></path> </svg>
);

const IconStatViews = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={STAT_ICON_SIZE} height={STAT_ICON_SIZE} viewBox="0 0 24 24"> <path d="M0 0h24v24H0z" fill="none"></path> <g fill="none" stroke="currentColor" strokeWidth="1.5"> <path d="M21.544 11.045c.304.426.456.64.456.955c0 .316-.152.529-.456.955C20.178 14.871 16.689 19 12 19c-4.69 0-8.178-4.13-9.544-6.045C2.152 12.529 2 12.315 2 12c0-.316.152-.529.456-.955C3.822 9.129 7.311 5 12 5c4.69 0 8.178 4.13 9.544 6.045Z"></path> <path d="M15 12a3 3 0 1 0-6 0a3 3 0 0 0 6 0Z"></path> </g> </svg>
);

const IconStatVideos = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={STAT_ICON_SIZE} height={STAT_ICON_SIZE} viewBox="0 0 24 24"> <path d="M0 0h24v24H0z" fill="none"></path> <g fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.5"> <path strokeLinecap="round" d="M17.7 21.335c-1.172.165-2.7.165-4.75.165h-1.9c-4.03 0-6.046 0-7.298-1.252S2.5 16.98 2.5 12.95v-1.9c0-4.03 0-6.046 1.252-7.298S7.02 2.5 11.05 2.5h1.9c4.03 0 6.046 0 7.298 1.252S21.5 7.019 21.5 11.05v1.9c0 1.208 0 2.235-.034 3.115c-.027.705-.04 1.057-.307 1.19c-.267.13-.566-.08-1.163-.503L18.65 15.8"></path> <path d="M14.945 12.395c-.176.627-1.012 1.07-2.682 1.955c-1.615.856-2.422 1.285-3.073 1.113a1.66 1.66 0 0 1-.712-.393C8 14.62 8 13.746 8 12s0-2.62.478-3.07c.198-.186.443-.321.712-.392c.65-.173 1.458.256 3.073 1.112c1.67.886 2.506 1.329 2.682 1.955c.073.259.073.531 0 .79Z"></path> </g> </svg>
);

const IconStatFollowers = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={STAT_ICON_SIZE} height={STAT_ICON_SIZE} viewBox="0 0 24 24"> <path d="M0 0h24v24H0z" fill="none"></path> <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"> <path d="M7.5 19.5c0-.966.329-1.942 1.13-2.48A6.04 6.04 0 0 1 12 16c1.248 0 2.407.376 3.37 1.02c.802.538 1.13 1.514 1.13 2.48"></path> <circle cx="12" cy="11" r="2.5"></circle> <path d="M17.5 11c1.11 0 2.142.377 2.997 1.022c.726.548 1.003 1.473 1.003 2.382v.096"></path> <circle cx="17.5" cy="6.5" r="2"></circle> <path d="M6.5 11c-1.11 0-2.142.377-2.997 1.022c-.726.548-1.003 1.473-1.003 2.382v.096"></path> <circle cx="6.5" cy="6.5" r="2"></circle> </g> </svg>
);

const STAT_ICONS = {
  team: IconStatTeam,
  stories: IconStatStories,
  views: IconStatViews,
  videos: IconStatVideos,
  followers: IconStatFollowers,
};

export function StatIcon({ statKey }: { statKey?: string }) {
  const Icon = STAT_ICONS[statKey] || IconStatTeam;
  return <Icon />;
}

/* "+30" and "+10" arrive without their unit: the design puts "ألف" / "K" after
   the views and followers figures through the shared `one_thousand` key, which
   the DOM translator fills. Only those two carry it, exactly as before. */
export const STAT_KEYS_WITH_THOUSANDS = ["views", "followers"];
