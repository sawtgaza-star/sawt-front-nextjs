import type { Metadata } from "next";
import "@/styles/creators.css";
import "@/styles/collaborate.css";
import LegacyInit from "@/components/LegacyInit";
import CollaborateHero from "@/components/collaborate/CollaborateHero";
import OtherWizard from "@/components/collaborate/other/OtherWizard";

/* /collaborate/other — the "تعاون آخر" application, reached by picking that
   type on /collaborate. Server Component; the two-step form is the one client
   leaf. Same CSS pair as /collaborate. */
export const metadata: Metadata = {
  title: "تعاون آخر | Collaborate with Sawt",
  description:
    "اقترح فكرة تعاون أخرى مع منصة صوت — بيانات التواصل وشرح الفكرة التي تقترحها.",
};

export default function Page() {
  return (
    <div className="cl-page">
      <LegacyInit page="collaborate" />
      <CollaborateHero crumb="تعاون آخر" crumbKey="collab_type_other_title" />
      <main>
        <section className="cl-section">
          <div className="container">
            <OtherWizard />
          </div>
        </section>
      </main>
    </div>
  );
}
