import type { Metadata } from "next";
import "@/styles/creators.css";
import "@/styles/collaborate.css";
import LegacyInit from "@/components/LegacyInit";
import CollaborateHero from "@/components/collaborate/CollaborateHero";
import CreatorWizard from "@/components/collaborate/creator/CreatorWizard";

/* /collaborate/creator — the "صانع محتوى" application, reached by picking that
   type on /collaborate. Server Component; the three-step form is the one
   client leaf. Same CSS pair as /collaborate. */
export const metadata: Metadata = {
  title: "صانع محتوى | Collaborate with Sawt",
  description:
    "قدّم طلب التعاون مع منصة صوت كصانع محتوى — معلوماتك الشخصية، تفاصيل محتواك، ومواقع التواصل.",
};

export default function Page() {
  return (
    <div className="cl-page">
      <LegacyInit page="collaborate" />
      <CollaborateHero crumb="صانع محتوى" crumbKey="collab_type_creator_title" />
      <main>
        <section className="cl-section">
          <div className="container">
            <CreatorWizard />
          </div>
        </section>
      </main>
    </div>
  );
}
