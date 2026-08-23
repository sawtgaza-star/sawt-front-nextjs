/* "أرقام نفخر بها" — listed in the design's order (first = rightmost in RTL).
   `value` keeps its +/% suffix out of the number so runCounters() can animate
   the digits, exactly like the home and incubator stat strips. */
export type MediaStat = { key: string; value: string; label: string; labelKey: string };

export const MEDIA_STATS: MediaStat[] = [
  { key: "campaigns", value: "120+", label: "حملة إعلامية منفذة", labelKey: "sm_stat_campaigns" },
  { key: "years", value: "5+", label: "سنوات خبرة", labelKey: "sm_stat_years" },
  { key: "satisfaction", value: "98%", label: "نسبة رضا العملاء", labelKey: "sm_stat_satisfaction" },
  { key: "clients", value: "50+", label: "عميل سعيد", labelKey: "sm_stat_clients" },
  { key: "projects", value: "200+", label: "مشروع منجز", labelKey: "sm_stat_projects" },
];
