/* =========================================================
   The "محتوانا" page's content from the Sawt API (base + error shape: ./client).

     GET /pages/content → { data: { hero, reels } }

   Same conventions as ./pages: every text field arrives as { ar, en } and is
   picked per the language the site is currently in (`localized`), and uploads
   arrive as absolute URLs that are pulled back onto the API host (`assetUrl` —
   see the long note there for why).

   WHAT THE PAYLOAD COVERS, AND WHAT IT DOESN'T
   -------------------------------------------
   `hero` is complete: the header backdrop (`image_url`), the headline, the
   lead paragraph and the fanned poster strip (`items`).

   `reels` carries the "الأكثر مشاهدة" heading and its "رؤية المزيد" label,
   plus the reels themselves — but `items` is empty today and `status` says why
   ("token_expired": the row is fed from a social account whose access token
   the backend has to refresh). The page keeps its bundled demo reels on screen
   until real ones arrive; see `reelsFromApi` in components/content/content-data.

   The category pills, their counts and the sort dropdown have NO field in this
   payload at all — they stay local chrome with their `data-i18n` keys.
   ========================================================= */

import { apiFetch } from "./client";
import { assetUrl, type Localized } from "./pages";

type Envelope<T> = { message?: string; data?: T };

/* ---------------------------------------------------------------- hero */

/** One poster of the fanned strip under the hero copy. */
export type ContentHeroPoster = {
  image_url?: string | null;
  sort_order?: number;
};

export type ContentHeroContent = {
  /** The header's backdrop — replaces the bundled one when an editor sets it. */
  image_url?: string | null;
  title?: Localized;
  description?: Localized;
  items?: ContentHeroPoster[];
};

/* --------------------------------------------------------------- reels */

/** A reel of the "الأكثر مشاهدة" row.

    The API has not served one yet (see the note at the top), so the field
    names it will use aren't settled. The handful below are the ones the rest
    of the API already uses for the same things — `uuid`/`id`, a `*_url` for
    the file, `views`, `published_at` — and `reelsFromApi` reads whichever of
    them turns up. An item with no playable URL is dropped rather than rendered
    as a black card. */
export type ContentReel = {
  uuid?: string;
  id?: number | string;
  video_url?: string | null;
  media_url?: string | null;
  thumbnail_url?: string | null;
  views?: number | null;
  published_at?: string | null;
};

export type ContentReels = {
  title?: Localized;
  /** Label of the "رؤية المزيد" link beside the heading. */
  view_more?: Localized;
  /** "ok" / "token_expired" … — why `items` is empty, when it is. */
  status?: string | null;
  message?: string | null;
  items?: ContentReel[];
};

export type ContentPage = {
  hero?: ContentHeroContent;
  reels?: ContentReels;
};

/** `list.map(fn)` that tolerates the field being absent or not an array — the
    payload omits a section's `items` entirely when the editor added none. */
function mapList<T>(list: T[] | undefined, fn: (item: T) => T): T[] | undefined {
  return Array.isArray(list) ? list.map(fn) : list;
}

/** Same payload with every upload URL pointed at the host that actually serves
    it. Applied once, on the way out of the fetch, so no section has to know. */
function withAssetUrls(page: ContentPage): ContentPage {
  return {
    ...page,
    hero: page.hero && {
      ...page.hero,
      image_url: assetUrl(page.hero.image_url),
      items: mapList(page.hero.items, (poster) => ({
        ...poster,
        image_url: assetUrl(poster.image_url),
      })),
    },
    reels: page.reels && {
      ...page.reels,
      items: mapList(page.reels.items, (reel) => ({
        ...reel,
        video_url: assetUrl(reel.video_url),
        media_url: assetUrl(reel.media_url),
        thumbnail_url: assetUrl(reel.thumbnail_url),
      })),
    },
  };
}

export async function fetchContentPage(
  signal?: AbortSignal,
): Promise<ContentPage | null> {
  const payload = await apiFetch<Envelope<ContentPage>>("/pages/content", {
    signal,
  });
  return payload?.data ? withAssetUrls(payload.data) : null;
}
