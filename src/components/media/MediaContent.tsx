"use client";
/* The only client boundary on /media: one request for the whole page (the API
   returns all thirteen blocks in a single payload) and one `lang`
   subscription, both handed down as props so the sections themselves stay
   plain functions of their own block.

   The page has no copy of its own — every word, photo and logo below comes
   from GET /pages/media. So the first render, server prerender and hydration
   alike, shows the hero's frame with bars in it plus <MediaSkeleton />; they
   give way to the real thing when the response lands, or to a page that is
   just its hero if the request fails — see lib/api/use-media-page for why an
   outage isn't surfaced.

   <MediaHero /> is outside the loading branch on purpose: <MediaNav /> lives
   inside it and its `.language-btn` is bound once by initTranslate(). See the
   note in MediaHero. */

import { useEffect } from "react";
import { useMediaPage } from "@/lib/api/use-media-page";
import { useLang } from "@/lib/use-lang";
import MediaHero from "./MediaHero";
import MediaAbout from "./MediaAbout";
import MediaStats from "./MediaStats";
import MediaServices from "./MediaServices";
import MediaWhy from "./MediaWhy";
import MediaProcess from "./MediaProcess";
import MediaWorks from "./MediaWorks";
import MediaSectors from "./MediaSectors";
import MediaPartners from "./MediaPartners";
import MediaConsult from "./MediaConsult";
import MediaPackages from "./MediaPackages";
import MediaTestimonials from "./MediaTestimonials";
import MediaFaq from "./MediaFaq";
import MediaSkeleton from "./MediaSkeleton";

export default function MediaContent() {
  const { page, loading } = useMediaPage();
  const { lang } = useLang();

  /* Arriving with a section in the URL — the banner that closes a service page
     and a case study links here as /media#sm-consult. The browser makes its own
     jump while the document is still the skeleton, when no such section exists,
     so it is made again once the payload's sections are on screen. Next frame,
     so the section is laid out before it is scrolled to; no smooth glide,
     because this is the arrival, not a move within the page. */
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
      <MediaHero data={page?.hero} lang={lang} loading={loading} />
      <main>
        {loading ? (
          <MediaSkeleton />
        ) : (
          <>
            <MediaAbout data={page?.about} lang={lang} />
            <MediaStats data={page?.stats} lang={lang} />
            <MediaServices data={page?.services} lang={lang} />
            <MediaWhy data={page?.why} lang={lang} />
            <MediaProcess data={page?.methodology} lang={lang} />
            <MediaWorks data={page?.works} lang={lang} />
            <MediaSectors data={page?.audiences} lang={lang} />
            <MediaPartners data={page?.partners} lang={lang} />
            <MediaConsult data={page?.consultation} lang={lang} />
            <MediaPackages data={page?.packages} lang={lang} />
            <MediaTestimonials data={page?.testimonials} lang={lang} />
            <MediaFaq data={page?.faq} lang={lang} />
          </>
        )}
      </main>
    </>
  );
}
