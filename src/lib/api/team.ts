/* =========================================================
   The team page's content from the Sawt API (base + error shape: ./client).

     GET /pages/team[?major={slug}] → { data: { hero, filters, majors, members } }
     GET /pages/team/{uuid}         → { data: { hero, member, labels, intro,
                                                related } }

   THE FILTER IS THE SERVER'S. `?major=` narrows `members` to one specialty and
   takes the major's SLUG — `tsmym`, `brmg` — not its uuid and not its English
   name (`?major=design` matches nothing). `hero`, `filters` and the whole
   `majors` list come back unchanged either way, counts included, so a filtered
   response still paints the complete pill row.

   THE MEMBER'S IDENTIFIER IS THE UUID. The detail endpoint resolves the
   five-character `uuid` only, so every link into a profile is /team/{uuid} and
   that is what the route segment carries — the same arrangement as
   /news/{uuid} (see ./blogs).

   Same conventions as ./pages: every text field arrives as { ar, en } and is
   picked per the language the site is currently in (`localized`), and uploads
   arrive as absolute URLs that are pulled back onto the API host (`assetUrl` —
   see the long note there for why).

   The detail response carries its own copy of the breadcrumb `hero`, so
   /team/{uuid} paints its header without a second request, and the "اعضاء
   الفريق" row under the profile comes with it as `related`.

   The one thing the profile still has no field for is its "شاهد اعمالي في صوت
   ميديا" button, which keeps its `data-i18n` key — see
   components/team/TeamMemberProfile.
   ========================================================= */

import { apiFetch } from "./client";
import { assetUrl, type Localized } from "./pages";

type Envelope<T> = { message?: string; data?: T };

export type TeamHeroContent = {
  image_url?: string | null;
  title?: Localized;
  description?: Localized;
};

/** Labels the filter bar needs that aren't one of the majors. */
export type TeamFilters = {
  /** The leading "الكل" pill. */
  all_label?: Localized;
};

/** A filter pill: one specialty, with the number of members it holds. */
export type TeamMajor = {
  uuid?: string;
  name?: Localized;
  slug?: string;
  sort_order?: number;
  members_count?: number;
};

/** The major as it arrives ON a member — no count, no sort order. */
export type TeamMemberMajor = {
  uuid?: string;
  name?: Localized;
  slug?: string;
};

export type TeamMember = {
  uuid?: string;
  id?: number;
  image?: string | null;
  name?: Localized;
  role?: Localized;
  major?: TeamMemberMajor;
};

export type TeamPage = {
  hero?: TeamHeroContent;
  filters?: TeamFilters;
  majors?: TeamMajor[];
  members?: TeamMember[];
};

/* ------------------------------------------------- one member's profile */

/** The profile's social links, keyed by platform. A platform the member
    doesn't use is absent rather than empty, so the icon row renders only what
    is actually there. */
export type TeamSocials = {
  instagram?: string | null;
  twitter?: string | null;
  linkedin?: string | null;
  facebook?: string | null;
};

export type TeamMemberDetail = {
  uuid?: string;
  name?: Localized;
  role?: Localized;
  /** The figure in the star badge; `labels.experience_suffix` is its unit. */
  years_of_experience?: number | null;
  bio?: Localized;
  photo_url?: string | null;
  socials?: TeamSocials;
  sort_order?: number;
  major?: TeamMemberMajor;
};

/** Wording the profile needs that isn't the member's own. */
export type TeamDetailLabels = {
  /** Heading over the bio ("نبذة عنه"). */
  bio?: Localized;
  /** What follows the years figure ("سنوات من الخبرة"). */
  experience_suffix?: Localized;
  /** Label before the social icons ("تابعنا على :"). */
  follow?: Localized;
};

/** A shared line about the team, sent with every profile. The design has no
    place for it — see the note in components/team/TeamDetail. */
export type TeamIntro = {
  image_url?: string | null;
  body?: Localized;
};

/** The "اعضاء الفريق" row under the profile — the rest of the roster. */
export type TeamRelated = {
  title?: Localized;
  view_all?: { label?: Localized; url?: string };
  members?: TeamMember[];
};

export type TeamMemberPage = {
  hero?: TeamHeroContent;
  member?: TeamMemberDetail;
  labels?: TeamDetailLabels;
  intro?: TeamIntro;
  related?: TeamRelated;
};

/** `list.map(fn)` that tolerates the field being absent or not an array — the
    payload omits a list entirely when the editor added none. */
function mapList<T>(list: T[] | undefined, fn: (item: T) => T): T[] | undefined {
  return Array.isArray(list) ? list.map(fn) : list;
}

/** Same payload with every upload URL pointed at the host that actually serves
    it. Applied once, on the way out of the fetch, so no section has to know. */
function withAssetUrls(page: TeamPage): TeamPage {
  return {
    ...page,
    hero: page.hero && { ...page.hero, image_url: assetUrl(page.hero.image_url) },
    members: mapList(page.members, (member) => ({
      ...member,
      image: assetUrl(member.image),
    })),
  };
}

/** `major` is a major's slug; omit it (or pass "") for the whole roster. */
export async function fetchTeamPage(
  major?: string,
  signal?: AbortSignal,
): Promise<TeamPage | null> {
  const query = major ? `?major=${encodeURIComponent(major)}` : "";
  const payload = await apiFetch<Envelope<TeamPage>>(`/pages/team${query}`, {
    signal,
  });
  return payload?.data ? withAssetUrls(payload.data) : null;
}

/** One member by uuid. A 404 (removed / wrong identifier) throws an ApiError
    like any other failure; the caller settles into the empty state. */
export async function fetchTeamMember(
  uuid: string,
  signal?: AbortSignal,
): Promise<TeamMemberPage | null> {
  const payload = await apiFetch<Envelope<TeamMemberPage>>(
    `/pages/team/${encodeURIComponent(uuid)}`,
    { signal },
  );
  if (!payload?.data) return null;

  const page = payload.data;
  return {
    ...page,
    hero: page.hero && { ...page.hero, image_url: assetUrl(page.hero.image_url) },
    member: page.member && {
      ...page.member,
      photo_url: assetUrl(page.member.photo_url),
    },
    intro: page.intro && { ...page.intro, image_url: assetUrl(page.intro.image_url) },
    related: page.related && {
      ...page.related,
      members: mapList(page.related.members, (member) => ({
        ...member,
        image: assetUrl(member.image),
      })),
    },
  };
}

/** Every member's uuid — what `generateStaticParams` needs, since
    `output: 'export'` pre-lists the dynamic segment. The roster arrives whole
    (no paginator on this endpoint), so one request covers it. */
export async function fetchAllTeamUuids(): Promise<string[]> {
  const page = await fetchTeamPage();
  return (page?.members ?? [])
    .map((member) => member.uuid)
    .filter((uuid): uuid is string => Boolean(uuid));
}
