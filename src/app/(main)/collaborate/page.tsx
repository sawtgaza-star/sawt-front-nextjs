import type { Metadata } from "next";
import "@/styles/creators.css";
import "@/styles/collaborate.css";
import LegacyInit from "@/components/LegacyInit";
import CollaborateContent from "@/components/collaborate/CollaborateContent";

/* /collaborate — تعاون معنا. Where the home hero's "تعاون معنا" button lands.
   Server Component around one client boundary: <CollaborateContent /> makes
   the page's single request (GET /pages/collaborate) and renders the hero and
   the type picker from it.
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
      <CollaborateContent />
    </div>
  );
}
