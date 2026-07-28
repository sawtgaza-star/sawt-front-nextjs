import "@/styles/creators.css";
import "@/styles/support.css";
import LegacyInit from "@/components/LegacyInit";
import CheckoutHero from "@/components/support/checkout/CheckoutHero";
import CheckoutWizard from "@/components/support/checkout/CheckoutWizard";

/* /support/checkout — the donation wizard (اختيار المنصة → إثبات التبرع),
   where "المتابعة" on a /support/methods card lands. Server Component; the
   wizard itself is the client leaf that walks through the screens. Loads the
   same CSS pair as the rest of the support flow. */
export default function Page() {
  return (
    <div className="sp-page">
      <LegacyInit page="support" />
      <CheckoutHero />
      <main>
        <section className="sp-section sp-wizard-section">
          <div className="container">
            <CheckoutWizard />
          </div>
        </section>
      </main>
    </div>
  );
}
