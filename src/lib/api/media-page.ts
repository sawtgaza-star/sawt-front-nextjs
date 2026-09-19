/* =========================================================
   صوت ميديا's page content from the Sawt API (base + error shape: ./client).

     GET /pages/media → { data: { hero, about, stats, services, why,
                                  methodology, works, audiences, partners,
                                  consultation, packages, testimonials, faq } }

   Same conventions as ./pages: every text field arrives as { ar, en } and is
   picked per the language the site is currently in (`localized`), lists arrive
   as { ar: [...], en: [...] } (`localizedList`), and uploads arrive as absolute
   URLs that have to be pulled back onto the API host (`assetUrl` — see the long
   note there for why).

   One request serves the whole page: /media is a single long page and the API
   answers all thirteen blocks at once, so <MediaContent /> fetches once and
   hands each section its own block.

   As on /about, this payload is the ONLY source the page has — the sections
   carry no built-in copy behind these fields. What the editor leaves empty
   renders empty, and a section with nothing to say renders nothing at all.
   ========================================================= */

import { apiFetch } from "./client";
import { assetUrl, type Localized } from "./pages";

type Envelope<T> = { message?: string; data?: T };

/** A list in both languages — bullet rows, service chips. */
export type LocalizedList = { ar?: string[] | null; en?: string[] | null };

/** An upload. `key` names its slot where the design has fixed ones (the about
    collage); elsewhere `sort_order` alone decides the position. */
export type MediaImage = { key?: string | null; url?: string | null; sort_order?: number };

/** A link the API owns both halves of: where it goes and what it says. */
export type MediaCta = { key?: string | null; path?: string | null; label?: Localized };

/** The white "98% / رضا العملاء" chip. */
export type MediaBadge = { value?: string | null; label?: Localized };

/** A picked-from-a-list value: the works filter's service and tag, and the
    booking form's service options. */
export type MediaOption = {
  uuid?: string | null;
  slug?: string | null;
  value?: string | null;
  label?: Localized;
};

/** The head every section opens with: pill, heading, one-liner. */
type SectionHead = { eyebrow?: Localized; title?: Localized; subtitle?: Localized };

/* --- hero ---------------------------------------------------------------- */

export type MediaPhrase = { label?: Localized; sort_order?: number };

export type MediaHeroContent = {
  eyebrow?: Localized;
  /** The fanned deck of production stills. */
  images?: MediaImage[];
  /** The services named by the rotating orange word AND by the ticker. */
  phrases?: MediaPhrase[];
  description?: Localized;
  cta?: { primary?: MediaCta; secondary?: MediaCta };
  badge?: MediaBadge;
};

/* --- about --------------------------------------------------------------- */

export type MediaAboutCard = { title?: Localized; text?: Localized };

export type MediaAboutContent = {
  eyebrow?: Localized;
  title?: Localized;
  body?: Localized;
  vision?: MediaAboutCard;
  mission?: MediaAboutCard;
  /** Four slots, keyed top_start / top_end / bottom_start / bottom_end. */
  images?: MediaImage[];
  badge?: MediaBadge;
};

/* --- the listing sections ------------------------------------------------ */

export type MediaStatItem = { value?: string | null; label?: Localized; sort_order?: number };
export type MediaStatsContent = SectionHead & { items?: MediaStatItem[] };

export type MediaServiceItem = {
  uuid?: string | null;
  slug?: string | null;
  /** Where the card's "استكشف المزيد" goes — /media/services/<slug>. */
  path?: string | null;
  /** The card's watermark, as the editor typed it ("01"…). */
  number?: string | null;
  title?: Localized;
  tagline?: Localized;
  description?: Localized;
  tags?: LocalizedList;
  image_url?: string | null;
  sort_order?: number;
};
export type MediaServicesContent = SectionHead & {
  cta?: { label?: Localized };
  items?: MediaServiceItem[];
};

export type MediaWhyItem = {
  icon_url?: string | null;
  title?: Localized;
  description?: Localized;
  sort_order?: number;
};
export type MediaWhyContent = SectionHead & { items?: MediaWhyItem[] };

export type MediaStepItem = {
  number?: string | null;
  title?: Localized;
  description?: Localized;
  sort_order?: number;
};
export type MediaMethodologyContent = SectionHead & { steps?: MediaStepItem[] };

export type MediaWorkItem = {
  uuid?: string | null;
  slug?: string | null;
  path?: string | null;
  category?: Localized;
  date?: Localized;
  title?: Localized;
  description?: Localized;
  image_url?: string | null;
  service?: MediaOption;
  tag?: MediaOption;
  sort_order?: number;
};
export type MediaWorksContent = SectionHead & {
  more?: { label?: Localized };
  items?: MediaWorkItem[];
};

export type MediaAudienceItem = {
  title?: Localized;
  tagline?: Localized;
  description?: Localized;
  bullets?: LocalizedList;
  sort_order?: number;
};
export type MediaAudiencesContent = SectionHead & { items?: MediaAudienceItem[] };

export type MediaPartnerItem = {
  name?: string | null;
  logo_url?: string | null;
  url?: string | null;
  sort_order?: number;
};
export type MediaPartnersContent = SectionHead & { items?: MediaPartnerItem[] };

/* --- consultation -------------------------------------------------------- */

