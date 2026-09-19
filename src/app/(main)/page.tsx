import LegacyInit from "@/components/LegacyInit";
import HomeContent from "@/components/home/HomeContent";
import JoinModal from "@/components/site/JoinModal";

/* Server Component — every section's content comes from GET /pages/home,
   fetched in the browser by <HomeContent /> (static export: see
   lib/api/use-home-page). Nothing on this page is hard-coded any more.

   <JoinModal /> stays outside that boundary: it is the dialog legacy-home's
   stepper drives, it carries no API copy, and it has to exist in the DOM
   before initHomeInline() looks for `#joinModal` on mount. */
export default function Page() {
  return (
    <>
      <LegacyInit page="home" />
      <HomeContent />
      <JoinModal />
    </>
  );
}
