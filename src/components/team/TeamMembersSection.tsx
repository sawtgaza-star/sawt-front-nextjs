import Link from "next/link";
import TeamMembersSlider from "./TeamMembersSlider";
import type { TeamCardMember } from "./team-data";
import { splitHeading } from "./team-text";
import { TeamMembersRowSkeleton } from "./TeamSkeleton";

/* "اعضاء الفريق" block on the member detail page: a centred, decorated heading,
   a row of member cards, and a "عرض الكل" link back to the full roster.

   All three come from the profile response's `related` block — the heading,
   the link's label AND its destination (`view_all.url`, "/team"). The accent
   falls on the heading's last word; see splitHeading in ./team-text. */
export default function TeamMembersSection({
  members,
  title = "",
  viewAllLabel = "",
  viewAllHref = "/team",
  loading = false,
}: {
  members: TeamCardMember[];
  title?: string;
  viewAllLabel?: string;
  viewAllHref?: string;
  /** The payload is still on its way — hold the row's height with bars. */
  loading?: boolean;
}) {
  const [titleHead, titleTail] = splitHeading(title, 1);

  return (
    <section className="team-members-section">
      <div className="container">
        {title ? (
          <h2 className="team-members-title">
            <span>{titleHead}</span>{" "}
            <span className="team-members-highlight">{titleTail}</span>
          </h2>
        ) : null}

        {loading ? (
          <TeamMembersRowSkeleton />
        ) : (
          <TeamMembersSlider members={members} />
        )}

        {viewAllLabel ? (
          <div className="team-members-more">
            <Link href={viewAllHref}>
              <span>{viewAllLabel}</span>
              <i className="fa-solid fa-angle-left"></i>
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
