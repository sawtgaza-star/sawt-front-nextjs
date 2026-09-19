"use client";
/* The only client boundary on /media/works: one request for the whole page
   (the API answers the banner, both filter panels and every project at once)
   and one `lang` subscription, handed down so the sections stay plain
   functions of their own block.

   The page has no copy of its own — every word and photo comes from
   GET /pages/media/works. So the first render, server prerender and hydration
   alike, shows the banner's shell with bars in it plus <MediaWorksSkeleton />;
   they give way to the real thing when the response lands, or to a page that
   is just its banner if the request fails — see lib/api/use-media-works for
   why an outage isn't surfaced.

   <MediaWorksHero /> is outside the loading branch on purpose: <MediaNav />
   lives inside it and its `.language-btn` is bound once by initTranslate(). */

import { useMediaWorks } from "@/lib/api/use-media-works";
import { useLang } from "@/lib/use-lang";
import MediaWorksHero from "./MediaWorksHero";
import MediaWorksBrowser from "./MediaWorksBrowser";
import MediaWorksSkeleton from "./MediaWorksSkeleton";

export default function MediaWorksPageContent() {
  const { page, loading } = useMediaWorks();
  const { lang } = useLang();

  return (
    <>
      <MediaWorksHero data={page?.hero} lang={lang} loading={loading} />
      <main>
        {loading ? (
          <MediaWorksSkeleton />
        ) : (
          <MediaWorksBrowser
            filters={page?.filters}
            items={page?.items}
            lang={lang}
          />
        )}
      </main>
    </>
  );
}
