"use client";
/* The only client boundary on /team: the request for the page (the API returns
   the hero, the pills and the roster in one payload), one `lang` subscription,
   and the active filter.

   THE PILLS ARE THE API'S `majors`, and pressing one is a REQUEST, not a
   client-side filter: the slug goes to `?major=` and the API answers with that
   specialty's members — see lib/api/use-team-page. Their counts come from
   `members_count`, so a major an editor created but hasn't staffed yet still
   shows, reading (0), exactly as the payload describes it. The leading "الكل"
   pill is labelled by `filters.all_label` and asks for the roster unfiltered.

   Two loading states, because a refetch is not a first load: `page` is kept
   across one, so the hero and the pill row stay still — only the grid, the one
   thing the filter changes, falls back to bars. */

import { useState } from "react";
import TeamHero from "./TeamHero";
import TeamMemberCard from "./TeamMemberCard";
import { toCards } from "./team-data";
import { TeamFiltersSkeleton, TeamGridSkeleton } from "./TeamSkeleton";
import { useTeamPage } from "@/lib/api/use-team-page";
import { useLang } from "@/lib/use-lang";
import { localized } from "@/lib/api/pages";

/** The "الكل" pill's value — the API reads an absent `major` as "everyone". */
const ALL = "";

export default function TeamListing() {
  const [active, setActive] = useState<string>(ALL);
  const { page, loading } = useTeamPage(active);
  const { lang } = useLang();

  // nothing has arrived yet — as opposed to a filter that is still in flight
  const empty = !page;
  const members = toCards(page?.members, lang);
  const majors = Array.isArray(page?.majors) ? page.majors : [];

  /* How many cards the grid is about to hold — `members_count` for a named
     major, the whole roster for "الكل". It sizes the bars a filter press puts
     up, so the section doesn't leap to ten boxes on its way to one. */
  const expected = active
    ? (majors.find((major) => major.slug === active)?.members_count ?? 0)
    : majors.reduce((total, major) => total + (major.members_count ?? 0), 0);

  return (
    <>
      <TeamHero data={page?.hero} lang={lang} loading={empty && loading} />
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
            {empty ? (
              <TeamFiltersSkeleton />
            ) : (
              <ul className="team-filter">
                <li>
                  <button
                    type="button"
                    className={"team-tab" + (active === ALL ? " active" : "")}
                    onClick={() => setActive(ALL)}
                    aria-pressed={active === ALL}
                  >
                    <span>{localized(page?.filters?.all_label, lang)}</span>
                  </button>
                </li>
                {majors.map((major) => {
                  const value = major.slug || "";
                  return (
                    <li key={value || major.uuid}>
                      <button
                        type="button"
                        className={
                          "team-tab" + (active === value ? " active" : "")
                        }
                        onClick={() => setActive(value)}
                        aria-pressed={active === value}
                      >
                        <span>{localized(major.name, lang)}</span>
                        <span className="team-tab-count">
                          ({major.members_count ?? 0})
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}

            {loading ? (
              /* nothing is known about the roster on the very first load —
                 fall back to a grid's worth of bars */
              <TeamGridSkeleton count={empty ? 10 : expected} />
            ) : (
              <div className="team-grid">
                {members.map((member, index) => (
                  <TeamMemberCard key={member.uuid || index} member={member} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
