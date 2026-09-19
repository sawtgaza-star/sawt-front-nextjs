/* The shape of an article, for /news/{uuid} and /stories/{uuid} alike.

   The mock article this file used to carry — and the getArticle() that handed
   it to every card — is gone: GET /pages/blogs/{uuid} and
   GET /pages/stories/{uuid} answer the real thing (see detail/blog-article and
   stories/story-article, which pour either payload into the type below). */

export type NewsArticleImage = { src: string; alt: string };

/* Body copy as data — what an article that arrives as blocks rather than as
   one HTML string renders through. Both feeds send HTML (`html` below), so
   nothing populates this today; NewsBody still reads it. */
export type NewsBodyBlock =
  | { type: "p"; key: string; text: string }
  | { type: "h2"; key: string; text: string }
  | { type: "quote"; key: string; text: string; byKey: string; by: string };

/* Every `*Key` is optional: an article from the API is already in the reader's
   language, and a `data-i18n` on text React owns is what makes
   applyTranslations() fight React (see NewsCard). Nothing names a key now that
   both feeds are wired; the fields stay for markup the translator still owns. */
export type NewsArticle = {
  /* the pills above the title */
  categoryKey?: string;
  category: string;
  sectionKey?: string;
  section: string;
  /* API articles: the categories the editor tagged, shown in place of the
     category/section pair above — there can be one, two or more */
  tags?: string[];
  titleKey?: string;
  title: string;
  descKey?: string;
  desc: string;
  /* meta row — views · read time · date · author */
  viewsKey?: string;
  views: string;
  readTimeKey?: string;
  readTime: string;
  dateKey?: string;
  date: string;
  authorKey?: string;
  author: string;
  gallery: NewsArticleImage[];
  /* the pair of photos under "برامج دعم صانعي المحتوى" */
  bodyImages: NewsArticleImage[];
  /* when set, NewsBody renders these instead of the news mock's own prose */
  body?: NewsBodyBlock[];
  /* API articles: the editor's rich text, as HTML. Rendered in place of both
     `body` and the mock prose — see NewsBody. */
  html?: string;
  /* API articles: the pull quote, which the payload carries beside the body
     rather than inside it */
  quote?: { text: string; by: string };
};
