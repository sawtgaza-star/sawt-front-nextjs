"use client";
/* The only client boundary on /media/services/[slug]: one request for the
   whole page (the API answers all five blocks at once) and one `lang`
   subscription, both handed down as props so the sections stay plain functions
   of their own block.

   The page has no copy of its own — every word and photo comes from
   GET /pages/media/services/{slug}. So the first render, server prerender and
   hydration alike, shows the banner's shell with bars in it plus
   <MediaServiceSkeleton />; they give way to the real thing when the response
   lands, or to a page that is just its banner if the request fails — see
   lib/api/use-media-service for why an outage isn't surfaced.

   <MediaServiceHero /> is outside the loading branch on purpose: <MediaNav />
   lives inside it and its `.language-btn` is bound once by initTranslate(). */

import { useMediaService } from "@/lib/api/use-media-service";
import { useLang } from "@/lib/use-lang";
import { localized } from "@/lib/api/pages";
import { sortItems } from "@/lib/api/media-page";
import MediaServiceHero from "./MediaServiceHero";
import MediaServiceGallery from "./MediaServiceGallery";
import MediaServiceIncludes from "./MediaServiceIncludes";
import MediaServiceWorks from "./MediaServiceWorks";
import MediaProjectCta from "./MediaProjectCta";
import MediaServiceSkeleton from "./MediaServiceSkeleton";

export default function MediaServiceContent({ slug }: { slug: string }) {
  const { page, loading } = useMediaService(slug);
  const { lang } = useLang();

  const service = page?.service;
  const gallery = sortItems(service?.gallery)
    .map((shot) => shot.url)
    .filter((url): url is string => Boolean(url));

  return (
    <>
      <MediaServiceHero data={page?.hero} lang={lang} loading={loading} />
      <main>
        {loading ? (
          <MediaServiceSkeleton />
        ) : (
          <>
            <MediaServiceGallery
              title={localized(service?.title, lang)}
              gallery={gallery}
            />
            <div className="container sm-sv-body">
              <MediaServiceIncludes data={page?.includes} lang={lang} />
              <MediaServiceWorks data={page?.works} lang={lang} />
            </div>
            {page?.cta ? <MediaProjectCta data={page.cta} lang={lang} /> : null}
          </>
        )}
      </main>
    </>
  );
}
