/* =========================================================
   Site chrome from the Sawt API (base + error shape: ./client).

     GET /layout/footer → { data: { logo_url, about, main, quick,
                                    newsletter, contact, socials,
                                    copyright, brand } }

   Same conventions as ./pages: every text field arrives as { ar, en } and is
   picked per the language the site is currently in (`localized`), and uploads
   arrive as absolute URLs that have to be pulled back onto the API host
   (`assetUrl` — see the long note there for why).

   The footer is chrome on every route, but its copy is the API's alone: the
   view model (components/site/footer/footer-data.ts) keeps no built-in strings
   behind these fields, so whatever the editor leaves empty renders empty —
   the contact row included. <FooterSkeleton /> covers the wait.
   ========================================================= */

import { apiFetch } from "./client";
import { assetUrl, type Localized } from "./pages";

type Envelope<T> = { message?: string; data?: T };

/** One entry of a footer link column. The API supplies a `url` too, but it is
    not used: the footer resolves every destination from `key` against the
    routes this app actually serves — see ROUTE_BY_KEY in
    components/site/footer/footer-data.ts. */
export type FooterLink = {
  key?: string;
  label?: Localized;
  url?: string | null;
};

export type FooterLinkGroup = {
  title?: Localized;
  links?: FooterLink[];
};

export type FooterNewsletter = {
  title?: Localized;
  description?: Localized;
  email_placeholder?: Localized;
};

/** Rendered as they arrive; an empty side renders empty — see footer-data.ts. */
export type FooterContact = {
  phone?: string | null;
  email?: string | null;
};

/** One social account. The footer's bottom bar and the navbar's top bar are
    served the same two fields, so both read this. */
export type SocialLink = {
  platform?: string | null;
  url?: string | null;
};

export type FooterSocial = SocialLink;

export type FooterContent = {
  logo_url?: string | null;
  about?: Localized;
  main?: FooterLinkGroup;
  quick?: FooterLinkGroup;
  newsletter?: FooterNewsletter;
  contact?: FooterContact;
  socials?: FooterSocial[];
  copyright?: Localized;
  brand?: string | null;
};

export async function fetchFooter(signal?: AbortSignal): Promise<FooterContent | null> {
  const payload = await apiFetch<Envelope<FooterContent>>("/layout/footer", { signal });
  if (!payload?.data) return null;
  return { ...payload.data, logo_url: assetUrl(payload.data.logo_url) };
}

/* =========================================================
   GET /layout/navbar → { data: { site_name, logo_url, topbar, nav } }

   The other half of the site chrome, on the same terms as the footer above:
   every text field is a { ar, en } pair, and the endpoint is the only source
   of the bar's copy — nothing in the view model (components/site/navbar-data)
   stands behind these fields, so a field the editor empties renders empty.

   `logo_url` arrives under /media/ rather than /storage/, which is already on
   the API host, so `assetUrl` passes it through untouched; it is applied all
   the same, for the day the backend moves branding onto the public disk.
   ========================================================= */

/** One entry of either nav row, the top bar's support CTA, or an auth button.
    As in the footer, the `url` is informational: destinations are resolved
    from `key` against the routes this app serves — see ROUTE_BY_KEY in
    components/site/navbar-data.ts. */
export type NavbarItem = {
  key?: string;
  label?: Localized;
  url?: string | null;
  /** The admin's "opens off-site" flag. Not acted on — /incubator and /media
      are routes of THIS app; see navbar-data.ts. */
  external?: boolean;
};

export type NavbarAuth = {
  register?: NavbarItem;
  login?: NavbarItem;
};

export type NavbarTopbar = {
  socials_label?: Localized;
  socials?: SocialLink[];
  support?: NavbarItem;
  auth?: NavbarAuth;
  search_placeholder?: Localized;
  /** The label the toggle SHOWS — "En" while the site is Arabic, and back. */
  language?: { label?: Localized };
};

export type NavbarNav = {
  /** The main link row: الرئيسية / من نحن / محتوانا / الفريق / صناع المحتوى. */
  primary?: NavbarItem[];
  /** The two branded pills at the far end of the bar. */
  secondary?: NavbarItem[];
};

