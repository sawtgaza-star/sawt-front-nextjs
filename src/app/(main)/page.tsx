import LegacyInit from "@/components/LegacyInit";
import HomeContent from "@/components/home/HomeContent";
import JoinModal from "@/components/site/JoinModal";
import { fetchHomePage, type HomePage } from "@/lib/api/home";

/* Server Component — every section's content comes from GET /pages/home.

   The payload is fetched HERE, at build time (static export: `next build`
   runs this once and writes the result into index.html), so the first HTML a
   visitor receives already carries the hero, the copy and every <img>. Before
   this the page shipped as a skeleton and the browser had to boot the JS,
   call the API and only then discover the images — LCP ≈ 8s on mobile and a
   big layout shift when the sections dropped in.

   The build-time copy can go stale between deploys, so <HomeContent /> still
   asks the API from the browser and swaps in the answer when it differs (see
   lib/api/use-home-page). The deploy workflow also rebuilds on a schedule and
   on a `content-updated` dispatch from the backend, which keeps that swap rare.

   A build that cannot reach the API is not a failed build: `initialPage` is
   null, the page ships as the skeleton, and the browser fetch fills it in —
   exactly how it worked before.

   <JoinModal /> stays outside that boundary: it is the dialog legacy-home's
   stepper drives, it carries no API copy, and it has to exist in the DOM
   before initHomeInline() looks for `#joinModal` on mount. */

/** Long enough for a slow API, short enough that a dead one can't hang CI. */
const BUILD_FETCH_TIMEOUT_MS = 20_000;

async function loadHomePageAtBuild(): Promise<HomePage | null> {
  try {
    return await fetchHomePage(AbortSignal.timeout(BUILD_FETCH_TIMEOUT_MS));
  } catch (caught) {
    console.warn("[home] build-time fetch failed, shipping the skeleton:", caught);
    return null;
  }
}

export default async function Page() {
  const initialPage = await loadHomePageAtBuild();

  return (
    <>
      <LegacyInit page="home" />
      <HomeContent initialPage={initialPage} />
      <JoinModal />
    </>
  );
}
