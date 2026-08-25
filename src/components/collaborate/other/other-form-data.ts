/* Static data behind the "تعاون آخر" collaboration wizard
   (/collaborate/other). Glyphs are JSX, so they live in the components — this
   file stays plain .ts, same split as partnership-form-data.ts. */

import type { WizardStep } from "@/components/collaborate/WizardSteps";

/* ---- the two steps of the progress rail ----
   The shortest of the four flows: the mock only asks who is writing and what
   the idea is. */

export type OtherStepValue = "contact" | "idea";

export const OTHER_STEPS: WizardStep[] = [
  {
    value: "contact",
    label: "بيانات التواصل",
    labelKey: "collab_ot_step_contact",
  },
  { value: "idea", label: "شرح الفكرة", labelKey: "collab_ot_step_idea" },
];

/* ---- limits printed on the form ---- */
export const NOTE_MAX = 500;
export const FILE_MAX_BYTES = 5 * 1024 * 1024;
export const FILE_TYPES = ["image/png", "image/jpeg", "application/pdf"];
export const FILE_ACCEPT = ".png,.jpg,.jpeg,.pdf";
