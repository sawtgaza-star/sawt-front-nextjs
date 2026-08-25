/* Static data behind the "شراكة استراتيجية" collaboration wizard
   (/collaborate/partnership). Glyphs are JSX, so they live in the components —
   this file stays plain .ts, same split as funding-form-data.ts. */

import type { WizardStep } from "@/components/collaborate/WizardSteps";

/* ---- the three steps of the progress rail ---- */

export type PartnershipStepValue = "company" | "nature" | "files";

export const PARTNERSHIP_STEPS: WizardStep[] = [
  {
    value: "company",
    label: "بيانات الشركة",
    labelKey: "collab_pa_step_company",
  },
  { value: "nature", label: "طبيعة الشراكة", labelKey: "collab_pa_step_nature" },
  { value: "files", label: "مرفقات وملاحظات", labelKey: "collab_pa_step_files" },
];

/* ---- step 2: "نوع الشراكة الذي تقترحونها" ----
   Tick boxes like the funding flow, in the mock's order. */

export interface PartnerType {
  value: string;
  label: string;
  labelKey: string;
}

export const PARTNER_TYPES: PartnerType[] = [
  {
    value: "content",
    label: "تبادل محتوي",
    labelKey: "collab_pa_type_content",
  },
  { value: "ads", label: "رعاية إعلانية", labelKey: "collab_pa_type_ads" },
  {
    value: "events",
    label: "تعاون بفعاليات",
    labelKey: "collab_pa_type_events",
  },
  { value: "other", label: "أخرى", labelKey: "collab_pa_type_other" },
];

/* ---- limits printed on the form ---- */
export const NOTE_MAX = 500;
export const FILE_MAX_BYTES = 5 * 1024 * 1024;
export const FILE_TYPES = ["image/png", "image/jpeg", "application/pdf"];
export const FILE_ACCEPT = ".png,.jpg,.jpeg,.pdf";
