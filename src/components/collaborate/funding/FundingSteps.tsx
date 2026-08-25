import {
  IconStepOrg,
  IconStepShield,
  IconStepSupport,
} from "@/components/collaborate/collaborate-icons";
import WizardSteps from "@/components/collaborate/WizardSteps";
import { FUNDING_STEPS } from "./funding-form-data";

/* Step glyphs — kept here (not in funding-form-data.ts) since that file is
   plain .ts and can't hold JSX. */
const STEP_ICON = {
  org: IconStepOrg,
  support: IconStepSupport,
  extras: IconStepShield,
};

/* Progress card of the "رعاية أو تمويل" wizard — this flow's steps and glyphs
   on the shared rail. */
export default function FundingSteps({ index }: { index: number }) {
  return <WizardSteps steps={FUNDING_STEPS} icons={STEP_ICON} index={index} />;
}
