/* =========================================================
   Footer view model: GET /layout/footer (lib/api/layout.ts), shaped for the
   columns.

   THE API IS THE ONLY SOURCE OF FOOTER COPY. Every field the endpoint sends —
   logo, about blurb, both link groups and their titles, the newsletter copy,
   the contact row, the socials, the copyright line and the brand — is rendered
   exactly as it arrives, with no built-in string standing behind it: an empty
   payload field renders empty rather than silently showing copy the editor
   cannot see or change.

   Two things this file exists to keep straight:

   1. HOW THE TEXT GETS TRANSLATED. The site's i18n is DOM based:
      applyTranslations() walks [data-i18n] once per page load and once per
      toggle. The footer mounts AFTER that first pass — it waits for the API —
      so a data-i18n attribute here would never be visited. The footer
      therefore carries no data-i18n at all: text comes from the payload's
      ar/en pair, picked with `localized`, and re-renders on `langchange`
      through useLang() in SiteFooter. Exactly the case lib/use-lang.ts was
      written for.

   2. DESTINATIONS STAY WITH THE SITE — see ROUTE_BY_KEY.
   ========================================================= */

import { localized, type Localized } from "@/lib/api/pages";
import type { FooterContent, FooterLink } from "@/lib/api/layout";
// the navbar's top bar renders the same editor-managed row — see ../social-icons
import { socialIcon, GENERIC_SOCIAL_ICON } from "../social-icons";

export type FooterNavLink = { label: string; url: string };

export type FooterSocialLink = {
  /** The API's platform slug, lowercased — FooterBottomBar picks the design's
      own mark from it. */
  platform: string;
  /** Font Awesome class for the platform, e.g. "fab fa-instagram". Only used
      for a platform the design draws no mark for. */
  icon: string;
  url: string;
  /** Off-site link — gets target="_blank". */
  external: boolean;
};

export type FooterView = {
  /** "" when the API has no logo — FooterBrand then renders no <img>. */
  logoUrl: string;
  about: string;
  main: { title: string; links: FooterNavLink[] };
  quick: { title: string; links: FooterNavLink[] };
  newsletter: { title: string; description: string; placeholder: string };
  contact: {
    phone: string;
    email: string;
    /** wa.me link built from `phone`; "" when there is no number to link. */
    phoneUrl: string;
    /** Gmail compose link for `email`; "" when there is no address. */
    emailUrl: string;
  };
  socials: FooterSocialLink[];
  copyright: string;
  brand: string;
};

/* Both contact lines are links, not plain text: the number opens WhatsApp,
   the address opens the visitor's mail app. The destinations are DERIVED from
   the payload's two values rather than written out a second time, so an
   editor who changes the number changes where it dials.

   wa.me wants the number in full international form and nothing else — no
   "+", spaces or dashes, or WhatsApp answers with "phone number shared via
   url is invalid" — hence the strip. */
function whatsappUrl(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return digits ? `https://wa.me/${digits}` : "";
}

/* Gmail's compose window, by request, rather than a mailto: — clicking the
   address should land the visitor in Gmail with the To: field filled, not in
   whatever mail client their OS happens to have registered. Someone not
   signed in gets Google's login first and arrives at the same compose box.
   No /u/0 in the path: that pins the FIRST signed-in account, which is the
   wrong one for anyone using more than one. */
