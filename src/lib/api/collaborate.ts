/* =========================================================
   The "تعاون معنا" page from the Sawt API (base + error shape: ./client).

     GET /pages/collaborate → { data: { hero, types } }

   One request paints /collaborate: the breadcrumb hero's copy and backdrop,
   and the four cards of "اختر نوع التعاون".

   Same conventions as ./pages: every text field arrives as { ar, en } and is
   picked per the language the site is currently in (`localized`), and uploads
   arrive as absolute URLs that are pulled back onto the API host (`assetUrl`).

   WHAT THE PAYLOAD DOES NOT SEND is each type's destination: the four flows
   (/collaborate/creator, /funding, /partnership, /other) are this site's
   pages, not the API's, so a card is matched to its flow — and to the design's
   glyph, since `icon_url` is null for all four — by its `key`. See
   components/collaborate/collaborate-types-data.

   The keys are the API's own: the flow this site calls `funding` is
   `sponsorship` there.
   ========================================================= */

import { apiFetch } from "./client";
import { assetUrl, type Localized } from "./pages";

type Envelope<T> = { message?: string; data?: T };

export type CollaborateHeroContent = {
  image_url?: string | null;
  title?: Localized;
  description?: Localized;
};

/** One option of "اختر نوع التعاون", as the API lists it. */
export type CollaborateTypeItem = {
  uuid?: string;
  id?: number;
  /** creator | sponsorship | partnership | other — what names the flow. */
  key?: string | null;
  title?: Localized;
  description?: Localized;
  icon_url?: string | null;
  sort_order?: number;
};

export type CollaboratePage = {
  hero?: CollaborateHeroContent;
  types?: CollaborateTypeItem[];
};

/** The editor's order, with an entry that carries no `sort_order` left where
    it arrived — same rule as the other lists (api/media-page `sortItems`). */
function sorted(types: CollaborateTypeItem[] | undefined): CollaborateTypeItem[] {
  if (!Array.isArray(types)) return [];
  return types
    .map((item, index) => ({ item, index }))
    .sort(
      (a, b) =>
        (a.item.sort_order ?? a.index) - (b.item.sort_order ?? b.index) ||
        a.index - b.index,
    )
    .map((entry) => entry.item);
}

/** Same payload with every upload URL pointed at the host that actually serves
    it, and the types in the order they are to be shown. */
function normalize(page: CollaboratePage): CollaboratePage {
  return {
    ...page,
    hero: page.hero && { ...page.hero, image_url: assetUrl(page.hero.image_url) },
    types: sorted(page.types).map((type) => ({
      ...type,
      icon_url: assetUrl(type.icon_url),
    })),
  };
}

export async function fetchCollaboratePage(
  signal?: AbortSignal,
): Promise<CollaboratePage | null> {
  const payload = await apiFetch<Envelope<CollaboratePage>>("/pages/collaborate", {
    signal,
  });
  return payload?.data ? normalize(payload.data) : null;
}
