import {
  IconAtSign,
  IconGiveCoin,
  IconSealCheck,
  IconWalletCheck,
} from "@/components/ui/icons";
import { CHECKOUT_STEPS, type CheckoutStepValue } from "./checkout-steps-data";

/* Step glyphs — kept here (not in checkout-steps-data.ts) since that file is
   plain .ts and can't hold JSX. */
const STEP_ICON = {
  platform: IconWalletCheck,
  proof: IconSealCheck,
  team: IconGiveCoin,
  contact: IconAtSign,
};

/* Progress card above the wizard: the "الخطوة 1 من 4" counter, then a circle +
   label per step joined by a short rule. The current step gets the orange pill,
   steps already behind it turn solid orange, the rest stay grey. */
export default function CheckoutSteps({
  current,
  done = [],
  counter,
}: {
  current: CheckoutStepValue;
  done?: CheckoutStepValue[];
  counter: number;
}) {
  return (
    <div className="sp-steps-card">
      <p className="sp-steps-counter">
        {/* number stays its own text node so initTranslate() never eats it */}
        <span data-i18n="checkout_step_counter_pre">الخطوة</span> {counter}{" "}
        <span data-i18n="checkout_step_counter_mid">من</span>{" "}
        {CHECKOUT_STEPS.length}
      </p>

      <ol className="sp-steps">
        {CHECKOUT_STEPS.map((step) => {
          const Icon = STEP_ICON[step.value];
          const active = step.value === current;
          const complete = done.includes(step.value);

          return (
            <li
              key={step.value}
              className={
                "sp-step" +
                (active ? " is-active" : "") +
                (complete ? " is-done" : "")
              }
              aria-current={active ? "step" : undefined}
            >
              <span
                className={
                  "sp-step-icon" + (step.muted ? " sp-step-icon--muted" : "")
                }
                aria-hidden="true"
              >
                <Icon />
              </span>
              <span className="sp-step-label" data-i18n={step.labelKey}>
                {step.label}
              </span>
              <span className="sp-step-line" aria-hidden="true"></span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
