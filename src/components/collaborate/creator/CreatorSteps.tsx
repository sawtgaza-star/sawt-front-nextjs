import { IconAtSign } from "@/components/ui/icons";
import {
  IconStepContent,
  IconStepPersonal,
} from "@/components/collaborate/collaborate-icons";
import WizardSteps from "@/components/collaborate/WizardSteps";
import { CREATOR_STEPS } from "./creator-form-data";

/* Step glyphs — kept here (not in creator-form-data.ts) since that file is
   plain .ts and can't hold JSX. */
const STEP_ICON = {
  personal: IconStepPersonal,
  content: IconStepContent,
  social: IconAtSign,
};

/* Progress card of the "صانع محتوى" wizard — this flow's steps and glyphs on
   the shared rail. */
export default function CreatorSteps({ index }: { index: number }) {
  return <WizardSteps steps={CREATOR_STEPS} icons={STEP_ICON} index={index} />;
}
