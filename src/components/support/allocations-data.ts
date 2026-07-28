/* "أين تذهب تبرعاتكم؟" — how each donated dollar is split.
   Order matches the mock: 40% first (right-most in RTL).
   `color` drives the card border, top pill, percentage, bullets and progress
   fill; `tint` is the soft wash behind the icon and under the progress track. */

export type Allocation = {
  key: string;
  percent: number;
  color: string;
  tint: string;
  icon: "lightbulb" | "mic" | "book";
  title: string;
  titleKey: string;
  desc: string;
  descKey: string;
  items: { text: string; key: string }[];
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
