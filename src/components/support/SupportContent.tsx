"use client";
/* The only client boundary on /support: one request for the whole page (the
   API returns every block in a single payload) and one `lang` subscription,
   handed down as props so the sections stay plain functions of their block.

   While the request is in flight the hero shows bars and the body a skeleton.
   An outage leaves `page` null: every section then falls back to its built-in
   copy, so the donation flow stays reachable.

   Those fallbacks keep their data-i18n keys, but they mount after
   initTranslate() has walked the DOM — so the translator is run once more
   when the body arrives, or an English visitor would get them in Arabic. */

import { useEffect } from "react";
import { useSupportPage } from "@/lib/api/use-support-page";
import { useLang } from "@/lib/use-lang";
import { applyTranslations, getCurrentLang } from "@/lib/translations";
import SupportHero from "./SupportHero";
import DonateSection from "./DonateSection";
import SupportBanner from "./SupportBanner";
import SupportCommunity from "./SupportCommunity";
import WhereDonationsGo from "./WhereDonationsGo";
import SupportPartners from "./SupportPartners";
import IncubatorCourses from "./IncubatorCourses";
import UntoldStories from "./UntoldStories";
import SupportFaq from "./SupportFaq";
import { SupportBodySkeleton } from "./SupportSkeleton";

export default function SupportContent() {
  const { page, loading } = useSupportPage();
  const { lang } = useLang();

  useEffect(() => {
    if (!loading) applyTranslations(getCurrentLang());
  }, [loading]);

  return (
    <>
      {/* Always rendered: <SiteNav /> lives in there — see SupportHero. */}
      <SupportHero data={page?.hero} lang={lang} loading={loading} />
      <main>
        {/* anchor target for every "تبرع الآن" button further down the page */}
        <div id="support-donate"></div>
        {loading ? (
          <SupportBodySkeleton count={3} />
        ) : (
          <>
            <DonateSection plans={page?.plans} impact={page?.impact} lang={lang} />
            <SupportBanner trust={page?.trust} lang={lang} />
            <SupportCommunity data={page?.community_goal} lang={lang} />
            <WhereDonationsGo data={page?.fund_allocation} lang={lang} />
            <SupportPartners data={page?.partners} lang={lang} />
            <IncubatorCourses data={page?.sponsor} lang={lang} />
            <UntoldStories data={page?.stories} lang={lang} />
            <SupportFaq data={page?.faq} lang={lang} />
          </>
        )}
      </main>
    </>
  );
}
