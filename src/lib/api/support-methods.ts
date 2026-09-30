/* =========================================================
   The donation flow's own endpoints (base + error shape: ./client).

     GET /support/methods                  → { data: { hero, section, categories, labels } }
     GET /support/methods/category/{key}   → { data: { category, wizard, labels } }
     GET /support/methods/{uuid}           → { data: { method, paypal, labels } }

   The first paints /support/methods (hero, heading, the method cards); the
   second paints the wizard on /support/checkout for the category picked there
   (electronic | transfer | crypto) — its `category.methods` are the platforms
   of screen 1; the third fills "بيانات التحويل" for the platform picked. A key the API doesn't know — or one an
   editor switched off — answers 404 `support_method_not_found`.

   Same conventions as ./pages: text arrives as { ar, en } and is picked with
   `localized`; uploads go through `assetUrl`.
   ========================================================= */

import { apiFetch } from "./client";
import { assetUrl, type Localized } from "./pages";
import type { SupportHeroContent, SupportMethodCategory } from "./support";

type Envelope<T> = { message?: string; data?: T };

/** Button and hint copy shared by the methods page and the wizard. */
export type SupportFlowLabels = Partial<
  Record<
    | "continue"
    | "back"
    | "submit"
    | "copy"
    | "copied"
    | "choose_method"
    | "proof_hint"
    | "success_title"
    | "success_message",
    Localized
  >
>;

export type SupportMethodsPage = {
  hero?: SupportHeroContent;
  section?: { title?: Localized; description?: Localized };
  categories?: SupportMethodCategory[];
  labels?: SupportFlowLabels;
};

/** One platform of a category (Vodafone Cash, USDT…). `fields` are the rows
    shown on "بيانات التحويل"; `account` carries the main identifier. */
export type SupportMethod = {
  uuid: string;
  category?: string;
  provider?: string;
  name?: Localized;
  description?: Localized;
  /** numbered lines separated by "
" */
  instructions?: Localized;
  logo_url?: string | null;
  qr_image_url?: string | null;
  account?: {
    identifier?: string | null;
    holder?: string | null;
    network?: string | null;
    currency?: string | null;
  };
  fields?: { label?: Localized; value?: string | null; is_copyable?: boolean }[];
  requires_proof?: boolean;
  is_paypal?: boolean;
  sort_order?: number;
};

export type SupportWizardStep = {
  /** method | proof | team | contact */
  key?: string;
  order?: number;
  label?: Localized;
  icon?: string | null;
};

export type SupportCategoryPage = {
  category?: SupportMethodCategory & { methods?: SupportMethod[] };
  wizard?: {
    total?: number;
    steps?: SupportWizardStep[];
    /** "الخطوة :current من :total" */
    progress_label?: Localized;
    completion_label?: Localized;
  };
  labels?: SupportFlowLabels;
};

export async function fetchSupportMethods(
  signal?: AbortSignal,
): Promise<SupportMethodsPage | null> {
  const payload = await apiFetch<Envelope<SupportMethodsPage>>("/support/methods", { signal });
  const data = payload?.data;
  if (!data) return null;
  return { ...data, hero: data.hero && { ...data.hero, image_url: assetUrl(data.hero.image_url) } };
}

export async function fetchSupportCategory(
  key: string,
  signal?: AbortSignal,
): Promise<SupportCategoryPage | null> {
  const payload = await apiFetch<Envelope<SupportCategoryPage>>(
    `/support/methods/category/${encodeURIComponent(key)}`,
    { signal },
  );
  const data = payload?.data;
  if (!data) return null;
  const steps = Array.isArray(data.wizard?.steps)
    ? [...data.wizard!.steps].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    : undefined;
  const category = data.category && {
    ...data.category,
    methods: Array.isArray(data.category.methods)
      ? [...data.category.methods]
          .filter((m) => m && m.uuid)
          .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
          .map(withMethodAssets)
      : [],
  };
  return { ...data, category, wizard: data.wizard && { ...data.wizard, steps } };
}

/** Logo and QR arrive as absolute URLs — pulled back onto the API host. */
function withMethodAssets(method: SupportMethod): SupportMethod {
  return {
    ...method,
    logo_url: assetUrl(method.logo_url),
    qr_image_url: assetUrl(method.qr_image_url),
  };
}

export async function fetchSupportMethod(
  uuid: string,
  signal?: AbortSignal,
): Promise<SupportMethod | null> {
  const payload = await apiFetch<Envelope<{ method?: SupportMethod }>>(
    `/support/methods/${encodeURIComponent(uuid)}`,
    { signal },
  );
  const method = payload?.data?.method;
  return method?.uuid ? withMethodAssets(method) : null;
}
