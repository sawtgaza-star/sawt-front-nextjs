import type { Metadata } from "next";
import "@/styles/creators.css";
import "@/styles/support.css";
import LegacyInit from "@/components/LegacyInit";
import DonationToast from "@/components/support/DonationToast";
import SupportContent from "@/components/support/SupportContent";

/* /support — ادعم صوت. Server Component around one client boundary:
   <SupportContent /> makes the page's single request (GET /pages/support) and
   renders every section from it.
   creators.css supplies the breadcrumb hero (cr-header/cr-hero) and the
   shared section heading (cr-section-head / cr-highlight). */
export const metadata: Metadata = {
  title: "ادعم صوت | Support Sawt",
  description:
    "ادعم منصة صوت وساهم في إيصال قصص الناس — تبرّعك يموّل الحاضنة وصنّاع المحتوى والقصص التي لم تُروَ بعد.",
};

export default function Page() {
  return (
    <div className="sp-page">
      <LegacyInit page="support" />
      {/* only renders when the checkout wizard just sent the donor back here */}
      <DonationToast />
      <SupportContent />
    </div>
  );
}
