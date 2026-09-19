/* =========================================================
   صوت ميديا navbar view model: GET /layout/media/navbar (lib/api/layout.ts),
   shaped for the agency bar (MediaNav) and the phone drawer (MediaNavMobile).

   Same two rules the site bar runs under (components/site/navbar-data.ts):

   1. THE API IS THE ONLY SOURCE OF THE BAR'S COPY. The brand name, the
      "العودة لمنصة صوت" line, the four section links, the language label and
      the CTA are rendered exactly as they arrive, with no built-in string
      standing behind them — a field the editor empties renders empty.

      None of them carries data-i18n either: the site's i18n is DOM based
      (applyTranslations() walks [data-i18n] once per page load and once per
      toggle) and this markup only gets its text when the response lands, long
      after that first pass. The ar/en pair is picked here with `localized`
      instead, and re-picked on `langchange` through useLang() in MediaNav.
      The drawer's remaining static text (اللغة, English, احجز استشارة) is not
      in the payload and keeps its data-i18n.

   2. DESTINATIONS STAY WITH THE SITE — see SECTIONS and ROUTE_BY_KEY. It is
      not even a choice here: the section links arrive with no url at all,
      because they are anchors into /media that only this app knows, and the
      CTA's `path` is ignored for the same reason the site bar ignores its
      `url` — one wrong href in the payload is a dead end on every /media page.

   ORDER STAYS HERE TOO. The bar and the drawer list the same four links in
   OPPOSITE orders — the design opens the bar with عن صوت ميديا (on the right,
   next to the brand) and stacks منهجيتنا first in the drawer — so one of the
   two has to be ordered locally whatever sequence the payload arrives in.
   SECTIONS is the bar's order; MediaNavMobile walks it back.
   ========================================================= */

import { localized, type Localized } from "@/lib/api/pages";
import type { MediaNavbarContent, NavbarItem } from "@/lib/api/layout";

export type MediaNavLink = {
  /** The API's key, lowercased — what the href was resolved from. */
  key: string;
  label: string;
  href: string;
};

export type MediaNavView = {
  siteName: string;
  /** "" when the API has no logo — MediaNav then renders no <img>. */
  logoUrl: string;
  /** "العودة لمنصة صوت", above the nav card. */
  back: MediaNavLink;
  /** The label the toggle SHOWS: "En" while the site is Arabic, and back. */
  langLabel: string;
  /** The section links, in the bar's order (see SECTIONS). */
  links: MediaNavLink[];
  /** ابدأ مشروعك — the one item that leaves the page. */
  cta: MediaNavLink;
};

/* The sections /media actually has, in the order the bar lists them. Doubles
   as the key → anchor map: a key nothing here knows about gets "#", the
   placeholder href the markup already used for a section with no page yet,
   and is listed after the four below. */
const SECTIONS: { key: string; href: string }[] = [
  { key: "about", href: "#sm-about" },
  { key: "works", href: "#sm-works" },
  { key: "services", href: "#sm-services" },
  { key: "methodology", href: "#sm-process" },
];

/* The two entries that leave the page, by key — never by the payload's own
   `path`, as above. */
const ROUTE_BY_KEY: Record<string, string> = {
  platform: "/",
  start_project: "/media/contact",
};

/** The payload's text for the current language, "" when the field is absent. */
function text(value: Localized | null | undefined, lang: string): string {
  return localized(value, lang) || "";
}

/** Where a section key sorts in the bar. Unknown keys land at the end. */
function order(key: string): number {
  const at = SECTIONS.findIndex((section) => section.key === key);
  return at === -1 ? SECTIONS.length : at;
}

function section(item: NavbarItem | null | undefined, lang: string): MediaNavLink {
  const key = ((item?.key || "") as string).trim().toLowerCase();
  const at = SECTIONS.findIndex((entry) => entry.key === key);
  return {
    key,
    label: text(item?.label, lang),
    href: at === -1 ? "#" : SECTIONS[at].href,
  };
}

/** The whole bar, resolved for one language. Recomputed on every language
    toggle — `lang` comes from useLang() in MediaNav. */
export function resolveMediaNav(
  data: MediaNavbarContent | null,
  lang: string,
): MediaNavView {
  const primary = Array.isArray(data?.nav?.primary) ? data.nav.primary : [];
  const links = primary
    .map((item) => section(item, lang))
    // an entry with no label is an empty row in the admin
    .filter((link) => link.label)
    .sort((a, b) => order(a.key) - order(b.key));

  const back = data?.back_to_platform;
  const backKey = (back?.key || "platform").trim().toLowerCase();

  const cta = data?.actions?.start_project;
  const ctaKey = (cta?.key || "start_project").trim().toLowerCase();

  return {
    siteName: (data?.site_name || "").trim(),
    logoUrl: data?.logo_url || "",
    back: {
      key: backKey,
      label: text(back?.label, lang),
      // whatever it is called, this link goes back to the platform's home
      href: ROUTE_BY_KEY[backKey] || "/",
    },
    langLabel: text(data?.topbar?.language?.label, lang),
    links,
    cta: {
      key: ctaKey,
      label: text(cta?.label, lang),
      // the slot names the destination, so an unknown key still lands right
      href: ROUTE_BY_KEY[ctaKey] || "/media/contact",
    },
  };
}
