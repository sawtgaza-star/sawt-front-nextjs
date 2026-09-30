"use client";
import { LogoPaypal } from "@/components/support/methods/PaymentBrandLogos";
import { localized } from "@/lib/api/pages";
import type { SupportMethod } from "@/lib/api/support-methods";
import PaymentNotes from "./PaymentNotes";

/* Generic glyph for an API platform that ships no logo, per category. */
const CATEGORY_ICON: Record<string, string> = {
  transfer: "ri-bank-line",
  crypto: "ri-bit-coin-line",
  electronic: "ri-bank-card-line",
};

type Option = { value: string; label: string; logo: React.ReactNode };

/* Screen 1 of the wizard: "اختر وسيلة الدفع". Controlled by CheckoutWizard, so
   the pick survives moving on to the next screen and back; it also drives the
   brand name inside the notes panel.
   The platforms are the category's `methods` from GET /support/methods/
   category/{key} (value = the method uuid) — there is no built-in list; with
   none, an empty line stands in for the row and the notes panel. */
export default function PaymentPlatforms({
  value,
  onChange,
  methods = [],
  lang = "ar",
}: {
  value: string;
  onChange: (value: string) => void;
  methods?: SupportMethod[];
  lang?: string;
}) {
  const options: Option[] = methods.map((m) => ({
    value: m.uuid,
    label: localized(m.name, lang) || m.provider || "",
    logo: m.logo_url ? (
      <img src={m.logo_url} alt="" className="sp-pay-logo-img" />
    ) : m.provider === "paypal" ? (
      <LogoPaypal />
    ) : (
      <i className={CATEGORY_ICON[m.category || ""] || "ri-wallet-3-line"} />
    ),
  }));
  const selected = options.find((o) => o.value === value) ?? options[0];

  return (
    <div className="sp-pay">
      <h2 className="sp-pay-title" data-i18n="checkout_pay_title">
        اختر وسيلة الدفع
      </h2>

      {!options.length && (
        <p className="sp-transfer-empty" data-i18n="checkout_pay_empty">
          لا توجد وسائل دفع متاحة حاليًا، الرجاء المحاولة لاحقًا.
        </p>
      )}

      {options.length > 0 && (
        <div className="sp-pay-row sp-pay-row--api">
          {options.map((o) => {
            const checked = o.value === selected?.value;

            return (
              /* The native radio stays in the DOM (keyboard + a11y) but is
               visually replaced by .sp-pay-dot, which CSS fills on :checked. */
              <label
                key={o.value}
                className={"sp-pay-option" + (checked ? " is-selected" : "")}
              >
                <input
                  type="radio"
                  name="payment-platform"
                  className="sp-pay-input"
                  value={o.value}
                  checked={checked}
                  onChange={() => onChange(o.value)}
                />
                <span className="sp-pay-brand">
                  <span className="sp-pay-logo" aria-hidden="true">
                    {o.logo}
                  </span>
                  <span className="sp-pay-label">{o.label}</span>
                </span>
                <span className="sp-pay-dot" aria-hidden="true"></span>
              </label>
            );
          })}
        </div>
      )}

      {selected && <PaymentNotes platform={selected.label} />}
    </div>
  );
}
