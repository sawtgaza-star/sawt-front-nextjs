/* What a story card is, and how many of them a page of /stories holds.

   This file used to carry the two stories the design ships (كاسة الشاي، سمير)
   as a mock feed, plus the 90 rows the listing paged through and the
   getStory() that resolved a segment to one of them. GET /pages/stories and
   GET /pages/stories/{uuid} answer all of that now — the cards, the article
   and the list of segments the export pre-renders — so the mock is gone rather
   than kept as a second source of truth to drift from. */

/** One `.rs-card` on /stories or in the "قصص ذات صلة" strip — see StoryCard.
    Every field is already in the reader's language (see story-cards): the DOM
    translator owns no part of a card, so nothing here names an i18n key. */
export type StoryCardItem = {
  id: number | string;
  href: string;
  image: string;
  /** the poster's pill — "قصة نجاح" */
  badge: string;
  title: string;
  /** the one-line standfirst under the title */
  desc: string;
  /** the long copy that slides up on hover */
  full: string;
};

/** Rows per page of the listing — what /stories asks the API for. */
export const STORIES_PER_PAGE = 9;
