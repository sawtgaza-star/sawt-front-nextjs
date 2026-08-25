import {
  IconStepOrg,
  IconStepShield,
  IconStepSupport,
} from "@/components/collaborate/collaborate-icons";
import WizardSteps from "@/components/collaborate/WizardSteps";
import { PARTNERSHIP_STEPS } from "./partnership-form-data";

/* Step glyphs — kept here (not in partnership-form-data.ts) since that file is
   plain .ts and can't hold JSX. The mock reuses the funding flow's three
   circles: the building, the handshake-style support glyph and the shield. */
const STEP_ICON = {
  company: IconStepOrg,
  nature: IconStepSupport,
  files: IconStepShield,
};

/* Progress card of the "شراكة استراتيجية" wizard — this flow's steps and
   glyphs on the shared rail. */
export default function PartnershipSteps({ index }: { index: number }) {
  return (
    <WizardSteps steps={PARTNERSHIP_STEPS} icons={STEP_ICON} index={index} />
  );
}
