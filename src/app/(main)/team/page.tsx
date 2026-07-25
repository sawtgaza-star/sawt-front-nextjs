"use client";
import { useState } from "react";
import "@/styles/creators.css";
import "@/styles/team.css";
import LegacyInit from "@/components/LegacyInit";
import TeamHero from "@/components/team/TeamHero";
import TeamMemberCard from "@/components/team/TeamMemberCard";
import {
  TEAM_MEMBERS,
  TEAM_FILTERS,
  type TeamFilterValue,
} from "@/components/team/team-data";
import JoinModal from "@/components/site/JoinModal";

export default function Page() {
  const [active, setActive] = useState<TeamFilterValue>("all");

  const visible =
    active === "all"
      ? TEAM_MEMBERS
      : TEAM_MEMBERS.filter((m) => m.category === active);

  const countFor = (value: TeamFilterValue) =>
    value === "all"
      ? TEAM_MEMBERS.length
      : TEAM_MEMBERS.filter((m) => m.category === value).length;

  return (
    <div className="team-page">
      <LegacyInit page="team" />
      <TeamHero />
      <main>
        <section className="team-grid-section position-relative">
          <img
            src="/assets/images/leaf_cutout.png"
            className="olive-branch branch-team-right"
            alt="Olive Branch"
          />
          <img
            src="/assets/images/leaf_cutout.png"
            className="olive-branch branch-team-left"
            alt="Olive Branch"
          />

          <div className="container">
            <ul className="team-filter">
              {TEAM_FILTERS.map((f) => (
                <li key={f.value}>
                  <button
                    type="button"
                    className={
                      "team-tab" + (active === f.value ? " active" : "")
                    }
                    onClick={() => setActive(f.value)}
                    aria-pressed={active === f.value}
                  >
                    <span data-i18n={f.key}>{f.label}</span>
                    {f.value !== "all" && (
                      <span className="team-tab-count">
                        ({countFor(f.value)})
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>

            <div className="team-grid">
              {visible.map((m) => (
                <TeamMemberCard key={m.id} member={m} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <JoinModal />
    </div>
  );
}
