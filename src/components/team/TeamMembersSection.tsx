import Link from "next/link";
import TeamMembersSlider from "./TeamMembersSlider";
import { TEAM_MEMBERS, type TeamMember } from "./team-data";

/* "اعضاء الفريق" block on the member detail page: a centred, decorated heading,
   a row of member cards, and a "عرض الكل" link back to the full roster. */
export default function TeamMembersSection({
  currentId,
}: {
  currentId?: number;
}) {
  const members: TeamMember[] = TEAM_MEMBERS.filter(
    (m) => m.id !== currentId,
  ).slice(0, 5);

  return (
    <section className="team-members-section">
      <div className="container">
        <h2 className="team-members-title">
          <span data-i18n="team_members_title_pre">اعضاء</span>{" "}
          <span
            className="team-members-highlight"
            data-i18n="team_members_title_highlight"
          >
            الفريق
          </span>
        </h2>

        <TeamMembersSlider members={members} />

        <div className="team-members-more">
          <Link href="/team">
            <span data-i18n="view_all">عرض الكل</span>
            <i className="fa-solid fa-angle-left"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}
