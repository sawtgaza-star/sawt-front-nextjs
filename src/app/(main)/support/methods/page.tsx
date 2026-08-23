import type { Metadata } from "next";
import "@/styles/creators.css";
import "@/styles/support.css";
import LegacyInit from "@/components/LegacyInit";
import MethodsHero from "@/components/support/methods/MethodsHero";
import PaymentMethods from "@/components/support/methods/PaymentMethods";

/* /support/methods — طرق الدعم. Where every "تبرع" CTA on /support lands.
   Server Component; nothing here holds state. Loads the same CSS pair as
   /support so the shared cr-* hero / section styles resolve. */
export const metadata: Metadata = {
  title: "طرق الدعم | Donation Methods",
  description: "اختر طريقة الدفع المناسبة لك لدعم منصة صوت.",
};

export default function Page() {
  return (
    <div className="sp-page">
      <LegacyInit page="support" />
      <MethodsHero />
      <main>
        <PaymentMethods />
      </main>
    </div>
  );
}
