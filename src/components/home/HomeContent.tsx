"use client";
/* The only client boundary on the home page: one request for the whole page
   (the API returns all eleven blocks in a single payload) and one `lang`
   subscription, both handed down as props so the sections themselves stay
   plain functions.

   The page has no copy of its own — every word and image below comes from
   GET /pages/home. `initialPage` is that payload as fetched at build time
   (app/(main)/page.tsx), so normally the prerendered HTML is already the real
   page. Only when the build couldn't reach the API does the first render show
   <HomeSkeleton /> — the hero's <header> chrome plus grey bars in the shape of
   the sections — until the browser's own request lands, or nothing at all if
   that fails too. See lib/api/use-home-page for the refresh and the outages.

   A browser answer that differs from the baked copy bumps `version`. The four
   carousel sections are keyed by a hash of their own block (`contentKey`), so
   only a carousel whose data actually changed is remounted: Owl has moved its
   cards into its own stage + clones by then, and a React patch of that markup
   would corrupt it. Everything else — the reels' expiring Instagram links,
   copy, the header — is patched in place as usual. The <header> must not be
   remounted anyway: SiteNav lives in it and initHeaderPin() has re-parented
   its nodes; the Bootstrap carousel is restarted below.

   RE-BOOTING THE LEGACY WIDGETS
   -----------------------------
   <LegacyInit page="home" /> runs its whole boot on mount, which is now before
   any of this markup exists. Four widgets read the DOM at that moment and so
   have to be run again once the payload has landed:

     - the four Owl carousels. Owl marks an element `.owl-loaded` and skips it
       on a repeat call, which is why the skeleton renders no `.owl-carousel`
       at all: nothing gets initialised on an empty stage. With a baked payload
       LegacyInit's own call already sees the items, and this one is a no-op
       until a remount brings fresh, un-initialised carousels.
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
import type { HomePage } from "@/lib/api/home";

/** A short, stable key for a section's payload block — changes iff the block does. */
function contentKey(block: unknown): string {
  const text = JSON.stringify(block ?? null);
  let hash = 5381;
  for (let i = 0; i < text.length; i++) hash = ((hash << 5) + hash + text.charCodeAt(i)) | 0;
  return `${text.length}-${hash >>> 0}`;
}

/** Rebuild the hero's Bootstrap carousel now that it has slides. */
function restartHeroCarousel() {
  const element = document.getElementById("heroCarousel");
  const bootstrap = (window as any).bootstrap;
  if (!element || !bootstrap?.Carousel) return;
  bootstrap.Carousel.getInstance(element)?.dispose();
  // `data-bs-ride="carousel"` is on the element, so this starts cycling too.
  bootstrap.Carousel.getOrCreateInstance(element);
}

export default function HomeContent({
  initialPage = null,
}: {
  /** /pages/home as fetched at build time; null if the build couldn't reach it. */
  initialPage?: HomePage | null;
}) {
  const { page, loading, version } = useHomePage(initialPage);
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
  }, [loading, version]);

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
  }, [loading, lang, version]);

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
            <LatestNews key={contentKey(page?.news)} data={page?.news} lang={lang} />
            <ContentCreators key={contentKey(page?.creators)} data={page?.creators} lang={lang} />
            <PlatformSections data={page?.platform_sections} lang={lang} />
            <MidBanner data={page?.partners} lang={lang} />
            <RealStories key={contentKey(page?.stories)} data={page?.stories} lang={lang} />
            <TeamSection key={contentKey(page?.team)} data={page?.team} lang={lang} />
            <JoinUs data={page?.join_cta} lang={lang} />
            <Reviews data={page?.reviews} lang={lang} />
          </>
        )}
      </main>
    </>
  );
}
