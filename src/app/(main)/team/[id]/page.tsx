import type { Metadata } from "next";
import "@/styles/creators.css";
import "@/styles/team.css";
import LegacyInit from "@/components/LegacyInit";
import TeamDetail from "@/components/team/TeamDetail";
import JoinModal from "@/components/site/JoinModal";
import { fetchAllTeamUuids, fetchTeamMember } from "@/lib/api/team";
import { localized } from "@/lib/api/pages";

/* /team/[id] — the profile behind a member card's arrow. The segment is the
   member's `uuid`: GET /pages/team/{uuid} resolves that identifier only, so
   every link into a profile uses it too (the folder is named [id] to match
   /news/[id], which carries a uuid for the same reason).

   The profile is fetched in the browser — see TeamDetail — so an edit is live
   without a deploy. The build only reads the roster to learn which pages
   exist, because `output: 'export'` pre-lists every dynamic segment; a member
   added after the deploy therefore needs a rebuild before their URL exists. */

export async function generateStaticParams() {
  try {
    const uuids = await fetchAllTeamUuids();
    return uuids.map((id) => ({ id }));
  } catch (caught) {
    // The API being unreachable must not fail the build: the rest of the site
    // still exports, and this route simply has no pages this time round.
    console.warn("[team] could not list members for the export:", caught);
    return [];
  }
}

/* Tab title = the member's name. This is the one place the build reads a
   profile, and only for <head>; the page's own copy still comes from the
   browser's request, in the reader's language. */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  try {
    const data = await fetchTeamMember(id);
    const name = localized(data?.member?.name, "ar");
    const role = localized(data?.member?.role, "ar");
    if (name) {
      return {
        title: `${name} | Sawt Team`,
        description: role ? `${name} — ${role} في منصة صوت.` : undefined,
      };
    }
  } catch {
    // fall through to the listing's own title
  }

  return { title: "الفريق | Sawt Team" };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="team-page team-detail-page">
      <LegacyInit page="team" />
      <TeamDetail uuid={id} />
      <JoinModal />
    </div>
  );
}
