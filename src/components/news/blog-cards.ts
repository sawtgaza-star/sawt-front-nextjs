/* GET /pages/blogs rows → the shape <NewsCard /> renders.

   The cards arrive in the reader's language and therefore carry NO `titleKey`:
   a `data-i18n` on copy React owns is what makes applyTranslations() fight
   React (see the note in NewsCard). `readMore` is deliberately left out — the
   listing payload has no label for it, so the card keeps its own `read_more`
   key, which is chrome the translator may keep owning.

   `formatDate` is the home page's helper: one date format for every API date
   on the site, rather than a second copy that could drift from it. */

import { localized } from "@/lib/api/pages";
import { formatDate } from "@/components/home/home-text";
import type { BlogListItem } from "@/lib/api/blogs";
import type { NewsItem } from "./news-data";

/** The article behind a card. The detail endpoint resolves the uuid only, so a
    row without one is not linkable. */
export function blogHref(item: { uuid?: string }): string {
  return item.uuid ? `/news/${item.uuid}` : "#";
}

export function blogCards(
  items: BlogListItem[] | undefined,
  lang: string,
): NewsItem[] {
  if (!Array.isArray(items)) return [];

  return items.map((item, index) => {
    const title = localized(item.title, lang);
    return {
      id: item.uuid || item.id || index,
      img: item.cover_image || "",
      alt: title,
      title,
      desc: localized(item.excerpt, lang),
      date: formatDate(item.publish_date, lang),
      href: blogHref(item),
    };
  });
}
