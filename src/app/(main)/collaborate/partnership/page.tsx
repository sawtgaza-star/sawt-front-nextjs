import type { Metadata } from "next";
import "@/styles/creators.css";
import "@/styles/collaborate.css";
import LegacyInit from "@/components/LegacyInit";
import CollaborateHero from "@/components/collaborate/CollaborateHero";
import PartnershipWizard from "@/components/collaborate/partnership/PartnershipWizard";

/* /collaborate/partnership — the "شراكة استراتيجية" application, reached by
   picking that type on /collaborate. Server Component; the three-step form is
   the one client leaf. Same CSS pair as /collaborate. */
export const metadata: Metadata = {
  title: "شراكة استراتيجية | Collaborate with Sawt",
  description:
    "قدّم طلب الشراكة الاستراتيجية مع منصة صوت — بيانات شركتكم، طبيعة الشراكة المقترحة، والمرفقات.",
};

export default function Page() {
  return (
    <div className="cl-page">
      <LegacyInit page="collaborate" />
      <CollaborateHero
        crumb="شراكة استراتيجية"
        crumbKey="collab_type_partnership_title"
      />
      <main>
        <section className="cl-section">
          <div className="container">
            <PartnershipWizard />
          </div>
        </section>
      </main>
    </div>
  );
}
