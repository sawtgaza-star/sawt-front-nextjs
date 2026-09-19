/* =========================================================
   One صوت ميديا case study from the Sawt API (base: ./client).

     GET /pages/media/works/{work} → { data: { uuid, slug, path, hero, work,
                                               tabs, about, stages, client,
                                               results, gallery, cta } }

   `{work}` takes the slug the listing links to. Same conventions as
   ./media-page: every text field is a { ar, en } pair, lists arrive as
   { ar: [...], en: [...] }, and uploads are pulled back onto the host that
   serves them (`assetUrl`).

   Two things the design draws that this payload does not carry — the star
   rating on the client's card and the two score meters beside it. They stay
   design constants in MediaProjectReview until the API sends them.
   ========================================================= */

import { apiFetch } from "./client";
import { assetUrl, type Localized } from "./pages";
import type { LocalizedList, MediaCta, MediaImage } from "./media-page";
import { fetchMediaWorksPage } from "./media-works";
import type { MediaServiceCtaContent } from "./media-service";

type Envelope<T> = { message?: string; data?: T };

/** أعمالنا › القسم › اسم المشروع — the first two steps are links, the last is
    the project's own name and is the orange one. */
export type MediaWorkBreadcrumb = {
  works?: MediaCta;
  /** Carries the service's identity as well, so the crumb can link to it. */
  service?: MediaCta & { uuid?: string | null; slug?: string | null };
  current?: Localized;
};

export type MediaWorkHeroContent = {
  image_url?: string | null;
  title?: Localized;
  breadcrumb?: MediaWorkBreadcrumb;
};

/** A figure that counts up on scroll: the two headline numbers under the
    intro, and the three under "النتائج". */
export type MediaWorkFigure = {
  value?: string | null;
  label?: Localized;
  sort_order?: number;
};

export type MediaWorkIdentity = {
  date?: Localized;
  category?: Localized;
  title?: Localized;
  /** A plain { ar, en } pair here, unlike the listing's picked-from-a-list tag. */
  tag?: Localized;
  summary?: Localized;
  cover_url?: string | null;
  highlights?: MediaWorkFigure[];
};

export type MediaWorkTab = { key?: string | null; label?: Localized };

export type MediaWorkTabs = {
  about?: MediaWorkTab;
  stages?: MediaWorkTab;
  client?: MediaWorkTab;
};

/** التحديات / الحلول — a titled card with a bullet list. */
export type MediaWorkNote = { title?: Localized; items?: LocalizedList };

export type MediaWorkAboutContent = {
  body?: Localized;
  challenges?: MediaWorkNote;
  solutions?: MediaWorkNote;
};

export type MediaWorkStage = {
  title?: Localized;
  body?: Localized;
  sort_order?: number;
};

export type MediaWorkStagesContent = { items?: MediaWorkStage[] };

export type MediaWorkClient = {
  name?: string | null;
  role?: Localized;
  quote?: Localized;
  avatar_url?: string | null;
};

export type MediaWorkResults = { title?: Localized; items?: MediaWorkFigure[] };

export type MediaWorkGallery = { title?: Localized; items?: MediaImage[] };

export type MediaWorkPage = {
  uuid?: string | null;
  slug?: string | null;
  path?: string | null;
  hero?: MediaWorkHeroContent;
  work?: MediaWorkIdentity;
  tabs?: MediaWorkTabs;
  about?: MediaWorkAboutContent;
  stages?: MediaWorkStagesContent;
  client?: MediaWorkClient;
  results?: MediaWorkResults;
  gallery?: MediaWorkGallery;
  /** The closing banner — the same block a service page carries. */
  cta?: MediaServiceCtaContent;
};

/** Every upload URL pointed at the host that actually serves it. Applied once,
    on the way out of the fetch, so no section has to know. */
function withAssetUrls(page: MediaWorkPage): MediaWorkPage {
  return {
    ...page,
    hero: page.hero && { ...page.hero, image_url: assetUrl(page.hero.image_url) },
    work: page.work && { ...page.work, cover_url: assetUrl(page.work.cover_url) },
    client: page.client && {
      ...page.client,
      avatar_url: assetUrl(page.client.avatar_url),
    },
    gallery: page.gallery && {
      ...page.gallery,
      items: page.gallery.items?.map((shot) => ({ ...shot, url: assetUrl(shot.url) })),
    },
    cta: page.cta && { ...page.cta, image_url: assetUrl(page.cta.image_url) },
  };
}

export async function fetchMediaWork(
  work: string,
  signal?: AbortSignal,
): Promise<MediaWorkPage | null> {
  const payload = await apiFetch<Envelope<MediaWorkPage>>(
    `/pages/media/works/${encodeURIComponent(work)}`,
    { signal },
  );
  return payload?.data ? withAssetUrls(payload.data) : null;
}

/* `output: 'export'` pre-lists every dynamic segment, so the build has to know
   which projects exist — the listing's own payload already carries them. A
   project added in the admin therefore needs a rebuild before its URL exists,
   exactly as for /news/[id] and the service pages. */
export async function fetchMediaWorkSlugs(): Promise<string[]> {
  const page = await fetchMediaWorksPage();
  return (page?.items || [])
    .map((item) => item.slug)
    .filter((slug): slug is string => Boolean(slug));
}
