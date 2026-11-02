import {
  LogoMastercard,
  LogoPaypal,
  LogoVisa,
} from "@/components/support/methods/PaymentBrandLogos";

export type DonatePay = "card" | "paypal";

/* "طريقة الدفع" in the donation box: a card (Stripe Checkout) or PayPal.
   Controlled by DonateForm, which picks the checkout endpoint from it. */
export default function DonatePayMethod({
  value,
  onChange,
}: {
  value: DonatePay;
  onChange: (value: DonatePay) => void;
}) {
  return (
    <>
      <label className="sp-field-label" data-i18n="support_pay_method">
        طريقة الدفع
      </label>
      <div className="sp-amounts sp-pay-methods" role="radiogroup">
        <button
          type="button"
          role="radio"
          aria-checked={value === "card"}
          className={"sp-amount sp-pay-method" + (value === "card" ? " active" : "")}
          onClick={() => onChange("card")}
        >
          <span className="sp-pay-method-logos" aria-hidden="true">
            <LogoVisa />
            <LogoMastercard />
          </span>
          <span data-i18n="support_pay_card">بطاقة</span>
        </button>
        <button
          type="button"
          role="radio"
          aria-checked={value === "paypal"}
          className={"sp-amount sp-pay-method" + (value === "paypal" ? " active" : "")}
          onClick={() => onChange("paypal")}
        >
          <span className="sp-pay-method-logos" aria-hidden="true">
            <LogoPaypal />
          </span>
          <span>PayPal</span>
        </button>
      </div>
    </>
  );
}
