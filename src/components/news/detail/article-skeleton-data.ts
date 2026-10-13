/* The shape NewsArticleSkeleton holds room for on /news/{uuid} and
   /stories/{uuid}: how many pills, gallery frames and related cards, and the
   character count of each piece of copy — the head, the pull quote, and every
   block of the editor's HTML body in order.

   An article's length is its own, so no one shape fits them all. Each is
   sampled from a current article of its feed (the one the site links first),
   which keeps a typical article from jumping; a longer or shorter one still
   settles by the difference. Counts are of the filler, not of the copy: some
   are raised so the filler wraps to the same number of lines as the real text
   at 1440/1024/768/390. */

export type BodyBlockLen = { tag: "p" | "h2"; chars: number };

export type ArticleSkeletonShape = {
  tags: number[];
  title: number;
  desc: number;
  /* views · read time · date · author */
  meta: [number, number, number, number];
  frames: number;
  /* the HTML body is cut after its first block and the quote goes in the gap
     (NewsBody) — `lead` is that first block, `rest` the remainder */
  lead: BodyBlockLen[];
  quote: { text: number; by: number } | null;
  rest: BodyBlockLen[];
  related: { title: number; sub: number; cards: number; more: number };
};

const p = (chars: number): BodyBlockLen => ({ tag: "p", chars });
const h2 = (chars: number): BodyBlockLen => ({ tag: "h2", chars });

/** GET /pages/blogs/5jg3y… */
export const NEWS_ARTICLE_SHAPE: ArticleSkeletonShape = {
  tags: [3, 43],
  title: 38,
  desc: 123,
  meta: [10, 11, 14, 13],
  frames: 2,
  lead: [h2(29)],
  quote: { text: 51, by: 20 },
  rest: [
    p(227), p(175), p(170),
    h2(43), p(252), p(170), p(156),
    h2(38), p(245), p(212), p(167),
    h2(30), p(169), p(218), p(130), p(177), p(28),
  ],
  related: { title: 13, sub: 39, cards: 2, more: 16 },
};

/** GET /pages/stories/ez3fj… */
export const STORY_ARTICLE_SHAPE: ArticleSkeletonShape = {
  tags: [3, 24],
  title: 45,
  desc: 167,
  meta: [10, 13, 13, 13],
  frames: 1,
  lead: [p(214)],
  quote: { text: 87, by: 12 },
  rest: [p(209), h2(30), p(268)],
  related: { title: 11, sub: 44, cards: 2, more: 14 },
};
