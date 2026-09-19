import "@/styles/creators.css";
import LegacyInit from "@/components/LegacyInit";
import CreatorsContent from "@/components/creators/CreatorsContent";
import JoinModal from "@/components/site/JoinModal";

/* Server Component — the hero, the grid, the figures, the join banner, the
   partner companies, the collaboration diagram and the FAQ all come from
   GET /pages/creators, fetched in the browser by <CreatorsContent /> (static
   export: see lib/api/use-creators-page). Nothing on this page is hard-coded
   any more.

   <JoinModal /> stays outside that boundary: it carries no API copy and has to
   exist in the DOM before the legacy boot looks for `#joinModal` on mount. */
export default function Page() {
  return (
    <div className="cr-page">
      <LegacyInit page="creators" />
      <CreatorsContent />
      <JoinModal />
    </div>
  );
}
