import {
  IconStepContact,
  IconStepSupport,
} from "@/components/collaborate/collaborate-icons";
import WizardSteps from "@/components/collaborate/WizardSteps";
import { OTHER_STEPS } from "./other-form-data";

/* Step glyphs — kept here (not in other-form-data.ts) since that file is plain
   .ts and can't hold JSX. Step 1 is this flow's own outgoing-call glyph; step 2
   reuses the funding flow's palm glyph, which is what the mock draws. */
const STEP_ICON = {
  contact: IconStepContact,
  idea: IconStepSupport,
};

/* Progress card of the "تعاون آخر" wizard — this flow's two steps and glyphs
   on the shared rail. */
export default function OtherSteps({ index }: { index: number }) {
  return <WizardSteps steps={OTHER_STEPS} icons={STEP_ICON} index={index} />;
}