function gmailComposeUrl(email: string): string {
  if (!email) return "";
  const to = encodeURIComponent(email);
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${to}`;
}

/* ---------------------------------------------------------------------------
   Destinations stay with the site. The API's `url` is never used.

   The payload does carry one per link, but it is the admin's idea of the route
   — literally "/backstage", "/media-kit", "/blog" for the اقسام صوت links —
   and the footer is navigation: a wrong href here is a dead end on every page
   of the site. So a link is matched by its `key` (stable; the editor doesn't
   type it) to the route this app actually serves, and a key nothing here knows
   about gets "#", the placeholder href the legacy markup already used for a
   section with no page yet.

   Add a route here when a new section ships; until then the API can rename or
   reorder the labels freely without being able to break navigation.
   --------------------------------------------------------------------------- */
const ROUTE_BY_KEY: Record<string, string> = {
  home: "/",
  about: "/about",
  content: "/content",
  team: "/team",
  creators: "/creators",
  // اقسام صوت — the keys read backstage/media_kit/blog in the admin, the
  // labels are منصة صوت / حاضنة صوت / صوت ميديا
  backstage: "/",
  platform: "/",
  media_kit: "/incubator",
  incubator: "/incubator",
  blog: "/media",
  media: "/media",
};

/* The design's column order: الرئيسية / من نحن / الفريق, then صناع المحتوى /
   محتوانا. The API lists content third, which would move محتوانا up into the
   first column, so the labels follow the API and the ORDER stays here. A key
   that isn't listed keeps the API's own position, after these. */
const MAIN_LINK_ORDER = ["home", "about", "team", "creators", "content"];

/** How many main-section links the first of the two columns takes. The design
    is 3 + the rest, on desktop and on mobile alike. */
export const MAIN_LINKS_FIRST_COLUMN = 3;

/* --------------------------------------------------------------------------- */

/** The payload's text for the current language, "" when the field is absent. */
function text(value: Localized | null | undefined, lang: string): string {
  return localized(value, lang) || "";
}

function links(
  list: FooterLink[] | undefined,
  lang: string,
  /** true for the الأقسام الرئيسية column, which the design orders itself */
  reorder = false,
): FooterNavLink[] {
  if (!Array.isArray(list)) return [];

  return list
    .map((link, index) => {
      const key = (link.key || "").trim().toLowerCase();
      const position = reorder ? MAIN_LINK_ORDER.indexOf(key) : -1;
      return {
        label: localized(link.label, lang),
        // this site's own route for the key — never link.url (see ROUTE_BY_KEY)
        url: ROUTE_BY_KEY[key] || "#",
        // unknown keys keep the API's own position, after the known ones
        sort: position === -1 ? MAIN_LINK_ORDER.length + index : position,
      };
    })
    .filter((link) => link.label)
    .sort((a, b) => a.sort - b.sort)
    .map(({ label, url }) => ({ label, url }));
}

function socials(list: FooterContent["socials"]): FooterSocialLink[] {
  if (!Array.isArray(list)) return [];

  return list
    .map((social) => {
      const url = (social?.url || "").trim();
      return {
        platform: (social?.platform || "").trim().toLowerCase(),
        icon: socialIcon(social?.platform),
        url: url || "#",
        external: /^https?:\/\//i.test(url),
      };
    })
    // an entry with neither a platform nor a link is an empty row in the admin
    .filter((social) => social.url !== "#" || social.icon !== GENERIC_SOCIAL_ICON);
}

/** The whole footer, resolved for one language. Recomputed on every language
    toggle — `lang` comes from useLang() in SiteFooter. */
export function resolveFooter(data: FooterContent | null, lang: string): FooterView {
  const phone = (data?.contact?.phone || "").trim();
  const email = (data?.contact?.email || "").trim();

  return {
    logoUrl: data?.logo_url || "",
    about: text(data?.about, lang),
    main: {
      title: text(data?.main?.title, lang),
      links: links(data?.main?.links, lang, true),
    },
    quick: {
      title: text(data?.quick?.title, lang),
      links: links(data?.quick?.links, lang),
    },
    newsletter: {
      title: text(data?.newsletter?.title, lang),
      description: text(data?.newsletter?.description, lang),
      placeholder: text(data?.newsletter?.email_placeholder, lang),
    },
    contact: {
      phone,
      email,
      phoneUrl: whatsappUrl(phone),
      emailUrl: gmailComposeUrl(email),
    },
    socials: socials(data?.socials),
    copyright: text(data?.copyright, lang),
    brand: (data?.brand || "").trim(),
  };
}
