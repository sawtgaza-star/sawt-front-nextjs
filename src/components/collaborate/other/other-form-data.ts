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
/* the site-wide upload rule (5MB, png/jpg/pdf, checked by content) — see
   lib/attachment */
export { ATTACH_ACCEPT as FILE_ACCEPT } from "@/lib/attachment";
