/* =========================================================
   Editable page content from the Sawt API (base + error shape: ./client).

     GET /pages/about   → { data: { hero, intro, values, platform, story, join } }

   Every text field arrives as { ar, en } — the API sends both languages at once
   rather than reading Accept-Language, so the picker below chooses per the
   language the site is currently in (see lib/use-lang.ts). Images arrive as
   absolute URLs and are null until an editor uploads one.

   This payload is the ONLY source the About page has: the sections carry no
   built-in copy, so a field the API doesn't send is a field the visitor doesn't
   see, and an outage leaves the page empty below the header.
   ========================================================= */

import { API_ORIGIN, apiFetch } from "./client";

/** One string in both languages; either side may be missing. */
export type Localized = { ar?: string | null; en?: string | null };

type Envelope<T> = { message?: string; data?: T };

export type AboutHeroContent = {
  image_url: string | null;
  title: Localized;
  description: Localized;
};

export type AboutIntroContent = {
  image_url: string | null;
  title: Localized;
  body: Localized;
};

/** A value card / a story card — same shape, different section. */
export type AboutCard = {
  icon_url: string | null;
  title: Localized;
  description: Localized;
  sort_order?: number;
};

export type AboutValuesContent = {
  title: Localized;
  subtitle: Localized;
  items: AboutCard[];
};

export type AboutPlatformContent = {
  image_url: string | null;
  title: Localized;
  description: Localized;
};

export type AboutStoryContent = {
  title: Localized;
  subtitle: Localized;
  cards: AboutCard[];
};

export type AboutJoinContent = {
  image_url: string | null;
  title: Localized;
  description: Localized;
  button_text: Localized;
};

export type AboutPage = {
  hero?: AboutHeroContent;
  intro?: AboutIntroContent;
  values?: AboutValuesContent;
  platform?: AboutPlatformContent;
  story?: AboutStoryContent;
  join?: AboutJoinContent;
};

/* ---------------------------------------------------------------------------
   Upload URLs.

   The files an editor uploads live on the API host — api.sawtgaza.com/storage/…
   serves them with `image/jpeg` — but the API builds their public URLs against
   the marketing domain (sawtgaza.com/storage/…), which answers 404 with an HTML
   body. The browser then blocks that response outright (ERR_BLOCKED_BY_ORB) and
   the hero paints no background at all, which reads as "my new image didn't
   show up".

   The real fix is one setting on the backend: Laravel's APP_URL / the `public`
   disk's `url` in config/filesystems.php should be the API host, and then every
   URL in the payload resolves on its own. Until that ships, a /storage/ path is
   pulled back onto the origin the API itself is served from. Everything else —
   a CDN URL, a data: URI, an already-correct URL — is passed through untouched,
   so this stays a no-op the moment the backend is corrected.
   --------------------------------------------------------------------------- */
export function assetUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  if (!API_ORIGIN) return url;
  try {
    const resolved = new URL(url, API_ORIGIN);
    if (!resolved.pathname.startsWith("/storage/")) return url;
    return `${API_ORIGIN}${resolved.pathname}${resolved.search}`;
  } catch {
    // Not a URL this can reason about — hand it to the browser as it came.
    return url;
  }
}

/** Same payload with every upload URL pointed at the host that actually serves
    it. Applied once, on the way out of the fetch, so no section has to know. */
function withAssetUrls(page: AboutPage): AboutPage {
  const cards = (list: AboutCard[] | undefined) =>
    Array.isArray(list)
      ? list.map((card) => ({ ...card, icon_url: assetUrl(card.icon_url) }))
      : list;

  return {
    ...page,
    hero: page.hero && { ...page.hero, image_url: assetUrl(page.hero.image_url) },
    intro: page.intro && { ...page.intro, image_url: assetUrl(page.intro.image_url) },
    platform: page.platform && {
      ...page.platform,
      image_url: assetUrl(page.platform.image_url),
    },
    join: page.join && { ...page.join, image_url: assetUrl(page.join.image_url) },
    values: page.values && { ...page.values, items: cards(page.values.items) },
    story: page.story && { ...page.story, cards: cards(page.story.cards) },
  };
}

export async function fetchAboutPage(signal?: AbortSignal): Promise<AboutPage | null> {
  const payload = await apiFetch<Envelope<AboutPage>>("/pages/about", { signal });
  return payload?.data ? withAssetUrls(payload.data) : null;
}

/** The field in the current language, falling back to the other one — a page
    section is better shown in Arabic than left blank when `en` is still empty.
    Returns "" for a missing field, which every section reads as "keep what the
    static markup says". */
export function localized(value: Localized | null | undefined, lang: string): string {
  if (!value) return "";
  const preferred = lang === "en" ? value.en : value.ar;
  return (preferred || value.ar || value.en || "").trim();
}

/** Cards in the order the editor arranged them. Entries without `sort_order`
    keep the order the API listed them in. */
export function sorted(cards: AboutCard[] | undefined): AboutCard[] {
  if (!Array.isArray(cards)) return [];
  return cards
    .map((card, index) => ({ card, index }))
    .sort(
      (a, b) =>
        (a.card.sort_order ?? a.index) - (b.card.sort_order ?? b.index) || a.index - b.index,
    )
    .map((entry) => entry.card);
}