export type NavbarContent = {
  site_name?: string | null;
  logo_url?: string | null;
  topbar?: NavbarTopbar;
  nav?: NavbarNav;
};

export async function fetchNavbar(signal?: AbortSignal): Promise<NavbarContent | null> {
  const payload = await apiFetch<Envelope<NavbarContent>>("/layout/navbar", { signal });
  if (!payload?.data) return null;
  return { ...payload.data, logo_url: assetUrl(payload.data.logo_url) };
}

/* =========================================================
   GET /layout/media/navbar → { data: { site_name, logo_url, back_to_platform,
                                        topbar, nav, actions } }

   صوت ميديا's own bar — the reduced agency navbar /media renders instead of
   SiteNav — on exactly the terms of the two endpoints above: every text field
   is an { ar, en } pair, and the endpoint is the only source of the bar's
   copy, so a field the editor empties renders empty.

   What it does NOT carry is the site bar's furniture: no socials, no search,
   no auth pair. The drawer's social row is the site's own and still comes
   from /layout/navbar — see MediaNavMobile.
   ========================================================= */

/** The bar's one CTA (ابدأ مشروعك). It carries `path` where the site bar's
    items carry `url`; neither is used — destinations are resolved from `key`
    against the routes this app serves, see ROUTE_BY_KEY in
    components/media/media-nav-data.ts. */
export type MediaNavbarAction = {
  key?: string;
  label?: Localized;
  path?: string | null;
};

export type MediaNavbarContent = {
  site_name?: string | null;
  logo_url?: string | null;
  /** "العودة لمنصة صوت", the line above the nav card. */
  back_to_platform?: NavbarItem;
  topbar?: {
    /** The label the toggle SHOWS — "En" while the site is Arabic, and back. */
    language?: { label?: Localized };
  };
  nav?: {
    /** The four section links: عن صوت ميديا / أعمالنا / خدماتنا / منهجيتنا.
        They are anchors into /media and arrive with no url of their own. */
    primary?: NavbarItem[];
  };
  actions?: { start_project?: MediaNavbarAction };
};

export async function fetchMediaNavbar(
  signal?: AbortSignal,
): Promise<MediaNavbarContent | null> {
  const payload = await apiFetch<Envelope<MediaNavbarContent>>(
    "/layout/media/navbar",
    { signal },
  );
  if (!payload?.data) return null;
  return { ...payload.data, logo_url: assetUrl(payload.data.logo_url) };
}

/* =========================================================
   GET /layout/incubator/navbar → { data: { site_name, logo_url,
                                            back_to_platform, socials_label,
                                            socials, topbar, nav, actions } }

   حاضنة صوت's own bar (IncubatorNav, on /incubator and the course pages), on
   the terms of the three endpoints above: every text field is an { ar, en }
   pair, and the endpoint is the only source of the bar's copy.

   The social row arrives twice — at the root and again under `topbar`; the
   view model reads `topbar` first and falls back to the root pair.
   ========================================================= */

export type IncubatorNavbarContent = {
  site_name?: string | null;
  logo_url?: string | null;
  /** "العودة لمنصة صوت", the top-left line of the card. */
  back_to_platform?: NavbarItem;
  socials_label?: Localized;
  socials?: SocialLink[];
  topbar?: {
    socials_label?: Localized;
    socials?: SocialLink[];
    /** The label the toggle SHOWS — "En" while the site is Arabic, and back. */
    language?: { label?: Localized };
  };
  nav?: {
    /** عن الحاضنة / الدورات / الورشات — anchors into /incubator, no url. */
    primary?: NavbarItem[];
  };
  actions?: {
    /** انضم للحاضنة */
    join?: NavbarItem;
    /** ادعم طلاب الحاضنة */
    support?: NavbarItem;
  };
};

export async function fetchIncubatorNavbar(
  signal?: AbortSignal,
): Promise<IncubatorNavbarContent | null> {
  const payload = await apiFetch<Envelope<IncubatorNavbarContent>>(
    "/layout/incubator/navbar",
    { signal },
  );
  if (!payload?.data) return null;
  return { ...payload.data, logo_url: assetUrl(payload.data.logo_url) };
}
