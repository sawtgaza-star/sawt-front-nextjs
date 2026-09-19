/* =========================================================
   The news feed from the Sawt API (base + error shape: ./client).

     GET /pages/blogs?page=&per_page=  → { data: { hero, items }, meta }
     GET /pages/blogs/{uuid}           → { data: { hero, blog, related } }

   Both answer the same `hero` block, so /news and /news/{uuid} paint the same
   breadcrumb header without a second request.

   THE IDENTIFIER IS THE UUID. The detail endpoint resolves the five-character
   `uuid` only — a numeric `id` or the `slug` both answer 404 — so every link
   into an article is /news/{uuid} and that is what the route segment carries.

   Every text field arrives as { ar, en } (see `localized` in ./pages); the one
   exception is `content`, which is a { ar, en } pair of HTML strings rather
   than plain text. See NewsBody for how that is rendered.
   ========================================================= */

import { apiFetch } from "./client";
import { assetUrl, type Localized } from "./pages";

/** Breadcrumb header — identical on the listing and on an article. */
export type BlogsHero = {
  image_url: string | null;
  title: Localized;
  description: Localized;
};

/** A card: the listing grid, the home slider and "أخبار ذات صلة" all use it. */
export type BlogListItem = {
  uuid?: string;
  id?: number;
  title?: Localized;
  cover_image?: string | null;
  excerpt?: Localized;
  publish_date?: string | null;
};

/** Laravel's paginator block, alongside `data` rather than inside it. */
export type BlogsMeta = {
  current_page?: number;
  last_page?: number;
  per_page?: number;
  total?: number;
  from?: number | null;
  to?: number | null;
};

export type BlogCategory = { slug?: string; name?: Localized };

/** The three crumbs of the article header, already worded by the API. */
export type BlogBreadcrumb = {
  home?: Localized;
  news?: Localized;
  current?: Localized;
};

export type BlogQuote = { text?: Localized; author?: Localized };

export type BlogImage = { image_url?: string | null; sort_order?: number };

export type Blog = {
  uuid?: string;
  id?: number;
  slug?: string;
  title?: Localized;
  excerpt?: Localized;
  cover_url?: string | null;
  breadcrumb?: BlogBreadcrumb;
  categories?: BlogCategory[];
  author?: Localized;
  read_time_minutes?: number | null;
  views?: number | null;
  published_at?: string | null;
  /** HTML, one string per language. */
  content?: Localized;
  quote?: BlogQuote;
  images?: BlogImage[];
};

export type BlogsListPage = { hero?: BlogsHero; items?: BlogListItem[] };
export type BlogDetailPage = {
  hero?: BlogsHero;
  blog?: Blog;
  related?: BlogListItem[];
};

type Envelope<T> = { message?: string; data?: T; meta?: BlogsMeta };

export type BlogsListResult = { page: BlogsListPage | null; meta: BlogsMeta };

/** `list.map(fn)` that tolerates the field being absent or not an array. */
function mapList<T>(list: T[] | undefined, fn: (item: T) => T): T[] | undefined {
  return Array.isArray(list) ? list.map(fn) : list;
}

const withHero = (hero: BlogsHero | undefined) =>
  hero && { ...hero, image_url: assetUrl(hero.image_url) };

const withCovers = (items: BlogListItem[] | undefined) =>
  mapList(items, (item) => ({ ...item, cover_image: assetUrl(item.cover_image) }));

/** Uploads pointed at the host that actually serves them — see `assetUrl`. */
function withAssetUrls<T extends BlogsListPage | BlogDetailPage>(page: T): T {
  const detail = page as BlogDetailPage;
  return {
    ...page,
    hero: withHero(page.hero),
    ...("items" in page ? { items: withCovers((page as BlogsListPage).items) } : null),
    ...(detail.blog
      ? {
          blog: {
            ...detail.blog,
            cover_url: assetUrl(detail.blog.cover_url),
            images: mapList(detail.blog.images, (image) => ({
              ...image,
              image_url: assetUrl(image.image_url),
            })),
          },
        }
      : null),
    ...(detail.related ? { related: withCovers(detail.related) } : null),
  };
}

/** One page of the listing. `meta` drives the pager, so it is returned even
    when the payload carries no items. */
export async function fetchBlogs(
  { page = 1, perPage }: { page?: number; perPage?: number } = {},
  signal?: AbortSignal,
): Promise<BlogsListResult> {
  const query = new URLSearchParams({ page: String(page) });
  if (perPage) query.set("per_page", String(perPage));

  const payload = await apiFetch<Envelope<BlogsListPage>>(
    `/pages/blogs?${query.toString()}`,
    { signal },
  );

  return {
    page: payload?.data ? withAssetUrls(payload.data) : null,
    meta: payload?.meta ?? {},
  };
}

/** One article by uuid. A 404 (deleted / wrong identifier) throws an ApiError
    like any other failure; the caller settles into the empty state. */
export async function fetchBlog(
  uuid: string,
  signal?: AbortSignal,
): Promise<BlogDetailPage | null> {
  const payload = await apiFetch<Envelope<BlogDetailPage>>(
    `/pages/blogs/${encodeURIComponent(uuid)}`,
    { signal },
  );
  return payload?.data ? withAssetUrls(payload.data) : null;
}

/** Every uuid in the feed, walked page by page — what `generateStaticParams`
    needs, since `output: 'export'` pre-lists the dynamic segment. Stops at
    `last_page`, and at 50 pages regardless, so a paginator that never ends
    cannot hang the build. */
export async function fetchAllBlogUuids(perPage = 100): Promise<string[]> {
  const uuids: string[] = [];

  for (let page = 1; page <= 50; page++) {
    const { page: data, meta } = await fetchBlogs({ page, perPage });
    for (const item of data?.items ?? []) {
      if (item.uuid) uuids.push(item.uuid);
    }
    if (!meta.last_page || page >= meta.last_page) break;
  }

  return uuids;
}
