/* "أين تذهب تبرعاتكم؟" — how each donated dollar is split.
   Order matches the mock: 40% first (right-most in RTL).
   `color` drives the card border, top pill, percentage, bullets and progress
   fill; `tint` is the soft wash behind the icon and under the progress track. */

import { localized } from "@/lib/api/pages";
import type { SupportAllocationItem } from "@/lib/api/support";

export type Allocation = {
  key: string;
  percent: number;
  color: string;
  tint: string;
  icon: "lightbulb" | "mic" | "book";
  title: string;
  /** Only the built-in copy carries i18n keys — the API's is already in the
      current language. */
  titleKey?: string;
  desc: string;
  descKey?: string;
  items: { text: string; key?: string }[];
};

const ITEMS = [
  { text: "أدوات إنتاج احترافية", key: "support_alloc_item_1" },
  { text: "منح للمواهب الصاعدة", key: "support_alloc_item_2" },
  { text: "بيئة إبداعية آمنة ومحفّزة", key: "support_alloc_item_3" },
];

const DESC =
  "دعم المبدعين الشباب في غزة بالأدوات والتدريب ليُنتجوا محتوى يُغيّر الرواية ويصنع أثراً حقيقياً.";

export const ALLOCATIONS: Allocation[] = [
  {
    key: "creators",
    percent: 40,
    color: "#FF7420",
    tint: "#FFF1E7",
    icon: "lightbulb",
    title: "تمكين المبدعين",
    titleKey: "support_alloc_creators_title",
    desc: DESC,
    descKey: "support_alloc_desc",
    items: ITEMS,
  },
  {
    key: "media",
    percent: 35,
    color: "#4C5C37",
    tint: "#EEF1EA",
    icon: "mic",
    title: "التوثيق والإعلام",
    titleKey: "support_alloc_media_title",
    desc: DESC,
    descKey: "support_alloc_desc",
    items: ITEMS,
  },
  {
    key: "education",
    percent: 25,
    color: "#6D6D6D",
    tint: "#EFEFEF",
    icon: "book",
    title: "الدعم النفسي والتعليمي",
    titleKey: "support_alloc_education_title",
    desc: DESC,
    descKey: "support_alloc_desc",
    items: ITEMS,
  },
];

/* GET /pages/support's `fund_allocation.items`, resolved for one language.
   The API sends the copy and the share; the look (colour, tint, glyph) is the
   design's, matched by `key` — the API calls the third one `ops` — and by
   position for a key this site doesn't know. The built-in three stand in when
   the API sent none. */
const LOOK_BY_KEY: Record<string, number> = { creators: 0, media: 1, ops: 2, education: 2 };

export function resolveAllocations(
  items: SupportAllocationItem[] | undefined,
  lang: string,
): Allocation[] {
  const resolved = (items || [])
    .map((item, index): Allocation => {
      const key = (item.key || "").trim().toLowerCase();
      const look = ALLOCATIONS[LOOK_BY_KEY[key] ?? index % ALLOCATIONS.length];
      const pct = Number(item.pct);
      return {
        key: key || String(index),
        percent: Number.isFinite(pct) ? Math.min(100, Math.max(0, pct)) : 0,
        color: look.color,
        tint: look.tint,
        icon: look.icon,
        title: localized(item.title, lang),
        desc: localized(item.description, lang),
        items: (item.bullets || [])
          .map((bullet) => ({ text: localized(bullet, lang) }))
          .filter((bullet) => bullet.text),
      };
    })
    // an entry with no title is an empty row in the admin
    .filter((a) => a.title);

  return resolved.length ? resolved : ALLOCATIONS;
}
