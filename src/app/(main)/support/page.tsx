import "@/styles/creators.css";
import "@/styles/support.css";
import LegacyInit from "@/components/LegacyInit";
import DonationToast from "@/components/support/DonationToast";
import SupportHero from "@/components/support/SupportHero";
import DonateSection from "@/components/support/DonateSection";
import SupportBanner from "@/components/support/SupportBanner";
import SupportCommunity from "@/components/support/SupportCommunity";
import WhereDonationsGo from "@/components/support/WhereDonationsGo";
import SupportPartners from "@/components/support/SupportPartners";
import IncubatorCourses from "@/components/support/IncubatorCourses";
import UntoldStories from "@/components/support/UntoldStories";
import SupportFaq from "@/components/support/SupportFaq";

/* /support — ادعم صوت. Server Component; only the donation form, the stories
   slider and the FAQ accordion are client leaves.
   creators.css supplies the breadcrumb hero (cr-header/cr-hero) and the
   shared section heading (cr-section-head / cr-highlight). */
export default function Page() {
  return (
    <div className="sp-page">
      <LegacyInit page="support" />
      {/* only renders when the checkout wizard just sent the donor back here */}
      <DonationToast />
      <SupportHero />
      <main>
        {/* anchor target for every "تبرع الآن" button further down the page */}
        <div id="support-donate"></div>
        <DonateSection />
        <SupportBanner />
        <SupportCommunity />
        <WhereDonationsGo />
        <SupportPartners />
        <IncubatorCourses />
        <UntoldStories />
        <SupportFaq />
      </main>
    </div>
  );
}
