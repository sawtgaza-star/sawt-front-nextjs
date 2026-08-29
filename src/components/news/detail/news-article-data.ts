/* Static content for /news/[id].

   There is no feed behind the listing yet (see news-data.ts), so every card
   opens the one article from the mock. When a real API arrives, replace
   getArticle() and nothing in the components has to change.

   The gallery/body photos are the content-creator stock shots already in
   public/assets/images — the mock's newspaper / typewriter / phone shots were
   not part of the handoff. */

export type NewsArticleImage = { src: string; alt: string };

/* Body copy as data. The news article keeps its prose inline in NewsBody (it
   is the mock's own copy); /stories/[slug] reuses the very same components and
   passes its blocks through here. */
export type NewsBodyBlock =
  | { type: "p"; key: string; text: string }
  | { type: "h2"; key: string; text: string }
  | { type: "quote"; key: string; text: string; byKey: string; by: string };

export type NewsArticle = {
  /* the pills above the title */
  categoryKey: string;
  category: string;
  sectionKey: string;
  section: string;
  titleKey: string;
  title: string;
  descKey: string;
  desc: string;
  /* meta row — views · read time · date · author */
  viewsKey: string;
  views: string;
  readTimeKey: string;
  readTime: string;
  dateKey: string;
  date: string;
  authorKey: string;
  author: string;
  gallery: NewsArticleImage[];
  /* the pair of photos under "برامج دعم صانعي المحتوى" */
  bodyImages: NewsArticleImage[];
  /* when set, NewsBody renders these instead of the news mock's own prose */
  body?: NewsBodyBlock[];
};

const ARTICLE: NewsArticle = {
  categoryKey: "nws_cat_gaza",
  category: "غزة",
  sectionKey: "nws_cat_section",
  section: "أخر أخبار صناع المحتوى - تصنيفات الخبر",
  titleKey: "nws_article_title",
  title: "صانع المحتوى في غزة: أصوات تروي القصة من الداخل",
  descKey: "nws_article_desc",
  desc: "نشارككم آخر تحديثات صانعي المحتوى في غزة، حيث يعملون على إبراز قصص المبدعين وإيصال أصواتهم إلى العالم",
  viewsKey: "nws_meta_views",
  views: "١٢٤٥ مشاهدة",
  readTimeKey: "nws_meta_read",
  readTime: "5 دقائق قراءة",
  dateKey: "nws_meta_date",
  date: "5 مارس 2026",
  authorKey: "nws_meta_author",
  author: "فريق منصة صوت",
  gallery: [
    { src: "/assets/images/27b38b38a6fe04f1e0f06a188549a9cc7508ab4f.jpg", alt: "صانع المحتوى في غزة" },
    { src: "/assets/images/042ae163aa0d78003024d720046b35cdf2cea552.jpg", alt: "فريق تصوير أثناء العمل" },
    { src: "/assets/images/bac7442160787c37131e5f9a31e3703041164e49.jpg", alt: "استوديو تصوير المحتوى" },
    { src: "/assets/images/939948c90beeea5448d93e57769396241090bb08.jpg", alt: "جلسة عمل لصناع المحتوى" },
  ],
  bodyImages: [
    { src: "/assets/images/939948c90beeea5448d93e57769396241090bb08.jpg", alt: "ورشة عمل إبداعية" },
    { src: "/assets/images/bac7442160787c37131e5f9a31e3703041164e49.jpg", alt: "تدريب على أدوات الإنتاج" },
  ],
};

export function getArticle(_id: string): NewsArticle {
  return ARTICLE;
}
