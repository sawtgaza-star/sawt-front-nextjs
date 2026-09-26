/* Static data for the donation box (كيف تريد ان تدعم؟). */

import { localized } from "@/lib/api/pages";
import type { SupportInterval, SupportPlanPreset, SupportPlansContent } from "@/lib/api/support";

export type PlanValue = "once" | "monthly" | "yearly";

export type Plan = {
  value: PlanValue;
  label: string;
  labelKey: string;
  sub: string;
  subKey: string;
  /** Renewal consent line — omitted for the one-off plan. */
  renew?: string;
  renewKey?: string;
};

/* Order matches the mock: one-off on the right (first in RTL), yearly last. */
export const PLANS: Plan[] = [
  {
    value: "once",
    label: "لمرة واحدة",
    labelKey: "support_plan_once",
    sub: "تبرع فوري بدون التزام",
    subKey: "support_plan_once_sub",
  },
  {
    value: "monthly",
    label: "شهري",
    labelKey: "support_plan_monthly",
    sub: "دعم مستمر كل شهر",
    subKey: "support_plan_monthly_sub",
    renew: "سيتم تجديدك شهريا للتجديد دعم صوت",
    renewKey: "support_renew_monthly",
  },
  {
    value: "yearly",
    label: "سنوي",
    labelKey: "support_plan_yearly",
    sub: "الأكثر تأثيرا",
    subKey: "support_plan_yearly_sub",
    renew: "سيتم تجديدك سنويا للتجديد دعم صوت",
    renewKey: "support_renew_yearly",
  },
];

/* Preset amounts, biggest first so they read 250 → 50 in RTL like the mock. */
export const AMOUNTS = [250, 150, 100, 50];

export const DEFAULT_AMOUNT = 150;

/* "تبرعك يعني..." checklist */
export const PLEDGE_ITEMS = [
  { text: "قصة إنسانية جديدة أروى للعالم", key: "support_pledge_1" },
  { text: "صحفي ميداني مدرب على الأرض", key: "support_pledge_2" },
  { text: "تقرير مفحوص بحق لمتابعين", key: "support_pledge_3" },
  { text: "أرشيف رقمي يحمي الذاكرة الجماعية", key: "support_pledge_4" },
];

/* ---------------------------------------------------------------------------
   GET /pages/support's `plans` block, resolved for one language.

   The API names the intervals one_time / monthly / yearly; the form keeps its
   own values (the tab glyphs and the renewal lines hang off them), so the key
   is mapped. What the API does not send — the tab's second line and the
   renewal consent — stays the built-in copy with its data-i18n key. An
   interval with no preset amounts (all three, for now) uses AMOUNTS.
   --------------------------------------------------------------------------- */

const PLAN_BY_KEY: Record<string, PlanValue> = {
  one_time: "once",
  once: "once",
  monthly: "monthly",
  yearly: "yearly",
};

/** A plan as the form draws it: the built-in one, relabelled by the API. */
export type ResolvedPlan = Plan & { amounts: number[]; defaultAmount: number };

export type ResolvedDonate = {
  plans: ResolvedPlan[];
  defaultPlan: PlanValue;
  customEnabled: boolean;
  min: number;
  max?: number;
  placeholder: string;
};

function presetAmount(preset: SupportPlanPreset): number {
  const raw = typeof preset === "object" && preset !== null ? preset.amount : preset;
  const value = Number(raw);
  return Number.isFinite(value) && value > 0 ? value : 0;
}

function presetsOf(interval: SupportInterval | undefined): { amounts: number[]; defaultAmount: number } {
  const presets = Array.isArray(interval?.plans) ? interval!.plans : [];
  const amounts = presets.map(presetAmount).filter((a) => a > 0);
  if (!amounts.length) return { amounts: AMOUNTS, defaultAmount: DEFAULT_AMOUNT };
  const flagged = presets.find(
    (p) => typeof p === "object" && p !== null && p.is_default,
  );
  return {
    // biggest first, so they read high → low in RTL like the mock
    amounts: [...amounts].sort((a, b) => b - a),
    defaultAmount: flagged ? presetAmount(flagged) : amounts[0],
  };
}

export function resolveDonate(
  data: SupportPlansContent | undefined,
  lang: string,
): ResolvedDonate {
  const intervals = Array.isArray(data?.intervals) ? data!.intervals : [];
  const byValue = new Map<PlanValue, SupportInterval>();
  for (const interval of intervals) {
    const value = PLAN_BY_KEY[(interval.key || "").trim().toLowerCase()];
    if (value && !byValue.has(value)) byValue.set(value, interval);
  }

  // The API's intervals, in its order; the built-in three when it sent none.
  const values: PlanValue[] = byValue.size ? [...byValue.keys()] : PLANS.map((p) => p.value);

  const plans = values.map((value) => {
    const base = PLANS.find((p) => p.value === value)!;
    const interval = byValue.get(value);
    const label = localized(interval?.label, lang);
    return {
      ...base,
      ...(label ? { label, labelKey: "" } : null),
      ...presetsOf(interval),
    };
  });

  const flagged = intervals.find((i) => i.is_default);
  const flaggedValue = flagged ? PLAN_BY_KEY[(flagged.key || "").trim().toLowerCase()] : undefined;
  const defaultPlan =
    flaggedValue && values.includes(flaggedValue)
      ? flaggedValue
      : values.includes("monthly")
        ? "monthly"
        : values[0];

  const custom = data?.custom_amount;
  return {
    plans,
    defaultPlan,
    customEnabled: custom?.enabled !== false,
    min: custom?.min && custom.min > 0 ? custom.min : 1,
    max: custom?.max && custom.max > 0 ? custom.max : undefined,
    placeholder: localized(custom?.placeholder, lang),
  };
}
