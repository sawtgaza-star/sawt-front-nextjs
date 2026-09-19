/* =========================================================
   Navbar view model: GET /layout/navbar (lib/api/layout.ts), shaped for the
   top bar, the link row and the collapsed phone drawer.

   THE API IS THE ONLY SOURCE OF NAVBAR COPY — the same rule the footer runs
   under (./footer/footer-data.ts). The logo, the social row's label, both link
   rows, the support and auth CTAs, the search placeholder and the language
   label are rendered exactly as they arrive, with no built-in string standing
   behind them: a field the editor empties renders empty rather than showing
   copy they cannot see or change.

   Two things this file exists to keep straight — again as in the footer:

   1. HOW THE TEXT GETS TRANSLATED. The site's i18n is DOM based:
      applyTranslations() walks [data-i18n] once per page load and once per
      toggle. Everything below mounts AFTER that first pass — it waits for the
      API — so a data-i18n attribute on it would never be visited. These
      strings therefore carry no data-i18n at all: they come from the payload's
      ar/en pair, picked with `localized`, and re-render on `langchange`
      through useLang() in SiteNav. The bar's remaining STATIC text (اللغة,
      English, حسابي, الإشعارات…) is not in the payload and keeps its
      data-i18n — React never rewrites those nodes, because their children are
      constants that don't change between renders.

   2. DESTINATIONS STAY WITH THE SITE — see ROUTE_BY_KEY.
   ========================================================= */

import { localized, type Localized } from "@/lib/api/pages";
import type { NavbarContent, NavbarItem, SocialLink } from "@/lib/api/layout";
import { socialIcon } from "./social-icons";

export type NavbarNavLink = {
  label: string;
  url: string;
  /** Route this app can reach with <Link> — see SOFT_ROUTES. */
  soft: boolean;
  /** Only shown in the collapsed drawer (`d-lg-none`) — ادعم صوت, which is a
      top-bar CTA on desktop. */
  mobileOnly?: boolean;
  /** The API's key, kept so NavPills can pick the brand mark. */
  key: string;
};

export type NavbarSocialLink = {
  /** The API's platform slug, lowercased — NavSocialLinks picks the design's
      own mark from it. */
  platform: string;
  /** Font Awesome class for the platform, e.g. "fab fa-instagram". Only used
      for a platform the bar has no mark drawn for. */
  icon: string;
  url: string;
  /** Off-site link — gets target="_blank". */
  external: boolean;
};

export type NavbarView = {
  siteName: string;
  /** "" when the API has no logo — SiteNav then renders no <img>. */
  logoUrl: string;
  socialsLabel: string;
  socials: NavbarSocialLink[];
  support: NavbarNavLink;
  register: NavbarNavLink;
  login: NavbarNavLink;
  searchPlaceholder: string;
  /** The label the toggle SHOWS: "En" while the site is Arabic, and back. */
  langLabel: string;
  /** The main link row, with ادعم صوت spliced in for the phone drawer. */
  primary: NavbarNavLink[];
  /** حاضنة صوت / صوت ميديا, the two branded shortcuts. */
  pills: NavbarNavLink[];
};

/* ---------------------------------------------------------------------------
   Destinations stay with the site. The API's `url` is never used.

   Same reasoning as the footer's ROUTE_BY_KEY, and it bites harder up here:
   the navbar is on every page, so one wrong href in the payload is a dead end
   across the whole site. A link is matched by its `key` (stable; the editor
   doesn't type it) to the route this app actually serves, and a key nothing
   here knows about gets "#", the placeholder href the legacy markup already
   used for a section with no page yet.

   `external: true` on the two secondary entries is not acted on either:
   /incubator and /media are routes of THIS app, and the pills have never
   opened a new tab.
   --------------------------------------------------------------------------- */
const ROUTE_BY_KEY: Record<string, string> = {
  home: "/",
  about: "/about",
  content: "/content",
  team: "/team",
  creators: "/creators",
  support: "/support",
  register: "/register",
  login: "/login",
  incubator: "/incubator",
  media_kit: "/incubator",
  media: "/media",
  blog: "/media",
};

/* The only two destinations reachable with <Link>. Everything else in the bar
   is a plain <a> (full reload) because the route groups load stylesheets that
   clash — style.css vs content.css vs password.css — so a soft navigation
   would arrive with the previous group's CSS still applied. See CLAUDE.md,
   "CSS groups". */
const SOFT_ROUTES = new Set(["/", "/about"]);

/* ادعم صوت is a top-bar CTA on desktop, and in the collapsed drawer it is a
   link in the list — above صناع المحتوى, which is the order the phone design
   lists them in. The API sends it in `topbar`, not in `nav.primary`, so the
   position is decided here: before this key, or at the end if the row doesn't
   carry it. */
const SUPPORT_BEFORE_KEY = "creators";

/* --------------------------------------------------------------------------- */

/** The payload's text for the current language, "" when the field is absent. */
function text(value: Localized | null | undefined, lang: string): string {
  return localized(value, lang) || "";
}

/** One nav entry, pointed at this site's own route for its key.

    `fallbackKey` covers the two auth buttons: the API nests them under
    `topbar.auth.register` / `.login` and sends no `key` of their own, so the
    slot they arrived in names them. */
function link(
  item: NavbarItem | null | undefined,
  lang: string,
  fallbackKey = "",
  extra: Partial<NavbarNavLink> = {},
): NavbarNavLink {
  const key = ((item?.key || fallbackKey) || "").trim().toLowerCase();
  // never item.url — see ROUTE_BY_KEY
  const url = ROUTE_BY_KEY[key] || "#";
  return {
    key,
    label: text(item?.label, lang),
    url,
    soft: SOFT_ROUTES.has(url),
    ...extra,
  };
}

function links(list: NavbarItem[] | undefined, lang: string): NavbarNavLink[] {
  if (!Array.isArray(list)) return [];
  return list.map((item) => link(item, lang)).filter((entry) => entry.label);
}

function socials(list: SocialLink[] | undefined): NavbarSocialLink[] {
  if (!Array.isArray(list)) return [];

  return list
    .map((social) => {
      const url = (social?.url || "").trim();
      return {
        platform: (social?.platform || "").trim().toLowerCase(),
        icon: socialIcon(social?.platform),
        url,
        external: /^https?:\/\//i.test(url),
      };
    })
    // an entry with no link at all is an empty row in the admin
    .filter((social) => social.url);
}

/** The whole navbar, resolved for one language. Recomputed on every language
    toggle — `lang` comes from useLang() in SiteNav. */
export function resolveNavbar(data: NavbarContent | null, lang: string): NavbarView {
  const topbar = data?.topbar;
  const support = link(topbar?.support, lang, "support", { mobileOnly: true });

  const primary = links(data?.nav?.primary, lang);
  if (support.label) {
    const at = primary.findIndex((entry) => entry.key === SUPPORT_BEFORE_KEY);
    primary.splice(at === -1 ? primary.length : at, 0, support);
  }

  return {
    siteName: (data?.site_name || "").trim(),
    logoUrl: data?.logo_url || "",
    socialsLabel: text(topbar?.socials_label, lang),
    socials: socials(topbar?.socials),
    support,
    register: link(topbar?.auth?.register, lang, "register"),
    login: link(topbar?.auth?.login, lang, "login"),
    searchPlaceholder: text(topbar?.search_placeholder, lang),
    langLabel: text(topbar?.language?.label, lang),
    primary,
    pills: links(data?.nav?.secondary, lang),
  };
}
