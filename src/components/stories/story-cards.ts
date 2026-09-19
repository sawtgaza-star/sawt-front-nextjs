/* GET /pages/stories rows → the shape <StoryCard /> renders.

   The cards arrive in the reader's language and therefore carry NO `*Key`
   fields: a `data-i18n` on copy React owns is what makes applyTranslations()
   fight React (see the note in NewsCard). StoryCard falls back to its built-in
   Arabic + key for every slot an API row leaves empty.

   `footer_title` is not mapped: it repeats `headline` in the rows the feed has
   answered so far, and the poster has no second place to show it.

   The arrow links to /stories/{uuid}: GET /pages/stories/{uuid} resolves that
   identifier only, so it is the one every route into a story carries — the
   home slider included (see home/RealStories). */

import { localized } from "@/lib/api/pages";
import type { StoryListItem } from "@/lib/api/stories";
import type { StoryCardItem } from "./story-data";

/** The story behind a card. The detail endpoint resolves the uuid only, so a
    row without one is not linkable. */
export function storyHref(item: { uuid?: string }): string {
  return item.uuid ? `/stories/${item.uuid}` : "#";
}

export function storyCards(
  items: StoryListItem[] | undefined,
  lang: string,
): StoryCardItem[] {
  if (!Array.isArray(items)) return [];

  return items.map((item, index) => ({
    id: item.uuid || item.id || index,
    href: storyHref(item),
    image: item.cover_image || "",
    badge: localized(item.badge, lang),
    title: localized(item.headline, lang),
    desc: localized(item.footer_subtitle, lang),
    full: localized(item.excerpt, lang),
  }));
}
