"use client";
/* The only data boundary on /incubator: one request for the whole page (the
   API returns all twelve blocks in a single payload) and one `lang`
   subscription, both handed down as props so the sections themselves stay
   plain functions of their own block.

   The page has no copy of its own — every word below comes from
   GET /pages/incubator. So the first render, server prerender and hydration
   alike, shows the hero's frame with bars in it plus <IncubatorSkeleton />;
   they give way to the real thing when the response lands, or to a page that
   is just its hero if the request fails — see lib/api/use-incubator-page.

   <IncubatorHero /> is outside the loading branch on purpose: <IncubatorNav />
   lives inside it and its `.language-btn` is bound once by initTranslate(). */

import { useEffect } from "react";
import { useIncubatorPage } from "@/lib/api/use-incubator-page";
import { useLang } from "@/lib/use-lang";
import IncubatorHero from "./IncubatorHero";
import WhyIncubator from "./WhyIncubator";
import PopularCourses from "./PopularCourses";
import SponsorStudents from "./SponsorStudents";
import LatestEvents from "./LatestEvents";
import IncubatorAlbum from "./IncubatorAlbum";
import ExpertsTeam from "./ExpertsTeam";
import IncubatorFaq from "./IncubatorFaq";
import GraduatesPartners from "./GraduatesPartners";
import IncubatorJoin from "./IncubatorJoin";
import IncubatorTestimonials from "./IncubatorTestimonials";
import IncubatorSkeleton from "./IncubatorSkeleton";

export default function IncubatorContent() {
  const { page, loading } = useIncubatorPage();
  const { lang } = useLang();

  /* Arriving with a section in the URL — the incubator bar on a course page
     links here as /incubator#inc-courses. The browser makes its own jump while
     the document is still the skeleton, when no such section exists, so it is
     made again once the payload's sections are on screen. */
  useEffect(() => {
    if (loading) return;
    const id = window.location.hash.slice(1);
    if (!id) return;

    const frame = requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ block: "start" });
    });
    return () => cancelAnimationFrame(frame);
  }, [loading]);

  return (
    <>
      <IncubatorHero data={page?.hero} stats={page?.stats} lang={lang} loading={loading} />
      <main>
        {loading ? (
          <IncubatorSkeleton />
        ) : (
          <>
            <WhyIncubator data={page?.why} lang={lang} />
            <PopularCourses data={page?.courses} lang={lang} />
            <SponsorStudents data={page?.sponsor} lang={lang} />
            <LatestEvents data={page?.events} lang={lang} />
            <IncubatorAlbum data={page?.gallery} lang={lang} />
            <ExpertsTeam data={page?.experts} lang={lang} />
            <IncubatorFaq data={page?.faq} lang={lang} />
            <GraduatesPartners data={page?.employers} lang={lang} />
            <IncubatorJoin data={page?.join_cta} lang={lang} />
            <IncubatorTestimonials data={page?.testimonials} lang={lang} />
          </>
        )}
      </main>
    </>
  );
}
