import { notFound } from "next/navigation";
import "@/styles/creators.css";
import "@/styles/team.css";
import LegacyInit from "@/components/LegacyInit";
import TeamHero from "@/components/team/TeamHero";
import TeamMemberProfile from "@/components/team/TeamMemberProfile";
import TeamMembersSection from "@/components/team/TeamMembersSection";
import { getTeamMember } from "@/components/team/team-data";
import JoinModal from "@/components/site/JoinModal";

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
