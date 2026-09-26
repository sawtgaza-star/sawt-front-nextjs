/* =========================================================
   One content creator's profile from the Sawt API (base: ./client).

     GET /pages/creators/{creator} → { data: { hero, creator, labels, content,
                                               collaborations, collaboration,
                                               join } }

   `{creator}` takes the numeric `id` or the uuid alike; the site links by
   the uuid (every CreatorCard's hover arrow opens /creators/{uuid}, see
   creatorSlug below), so that is the route segment. Same conventions as ./creators-page: text fields are
   { ar, en } pairs picked per the current language (`localized`), uploads are
   pulled back onto the host that serves them (`assetUrl`) once, on the way out
   of the fetch. `collaboration` is the very block /creators sends, so its
   type is shared.

   Reels are Instagram posts, in one shape wherever they appear
   (`collaborations.reel`, and — by the same sync — `content.items`):
     { id, caption, thumbnail, video_url, permalink, username, likes,
       comments_count, views, posted_at }
   `caption` is the raw Instagram caption (tabs, blank lines, hashtags);
   `views` may be null. Their URLs are Instagram's CDN (signed, they expire and
   are refreshed by the sync), so they go through untouched. `content` answers
   `status: "empty"` / `"disabled"` with no items when nothing is synced; a
   reel without a playable URL is skipped.
   ========================================================= */

import { apiFetch } from "./client";
import { assetUrl, type Localized } from "./pages";
import {
  fetchAllCreators,
  type CreatorsCollaborationContent,
  type CreatorsHeroContent,
  type CreatorsJoinContent,
} from "./creators-page";

type Envelope<T> = { message?: string; data?: T };

export type CreatorProfileSocial = {
  platform?: string | null;
  url?: string | null;
  followers_count?: number | null;
};

export type CreatorProfile = {
  uuid?: string;
  id?: number;
  username?: string | null;
  /** One name, not localized. */
  name?: string | null;
  role?: Localized;
  bio?: Localized;
  avatar_url?: string | null;
  is_verified?: boolean;
  instagram_username?: string | null;
  socials?: CreatorProfileSocial[];
  stats?: { views?: number | null; followers?: number | null; videos?: number | null };
};

/** The page's fixed words, sent by the API so they can be edited. */
export type CreatorProfileLabels = Partial<
  Record<
    | "follow"
    | "bio"
    | "followers"
    | "socials"
    | "views_suffix"
    | "followers_suffix"
    | "videos_suffix"
    | "content_title"
    | "content_view_more"
    | "collaborations_title"
    | "collaborations_desc",
    Localized
  >
>;

export type CreatorReelItem = {
  id?: string | number | null;
  video_url?: string | null;
  media_url?: string | null;
  /** Instagram's poster frame. */
  thumbnail?: string | null;
  thumbnail_url?: string | null;
  permalink?: string | null;
  caption?: string | Localized | null;
  username?: string | null;
  likes?: number | null;
  comments_count?: number | null;
  views?: number | null;
  posted_at?: string | null;
};

export type CreatorProfileContentBlock = {
  title?: Localized;
  view_more?: Localized;
  instagram_username?: string | null;
  /** "disabled" when reels are switched off in the admin's settings. */
  status?: string | null;
  message?: string | null;
  items?: CreatorReelItem[];
};

export type CreatorCollaborationItem = {
  uuid?: string;
  sort_order?: number;
  company?: {
    uuid?: string;
    name?: Localized;
    /** A list of categories — strings or { ar, en } pairs; the first is shown. */
    category?: (string | Localized)[];
    logo_url?: string | null;
    url?: string | null;
  };
  caption?: Localized;
  rating?: number | null;
  author?: { name?: string | null; role?: Localized; photo_url?: string | null };
};

export type CreatorCollaborationsBlock = {
  title?: Localized;
  description?: Localized;
  /** One Instagram reel (see CreatorReelItem); null when none is picked. */
  reel?: (CreatorReelItem & { title?: Localized | string | null }) | null;
  items?: CreatorCollaborationItem[];
};

