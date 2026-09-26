/* =========================================================
   The content-creators page from the Sawt API (base + error shape: ./client).

     GET /pages/creators                    → { data: { hero, grid, stats,
                                                 join, partners, collaboration,
                                                 faq } }
     GET /pages/creators/all?page=&per_page= → { data: { hero, labels,
                                                 creators }, meta }

   One request paints the whole of /creators: the breadcrumb hero, the card
   grid, the four figures, the join banner, the partner companies, the
   collaboration diagram + steps, and the FAQ.

   /all is the full roster behind the grid's "تصفح" button, one request per
   page of cards, and it answers the SAME breadcrumb `hero` — so /creators/all
   paints its header without a second request. The two words the card needs
   around its own content ("تجربتي مع صوت", "متابع") come as `labels` there,
   which is the `grid` block's `experience_title` / `followers_suffix` under
   another name.

   Same conventions as ./pages: every text field arrives as { ar, en } and is
   picked per the language the site is currently in (`localized`), and uploads
   arrive as absolute URLs that are pulled back onto the API host (`assetUrl` —
   see the long note there for why).

   TWO THINGS THE PAYLOAD DOES NOT COVER, and which therefore keep their
   `data-i18n` keys in the markup:

     - the step CARD TITLES ("ابحث واختر"…). `collaboration.steps` sends a
       number and a body, no title, so the three titles stay chrome — see
       components/creators/CollaborationSteps.
     - `join.form` — the stepper modal's labels, chips and platform list. That
       modal is still the legacy DOM script (components/site/JoinModal +
       lib/legacy-home), which carries the copy as `jm_*` translation keys; the
       block is typed here so the shape is on record, and nothing reads it yet.
       Only the POST it submits to is wired (see ./creators).

   THE CARD'S IDENTIFIER IS the uuid: the hover arrow opens /creators/{uuid}
   (creatorSlug in ./creator-profile), which is the range creators/[id]
   pre-renders for `output: 'export'` — the same arrangement the home page's
   cards use.
   ========================================================= */

import { apiFetch } from "./client";
import { assetUrl, type Localized } from "./pages";

type Envelope<T> = { message?: string; data?: T };

export type CreatorsCta = { label?: Localized };

/* ---------------------------------------------------------------- hero */

export type CreatorsHeroContent = {
  image_url?: string | null;
  title?: Localized;
  description?: Localized;
};

/* ---------------------------------------------------------------- grid */

/** A creator as the grid lists them. `name` is not localized — one name, shown
    in both languages, exactly as on the home page. */
export type CreatorsGridCreator = {
  uuid?: string;
  id?: number;
  name?: string | null;
  role?: Localized;
  avatar_url?: string | null;
  followers_count?: number | null;
  experience_excerpt?: Localized;
};

export type CreatorsGridContent = {
  title?: Localized;
  subtitle?: Localized;
  /** The button under the grid, which opens the full listing (/creators/all). */
  browse_label?: Localized;
  /** Heading of the card's hover panel ("تجربتي مع صوت"). */
  experience_title?: Localized;
  /** The word after the follower count on the card's badge. */
  followers_suffix?: Localized;
  creators?: CreatorsGridCreator[];
};

/* --------------------------------------------------------------- stats */

/** `key` picks the icon (see components/creators/creator-stat-icons); `value`
    is a raw number, compacted for display, and the affixes are the editor's
    ("+", "+$"). */
export type CreatorsStat = {
  key?: string;
  value?: number | null;
  label?: Localized;
  prefix?: string | null;
  suffix?: string | null;
};

export type CreatorsStatsContent = {
  title?: Localized;
  subtitle?: Localized;
  items?: CreatorsStat[];
};

/* ---------------------------------------------------------------- join */

/** The join modal's own copy. NOT WIRED — see the header note. */
export type CreatorsJoinForm = {
  title?: Localized;
  subtitle?: Localized;
  steps?: { number?: number; key?: string; label?: Localized }[];
  actions?: Record<string, Localized>;
  content_types?: { key?: string; label?: Localized }[];
  platforms?: { key?: string }[];
  submit_url?: string;
};

export type CreatorsJoinContent = {
  image_url?: string | null;
  title?: Localized;
  description?: Localized;
  button?: CreatorsCta;
  form?: CreatorsJoinForm;
};

/* ------------------------------------------------------------ partners */

/** A creator as a partner company lists them — the card shows the avatars
    only, but the rest of the profile comes with them. */
export type CreatorsPartnerCreator = {
  uuid?: string;
  username?: string;
  name?: string | null;
  role?: Localized;
  bio?: Localized;
  avatar_url?: string | null;
  followers_count?: number | null;
  is_verified?: boolean;
  sort_order?: number;
};

export type CreatorsPartnerCompany = {
  uuid?: string;
  name?: Localized;
  logo_url?: string | null;
  url?: string | null;
  sort_order?: number;
  creators?: CreatorsPartnerCreator[];
};

export type CreatorsPartnersContent = {
  title?: Localized;
  description?: Localized;
  companies?: CreatorsPartnerCompany[];
};

/* ------------------------------------------------------- collaboration */

