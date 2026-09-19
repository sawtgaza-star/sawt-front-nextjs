"use client";
/* The only client boundary on /media/works/[slug]: one request for the whole
   case study (the API answers every block at once) and one `lang`
   subscription, both handed down as props.

   The page has no copy of its own — every word and photo comes from
   GET /pages/media/works/{slug}. So the first render, server prerender and
   hydration alike, shows the banner's shell with bars in it plus
   <MediaWorkSkeleton />; they give way to the real thing when the response
   lands, or to a page that is just its banner if the request fails — see
   lib/api/use-media-work for why an outage isn't surfaced.

   <MediaProjectHero /> is outside the loading branch on purpose: <MediaNav />
   lives inside it and its `.language-btn` is bound once by initTranslate(). */

import { useMediaWork } from "@/lib/api/use-media-work";
import { useLang } from "@/lib/use-lang";
import MediaProjectHero from "./MediaProjectHero";
import MediaProjectIntro from "./MediaProjectIntro";
import MediaProjectTabs from "./MediaProjectTabs";
import MediaProjectCta from "./MediaProjectCta";
import MediaWorkSkeleton from "./MediaWorkSkeleton";

export default function MediaWorkContent({ slug }: { slug: string }) {
  const { page, loading } = useMediaWork(slug);
  const { lang } = useLang();

  return (
    <>
      <MediaProjectHero data={page?.hero} lang={lang} loading={loading} />
      <main>
        {loading ? (
          <MediaWorkSkeleton />
        ) : page ? (
          <>
            <MediaProjectIntro data={page.work} lang={lang} />
            <MediaProjectTabs page={page} lang={lang} />
            {page.cta ? <MediaProjectCta data={page.cta} lang={lang} /> : null}
          </>
        ) : null}
      </main>
    </>
  );
}
