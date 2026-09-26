"use client";
import { useState } from "react";
import {
  IconCalendarDays,
  IconCheckMark,
  IconDollarCircle,
  IconHeartOutline,
  IconRotate,
} from "@/components/ui/icons";
import { resolveDonate, type PlanValue, type ResolvedDonate } from "./donate-data";

/* Plan tab glyphs — kept here (not in donate-data.ts) since that file is
   plain .ts and can't hold JSX. */
const PLAN_ICON = {
  once: IconHeartOutline,
  monthly: IconCalendarDays,
  yearly: IconRotate,
};

/* Donation box: plan tabs (لمرة واحدة / شهري / سنوي), preset amount pills and
   a custom amount field. Client leaf — it owns the selection state. The tabs,
   presets and custom-amount limits come from GET /pages/support's `plans`
   block (resolved in donate-data); the form hands the pick to
   /support/methods. */
export default function DonateForm({
  donate = resolveDonate(undefined, "ar"),
  symbol = "$",
}: {
  donate?: ResolvedDonate;
  symbol?: string;
}) {
  const [plan, setPlan] = useState<PlanValue>(donate.defaultPlan);
  const activePlan = donate.plans.find((p) => p.value === plan) ?? donate.plans[0];
  const [amount, setAmount] = useState<number>(activePlan.defaultAmount);
  const [custom, setCustom] = useState("");

  // A custom amount, once typed, wins over the selected pill.
  const total = custom.trim() !== "" ? custom.trim() : String(amount);

  function pickPlan(value: PlanValue) {
    setPlan(value);
    const next = donate.plans.find((p) => p.value === value);
    // keep the pill if the new plan offers it too, else take its default
    if (next && !next.amounts.includes(amount)) setAmount(next.defaultAmount);
  }

  return (
    <div className="sp-donate-card">
      <div className="sp-tabs" role="tablist">
        {donate.plans.map((p) => {
          const Icon = PLAN_ICON[p.value];
          return (
          <button
            key={p.value}
            type="button"
            role="tab"
            aria-selected={plan === p.value}
            className={"sp-tab" + (plan === p.value ? " active" : "")}
            onClick={() => pickPlan(p.value)}
          >
            <i className="sp-tab-icon">
              <Icon />
            </i>
            <span className="sp-tab-label" data-i18n={p.labelKey || undefined}>
              {p.label}
            </span>
            <span className="sp-tab-sub" data-i18n={p.subKey}>
              {p.sub}
            </span>
          </button>
          );
        })}
      </div>

      <form
        className="sp-donate-body"
        onSubmit={(e) => {
          e.preventDefault();
          // Hand the chosen plan + amount to the payment-methods step. Full
          // page load (not <Link>) — same CSS-group rule the rest of the site
          // follows for cross-page links.
          const params = new URLSearchParams({ plan, amount: total });
          window.location.href = `/support/methods?${params.toString()}`;
        }}
      >
        <label className="sp-field-label" data-i18n="support_choose_amount">
          اختر المبلغ
        </label>
        <div className="sp-amounts">
          {activePlan.amounts.map((a) => (
            <button
              key={a}
              type="button"
              className={
                "sp-amount" +
                (custom.trim() === "" && amount === a ? " active" : "")
              }
              onClick={() => {
                setAmount(a);
                setCustom("");
              }}
            >
              {a}{symbol}
            </button>
          ))}
        </div>

        {donate.customEnabled && (
          <>
            <label className="sp-field-label" data-i18n="support_custom_amount">
              أو أدخل مبلغ
            </label>
            <div className="sp-custom-wrap">
              <input
                type="number"
                min={donate.min}
                max={donate.max}
                className="sp-custom-input"
                placeholder={donate.placeholder || "أدخل مبلغ خصيصا"}
                data-i18n-placeholder={
                  donate.placeholder ? undefined : "support_custom_placeholder"
                }
                value={custom}
                onChange={(e) => setCustom(e.target.value)}
              />
              <span className="sp-custom-icon" aria-hidden="true">
                <IconDollarCircle />
              </span>
            </div>
          </>
        )}

        {activePlan.renew && (
          /* Native input stays in the DOM (keyboard + a11y) but is visually
             replaced by .sp-renew-box, which CSS reveals on :checked. */
          <label className="sp-renew">
            <input type="checkbox" className="sp-renew-input" defaultChecked />
            <span className="sp-renew-box" aria-hidden="true">
              <IconCheckMark />
            </span>
            <span data-i18n={activePlan.renewKey}>{activePlan.renew}</span>
          </label>
        )}

        <button type="submit" className="sp-btn-green sp-btn-block">
          <span data-i18n="support_donate_with">تبرع بـ</span> {symbol}{total}
        </button>
      </form>
    </div>
  );
}
