import PaymentMethodCard from "./PaymentMethodCard";
import { PAYMENT_METHODS } from "./payment-methods-data";

/* "اختر طريقة الدعم التي تناسبك" — the three donation channels.
   Reuses cr-section-head / cr-highlight from creators.css like the rest of
   the support page. */
export default function PaymentMethods() {
  return (
    <section className="sp-section">
      <div className="container">
        <div className="cr-section-head">
          <h2 className="cr-section-title">
            <span data-i18n="support_methods_title_pre">
              اختر طريقة الدعم التي
            </span>{" "}
            <span className="cr-highlight" data-i18n="support_methods_title_hl">
              تناسبك
            </span>
          </h2>
        </div>

        <div className="sp-methods-row">
          {PAYMENT_METHODS.map((m) => (
            <PaymentMethodCard key={m.value} method={m} />
          ))}
        </div>
      </div>
    </section>
  );
}
