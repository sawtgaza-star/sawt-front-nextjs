"use client";
/* The only client boundary on /media/contact: one request for the whole page
   (the API answers the banner, the copy, both channel cards and the trust row
   at once) and one `lang` subscription, handed down so the two sections stay
   plain functions of their own block.

   The page has no copy of its own — every word comes from
   GET /pages/media/contact. So the first render, server prerender and
   hydration alike, shows the banner's shell with bars in it plus
   <MediaContactSkeleton />; they give way to the real thing when the response
   lands, or to a page that is just its banner if the request fails — see
   lib/api/use-media-contact for why an outage isn't surfaced.

   <MediaContactHero /> is outside the loading branch on purpose: <MediaNav />
   lives inside it and its `.language-btn` is bound once by initTranslate(). */

import { useMediaContact } from "@/lib/api/use-media-contact";
import { useLang } from "@/lib/use-lang";
import MediaContactHero from "./MediaContactHero";
import MediaContactSection from "./MediaContactSection";
import MediaContactSkeleton from "./MediaContactSkeleton";

export default function MediaContactPageContent() {
  const { page, loading } = useMediaContact();
  const { lang } = useLang();

  return (
    <>
      <MediaContactHero data={page?.hero} lang={lang} loading={loading} />
      <main>
        {loading ? (
          <MediaContactSkeleton />
        ) : (
          <MediaContactSection
            intro={page?.intro}
            channels={page?.channels}
            trust={page?.trust}
            lang={lang}
          />
        )}
      </main>
    </>
  );
}
