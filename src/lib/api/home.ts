/* =========================================================
   The home page's content from the Sawt API (base + error shape: ./client).

     GET /pages/home -> { data: { hero, stats, who_we_are, news, creators,
                                  platform_sections, partners, stories, team,
                                  join_cta, reviews } }

   Same conventions as ./pages: every text field arrives as { ar, en } and is
   picked per the language the site is currently in (`localized`), and uploads
   arrive as absolute URLs that are pulled back onto the API host (`assetUrl` —
   see the long note there for why).

   One request carries the whole page. As on /about, the sections keep no copy
   of their own behind these fields: what the editor leaves empty renders
   empty, and an outage leaves the page as its skeleton gave way to — see
   components/home/HomeContent.

   NOT covered here: the reels column and the comment thread under
   "آراؤكم في المحتوى". `reviews.reels` / `reviews.comments` are read for their
   title and description only — the reel player and the comment list are still
   driven by lib/legacy-main's own `reelsData` (roadmap item 5). The API is
   currently answering `reels: []` with `reels_status: "token_expired"` anyway.
   ========================================================= */

import { apiFetch } from "./client";
import { assetUrl, type Localized } from "./pages";

type Envelope<T> = { message?: string; data?: T };

/** A button/link the API labels but doesn't route — every destination on this
    page is a route of THIS app, resolved in the section that renders it. */
export type HomeCta = { label?: Localized };

/* ---------------------------------------------------------------- hero */

export type HomeHeroSlide = {
  image_url?: string | null;
  title?: Localized;
  subtitle?: Localized;
  sort_order?: number;
};

export type HomeHero = {
  /** The line beside the five stars, one for the whole carousel. */
  trust?: Localized;
  buttons?: { support?: HomeCta; collaborate?: HomeCta };
  slides?: HomeHeroSlide[];
};

/* --------------------------------------------------------------- stats */

/** `key` picks the icon (see components/home/stat-icons); `value` is the
    number the counter animates up to, exactly as the editor typed it. */
export type HomeStat = {
  key?: string;
  value?: string;
  label?: Localized;
};

export type HomeStats = { items?: HomeStat[] };

/* ---------------------------------------------------------- who we are */

export type HomeFeature = {
  icon_url?: string | null;
  title?: Localized;
  sort_order?: number;
};

export type HomeWhoWeAre = {
  section_title?: Localized;
  section_subtitle?: Localized;
  image_url?: string | null;
  title?: Localized;
  /** The mobile layout's short lead above the description. */
  lead?: Localized;
  description?: Localized;
  features?: HomeFeature[];
  cta?: HomeCta;
};

/* ---------------------------------------------------------------- news */

export type HomeNewsItem = {
  uuid?: string;
  id?: number;
  title?: Localized;
  cover_image?: string | null;
  excerpt?: Localized;
  publish_date?: string | null;
};

export type HomeNews = {
  title?: Localized;
  subtitle?: Localized;
  read_more?: Localized;
  view_all?: HomeCta;
  items?: HomeNewsItem[];
};

/* ------------------------------------------------------------ creators */

export type HomeCreator = {
  uuid?: string;
  id?: number;
  /** Not localized by the API — one name, shown in both languages. */
  name?: string | null;
  role?: Localized;
  avatar_url?: string | null;
  followers_count?: number | null;
  experience_excerpt?: Localized;
};

export type HomeCreators = {
  title?: Localized;
  description?: Localized;
  view_all?: HomeCta;
  /** Heading of the card's hover panel ("تجربتي مع صوت"). */
  experience_title?: Localized;
  /** The word after the follower count on the card's badge. */
  followers_suffix?: Localized;
  items?: HomeCreator[];
};

/* ---------------------------------------------------- platform sections */

export type HomePlatformItem = {
  image_url?: string | null;
  icon_url?: string | null;
  title?: Localized;
  description?: Localized;
  /** Two free-text figures under the copy — no icon comes with them. */
  stats?: Localized[];
  cta?: HomeCta;
  sort_order?: number;
};

export type HomePlatformSections = {
  title?: Localized;
  subtitle?: Localized;
  items?: HomePlatformItem[];
};

/* ------------------------------------------------------------ partners */

export type HomePartner = {
  name?: string | null;
  logo_url?: string | null;
  sort_order?: number;
};

export type HomePartners = {
  title?: Localized;
  subtitle?: Localized;
  items?: HomePartner[];
};

/* ------------------------------------------------------------- stories */

export type HomeStoryItem = {
  uuid?: string;
  id?: number;
  cover_image?: string | null;
  /** The pill on the card ("غزة"), not the section's own badge below. */
  badge?: Localized;
  headline?: Localized;
  excerpt?: Localized;
  footer_title?: Localized;
  footer_subtitle?: Localized;
};

