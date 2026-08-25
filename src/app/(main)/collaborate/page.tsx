import type { Metadata } from "next";
import "@/styles/creators.css";
import "@/styles/collaborate.css";
import LegacyInit from "@/components/LegacyInit";
import CollaborateHero from "@/components/collaborate/CollaborateHero";
import CollaborateTypes from "@/components/collaborate/CollaborateTypes";

/* /collaborate — تعاون معنا. Where the home hero's "تعاون معنا" button lands.
   Server Component; only the type picker is a client leaf.
   creators.css supplies the breadcrumb hero (cr-header/cr-hero) and the shared
   section heading (cr-section-head / cr-highlight). */
export const metadata: Metadata = {
  title: "تعاون معنا | Collaborate with Sawt",
  description:
    "اختر نوع التعاون مع منصة صوت — صانع محتوى، رعاية أو تمويل، شراكة استراتيجية، أو تعاون آخر.",
};

export default function Page() {
  return (
    <div className="cl-page">
      <LegacyInit page="collaborate" />
      <CollaborateHero />
      <main>
        <CollaborateTypes />
      </main>
    </div>
  );
}
