import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "@/styles/creators.css";
import "@/styles/team.css";
import LegacyInit from "@/components/LegacyInit";
import TeamHero from "@/components/team/TeamHero";
import TeamMemberProfile from "@/components/team/TeamMemberProfile";
import TeamMembersSection from "@/components/team/TeamMembersSection";
import { TEAM_MEMBERS, getTeamMember } from "@/components/team/team-data";
import JoinModal from "@/components/site/JoinModal";

/* `output: 'export'` needs every dynamic segment pre-listed. */
export function generateStaticParams() {
  return TEAM_MEMBERS.map((m) => ({ id: String(m.id) }));
}

/* Tab title = the member's name. Falls back to the section title for an id
   that isn't in TEAM_MEMBERS — the page itself notFound()s in that case. */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const member = getTeamMember(Number(id));

  if (!member) return { title: "الفريق | Sawt Team" };

  return {
    title: `${member.name} | Sawt Team`,
    description: `${member.name} — ${member.role} في منصة صوت.`,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const member = getTeamMember(Number(id));

  if (!member) {
    notFound();
  }

  return (
    <div className="team-page team-detail-page">
      <LegacyInit page="team" />
      <TeamHero />
      <main>
        <TeamMemberProfile member={member} />
        <TeamMembersSection currentId={member.id} />
      </main>
      <JoinModal />
    </div>
  );
}
