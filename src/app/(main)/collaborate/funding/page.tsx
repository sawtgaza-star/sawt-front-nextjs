import type { Metadata } from "next";
import "@/styles/creators.css";
import "@/styles/collaborate.css";
import LegacyInit from "@/components/LegacyInit";
import CollaborateHero from "@/components/collaborate/CollaborateHero";
import FundingWizard from "@/components/collaborate/funding/FundingWizard";

/* /collaborate/funding — the "رعاية أو تمويل" application, reached by picking
   that type on /collaborate. Server Component; the three-step form is the one
   client leaf. Same CSS pair as /collaborate. */
export const metadata: Metadata = {
  title: "رعاية أو تمويل | Collaborate with Sawt",
  description:
    "قدّم عرض الرعاية أو التمويل لمنصة صوت — بيانات جهتكم، نوع الدعم الذي ترغبون بتقديمه، والمرفقات.",
};

export default function Page() {
  return (
    <div className="cl-page">
      <LegacyInit page="collaborate" />
      <CollaborateHero
        crumb="رعاية أو تمويل"
        crumbKey="collab_type_funding_title"
      />
      <main>
        <section className="cl-section">
          <div className="container">
            <FundingWizard />
          </div>
        </section>
      </main>
    </div>
  );
}
