/* Static data for the donation box (كيف تريد ان تدعم؟). */

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