export type CreatorProfilePage = {
  hero?: CreatorsHeroContent;
  creator?: CreatorProfile;
  labels?: CreatorProfileLabels;
  content?: CreatorProfileContentBlock;
  collaborations?: CreatorCollaborationsBlock;
  collaboration?: CreatorsCollaborationContent;
  join?: CreatorsJoinContent;
};

/** Every upload URL pointed at the host that actually serves it. */
function withAssetUrls(page: CreatorProfilePage): CreatorProfilePage {
  const collaborations = page.collaborations;
  const media = page.collaboration?.diagram?.media;

  return {
    ...page,
    hero: page.hero && { ...page.hero, image_url: assetUrl(page.hero.image_url) },
    creator: page.creator && {
      ...page.creator,
      avatar_url: assetUrl(page.creator.avatar_url),
    },
    content: page.content && {
      ...page.content,
      items: Array.isArray(page.content.items)
        ? page.content.items.map((item) => ({
            ...item,
            video_url: assetUrl(item.video_url),
            media_url: assetUrl(item.media_url),
            thumbnail: assetUrl(item.thumbnail),
            thumbnail_url: assetUrl(item.thumbnail_url),
          }))
        : page.content.items,
    },
    collaborations: collaborations && {
      ...collaborations,
      reel: collaborations.reel && {
        ...collaborations.reel,
        video_url: assetUrl(collaborations.reel.video_url),
        thumbnail: assetUrl(collaborations.reel.thumbnail),
      },
      items: Array.isArray(collaborations.items)
        ? collaborations.items.map((item) => ({
            ...item,
            company: item.company && {
              ...item.company,
              logo_url: assetUrl(item.company.logo_url),
            },
            author: item.author && {
              ...item.author,
              photo_url: assetUrl(item.author.photo_url),
            },
          }))
        : collaborations.items,
    },
    collaboration: page.collaboration && {
      ...page.collaboration,
      diagram: page.collaboration.diagram && {
        ...page.collaboration.diagram,
        media: media && { ...media, image_url: assetUrl(media.image_url) },
      },
    },
    join: page.join && { ...page.join, image_url: assetUrl(page.join.image_url) },
  };
}

/* The /creators/[id] segment for a creator: the uuid, or the numeric id for a
   row that somehow has none. The links and generateStaticParams both go
   through here, so every link lands on a pre-rendered page. */
export function creatorSlug(creator: { uuid?: string | null; id?: number | string | null } | null | undefined): string {
  if (!creator) return "";
  if (creator.uuid) return String(creator.uuid);
  return creator.id !== undefined && creator.id !== null ? String(creator.id) : "";
}

/** /creators/{uuid}, or "#" for a row with no identifier. */
export function creatorHref(creator: Parameters<typeof creatorSlug>[0]): string {
  const slug = creatorSlug(creator);
  return slug ? `/creators/${encodeURIComponent(slug)}` : "#";
}

export async function fetchCreatorProfile(
  creator: string,
  signal?: AbortSignal,
): Promise<CreatorProfilePage | null> {
  const payload = await apiFetch<Envelope<CreatorProfilePage>>(
    `/pages/creators/${encodeURIComponent(creator)}`,
    { signal },
  );
  return payload?.data ? withAssetUrls(payload.data) : null;
}

/* `output: 'export'` pre-lists every dynamic segment, so the build reads the
   full roster (every page of /pages/creators/all) to learn which profiles
   exist. A creator added in the admin needs a rebuild before their URL
   exists, exactly as for /courses/[id] and /media/works/[slug]. */
export async function fetchCreatorIds(): Promise<string[]> {
  const ids: string[] = [];
  let page = 1;
  let last = 1;

  do {
    const result = await fetchAllCreators({ page, perPage: 50 });
    for (const creator of result.page?.creators ?? []) {
      const slug = creatorSlug(creator);
      if (slug) ids.push(slug);
    }
    last = Number(result.meta?.last_page) || 1;
    page += 1;
  } while (page <= last);

  return ids;
}