/** One node of the three-part diagram. Only the centre carries an image. */
export type CreatorsDiagramNode = {
  image_url?: string | null;
  title?: Localized;
  subtitle?: Localized;
};

export type CreatorsCollaborationContent = {
  title?: Localized;
  description?: Localized;
  diagram?: {
    creators?: CreatorsDiagramNode;
    media?: CreatorsDiagramNode;
    brands?: CreatorsDiagramNode;
  };
  steps_title?: Localized;
  /** `number` is the card's figure (1 → "01"); there is no title field. */
  steps?: { number?: number; text?: Localized }[];
  cta?: CreatorsCta;
};

/* ----------------------------------------------------------------- faq */

export type CreatorsFaqItem = {
  uuid?: string;
  question?: Localized;
  answer?: Localized;
  sort_order?: number;
};

export type CreatorsFaqContent = {
  title?: Localized;
  subtitle?: Localized;
  image_url?: string | null;
  items?: CreatorsFaqItem[];
};

/* ---------------------------------------------------------------- page */

export type CreatorsPage = {
  hero?: CreatorsHeroContent;
  grid?: CreatorsGridContent;
  stats?: CreatorsStatsContent;
  join?: CreatorsJoinContent;
  partners?: CreatorsPartnersContent;
  collaboration?: CreatorsCollaborationContent;
  faq?: CreatorsFaqContent;
};

/** `list.map(fn)` that tolerates the field being absent or not an array — the
    payload omits a section's items entirely when the editor added none. */
function mapList<T>(list: T[] | undefined, fn: (item: T) => T): T[] | undefined {
  return Array.isArray(list) ? list.map(fn) : list;
}

/** Same payload with every upload URL pointed at the host that actually serves
    it. Applied once, on the way out of the fetch, so no section has to know. */
function withAssetUrls(page: CreatorsPage): CreatorsPage {
  const withAvatar = <T extends { avatar_url?: string | null }>(item: T): T => ({
    ...item,
    avatar_url: assetUrl(item.avatar_url),
  });

  return {
    ...page,
    hero: page.hero && { ...page.hero, image_url: assetUrl(page.hero.image_url) },
    grid: page.grid && {
      ...page.grid,
      creators: mapList(page.grid.creators, withAvatar),
    },
    join: page.join && { ...page.join, image_url: assetUrl(page.join.image_url) },
    partners: page.partners && {
      ...page.partners,
      companies: mapList(page.partners.companies, (company) => ({
        ...company,
        logo_url: assetUrl(company.logo_url),
        creators: mapList(company.creators, withAvatar),
      })),
    },
    collaboration: page.collaboration && {
      ...page.collaboration,
      diagram: page.collaboration.diagram && {
        ...page.collaboration.diagram,
        media: page.collaboration.diagram.media && {
          ...page.collaboration.diagram.media,
          image_url: assetUrl(page.collaboration.diagram.media.image_url),
        },
      },
    },
    faq: page.faq && { ...page.faq, image_url: assetUrl(page.faq.image_url) },
  };
}

export async function fetchCreatorsPage(
  signal?: AbortSignal,
): Promise<CreatorsPage | null> {
  const payload = await apiFetch<Envelope<CreatorsPage>>("/pages/creators", {
    signal,
  });
  return payload?.data ? withAssetUrls(payload.data) : null;
}

/* ----------------------------------------------------- /creators/all */

/** The two labels the card needs around the creator's own copy — `grid`'s
    `experience_title` / `followers_suffix`, as the listing endpoint names
    them. */
export type CreatorsLabels = {
  experience_title?: Localized;
  followers_suffix?: Localized;
};

export type CreatorsListPage = {
  hero?: CreatorsHeroContent;
  labels?: CreatorsLabels;
  creators?: CreatorsGridCreator[];
};

/** Laravel's paginator block, alongside `data` rather than inside it. */
export type CreatorsMeta = {
  current_page?: number;
  last_page?: number;
  per_page?: number;
  total?: number;
  from?: number | null;
  to?: number | null;
};

type ListEnvelope = { message?: string; data?: CreatorsListPage; meta?: CreatorsMeta };

export type CreatorsListResult = {
  page: CreatorsListPage | null;
  meta: CreatorsMeta;
};

/** One page of the full roster. `meta` drives the pager, so it is returned
    even when the payload carries no creators. */
export async function fetchAllCreators(
  { page = 1, perPage }: { page?: number; perPage?: number } = {},
  signal?: AbortSignal,
): Promise<CreatorsListResult> {
  const query = new URLSearchParams({ page: String(page) });
  if (perPage) query.set("per_page", String(perPage));

  const payload = await apiFetch<ListEnvelope>(
    `/pages/creators/all?${query.toString()}`,
    { signal },
  );

  const data = payload?.data;
  return {
    page: data
      ? {
          ...data,
          hero: data.hero && { ...data.hero, image_url: assetUrl(data.hero.image_url) },
          creators: mapList(data.creators, (creator) => ({
            ...creator,
            avatar_url: assetUrl(creator.avatar_url),
          })),
        }
      : null,
    meta: payload?.meta ?? {},
  };
}
