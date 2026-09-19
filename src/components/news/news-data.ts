/* What a news card is, and how many of them a page of /news holds.

   The mock feed that used to live here — the three home-slider cards and the
   90 rows the listing paged through — is gone: GET /pages/home and
   GET /pages/blogs answer all of it, and a second copy in the bundle would
   only be something to drift from. */

export type NewsItem = {
  id: number | string;
  img: string;
  alt: string;
  /* Absent on every row the API builds — those arrive already translated, so
     their text must NOT be handed to the DOM translator. See NewsCard. */
  titleKey?: string;
  title: string;
  /** API rows only: the card's copy, date and link label, pre-localized. */
  desc?: string;
  date?: string;
  readMore?: string;
  /* article link — "اقرأ المزيد" opens /news/{id} (see (main)/news/[id]). */
  href?: string;
};

/* Rows per page of the listing — what /news asks the API for. */
export const NEWS_PER_PAGE = 9;
