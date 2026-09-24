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

   `reels` carries the "الأكثر مشاهدة" heading, its "رؤية المزيد" label and the
   reels themselves — one list, mirrored from the platform's Instagram account,
   which is why an item reads like a post rather than an upload: `caption`,
   `permalink`, `username`, `likes`, `collaborators`. `status` says whether the
   backend could reach that account at all ("ok"; "token_expired" when its
   access token needs refreshing, and then `items` comes back empty).

   That single list is everything the page draws: the grid under the filter bar
   and the "الأكثر مشاهدة" row below it both render it — the payload has no
   second list, and the page keeps no bundled reels of its own any more.

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

/** A reel of the "الأكثر مشاهدة" list, as the API mirrors it from Instagram.

    `views` and `reach` are the account's insights and come back null unless
    the backend's token is scoped for them — `likes` is the number that is
    always there. `video_url` is a CDN link with an expiry baked into its query
    string, and it is empty on an item Instagram served no file for; such an
    item is dropped rather than drawn as a black card (see `reelsFromApi` in
    components/content/content-data). */
export type ContentReel = {
  id?: number | string;
  caption?: string | null;
  thumbnail?: string | null;
  video_url?: string | null;
  permalink?: string | null;
  username?: string | null;
  likes?: number | null;
  comments_count?: number | null;
  views?: number | null;
  reach?: number | null;
  collaborators?: string[];
  /** ISO 8601, e.g. "2026-09-11T11:07:11+0000". */
  posted_at?: string | null;
  sort_order?: number;
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
    it. Applied once, on the way out of the fetch, so no section has to know.
    A reel's files are Instagram CDN links, which `assetUrl` passes through
    untouched — it only rewrites the API's own /storage/ paths. */
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
        thumbnail: assetUrl(reel.thumbnail),
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
