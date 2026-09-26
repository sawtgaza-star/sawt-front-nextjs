/* =========================================================
   حاضنة صوت's page content from the Sawt API (base + error shape: ./client).

     GET /pages/incubator → { data: { hero, stats, why, courses, sponsor,
                                      events, gallery, experts, faq,
                                      employers, join_cta, testimonials } }

   Same conventions as ./media-page: every text field arrives as { ar, en } and
   is picked per the current language (`localized`), and uploads arrive as
   absolute URLs that are passed through `assetUrl` once, on the way out of the
   fetch, so no section has to know.

   One request serves the whole page: <IncubatorContent /> fetches once and
   hands each section its own block. The payload is the ONLY source of the
   page's copy — what the editor leaves empty renders empty, and a section
   with nothing to say renders nothing at all.
   ========================================================= */

import { apiFetch } from "./client";
import { assetUrl, type Localized } from "./pages";

type Envelope<T> = { message?: string; data?: T };

type Sorted = { sort_order?: number };
type Label = { label?: Localized };
type SectionHead = { title?: Localized; subtitle?: Localized };

/* --- hero + stats -------------------------------------------------------- */

export type IncubatorBadge = { value?: string | null; label?: Localized };

export type IncubatorHeroContent = {
  /** The gradient ground behind the whole hero. */
  background_url?: string | null;
  /** The framed collage beside the headline. */
  foreground_url?: string | null;
  /** Legacy single-image field — used when `foreground_url` is missing. */
  image_url?: string | null;
  badges?: { top?: IncubatorBadge; bottom?: IncubatorBadge };
  title?: Localized;
  description?: Localized;
  cta?: Label;
};

export type IncubatorStat = Sorted & {
  key?: string | null;
  value?: string | null;
  label?: Localized;
};

/* --- why ----------------------------------------------------------------- */

export type IncubatorWhyItem = Sorted & {
  icon_url?: string | null;
  title?: Localized;
  description?: Localized;
};

export type IncubatorWhyContent = SectionHead & {
  image_url?: string | null;
  items?: IncubatorWhyItem[];
};

/* --- courses ------------------------------------------------------------- */

export type IncubatorCourse = {
  id?: number;
  uuid?: string | null;
  slug?: string | null;
  title?: Localized;
  description?: Localized;
  image_url?: string | null;
  category?: Localized;
  trainer?: { name?: Localized; avatar_url?: string | null };
  level?: Localized;
  /** Already formatted by the API ("15 ساعة") — not localized. */
  duration_hours?: string | null;
  sessions_hours?: string | null;
  rating?: number | null;
  is_coming_soon?: boolean;
  cta?: Label & { key?: string | null };
};

export type IncubatorCoursesContent = SectionHead & { items?: IncubatorCourse[] };

/* --- sponsor ------------------------------------------------------------- */

export type IncubatorPackage = Sorted & {
  title?: Localized;
  description?: Localized;
  duration?: Localized;
  seats?: Localized;
  price?: string | null;
  currency?: string | null;
  cta?: Label;
};

export type IncubatorWaitingStudent = Sorted & {
  name?: string | null;
  meta?: Localized;
  avatar_url?: string | null;
};

export type IncubatorImpactStat = Sorted & { value?: string | null; label?: Localized };

export type IncubatorSponsorContent = SectionHead & {
  packages?: IncubatorPackage[];
  waiting?: {
    title?: Localized;
    more_label?: Localized;
    students?: IncubatorWaitingStudent[];
  };
  impact?: { title?: Localized; stats?: IncubatorImpactStat[] };
};

/* --- events -------------------------------------------------------------- */

export type IncubatorEventCategory = Sorted & {
  key?: string | null;
  label?: Localized;
  count?: number | null;
};

export type IncubatorEvent = Sorted & {
  image_url?: string | null;
  category_key?: string | null;
  title?: Localized;
  description?: Localized;
  starts_at?: string | null;
  date_badge?: { day?: string | null; month?: Localized };
  date_label?: Localized;
  time_label?: Localized;
  delivery?: Label & { key?: string | null };
  format?: Label & { key?: string | null };
  /** "وجاهي، ندوة" — the venue row, already joined by the API. */
  tags?: Localized;
};

export type IncubatorEventsContent = SectionHead & {
  categories?: IncubatorEventCategory[];
  items?: IncubatorEvent[];
};

/* --- gallery ------------------------------------------------------------- */

export type IncubatorGalleryItem = Sorted & {
  /** left_top | left_bottom | center_top | center_bottom | right_tall */
  slot?: string | null;
  type?: "image" | "video" | string | null;
  image_url?: string | null;
  video_url?: string | null;
  caption?: Localized;
  subtitle?: Localized;
};

export type IncubatorGalleryContent = SectionHead & { items?: IncubatorGalleryItem[] };

