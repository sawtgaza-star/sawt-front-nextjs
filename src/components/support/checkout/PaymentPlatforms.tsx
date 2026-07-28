"use client";
import {
  LogoMastercard,
  LogoPaypal,
} from "@/components/support/methods/PaymentBrandLogos";
import PaymentNotes from "./PaymentNotes";
import { PAYMENT_PLATFORMS } from "./payment-platforms-data";

const BRAND_LOGO = {
  paypal: LogoPaypal,
  mastercard: LogoMastercard,
};

/* Screen 1 of the wizard: "اختر وسيلة الدفع". Controlled by CheckoutWizard, so
   the pick survives moving on to the next screen and back; it also drives the
   brand name inside the notes panel. */
export default function PaymentPlatforms({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const selected =
    PAYMENT_PLATFORMS.find((p) => p.value === value) ?? PAYMENT_PLATFORMS[0];

  return (
    <div className="sp-pay">
      <h2 className="sp-pay-title" data-i18n="checkout_pay_title">
        اختر وسيلة الدفع
      </h2>

      <div className="sp-pay-row">
        {PAYMENT_PLATFORMS.map((p) => {
          const Logo = BRAND_LOGO[p.brand];
          const checked = p.value === value;

          return (
            /* The native radio stays in the DOM (keyboard + a11y) but is
               visually replaced by .sp-pay-dot, which CSS fills on :checked. */
            <label
              key={p.value}
              className={"sp-pay-option" + (checked ? " is-selected" : "")}
            >
              <input
                type="radio"
                name="payment-platform"
                className="sp-pay-input"
                value={p.value}
                checked={checked}
                onChange={() => onChange(p.value)}
              />
              <span className="sp-pay-brand">
                <span className="sp-pay-logo" aria-hidden="true">
                  <Logo />
                </span>
                <span className="sp-pay-label">{p.label}</span>
              </span>
              <span className="sp-pay-dot" aria-hidden="true"></span>
            </label>
          );
        })}
      </div>

      <PaymentNotes platform={selected.label} />
    </div>
  );
}
