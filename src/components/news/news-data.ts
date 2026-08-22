export type NewsItem = {
  id: number;
  img: string;
  alt: string;
  titleKey: string;
  title: string;
  /* article link — "اقرأ المزيد" opens /news/{id} (see (main)/news/[id]). */
  href?: string;
};

/* The three cards of the home slider (آخر أخبارنا). */
export const HOME_NEWS: NewsItem[] = [
  { id: 1, img: "/assets/images/Rectangle 701.png", alt: "صانع المحتوى", titleKey: "news_card1_title", title: "صانع المحتوى في غزة", href: "/news/1" },
  { id: 2, img: "/assets/images/Rectangle 703.png", alt: "الام في غزة ", titleKey: "news_card2_title", title: "الام في غزة", href: "/news/2" },
  { id: 3, img: "/assets/images/Rectangle 705.png", alt: "صانع المحتوى", titleKey: "news_card1_title", title: "صانع المحتوى في غزة", href: "/news/3" },
];

/* Full listing behind "عرض جميع الأخبار" — placeholder rows repeating the
   design's card, 9 per page over 10 pages, until a real feed is wired up.
   Ids start at 1 so the home slider's /news/1..3 are part of the same set. */
export const ALL_NEWS: NewsItem[] = Array.from({ length: 90 }, (_, i) => ({
  id: i + 1,
  img: "/assets/images/Rectangle 701.png",
  alt: "صانع المحتوى",
  titleKey: "news_card1_title",
  title: "صانع المحتوى في غزة",
  href: `/news/${i + 1}`,
}));

export const NEWS_PER_PAGE = 9;
