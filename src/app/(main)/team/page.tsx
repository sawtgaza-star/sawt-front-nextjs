import "@/styles/creators.css";
import "@/styles/team.css";
import LegacyInit from "@/components/LegacyInit";
import TeamListing from "@/components/team/TeamListing";
import JoinModal from "@/components/site/JoinModal";

/* Server Component — the hero, the filter pills and the roster all come from
   GET /pages/team, fetched in the browser by <TeamListing /> (static export:
   see lib/api/use-team-page). Nothing on this page is hard-coded any more.

   <JoinModal /> stays outside that boundary: it carries no API copy and has to
   exist in the DOM before the legacy boot looks for `#joinModal` on mount. */
export default function Page() {
  return (
    <div className="team-page">
      <LegacyInit page="team" />
      <TeamListing />
      <JoinModal />
    </div>
  );
}
