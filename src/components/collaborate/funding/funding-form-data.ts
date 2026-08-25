/* Static data behind the "رعاية أو تمويل" collaboration wizard
   (/collaborate/funding). Glyphs are JSX, so they live in the components —
   this file stays plain .ts, same split as creator-form-data.ts. */

import type { WizardStep } from "@/components/collaborate/WizardSteps";

/* ---- the three steps of the progress rail ---- */

export type FundingStepValue = "org" | "support" | "extras";

export const FUNDING_STEPS: WizardStep[] = [
  { value: "org", label: "بيانات الجهة", labelKey: "collab_fu_step_org" },
  {
    value: "support",
    label: "تفاصيل عرض الدعم",
    labelKey: "collab_fu_step_support",
  },
  {
    value: "extras",
    label: "تفاصيل إضافية ومرفقات",
    labelKey: "collab_fu_step_extras",
  },
];

/* ---- step 2: "نوع الدعم الذي ترغبون بتقديمه" ----
   Tick boxes rather than the creator flow's chips, in the mock's order. */

export interface SupportType {
  value: string;
  label: string;
  labelKey: string;
}

export const SUPPORT_TYPES: SupportType[] = [
  { value: "cash", label: "تمويل مالي مباشر", labelKey: "collab_fu_sup_cash" },
  {
    value: "inkind",
    label: "دعم عيني (معدات، مساحات...)",
    labelKey: "collab_fu_sup_inkind",
  },
  {
    value: "marketing",
    label: "دعم تسويقي وإعلامي",
    labelKey: "collab_fu_sup_marketing",
  },
  { value: "other", label: "أخرى", labelKey: "collab_fu_sup_other" },
];

/* ---- limits printed on the form ---- */
export const NOTE_MAX = 500;
export const FILE_MAX_BYTES = 5 * 1024 * 1024;
export const FILE_TYPES = ["image/png", "image/jpeg", "application/pdf"];
export const FILE_ACCEPT = ".png,.jpg,.jpeg,.pdf";
