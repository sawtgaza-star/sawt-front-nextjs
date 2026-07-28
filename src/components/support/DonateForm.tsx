"use client";
import { useState } from "react";
import {
  IconCalendarDays,
  IconCheckMark,
  IconDollarCircle,
  IconHeartOutline,
  IconRotate,
} from "@/components/ui/icons";
import {
  AMOUNTS,
  DEFAULT_AMOUNT,
  PLANS,
  type PlanValue,
} from "./donate-data";

/* Plan tab glyphs — kept here (not in donate-data.ts) since that file is
   plain .ts and can't hold JSX. */
const PLAN_ICON = {
  once: IconHeartOutline,
  monthly: IconCalendarDays,
  yearly: IconRotate,
};

/* Donation box: plan tabs (لمرة واحدة / شهري / سنوي), preset amount pills and
   a custom amount field. Client leaf — it owns the selection state. The form
   does not submit anywhere yet (same as the other forms on the site). */
export default function DonateForm() {
  const [plan, setPlan] = useState<PlanValue>("monthly");
  const [amount, setAmount] = useState<number>(DEFAULT_AMOUNT);
  const [custom, setCustom] = useState("");

  const activePlan = PLANS.find((p) => p.value === plan)!;
  // A custom amount, once typed, wins over the selected pill.
  const total = custom.trim() !== "" ? custom.trim() : String(amount);

  return (
    <div className="sp-donate-card">
      <div className="sp-tabs" role="tablist">
        {PLANS.map((p) => {
          const Icon = PLAN_ICON[p.value];
          return (
          <button
            key={p.value}
            type="button"
            role="tab"
            aria-selected={plan === p.value}
            className={"sp-tab" + (plan === p.value ? " active" : "")}
            onClick={() => setPlan(p.value)}
          >
            <i className="sp-tab-icon">
              <Icon />
            </i>
            <span className="sp-tab-label" data-i18n={p.labelKey}>
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
          {AMOUNTS.map((a) => (
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
              {a}$
            </button>
          ))}
        </div>

        <label className="sp-field-label" data-i18n="support_custom_amount">
          أو أدخل مبلغ
        </label>
        <div className="sp-custom-wrap">
          <input
            type="number"
            min={1}
            className="sp-custom-input"
            placeholder="أدخل مبلغ خصيصا"
            data-i18n-placeholder="support_custom_placeholder"
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
          />
          <span className="sp-custom-icon" aria-hidden="true">
            <IconDollarCircle />
          </span>
        </div>

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
          <span data-i18n="support_donate_with">تبرع بـ</span> ${total}
        </button>
      </form>
    </div>
  );
}
