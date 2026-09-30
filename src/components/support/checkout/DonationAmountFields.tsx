"use client";
import { IconChevronDownBold } from "@/components/ui/icons";
import { CURRENCIES } from "./currencies-data";
import type { ProofErrors, ProofValues } from "./checkout-flow";

/* "مبلغ التبرع" + "نوع العملة المراد التبرع بيها". Drawn on "إثبات تبرعك" —
   or, for the electronic flow, on screen 1 under the platform picker. The
   values and errors live in the wizard (see DonationProof). */
export default function DonationAmountFields({
  proof,
  onChange,
  errors,
}: {
  proof: ProofValues;
  onChange: (patch: Partial<ProofValues>, clear: keyof ProofErrors) => void;
  errors: ProofErrors;
}) {
  const { amount, currency } = proof;

  return (
    <div className="sp-proof-fields">
      <div className="sp-proof-field">
        <label className="sp-proof-label" htmlFor="proof-amount">
          <span data-i18n="checkout_proof_amount">مبلغ التبرع</span>
        </label>
        <input
          id="proof-amount"
          type="number"
          min={1}
          className={"sp-proof-input" + (errors.amount ? " is-invalid" : "")}
          placeholder="0000"
          aria-invalid={errors.amount ? true : undefined}
          value={amount}
          onChange={(e) => onChange({ amount: e.target.value }, "amount")}
        />
        {errors.amount && (
          <p className="sp-contact-error" data-i18n="checkout_proof_amount_required">
            الرجاء إدخال مبلغ التبرع.
          </p>
        )}
      </div>

      <div className="sp-proof-field">
        <label className="sp-proof-label" htmlFor="proof-currency">
          <span data-i18n="checkout_proof_currency">
            نوع العملة المراد التبرع بيها
          </span>
        </label>
        <div className="sp-proof-select-wrap">
          <select
            id="proof-currency"
            className={
              "sp-proof-select" +
              (currency ? "" : " is-empty") +
              (errors.currency ? " is-invalid" : "")
            }
            aria-invalid={errors.currency ? true : undefined}
            value={currency}
            onChange={(e) => onChange({ currency: e.target.value }, "currency")}
          >
            <option value="" data-i18n="checkout_proof_currency_placeholder">
              اختر عملة التبرع
            </option>
            {CURRENCIES.map((c) => (
              <option key={c.value} value={c.value} data-i18n={c.labelKey}>
                {c.label}
              </option>
            ))}
          </select>
          <span className="sp-proof-select-arrow" aria-hidden="true">
            <IconChevronDownBold />
          </span>
        </div>
        {errors.currency && (
          <p className="sp-contact-error" data-i18n="checkout_proof_currency_required">
            الرجاء اختيار عملة التبرع.
          </p>
        )}
      </div>
    </div>
  );
}
