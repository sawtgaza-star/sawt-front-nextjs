/* =========================================================
   The donation flow's own endpoints (base + error shape: ./client).

     GET /support/methods                  → { data: { hero, section, categories, labels } }
     GET /support/methods/category/{key}   → { data: { category, wizard, labels } }

   The first paints /support/methods (hero, heading, the method cards); the
   second paints the wizard on /support/checkout for the category picked there
   (electronic | transfer | crypto). A key the API doesn't know — or one an
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

export type SupportWizardStep = {
  /** method | proof | team | contact */
  key?: string;
  order?: number;
  label?: Localized;
  icon?: string | null;
};

export type SupportCategoryPage = {
  category?: SupportMethodCategory;
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
  return { ...data, wizard: data.wizard && { ...data.wizard, steps } };
}
