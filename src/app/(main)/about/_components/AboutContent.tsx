"use client";
/* The only client boundary on /about: one request for the whole page (the API
   returns all six sections in a single payload) and one `lang` subscription,
   both handed down as props so the sections themselves stay plain functions.

   The page has no copy of its own — every word and image below comes from
   GET /pages/about. So the first render, server prerender and hydration alike,
   shows <AboutSkeleton />: the hero's <header> chrome plus grey bars in the
   shape of the sections. They give way to the real thing when the response
   lands, or to nothing at all if the request fails — see lib/api/use-about-page
   for why an outage isn't surfaced. */

import { useAboutPage } from "@/lib/api/use-about-page";
import { useLang } from "@/lib/use-lang";
import AboutHero from "./AboutHero";
import AboutIntro from "./AboutIntro";
import CoreValues from "./CoreValues";
import AboutPlatform from "./AboutPlatform";
import SawtStory from "./SawtStory";
import JoinUs from "./JoinUs";
import AboutSkeleton from "./AboutSkeleton";

export default function AboutContent() {
  const { page, loading } = useAboutPage();
  const { lang } = useLang();

  return (
    <>
      {/* Always rendered: <SiteNav /> lives in there — see AboutHero. */}
      <AboutHero data={page?.hero} lang={lang} loading={loading} />
      {loading ? (
        <AboutSkeleton />
      ) : (
        <>
          <AboutIntro data={page?.intro} lang={lang} />
          <CoreValues data={page?.values} lang={lang} />
          <AboutPlatform data={page?.platform} lang={lang} />
          <SawtStory data={page?.story} lang={lang} />
          <JoinUs data={page?.join} lang={lang} />
        </>
      )}
    </>
  );
}
