/* The four steps of the donation wizard that starts at /support/checkout.
   All four are reached by the wizard's screens.
   `muted` reproduces the mock's lighter glyph on "إثبات التبرع"; the other
   inactive steps use the darker one. */

export type CheckoutStepValue = "platform" | "proof" | "team" | "contact";

export interface CheckoutStep {
  value: CheckoutStepValue;
  label: string;
  labelKey: string;
  muted?: boolean;
}

export const CHECKOUT_STEPS: CheckoutStep[] = [
  {
    value: "platform",
    label: "اختيار المنصة",
    labelKey: "checkout_step_platform",
  },
  {
    value: "proof",
    label: "إثبات التبرع",
    labelKey: "checkout_step_proof",
    muted: true,
  },
  { value: "team", label: "دعم الفريق", labelKey: "checkout_step_team" },
  {
    value: "contact",
    label: "وسيلة التواصل",
    labelKey: "checkout_step_contact",
  },
];

/* The screens the "الانتقال إلى المنصة والمتابعة" button walks through, in
   order. A screen is not the same thing as a step: "بيانات التحويل" is still
   الخطوة 2 من 4, and "إثبات تبرعك" moves the rail on to الخطوة 3 من 4.
   `current` is the step that gets the orange pill, `done` the ones already
   ticked off (solid orange circle + orange rule). */

export type CheckoutScreenValue =
  | "platform"
  | "transfer"
  | "proof"
  | "contact";

export interface CheckoutScreen {
  value: CheckoutScreenValue;
  counter: number;
  current: CheckoutStepValue;
  done: CheckoutStepValue[];
}

export const CHECKOUT_SCREENS: CheckoutScreen[] = [
  { value: "platform", counter: 1, current: "platform", done: [] },
  { value: "transfer", counter: 2, current: "proof", done: ["platform"] },
  {
    value: "proof",
    counter: 3,
    current: "team",
    done: ["platform", "proof"],
  },
  {
    value: "contact",
    counter: 4,
    current: "contact",
    done: ["platform", "proof", "team"],
  },
];
