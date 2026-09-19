"use client";
/* The only client boundary on /creators: one request for the whole page (the
   API returns all seven blocks in a single payload) and one `lang`
   subscription, both handed down as props so the sections themselves stay
   plain functions.

   The page has no copy of its own any more — every word and image below comes
   from GET /pages/creators. So the first render, server prerender and
   hydration alike, shows <CreatorsSkeleton />: the hero's <header> chrome plus
   grey bars in the shape of the sections. They give way to the real thing when
   the response lands, or to nothing at all if the request fails — see
   lib/api/use-creators-page for why an outage isn't surfaced.

   RE-RUNNING THE TRANSLATOR
   -------------------------
   <LegacyInit page="creators" /> translates on mount, which is now before any
   of this markup exists. Almost nothing here carries a `data-i18n` key any
   more, but the few bits that do are chrome the API doesn't send (the step
   card titles, the mobile FAQ heading, the "عرض الكل" fallback), and they
   appear only once the payload has landed — so the walk is repeated then, and
   again after every language toggle.

   The join modal needs nothing: its opener is bound by delegation, not to
   `#openJoinModal` itself (see lib/legacy-home). */

import { useEffect } from "react";
import { useCreatorsPage } from "@/lib/api/use-creators-page";
import { useLang } from "@/lib/use-lang";
import { initTranslate } from "@/lib/translations";
import CreatorsHero from "./CreatorsHero";
import CreatorsGrid from "./CreatorsGrid";
import CreatorsStats from "./CreatorsStats";
import PartnerCompanies from "./PartnerCompanies";
import CollaborationSteps from "./CollaborationSteps";
import CreatorsFaq from "./CreatorsFaq";
import CreatorsSkeleton from "./CreatorsSkeleton";
import JoinUs from "@/components/home/JoinUs";

export default function CreatorsContent() {
  const { page, loading } = useCreatorsPage();
  const { lang } = useLang();

  useEffect(() => {
    if (loading) return;
    initTranslate();
  }, [loading, lang]);

  return (
    <>
      {/* Always rendered: <SiteNav /> lives in there — see CreatorsHero. */}
      <CreatorsHero data={page?.hero} lang={lang} loading={loading} />
      <main>
        {loading ? (
          <CreatorsSkeleton />
        ) : (
          <>
            <CreatorsGrid data={page?.grid} lang={lang} />
            <CreatorsStats data={page?.stats} lang={lang} />
            <JoinUs creator={"creator"} data={page?.join} lang={lang} />
            <PartnerCompanies data={page?.partners} lang={lang} />
            <CollaborationSteps data={page?.collaboration} lang={lang} />
            <CreatorsFaq data={page?.faq} lang={lang} />
          </>
        )}
      </main>
    </>
  );
}
