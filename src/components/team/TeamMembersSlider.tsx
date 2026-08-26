"use client";
import TeamMemberCard from "./TeamMemberCard";
import type { TeamMember } from "./team-data";
import { useSnapSlider } from "@/components/media/useSnapSlider";

/* The "اعضاء الفريق" row. Desktop keeps the five-column grid; on phones the CSS
   turns the same markup into a centre-snapping track, so this leaf only has to
   say which card is currently centred (the neighbours sit back, scaled and
   dimmed, like the mock). The track opens on the second card so the section is
   first seen with a card flanked on both sides rather than parked at its edge.

   On desktop the row doesn't overflow, so every card collapses into one stop
   and `activeSlide` stays 0 — the `.active` styling is scoped to the mobile
   media query, so nothing shows there. */
export default function TeamMembersSlider({
  members,
}: {
  members: TeamMember[];
}) {
  const { trackRef, activeSlide, onScroll } = useSnapSlider(members.length, 1);

  return (
    <div className="team-members-row" ref={trackRef} onScroll={onScroll}>
      {members.map((m, i) => (
        <TeamMemberCard
          key={m.id}
          member={m}
          className={i === activeSlide ? "active" : undefined}
        />
      ))}
    </div>
  );
}
