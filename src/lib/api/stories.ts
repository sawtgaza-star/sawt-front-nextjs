/* =========================================================
   The success-stories feed from the Sawt API (base + error shape: ./client).

     GET /pages/stories?page=&per_page= → { data: { hero, items }, meta }
     GET /pages/stories/{uuid}           → { data: { hero, story, related } }

   One request paints the whole of /stories: the breadcrumb header and the
   page's grid of poster cards. Same arrangement as ./blogs — `hero` alongside
   the rows, `meta` alongside `data` — so the listing and its pager work the
   way /news does. Both endpoints answer the same `hero`, so a story paints its
   breadcrumb header without a second request.

   THE IDENTIFIER IS THE UUID, exactly as for a blog: the detail endpoint
   resolves the five-character `uuid` only, so every link into a story is
   /stories/{uuid} and that is what the route segment carries.

   Every text field arrives as { ar, en } and is picked per the language the
   site is currently in (`localized` in ./pages); uploads arrive as absolute
   URLs that are pulled back onto the API host (`assetUrl` — see the long note
   there for why).

   THE CARD'S SLOTS. A row carries more copy than the poster shows, and the
   home page's `stories` block already fixed which field lands where — this
   listing renders the same `.rs-card`, so it maps them identically:

     badge           -> .rs-badge       ("قصة نجاح")
     headline        -> .rs-card-title
     footer_subtitle -> .rs-card-desc   (the one-line standfirst)
     excerpt         -> .rs-card-full   (the copy that slides up on hover)

   `footer_title` repeats the headline in every row the feed has answered so
   far and the card has no second place to put it, so it is typed here and not
   rendered — see components/stories/story-cards.

   A STORY IS SHAPED LIKE A BLOG. The `story` block carries the same fields
   `Blog` does, which is why the detail page renders the news article's own
   components against it (see components/stories/story-article). It differs in
   three places only:

     - `hero_url`, the article's own wide image, next to the `cover_url` the
       poster card uses;
     - `badge` ("قصة نجاح"), which the article page has no slot for;
     - the middle crumb is `breadcrumb.stories`, where a blog says `news`.
   ========================================================= */

import { apiFetch } from "./client";
import { assetUrl, type Localized } from "./pages";
import type { Blog } from "./blogs";

/** Breadcrumb header of the listing. */
export type StoriesHero = {
  image_url?: string | null;
  title?: Localized;
  description?: Localized;
};

/** One poster card. See the slot table above for where each field lands. */
export type StoryListItem = {
  uuid?: string;
  id?: number;
  cover_image?: string | null;
  badge?: Localized;
  headline?: Localized;
  excerpt?: Localized;
  footer_title?: Localized;
  footer_subtitle?: Localized;
};

/** Laravel's paginator block, alongside `data` rather than inside it. */
export type StoriesMeta = {
  current_page?: number;
  last_page?: number;
  per_page?: number;
  total?: number;
  from?: number | null;
  to?: number | null;
};

export type StoriesListPage = { hero?: StoriesHero; items?: StoryListItem[] };

type Envelope = {
  message?: string;
  data?: StoriesListPage;
  meta?: StoriesMeta;
};

export type StoriesListResult = {
  page: StoriesListPage | null;
  meta: StoriesMeta;
};

/** `list.map(fn)` that tolerates the field being absent or not an array. */
function mapList<T>(list: T[] | undefined, fn: (item: T) => T): T[] | undefined {
  return Array.isArray(list) ? list.map(fn) : list;
}

/** Uploads pointed at the host that actually serves them — see `assetUrl`. */
function withAssetUrls(page: StoriesListPage): StoriesListPage {
  return {
    ...page,
    hero: page.hero && { ...page.hero, image_url: assetUrl(page.hero.image_url) },
    items: mapList(page.items, (item) => ({
      ...item,
      cover_image: assetUrl(item.cover_image),
    })),
  };
}

/** One page of the listing. `meta` drives the pager, so it is returned even
    when the payload carries no items. */
export async function fetchStories(
  { page = 1, perPage }: { page?: number; perPage?: number } = {},
  signal?: AbortSignal,
): Promise<StoriesListResult> {
  const query = new URLSearchParams({ page: String(page) });
  if (perPage) query.set("per_page", String(perPage));

  const payload = await apiFetch<Envelope>(`/pages/stories?${query.toString()}`, {
    signal,
  });

  return {
    page: payload?.data ? withAssetUrls(payload.data) : null,
    meta: payload?.meta ?? {},
  };
}

/* ------------------------------------------------- /pages/stories/{uuid} */

/** The three crumbs of the article header, already worded by the API. A blog
    calls the middle one `news`; a story calls it `stories`. */
export type StoryBreadcrumb = {
  home?: Localized;
  stories?: Localized;
  current?: Localized;
};

/** The story itself. Field for field a `Blog` (so the news article components
    render it unchanged — see components/stories/story-article) plus the two
    fields only a story has. `content` is HTML, one string per language. */
export type Story = Omit<Blog, "breadcrumb"> & {
  /** the article's own wide image, where a blog has only its cover */
  hero_url?: string | null;
  /** "قصة نجاح" — the poster's pill. The article page has no slot for it. */
  badge?: Localized;
  breadcrumb?: StoryBreadcrumb;
};

/** The "قصص ذات صلة" strip: its own headings and the cards under them. */
export type StoriesRelated = {
  title?: Localized;
  subtitle?: Localized;
  view_all?: { label?: Localized };
  items?: StoryListItem[];
};

export type StoryDetailPage = {
  hero?: StoriesHero;
  story?: Story;
  related?: StoriesRelated;
};

type DetailEnvelope = { message?: string; data?: StoryDetailPage };

/** Uploads of the detail payload — the story's two images, the frames of its
    gallery, and every related card's cover. */
function withDetailAssetUrls(page: StoryDetailPage): StoryDetailPage {
  return {
    ...page,
    hero: page.hero && { ...page.hero, image_url: assetUrl(page.hero.image_url) },
    story: page.story && {
      ...page.story,
      cover_url: assetUrl(page.story.cover_url),
      hero_url: assetUrl(page.story.hero_url),
      images: mapList(page.story.images, (image) => ({
        ...image,
        image_url: assetUrl(image.image_url),
      })),
    },
    related: page.related && {
      ...page.related,
      items: mapList(page.related.items, (item) => ({
        ...item,
        cover_image: assetUrl(item.cover_image),
      })),
    },
  };
}

/** One story by uuid. A 404 (deleted / wrong identifier) throws an ApiError
    like any other failure; the caller settles into the empty state. */
export async function fetchStory(
  uuid: string,
  signal?: AbortSignal,
): Promise<StoryDetailPage | null> {
  const payload = await apiFetch<DetailEnvelope>(
    `/pages/stories/${encodeURIComponent(uuid)}`,
    { signal },
  );
  return payload?.data ? withDetailAssetUrls(payload.data) : null;
}

/** Every uuid in the feed, walked page by page — what `generateStaticParams`
    needs, since `output: 'export'` pre-lists the dynamic segment. Stops at
    `last_page`, and at 50 pages regardless, so a paginator that never ends
    cannot hang the build. */
export async function fetchAllStoryUuids(perPage = 100): Promise<string[]> {
  const uuids: string[] = [];

  for (let page = 1; page <= 50; page++) {
    const { page: data, meta } = await fetchStories({ page, perPage });
    for (const item of data?.items ?? []) {
      if (item.uuid) uuids.push(item.uuid);
    }
    if (!meta.last_page || page >= meta.last_page) break;
  }

  return uuids;
}
