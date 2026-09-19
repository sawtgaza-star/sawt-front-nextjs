/* =========================================================
   The صوت ميديا portfolio from the Sawt API (base: ./client).

     GET /pages/media/works → { data: { path, hero, filters, items } }

   Same conventions as ./media-page, whose `MediaWorkItem` this reuses — the
   listing, /media's works wall and a service page's "نماذج من أعمالنا" are all
   served the same project shape.

   The two filter facets are the payload's own: `filters.services` (key
   "service") and `filters.tags` (key "tag"), each listing the options an
   editor has actually used. A project is matched against them through the
   `service` and `tag` it carries, so the sidebar can never offer a filter that
   matches nothing.
   ========================================================= */

import { apiFetch } from "./client";
import { assetUrl, type Localized } from "./pages";
import type { MediaCta, MediaOption, MediaWorkItem } from "./media-page";

type Envelope<T> = { message?: string; data?: T };

/** الرئيسية › أعمالنا — the first step is a link, the last is the orange one. */
export type MediaWorksBreadcrumb = {
  home?: MediaCta;
  current?: Localized;
};

export type MediaWorksHeroContent = {
  image_url?: string | null;
  title?: Localized;
  breadcrumb?: MediaWorksBreadcrumb;
};

/** One panel of the sidebar: its heading and the boxes under it. `key` names
    the field of a project the options are matched against. */
export type MediaWorksFacet = {
  key?: string | null;
  label?: Localized;
  placeholder?: Localized;
  options?: MediaOption[];
};

export type MediaWorksFilters = {
  services?: MediaWorksFacet;
  tags?: MediaWorksFacet;
};

export type MediaWorksPage = {
  path?: string | null;
  hero?: MediaWorksHeroContent;
  filters?: MediaWorksFilters;
  items?: MediaWorkItem[];
};

/** Every upload URL pointed at the host that actually serves it. Applied once,
    on the way out of the fetch, so no section has to know. */
function withAssetUrls(page: MediaWorksPage): MediaWorksPage {
  return {
    ...page,
    hero: page.hero && { ...page.hero, image_url: assetUrl(page.hero.image_url) },
    items: page.items?.map((work) => ({
      ...work,
      image_url: assetUrl(work.image_url),
    })),
  };
}

export async function fetchMediaWorksPage(
  signal?: AbortSignal,
): Promise<MediaWorksPage | null> {
  const payload = await apiFetch<Envelope<MediaWorksPage>>("/pages/media/works", {
    signal,
  });
  return payload?.data ? withAssetUrls(payload.data) : null;
}

/* The value a project carries for a facet. These are the two the payload
   models; a facet key nothing here knows about matches no project, which is
   what leaves its boxes filtering nothing rather than filtering everything
   away. */
export function workFacetValue(work: MediaWorkItem, facetKey: string): string | undefined {
  if (facetKey === "service") return work.service?.value || work.service?.slug || undefined;
  if (facetKey === "tag") return work.tag?.value || undefined;
  return undefined;
}
