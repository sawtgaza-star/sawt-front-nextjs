/* =========================================================
   حاضنة صوت navbar view model: GET /layout/incubator/navbar (lib/api/layout.ts),
   shaped for IncubatorNav and its two leaves (IncubatorNavLinks,
   IncubatorNavSocial).

   Same rules as the media bar (components/media/media-nav-data.ts):

   1. THE API IS THE ONLY SOURCE OF THE BAR'S COPY. Brand, back line, social
      label, section links, language label and both CTAs render exactly as they
      arrive — no data-i18n, since this text lands after initTranslate()'s
      first pass; the ar/en pair is picked here and re-picked on `langchange`
      through useLang(). The drawer's static text (اللغة / English) is not in
      the payload and keeps its data-i18n.

   2. DESTINATIONS STAY WITH THE SITE. The section links arrive with no url
      (they are anchors into /incubator), and the CTAs are resolved by key —
      see SECTIONS and ROUTE_BY_KEY.
   ========================================================= */

import { localized, type Localized } from "@/lib/api/pages";
import type { IncubatorNavbarContent, NavbarItem, SocialLink } from "@/lib/api/layout";

export type IncubatorNavLink = {
  /** The API's key, lowercased. */
  key: string;
  /** The section's element id on /incubator ("" for a key nothing knows). */
  id: string;
  label: string;
  href: string;
};

export type IncubatorNavView = {
  siteName: string;
  /** "" when the API has no logo — IncubatorNav then renders no <img>. */
  logoUrl: string;
  back: IncubatorNavLink;
  socialsLabel: string;
  socials: SocialLink[];
  /** The label the toggle SHOWS: "En" while the site is Arabic, and back. */
  langLabel: string;
  links: IncubatorNavLink[];
  join: IncubatorNavLink;
  support: IncubatorNavLink;
};

/* The sections /incubator actually has, in the bar's order. Unknown keys get
   "#" and are listed after these. */
const SECTIONS: { key: string; id: string }[] = [
  { key: "about", id: "inc-about" },
  { key: "courses", id: "inc-courses" },
  { key: "workshops", id: "inc-workshops" },
];

/** Every section id the bar can highlight, whatever the payload lists. */
export const SECTION_IDS = SECTIONS.map((section) => section.id);

/* The entries that leave the section list, by key — never by payload url. */
const ROUTE_BY_KEY: Record<string, string> = {
  platform: "/",
  join: "/incubator#inc-join",
  support_students: "/support",
};

function text(value: Localized | null | undefined, lang: string): string {
  return localized(value, lang) || "";
}

function keyOf(item: NavbarItem | null | undefined, fallback = ""): string {
  return (item?.key || fallback).trim().toLowerCase();
}

function order(key: string): number {
  const at = SECTIONS.findIndex((section) => section.key === key);
  return at === -1 ? SECTIONS.length : at;
}

function section(item: NavbarItem, lang: string): IncubatorNavLink {
  const key = keyOf(item);
  const id = SECTIONS.find((entry) => entry.key === key)?.id || "";
  return {
    key,
    id,
    label: text(item.label, lang),
    href: id ? `/incubator#${id}` : "#",
  };
}

/** A slot link (back / join / support): the slot names the destination, so
    an unknown key still lands on `fallbackHref`. */
function slot(
  item: NavbarItem | null | undefined,
  lang: string,
  fallbackKey: string,
  fallbackHref: string,
): IncubatorNavLink {
  const key = keyOf(item, fallbackKey);
  return {
    key,
    id: "",
    label: text(item?.label, lang),
    href: ROUTE_BY_KEY[key] || fallbackHref,
  };
}

/** The whole bar, resolved for one language. */
export function resolveIncubatorNav(
  data: IncubatorNavbarContent | null,
  lang: string,
): IncubatorNavView {
  const primary = Array.isArray(data?.nav?.primary) ? data.nav.primary : [];
  const links = primary
    .map((item) => section(item, lang))
    // an entry with no label is an empty row in the admin
    .filter((link) => link.label)
    .sort((a, b) => order(a.key) - order(b.key));

  const topbar = data?.topbar;
  const rawSocials = Array.isArray(topbar?.socials)
    ? topbar.socials
    : Array.isArray(data?.socials)
      ? data.socials
      : [];

  return {
    siteName: (data?.site_name || "").trim(),
    logoUrl: data?.logo_url || "",
    back: slot(data?.back_to_platform, lang, "platform", "/"),
    socialsLabel: text(topbar?.socials_label ?? data?.socials_label, lang),
    // an account with no url has nowhere to go
    socials: rawSocials.filter((social) => social?.url),
    langLabel: text(topbar?.language?.label, lang),
    links,
    join: slot(data?.actions?.join, lang, "join", "/incubator#inc-join"),
    support: slot(data?.actions?.support, lang, "support_students", "/support"),
  };
}
