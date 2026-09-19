"use client";
/* The only client boundary on the home page: one request for the whole page
   (the API returns all eleven blocks in a single payload) and one `lang`
   subscription, both handed down as props so the sections themselves stay
   plain functions.

   The page has no copy of its own — every word and image below comes from
   GET /pages/home. So the first render, server prerender and hydration alike,
   shows <HomeSkeleton />: the hero's <header> chrome plus grey bars in the
   shape of the sections. They give way to the real thing when the response
   lands, or to nothing at all if the request fails — see lib/api/use-home-page
   for why an outage isn't surfaced.

   RE-BOOTING THE LEGACY WIDGETS
   -----------------------------
   <LegacyInit page="home" /> runs its whole boot on mount, which is now before
   any of this markup exists. Four widgets read the DOM at that moment and so
   have to be run again once the payload has landed:

     - the four Owl carousels. Owl marks an element `.owl-loaded` and skips it
       on a repeat call, which is why the skeleton renders no `.owl-carousel`
       at all: nothing gets initialised on an empty stage, and this call is
       the first one that sees the items.
     - the Bootstrap hero carousel. Its element IS in the first render (SiteNav
       lives inside that header), but with an empty `.carousel-inner`, so the
       instance Bootstrap made has no slides to cycle — it is disposed and
       rebuilt here.
     - the reels column and its comment list (lib/legacy-main).
     - the stat counters, which animate the number they find in the text node,
       and the DOM translator, for the handful of `data-i18n` bits that are
       still chrome rather than content ("ألف"/"K", the story box's
       placeholder). Those two also have to run again after a language toggle,
       because React re-renders the figures back to their payload value. */

import { useEffect } from "react";
import { useHomePage } from "@/lib/api/use-home-page";
import { useLang } from "@/lib/use-lang";
import { initTranslate } from "@/lib/translations";
import HeroHeader from "./HeroHeader";
import SoutSection from "./SoutSection";
import LatestNews from "./LatestNews";
import ContentCreators from "./ContentCreators";
import PlatformSections from "./PlatformSections";
import MidBanner from "./MidBanner";
import RealStories from "./RealStories";
import TeamSection from "./TeamSection";
import JoinUs from "./JoinUs";
import Reviews from "./Reviews";
import HomeSkeleton from "./HomeSkeleton";

/** Rebuild the hero's Bootstrap carousel now that it has slides. */
function restartHeroCarousel() {
  const element = document.getElementById("heroCarousel");
  const bootstrap = (window as any).bootstrap;
  if (!element || !bootstrap?.Carousel) return;
  bootstrap.Carousel.getInstance(element)?.dispose();
  // `data-bs-ride="carousel"` is on the element, so this starts cycling too.
  bootstrap.Carousel.getOrCreateInstance(element);
}

export default function HomeContent() {
  const { page, loading } = useHomePage();
  const { lang } = useLang();

  // Widgets that read the markup once — run after the sections first appear.
  useEffect(() => {
    if (loading) return;
    let cancelled = false;

    (async () => {
      const { initOwlSliders } = await import("@/lib/owl-sliders");
      await initOwlSliders();
      if (cancelled) return;

      const { initReels, replayComments } = await import("@/lib/legacy-main");
      initReels();
      replayComments();
      restartHeroCarousel();
    })();

    return () => {
      cancelled = true;
    };
  }, [loading]);

  // …and the two that also have to follow every language toggle.
  useEffect(() => {
    if (loading) return;
    let cancelled = false;

    initTranslate();
    import("@/lib/legacy-main").then(({ runCounters }) => {
      if (!cancelled) runCounters();
    });

    return () => {
      cancelled = true;
    };
  }, [loading, lang]);

  return (
    <>
      {/* Always rendered: <SiteNav /> lives in there — see HeroHeader. */}
      <HeroHeader
        hero={page?.hero}
        stats={page?.stats}
        lang={lang}
        loading={loading}
      />
      <main className="my-5">
        {loading ? (
          <HomeSkeleton />
        ) : (
          <>
            <SoutSection data={page?.who_we_are} lang={lang} />
            <LatestNews data={page?.news} lang={lang} />
            <ContentCreators data={page?.creators} lang={lang} />
            <PlatformSections data={page?.platform_sections} lang={lang} />
            <MidBanner data={page?.partners} lang={lang} />
            <RealStories data={page?.stories} lang={lang} />
            <TeamSection data={page?.team} lang={lang} />
            <JoinUs data={page?.join_cta} lang={lang} />
            <Reviews data={page?.reviews} lang={lang} />
          </>
        )}
      </main>
    </>
  );
}
