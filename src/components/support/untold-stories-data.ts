/* "أصوات لم نقدر على توصيلها" — slider cards.
   Copy reuses the home page's real-stories keys (rs_*) since the mock shows
   the same two stories; the later cards repeat them as in the design. */

import { localized } from "@/lib/api/pages";
import type { SupportStoryItem } from "@/lib/api/support";

export type UntoldStory = {
  key: string;
  image: string;
  title: string;
  titleKey: string;
  full: string;
  fullKey: string;
  /* Names the mock story this card repeats. NOT a link any more: /stories/{id}
     resolves the API's uuid only, so the arrow opens the listing instead —
     see UntoldStories. */
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

/** One slide as the slider draws it — the API's story, or a built-in card
    (whose copy keeps its data-i18n keys). */
export type StorySlide = {
  key: string;
  image: string;
  badge: string;
  badgeKey?: string;
  title: string;
  titleKey?: string;
  subtitle: string;
  subtitleKey?: string;
  full: string;
  fullKey?: string;
  href: string;
};

/* GET /pages/support's `stories.items`, resolved for one language. The API's
   stories carry the uuid /stories/{id} resolves, so their arrow opens the
   story itself; the built-in cards still open the listing. */
export function resolveStorySlides(
  items: SupportStoryItem[] | undefined,
  lang: string,
): StorySlide[] {
  const resolved = (items || [])
    .map((item, index): StorySlide => {
      // uuid only — /stories/{id} is prerendered per uuid (same as RealStories)
      const id = item.uuid || "";
      return {
        key: `${id || item.id || "story"}-${index}`,
        image: item.cover_image || "/assets/images/tea.png",
        badge: localized(item.badge, lang),
        title: localized(item.headline, lang) || localized(item.footer_title, lang),
        subtitle: localized(item.footer_subtitle, lang),
        full: localized(item.excerpt, lang),
        href: id ? `/stories/${encodeURIComponent(id)}` : "/stories",
      };
    })
    .filter((slide) => slide.title);

  if (resolved.length) return resolved;
  return UNTOLD_STORIES.map((s) => ({
    key: s.key,
    image: s.image,
    badge: "قصة نجاح",
    badgeKey: "rs_badge",
    title: s.title,
    titleKey: s.titleKey,
    subtitle: "من غزة الى الأردن وأمل لايمشي مجددا",
    subtitleKey: "rs_card_desc",
    full: s.full,
    fullKey: s.fullKey,
    href: "/stories",
  }));
}
