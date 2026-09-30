"use client";
import { useState } from "react";
import {
  IconCalendarDays,
  IconCheckMark,
  IconDollarCircle,
  IconHeartOutline,
  IconRotate,
} from "@/components/ui/icons";
import { ApiError } from "@/lib/api/client";
import {
  createSupportCheckout,
  type SupportCheckoutInterval,
} from "@/lib/api/support-checkout";
import { resolveDonate, type PlanValue, type ResolvedDonate } from "./donate-data";

/* Plan tab glyphs — kept here (not in donate-data.ts) since that file is
   plain .ts and can't hold JSX. */
const PLAN_ICON = {
  once: IconHeartOutline,
  monthly: IconCalendarDays,
  yearly: IconRotate,
};

/* The form's plan values → the checkout endpoint's `interval`. */
const INTERVAL: Record<PlanValue, SupportCheckoutInterval> = {
  once: "one_time",
  monthly: "monthly",
  yearly: "yearly",
};

const FAILED_MESSAGE = "تعذر بدء عملية الدفع. حاول مرة أخرى.";

/* Donation box: plan tabs (لمرة واحدة / شهري / سنوي), preset amount pills and
   a custom amount field. Client leaf — it owns the selection state. The tabs,
   presets and custom-amount limits come from GET /pages/support's `plans`
   block (resolved in donate-data); submitting opens a PayPal checkout
   (POST /support/checkout) and sends the donor to its approval_url. */
export default function DonateForm({
  donate = resolveDonate(undefined, "ar"),
  symbol = "$",
  currency = "USD",
}: {
  donate?: ResolvedDonate;
  symbol?: string;
  currency?: string;
}) {
  const [plan, setPlan] = useState<PlanValue>(donate.defaultPlan);
  const activePlan = donate.plans.find((p) => p.value === plan) ?? donate.plans[0];
  const [amount, setAmount] = useState<number>(activePlan.defaultAmount);
  const [custom, setCustom] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

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
        onSubmit={async (e) => {
          e.preventDefault();
          if (busy) return;
          const value = Number(total);
          if (!Number.isFinite(value) || value <= 0) return;
          setBusy(true);
          setError("");
          try {
            const back = `${window.location.origin}/support`;
            const { approvalUrl } = await createSupportCheckout({
              amount: value,
              currency,
              interval: INTERVAL[plan],
              // No /support/thank-you page exists yet — land back on /support.
              return_url: `${back}?payment=success`,
              cancel_url: `${back}?payment=cancelled`,
            });
            // Off-site to PayPal — a full navigation, not a router push.
            window.location.href = approvalUrl;
          } catch (err) {
            setError(err instanceof ApiError && err.message ? err.message : FAILED_MESSAGE);
            setBusy(false);
          }
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

        {error && (
          <p className="sp-wizard-error" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="sp-btn-green sp-btn-block"
          disabled={busy}
          aria-busy={busy}
        >
          <span data-i18n="support_donate_with">تبرع بـ</span> {symbol}{total}
        </button>
      </form>
    </div>
  );
}