/* --- experts ------------------------------------------------------------- */

export type IncubatorExpert = Sorted & {
  id?: number;
  uuid?: string | null;
  name?: Localized;
  title?: Localized;
  /** Years, as a string ("8"). */
  experience?: Localized;
  bio?: Localized;
  avatar_url?: string | null;
  link_url?: string | null;
  socials?: { platform?: string | null; url?: string | null }[];
};

export type IncubatorExpertsContent = SectionHead & { items?: IncubatorExpert[] };

/* --- faq ----------------------------------------------------------------- */

export type IncubatorFaqItem = Sorted & { question?: Localized; answer?: Localized };

export type IncubatorFaqContent = SectionHead & {
  image_url?: string | null;
  items?: IncubatorFaqItem[];
  more?: { title?: Localized; description?: Localized };
};

/* --- employers / join / testimonials ------------------------------------- */

export type IncubatorEmployer = Sorted & {
  name?: string | null;
  logo_url?: string | null;
  url?: string | null;
};

export type IncubatorEmployersContent = SectionHead & { items?: IncubatorEmployer[] };

export type IncubatorJoinContent = {
  image_url?: string | null;
  title?: Localized;
  description?: Localized;
  button?: Label;
};

export type IncubatorTestimonial = Sorted & {
  name?: string | null;
  role?: Localized;
  quote?: Localized;
  avatar_url?: string | null;
  rating?: number | null;
};

export type IncubatorTestimonialsContent = SectionHead & {
  view_all?: Label;
  read_more?: Label;
  items?: IncubatorTestimonial[];
};

/* --- the page ------------------------------------------------------------ */

export type IncubatorPage = {
  hero?: IncubatorHeroContent;
  stats?: IncubatorStat[];
  why?: IncubatorWhyContent;
  courses?: IncubatorCoursesContent;
  sponsor?: IncubatorSponsorContent;
  events?: IncubatorEventsContent;
  gallery?: IncubatorGalleryContent;
  experts?: IncubatorExpertsContent;
  faq?: IncubatorFaqContent;
  employers?: IncubatorEmployersContent;
  join_cta?: IncubatorJoinContent;
  testimonials?: IncubatorTestimonialsContent;
};

/** Every upload URL pointed at the host that actually serves it. */
function withAssetUrls(page: IncubatorPage): IncubatorPage {
  const map = <T,>(list: T[] | undefined, fn: (item: T) => T) =>
    Array.isArray(list) ? list.map(fn) : list;

  return {
    ...page,
    hero: page.hero && {
      ...page.hero,
      background_url: assetUrl(page.hero.background_url),
      foreground_url: assetUrl(page.hero.foreground_url),
      image_url: assetUrl(page.hero.image_url),
    },
    why: page.why && {
      ...page.why,
      image_url: assetUrl(page.why.image_url),
      items: map(page.why.items, (w) => ({ ...w, icon_url: assetUrl(w.icon_url) })),
    },
    courses: page.courses && {
      ...page.courses,
      items: map(page.courses.items, (c) => ({
        ...c,
        image_url: assetUrl(c.image_url),
        trainer: c.trainer && { ...c.trainer, avatar_url: assetUrl(c.trainer.avatar_url) },
      })),
    },
    sponsor: page.sponsor && {
      ...page.sponsor,
      waiting: page.sponsor.waiting && {
        ...page.sponsor.waiting,
        students: map(page.sponsor.waiting.students, (s) => ({
          ...s,
          avatar_url: assetUrl(s.avatar_url),
        })),
      },
    },
    events: page.events && {
      ...page.events,
      items: map(page.events.items, (e) => ({ ...e, image_url: assetUrl(e.image_url) })),
    },
    gallery: page.gallery && {
      ...page.gallery,
      items: map(page.gallery.items, (g) => ({
        ...g,
        image_url: assetUrl(g.image_url),
        video_url: assetUrl(g.video_url),
      })),
    },
    experts: page.experts && {
      ...page.experts,
      items: map(page.experts.items, (e) => ({ ...e, avatar_url: assetUrl(e.avatar_url) })),
    },
    faq: page.faq && { ...page.faq, image_url: assetUrl(page.faq.image_url) },
    employers: page.employers && {
      ...page.employers,
      items: map(page.employers.items, (e) => ({ ...e, logo_url: assetUrl(e.logo_url) })),
    },
    join_cta: page.join_cta && {
      ...page.join_cta,
      image_url: assetUrl(page.join_cta.image_url),
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

export async function fetchIncubatorPage(
  signal?: AbortSignal,
): Promise<IncubatorPage | null> {
  const payload = await apiFetch<Envelope<IncubatorPage>>("/pages/incubator", { signal });
  return payload?.data ? withAssetUrls(payload.data) : null;
}
