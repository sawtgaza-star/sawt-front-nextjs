import Link from "next/link";
import type { TeamCardMember } from "./team-data";

/* Team member card: portrait photo with a green name/role badge overlaid near
   the bottom (matches the /team mock). The circular arrow links to the
   member's profile — /team/{uuid}, the identifier the detail endpoint resolves
   and the segment the route is exported under (see lib/api/team).

   No `data-i18n` on the name or the role: both arrive from the API in both
   languages and the caller has already picked one, so the DOM translator has
   nothing to do here — and nothing of React's to overwrite. */
export default function TeamMemberCard({
  member,
  className,
}: {
  member: TeamCardMember;
  className?: string;
}) {
  return (
    <article className={"team-member-card" + (className ? " " + className : "")}>
      <div className="team-member-photo">
        <img src={member.photo} alt={member.name} />
        <div className="team-member-badge">
          <Link
            href={member.uuid ? `/team/${member.uuid}` : "#"}
            className="team-member-arrow"
            aria-label={member.name}
          >
            <i className="fa-solid fa-arrow-up"></i>
          </Link>
          <div className="team-member-name">{member.name}</div>
          <div className="team-member-role">{member.role}</div>
        </div>
      </div>
    </article>
  );
}