export type MediaFormField = {
  key?: string | null;
  label?: Localized;
  placeholder?: Localized;
  required?: boolean;
  default?: string | null;
};

export type MediaConsultForm = {
  title?: Localized;
  /** Where a submit would go. Not wired yet — the form is still a no-op. */
  submit_path?: string | null;
  method?: string | null;
  fields?: Record<string, MediaFormField>;
  services?: MediaOption[];
  submit?: { label?: Localized };
};

export type MediaConsultationContent = {
  eyebrow?: Localized;
  title?: Localized;
  body?: Localized;
  bullets?: LocalizedList;
  form?: MediaConsultForm;
};

/* --- packages / testimonials / faq --------------------------------------- */

/** A bundle's feature row: bold name over a muted note. Unlike every other
    list, these arrive already flattened per language, not as { ar, en } pairs. */
export type MediaFeature = { title?: string | null; description?: string | null };
export type LocalizedFeatures = { ar?: MediaFeature[] | null; en?: MediaFeature[] | null };

export type MediaPackageItem = {
  title?: Localized;
  tagline?: Localized;
  description?: Localized;
  features?: LocalizedFeatures;
  sort_order?: number;
};
export type MediaPackagesContent = SectionHead & {
  cta?: MediaCta;
  items?: MediaPackageItem[];
};

export type MediaTestimonialItem = {
  name?: string | null;
  role?: Localized;
  quote?: Localized;
  avatar_url?: string | null;
  sort_order?: number;
};
export type MediaTestimonialsContent = SectionHead & { items?: MediaTestimonialItem[] };

export type MediaFaqItem = { question?: Localized; answer?: Localized; sort_order?: number };
export type MediaFaqContent = SectionHead & { items?: MediaFaqItem[] };

/* --- the page ------------------------------------------------------------ */

export type MediaPage = {
  hero?: MediaHeroContent;
  about?: MediaAboutContent;
  stats?: MediaStatsContent;
  services?: MediaServicesContent;
  why?: MediaWhyContent;
  methodology?: MediaMethodologyContent;
  works?: MediaWorksContent;
  audiences?: MediaAudiencesContent;
  partners?: MediaPartnersContent;
  consultation?: MediaConsultationContent;
  packages?: MediaPackagesContent;
  testimonials?: MediaTestimonialsContent;
  faq?: MediaFaqContent;
};

/** Every upload URL pointed at the host that actually serves it. Applied once,
    on the way out of the fetch, so no section has to know. */
function withAssetUrls(page: MediaPage): MediaPage {
  const images = (list?: MediaImage[]) =>
    list?.map((image) => ({ ...image, url: assetUrl(image.url) }));

  const map = <T,>(list: T[] | undefined, fn: (item: T) => T) => list?.map(fn);

  return {
    ...page,
    hero: page.hero && { ...page.hero, images: images(page.hero.images) },
    about: page.about && { ...page.about, images: images(page.about.images) },
    services: page.services && {
      ...page.services,
      items: map(page.services.items, (s) => ({ ...s, image_url: assetUrl(s.image_url) })),
    },
    why: page.why && {
      ...page.why,
      items: map(page.why.items, (w) => ({ ...w, icon_url: assetUrl(w.icon_url) })),
    },
    works: page.works && {
      ...page.works,
      items: map(page.works.items, (w) => ({ ...w, image_url: assetUrl(w.image_url) })),
    },
    partners: page.partners && {
      ...page.partners,
      items: map(page.partners.items, (p) => ({ ...p, logo_url: assetUrl(p.logo_url) })),
    },
    testimonials: page.testimonials && {
      ...page.testimonials,
      items: map(page.testimonials.items, (t) => ({
        ...t,
        avatar_url: assetUrl(t.avatar_url),
      })),
    },
  };
}

export async function fetchMediaPage(signal?: AbortSignal): Promise<MediaPage | null> {
  const payload = await apiFetch<Envelope<MediaPage>>("/pages/media", { signal });
  return payload?.data ? withAssetUrls(payload.data) : null;
}

/** The list in the current language, falling back to the other one — the same
    bargain `localized` makes for a single string (see ./pages). */
export function localizedList(value: LocalizedList | null | undefined, lang: string): string[] {
  if (!value) return [];
  const preferred = lang === "en" ? value.en : value.ar;
  return preferred?.length ? preferred : value.ar?.length ? value.ar : value.en || [];
}

/** Bundle features, which the API flattens per language rather than per field. */
export function localizedFeatures(
  value: LocalizedFeatures | null | undefined,
  lang: string,
): MediaFeature[] {
  if (!value) return [];
  const preferred = lang === "en" ? value.en : value.ar;
  return preferred?.length ? preferred : value.ar?.length ? value.ar : value.en || [];
}

/** Items in the order the editor arranged them. Entries without `sort_order`
    keep the order the API listed them in. Generic twin of ./pages' `sorted`. */
export function sortItems<T extends { sort_order?: number }>(list: T[] | undefined): T[] {
  if (!Array.isArray(list)) return [];
  return list
    .map((item, index) => ({ item, index }))
    .sort(
      (a, b) =>
        (a.item.sort_order ?? a.index) - (b.item.sort_order ?? b.index) || a.index - b.index,
    )
    .map((entry) => entry.item);
}
