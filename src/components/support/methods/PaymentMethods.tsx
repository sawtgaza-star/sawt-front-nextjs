"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PaymentMethodCard from "./PaymentMethodCard";
import { PAYMENT_METHODS } from "./payment-methods-data";

/* "اختر طريقة الدعم التي تناسبك" — the three donation channels as one radio
   group. Client leaf because the group owns the pick; nothing starts selected,
   which is the state the mock shows. Picking a card marks it and then moves on
   to that method's flow, the same way CollaborateTypes works.
   Reuses cr-section-head / cr-highlight from creators.css like the rest of the
   support page. */
export default function PaymentMethods() {
  const [selected, setSelected] = useState("");
  const router = useRouter();

  function select(value: string, href: string) {
    setSelected(value);
    router.push(href);
  }

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
            <PaymentMethodCard
              key={m.value}
              method={m}
              checked={m.value === selected}
              onSelect={() => select(m.value, m.href)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
