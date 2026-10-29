import Link from "next/link";
import type { TeamCardMember } from "./team-data";
import TeamMemberPop from "./TeamMemberPop";

/* Team member card: portrait photo with a green name/role badge overlaid near
   the bottom (matches the /team mock). The circular arrow links to the
   member's profile — /team/{uuid}, the identifier the detail endpoint resolves
   and the segment the route is exported under (see lib/api/team).

   No `data-i18n` on the name or the role: both arrive from the API in both
   languages and the caller has already picked one, so the DOM translator has
   nothing to do here — and nothing of React's to overwrite.

   `linkable={false}` (the former members on /team) drops the arrow, and with
   it the only way into the profile — the card-wide click is that link's
   stretched ::after (see card-links.css). */
export default function TeamMemberCard({
  member,
  className,
  linkable = true,
}: {
  member: TeamCardMember;
  className?: string;
  linkable?: boolean;
}) {
  return (
    <article
      className={
        "team-member-card" +
        (linkable ? "" : " team-member-card--static") +
        (className ? " " + className : "")
      }
    >
      <div className="team-member-photo">
        {/* not draggable: the phone slider is dragged by mouse (TeamMembersSlider) */}
        <img src={member.photo} alt={member.name} draggable={false} />
        <div className="team-member-badge">
          {linkable ? (
            <Link
              href={member.uuid ? `/team/${member.uuid}` : "#"}
              className="team-member-arrow"
              aria-label={member.name}
            >
              <i className="fa-solid fa-arrow-up"></i>
            </Link>
          ) : null}
          <div className="team-member-name">{member.name}</div>
          <div className="team-member-role">{member.role}</div>
        </div>
      </div>
      {/* hover: the head rises out of the frame (see TeamMemberPop) */}
      <TeamMemberPop src={member.photo} />
    </article>
  );
}