export type HomeStories = {
  title?: Localized;
  description?: Localized;
  /** "+100 قصة واقعية…" — the counted line under the description. */
  badge?: Localized;
  view_all?: HomeCta;
  items?: HomeStoryItem[];
};

/* ---------------------------------------------------------------- team */

/** `major` has arrived both ways: a plain { ar, en } and a taxonomy object
    with its own localized `name`. Neither is rendered on the home card (the
    design shows the name alone), so both shapes are simply accepted. */
export type HomeTeamMajor = Localized & {
  uuid?: string;
  name?: Localized;
  slug?: string;
};

export type HomeTeamMember = {
  uuid?: string;
  id?: number;
  image?: string | null;
  name?: Localized;
  role?: Localized;
  major?: HomeTeamMajor;
};

export type HomeTeam = {
  title?: Localized;
  subtitle?: Localized;
  /** Label of the "عرض الملف الشخصي" button under each card. */
  profile_cta?: Localized;
  items?: HomeTeamMember[];
};

/* ------------------------------------------------------------- join cta */

export type HomeJoinCta = {
  image_url?: string | null;
  title?: Localized;
  description?: Localized;
  button?: HomeCta;
};

/* ------------------------------------------------------------- reviews */

/** Only `title` and `description` are rendered — see the note at the top. */
export type HomeReviews = {
  title?: Localized;
  description?: Localized;
  reels_enabled?: boolean;
  reels_status?: string | null;
  reels_message?: string | null;
  reels?: unknown[];
  comments?: { count?: number; items?: unknown[] };
};

export type HomePage = {
  hero?: HomeHero;
  stats?: HomeStats;
  who_we_are?: HomeWhoWeAre;
  news?: HomeNews;
  creators?: HomeCreators;
  platform_sections?: HomePlatformSections;
  partners?: HomePartners;
  stories?: HomeStories;
  team?: HomeTeam;
  join_cta?: HomeJoinCta;
  reviews?: HomeReviews;
};

/** `list.map(fn)` that tolerates the field being absent or not an array — the
    payload omits a section's `items` entirely when the editor added none. */
function mapList<T>(list: T[] | undefined, fn: (item: T) => T): T[] | undefined {
  return Array.isArray(list) ? list.map(fn) : list;
}

/** Same payload with every upload URL pointed at the host that actually serves
    it. Applied once, on the way out of the fetch, so no section has to know. */
function withAssetUrls(page: HomePage): HomePage {
  return {
    ...page,
    hero: page.hero && {
      ...page.hero,
      slides: mapList(page.hero.slides, (slide) => ({
        ...slide,
        image_url: assetUrl(slide.image_url),
      })),
    },
    who_we_are: page.who_we_are && {
      ...page.who_we_are,
      image_url: assetUrl(page.who_we_are.image_url),
      features: mapList(page.who_we_are.features, (feature) => ({
        ...feature,
        icon_url: assetUrl(feature.icon_url),
      })),
    },
    news: page.news && {
      ...page.news,
      items: mapList(page.news.items, (item) => ({
        ...item,
        cover_image: assetUrl(item.cover_image),
      })),
    },
    creators: page.creators && {
      ...page.creators,
      items: mapList(page.creators.items, (item) => ({
        ...item,
        avatar_url: assetUrl(item.avatar_url),
      })),
    },
    platform_sections: page.platform_sections && {
      ...page.platform_sections,
      items: mapList(page.platform_sections.items, (item) => ({
        ...item,
        image_url: assetUrl(item.image_url),
        icon_url: assetUrl(item.icon_url),
      })),
    },
    partners: page.partners && {
      ...page.partners,
      items: mapList(page.partners.items, (item) => ({
        ...item,
        logo_url: assetUrl(item.logo_url),
      })),
    },
    stories: page.stories && {
      ...page.stories,
      items: mapList(page.stories.items, (item) => ({
        ...item,
        cover_image: assetUrl(item.cover_image),
      })),
    },
    team: page.team && {
      ...page.team,
      items: mapList(page.team.items, (item) => ({
        ...item,
        image: assetUrl(item.image),
      })),
    },
    join_cta: page.join_cta && {
      ...page.join_cta,
      image_url: assetUrl(page.join_cta.image_url),
    },
  };
}

export async function fetchHomePage(signal?: AbortSignal): Promise<HomePage | null> {
  const payload = await apiFetch<Envelope<HomePage>>("/pages/home", { signal });
  return payload?.data ? withAssetUrls(payload.data) : null;
}
