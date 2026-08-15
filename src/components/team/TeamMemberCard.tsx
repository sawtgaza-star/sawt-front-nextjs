import Link from "next/link";
import type { TeamMember } from "./team-data";

/* Team member card: portrait photo with a green name/role badge overlaid near
   the bottom (matches the /team mock). The circular arrow links to the member's
   detail page (/team/[id]). */
export default function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <article className="team-member-card">
      <div className="team-member-photo">
        <img src={member.photo} alt={member.name} />
        <div className="team-member-badge">
          <Link
            href={`/team/${member.id}`}
            className="team-member-arrow"
            aria-label={member.name}
          >
            <i className="fa-solid fa-arrow-up"></i>
          </Link>
          <div className="team-member-name" data-i18n={member.nameKey}>
            {member.name}
          </div>
          <div className="team-member-role" data-i18n={member.roleKey}>
            {member.role}
          </div>
        </div>
      </div>
    </article>
  );
}
