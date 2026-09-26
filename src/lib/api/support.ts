/* =========================================================
   The "ادعم صوت" page from the Sawt API (base + error shape: ./client).

     GET /pages/support → { data: { hero, plans, impact, trust, community_goal,
                                    fund_allocation, partners, sponsor, stories,
                                    faq, contact_cta, methods } }

   One request paints /support (every section) and /support/methods (the hero
   and the `methods` categories).

   Same conventions as ./pages: every text field arrives as { ar, en } and is
   picked per the language the site is currently in (`localized`), and uploads
   arrive as absolute URLs that are pulled back onto the API host (`assetUrl`).
   Lists are put in the editor's `sort_order` here, once, so no section has to.
   ========================================================= */

import { apiFetch } from "./client";
import { assetUrl, type Localized } from "./pages";

type Envelope<T> = { message?: string; data?: T };

type Sortable = { sort_order?: number };

export type SupportHeroContent = {
  image_url?: string | null;
  title?: Localized;
  description?: Localized;
};

/** A preset amount of one interval. The API lists none yet, so the shape is
    read defensively: a bare number, or an object carrying `amount`. */
export type SupportPlanPreset =
  | number
  | string
  | { amount?: number | string | null; is_default?: boolean; sort_order?: number };

export type SupportInterval = {
  /** one_time | monthly | yearly */
  key?: string;
  label?: Localized;
  is_default?: boolean;
  plans?: SupportPlanPreset[];
};

export type SupportPlansContent = {
  title?: Localized;
  description?: Localized;
  intervals?: SupportInterval[];
  custom_amount?: {
    enabled?: boolean;
    min?: number;
    max?: number;
    placeholder?: Localized;
  };
  currency?: string;
};

export type SupportImpactContent = {
  title?: Localized;
  items?: ({ text?: Localized } & Sortable)[];
  quote?: { text?: Localized; author?: Localized; location?: Localized };
};

export type SupportTrustContent = {
  items?: ({ label?: Localized } & Sortable)[];
};

export type SupportCommunityGoal = {
  title?: Localized;
  subtitle?: Localized;
  currency?: string;
  target?: number;
  raised?: number;
  remaining?: number;
  progress_percent?: number;
  labels?: {
    target?: Localized;
    raised?: Localized;
    remaining?: Localized;
    progress?: Localized;
  };
  /** Carries an `:amount` placeholder for the remaining sum. */
  message?: Localized;
  cta?: { label?: Localized };
};

export type SupportAllocationItem = {
  key?: string;
  pct?: number;
  title?: Localized;
  description?: Localized;
  bullets?: Localized[];
} & Sortable;

export type SupportFundAllocation = {
  title?: Localized;
  subtitle?: Localized;
  items?: SupportAllocationItem[];
  transparency?: { badge?: Localized; title?: Localized; body?: Localized };
};

export type SupportCta = { title?: Localized; body?: Localized; label?: Localized };

export type SupportPartnersContent = {
  title?: Localized;
  subtitle?: Localized;
  cta?: SupportCta;
  items?: ({ name?: string | null; logo_url?: string | null } & Sortable)[];
};

export type SupportPackage = {
  title?: Localized;
  description?: Localized;
  duration?: Localized;
  seats?: Localized;
  price?: string | number | null;
  currency?: string | null;
  cta?: { label?: Localized };
} & Sortable;

export type SupportSponsorContent = {
  enabled?: boolean;
  title?: Localized;
  subtitle?: Localized;
  packages?: SupportPackage[];
};

export type SupportStoryItem = {
  uuid?: string;
  id?: number;
  cover_image?: string | null;
  badge?: Localized;
  headline?: Localized;
  excerpt?: Localized;
  footer_title?: Localized;
  footer_subtitle?: Localized;
};

export type SupportStoriesContent = {
  title?: Localized;
  subtitle?: Localized;
  cta?: SupportCta;
  items?: SupportStoryItem[];
};

export type SupportFaqContent = {
  title?: Localized;
  image_url?: string | null;
  cta?: SupportCta & { image_url?: string | null };
  items?: ({ question?: Localized; answer?: Localized } & Sortable)[];
};

export type SupportMethodCategory = {
  /** electronic | transfer | crypto */
  key?: string;
  title?: Localized;
  description?: Localized;
  icon?: string | null;
  accent?: string | null;
  is_enabled?: boolean;
};

export type SupportMethodsContent = {
  title?: Localized;
  description?: Localized;
  categories?: SupportMethodCategory[];
};

export type SupportPage = {
  hero?: SupportHeroContent;
  plans?: SupportPlansContent;
  impact?: SupportImpactContent;
  trust?: SupportTrustContent;
  community_goal?: SupportCommunityGoal;
  fund_allocation?: SupportFundAllocation;
  partners?: SupportPartnersContent;
  sponsor?: SupportSponsorContent;
  stories?: SupportStoriesContent;
  faq?: SupportFaqContent;
  contact_cta?: { email?: string | null; phone?: string | null; whatsapp?: string | null };
  methods?: SupportMethodsContent;
};

/** The editor's order, with an entry that carries no `sort_order` left where
    it arrived — same rule as the other lists (api/collaborate `sorted`). */
function sorted<T extends Sortable>(list: T[] | undefined): T[] {
  if (!Array.isArray(list)) return [];
  return list
    .map((item, index) => ({ item, index }))
    .sort(
      (a, b) =>
        (a.item.sort_order ?? a.index) - (b.item.sort_order ?? b.index) ||
        a.index - b.index,
    )
    .map((entry) => entry.item);
}

/** Same payload with every upload URL pointed at the host that actually serves
    it, and every list in the order it is to be shown. */
function normalize(page: SupportPage): SupportPage {
  const { hero, impact, trust, fund_allocation, partners, sponsor, stories, faq } = page;
  return {
    ...page,
    hero: hero && { ...hero, image_url: assetUrl(hero.image_url) },
    impact: impact && { ...impact, items: sorted(impact.items) },
    trust: trust && { ...trust, items: sorted(trust.items) },
    fund_allocation: fund_allocation && {
      ...fund_allocation,
      items: sorted(fund_allocation.items),
    },
    partners: partners && {
      ...partners,
      items: sorted(partners.items).map((item) => ({
        ...item,
        logo_url: assetUrl(item.logo_url),
      })),
    },
    sponsor: sponsor && { ...sponsor, packages: sorted(sponsor.packages) },
    stories: stories && {
      ...stories,
      items: (stories.items || []).map((item) => ({
        ...item,
        cover_image: assetUrl(item.cover_image),
      })),
    },
    faq: faq && {
      ...faq,
      image_url: assetUrl(faq.image_url),
      items: sorted(faq.items),
    },
  };
}

export async function fetchSupportPage(signal?: AbortSignal): Promise<SupportPage | null> {
  const payload = await apiFetch<Envelope<SupportPage>>("/pages/support", { signal });
  return payload?.data ? normalize(payload.data) : null;
}
