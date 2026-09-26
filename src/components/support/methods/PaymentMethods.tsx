"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PaymentMethodCard from "./PaymentMethodCard";
import { localized } from "@/lib/api/pages";
import type { SupportMethodsPage } from "@/lib/api/support-methods";
import SupportSectionHead from "../SupportSectionHead";
import { resolvePaymentMethods } from "./payment-methods-data";

/* "اختر طريقة الدعم التي تناسبك" — the three donation channels as one radio
   group. Client leaf because the group owns the pick; nothing starts selected,
   which is the state the mock shows. Picking a card marks it and then moves on
   to that method's flow, the same way CollaborateTypes works.
   Reuses cr-section-head / cr-highlight from creators.css like the rest of the
   support page. Cards and heading from GET /support/methods (fetched by
   <MethodsContent />), with the built-in three as the fallback. */
export default function PaymentMethods({
  data,
  lang = "ar",
}: {
  data?: SupportMethodsPage;
  lang?: string;
}) {
  const methods = resolvePaymentMethods(data?.categories, lang);
  const [selected, setSelected] = useState("");
  const router = useRouter();

  function select(value: string, href: string) {
    setSelected(value);
    router.push(href);
  }

  return (
    <section className="sp-section">
      <div className="container">
        <SupportSectionHead
          title={localized(data?.section?.title, lang)}
          sub={localized(data?.section?.description, lang)}
          fallback={{
            pre: "اختر طريقة الدعم التي",
            preKey: "support_methods_title_pre",
            hl: "تناسبك",
            hlKey: "support_methods_title_hl",
          }}
        />

        <div className="sp-methods-row">
          {methods.map((m) => (
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
