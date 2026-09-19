/* =========================================================
   One صوت ميديا service page from the Sawt API (base: ./client).

     GET /pages/media/services/{service} → { data: { uuid, slug, path, hero,
                                                     service, includes, works,
                                                     cta } }

   `{service}` resolves either identifier — the uuid (`dzwce`) or the slug
   (`professional-photography`) — and the payload's own `path` is built from
   the slug, which is what /media's cards link to, so the route segment is the
   slug and it is passed straight through.

   Same conventions as ./media-page, whose types this borrows for the blocks
   the two payloads share: every text field is a { ar, en } pair, lists arrive
   as { ar: [...], en: [...] }, and uploads are pulled back onto the host that
   serves them (`assetUrl`).

   As everywhere else, the payload is the page's only source: the sections keep
   no copy of their own behind these fields.
   ========================================================= */

import { apiFetch } from "./client";
import { assetUrl, type Localized } from "./pages";
import {
  fetchMediaPage,
  sortItems,
  type MediaCta,
  type MediaImage,
  type MediaWorkItem,
} from "./media-page";

type Envelope<T> = { message?: string; data?: T };

/** الرئيسية › خدماتنا › اسم الخدمة — the first two steps are links, the last
    is the service's own name and is the orange one. */
export type MediaServiceBreadcrumb = {
  home?: MediaCta;
  services?: MediaCta;
  current?: Localized;
};

export type MediaServiceHeroContent = {
  image_url?: string | null;
  title?: Localized;
  breadcrumb?: MediaServiceBreadcrumb;
};

export type MediaServiceIdentity = {
  number?: string | null;
  title?: Localized;
  tagline?: Localized;
  image_url?: string | null;
  /** The stills the coverflow pages through. */
  gallery?: MediaImage[];
};

export type MediaServiceIncludesContent = {
  title?: Localized;
  body?: Localized;
  items?: { ar?: string[] | null; en?: string[] | null };
};

export type MediaServiceWorksContent = {
  title?: Localized;
  more?: MediaCta;
  items?: MediaWorkItem[];
};

export type MediaServiceCtaContent = {
  image_url?: string | null;
  title?: Localized;
  body?: Localized;
  button?: MediaCta;
};

export type MediaServicePage = {
  uuid?: string | null;
  slug?: string | null;
  path?: string | null;
  hero?: MediaServiceHeroContent;
  service?: MediaServiceIdentity;
  includes?: MediaServiceIncludesContent;
  works?: MediaServiceWorksContent;
  cta?: MediaServiceCtaContent;
};

/** Every upload URL pointed at the host that actually serves it. Applied once,
    on the way out of the fetch, so no section has to know. */
function withAssetUrls(page: MediaServicePage): MediaServicePage {
  return {
    ...page,
    hero: page.hero && { ...page.hero, image_url: assetUrl(page.hero.image_url) },
    service: page.service && {
      ...page.service,
      image_url: assetUrl(page.service.image_url),
      gallery: page.service.gallery?.map((shot) => ({
        ...shot,
        url: assetUrl(shot.url),
      })),
    },
    works: page.works && {
      ...page.works,
      items: page.works.items?.map((work) => ({
        ...work,
        image_url: assetUrl(work.image_url),
      })),
    },
    cta: page.cta && { ...page.cta, image_url: assetUrl(page.cta.image_url) },
  };
}

export async function fetchMediaService(
  service: string,
  signal?: AbortSignal,
): Promise<MediaServicePage | null> {
  const payload = await apiFetch<Envelope<MediaServicePage>>(
    `/pages/media/services/${encodeURIComponent(service)}`,
    { signal },
  );
  return payload?.data ? withAssetUrls(payload.data) : null;
}

/* `output: 'export'` pre-lists every dynamic segment, so the build has to know
   which services exist. There is no services index endpoint, but /media's own
   payload already carries the list — a service added in the admin therefore
   needs a rebuild before its URL exists, exactly as for /news/[id]. */
export async function fetchMediaServiceSlugs(): Promise<string[]> {
  const page = await fetchMediaPage();
  return sortItems(page?.services?.items)
    .map((item) => item.slug)
    .filter((slug): slug is string => Boolean(slug));
}
