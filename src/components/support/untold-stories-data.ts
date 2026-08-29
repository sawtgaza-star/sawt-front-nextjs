/* "أصوات لم نقدر على توصيلها" — slider cards.
   Copy reuses the home page's real-stories keys (rs_*) since the mock shows
   the same two stories; the later cards repeat them as in the design. */

export type UntoldStory = {
  key: string;
  image: string;
  title: string;
  titleKey: string;
  full: string;
  fullKey: string;
  /* the card's arrow opens /stories/{slug} — see components/stories/story-data */
  slug: string;
};

const TEA_FULL =
  "من قلب غزة المحاصرة، حوّل صانع المحتوى كوب الشاي البسيط إلى رمزٍ للصمود وسط الحصار. التقطت منصة صوت حكايته وأوصلتها إلى العالم، لتتحوّل كاسة شاي إلى رسالة أملٍ وإصرار.";

const SAMIR_FULL =
  "في وسط دمار غزة، اختُطف صانع المحتوى سمير وأُصيبت يده بوحشية، واضطر إلى الهجرة إلى الأردن بحثاً عن الأمان. منصة صوت التقطت صورته ونقلت قصته للعالم، فصار صوته أعلى من القنابل وحمل رسالة الأمل لآلاف الفلسطينيين.";

export const UNTOLD_STORIES: UntoldStory[] = [
  {
    key: "tea",
    image: "/assets/images/tea.png",
    title: "أغلي كاسة شاي",
    titleKey: "rs_card1_title",
    full: TEA_FULL,
    fullKey: "rs_card1_full",
    slug: "tea",
  },
  {
    key: "samir",
    image: "/assets/images/boy.png",
    title: "سمير البطل",
    titleKey: "rs_card2_title",
    full: SAMIR_FULL,
    fullKey: "rs_card2_full",
    slug: "samir",
  },
  {
    key: "samir-2",
    image: "/assets/images/Yamal.png",
    title: "سمير البطل",
    titleKey: "rs_card2_title",
    full: SAMIR_FULL,
    fullKey: "rs_card2_full",
    slug: "samir",
  },
  {
    key: "tea-2",
    image: "/assets/images/tea.png",
    title: "أغلي كاسة شاي",
    titleKey: "rs_card1_title",
    full: TEA_FULL,
    fullKey: "rs_card1_full",
    slug: "tea",
  },
];
