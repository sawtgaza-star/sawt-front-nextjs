import type { ComponentType } from "react";
import { IconCircleCheck } from "@/components/ui/icons";

/* One entry of a wizard's progress rail. The glyph isn't part of it — the
   steps of every flow live in a plain `*-data.ts` file that can't hold JSX, so
   each wizard passes its own value → icon map alongside. */
export interface WizardStep {
  value: string;
  label: string;
  labelKey: string;
}

/* Progress card above a collaboration wizard: the "الخطوة 1 من 3" counter,
   then a circle + label per step joined by a rule. The step being filled in
   gets the peach circle with the orange glyph, the ones behind it turn solid
   orange with a tick (and fill their rule), the rest stay grey.
   Shared by all four /collaborate flows — three of three steps, "تعاون آخر" of
   two, which the mock lays out differently (see .is-pair in collaborate.css). */
export default function WizardSteps({
  steps,
  icons,
  index,
}: {
  steps: WizardStep[];
  icons: Record<string, ComponentType>;
  index: number;
}) {
  return (
    <div className="cl-steps-card">
      <p className="cl-steps-counter">
        {/* number stays its own text node so initTranslate() never eats it */}
        <span data-i18n="collab_step_counter_pre">الخطوة</span> {index + 1}{" "}
        <span data-i18n="collab_step_counter_mid">من</span> {steps.length}
      </p>

      {/* a two-step flow lays its rail out differently — see .is-pair */}
      <ol className={"cl-steps" + (steps.length === 2 ? " is-pair" : "")}>
        {steps.map((step, i) => {
          const active = i === index;
          const done = i < index;
          const Icon = done ? IconCircleCheck : icons[step.value];

          return (
            <li
              key={step.value}
              className={
                "cl-step" + (active ? " is-active" : "") + (done ? " is-done" : "")
              }
              aria-current={active ? "step" : undefined}
            >
              <span className="cl-step-icon" aria-hidden="true">
                <Icon />
              </span>
              <span className="cl-step-label" data-i18n={step.labelKey}>
                {step.label}
              </span>
              <span className="cl-step-line" aria-hidden="true"></span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
