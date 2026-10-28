"use client";
/* The only client boundary on /team/{uuid}: one request for the profile (the
   API answers with its own breadcrumb hero, the member, the wording around it
   and the "اعضاء الفريق" row in a single payload) and one `lang`
   subscription.

   The profile is fetched in the browser, so an edit is live without a deploy;
   the build only reads the roster to learn which pages exist — see the note in
   team/[id].

   A uuid the API doesn't know renders the page without a profile: notFound()
   can't be reached from a client component on a static export, and a 404 shell
   would be worse than the header plus the rest of the team.

   `intro` IS in the payload and is NOT rendered: it is a shared line about the
   team ("في صوت، كل فرد في الفريق يحمل رؤية مشتركة…") and the profile design
   has no place for it — no `.team-intro` rule exists in team.css. Giving it
   one would be a redesign, not a join. */

import TeamHero from "./TeamHero";
import TeamMemberProfile from "./TeamMemberProfile";
import TeamMembersSection from "./TeamMembersSection";
import { toCards } from "./team-data";
import { TeamProfileSkeleton } from "./TeamSkeleton";
import { useTeamMember, useTeamPage } from "@/lib/api/use-team-page";
import { useLang } from "@/lib/use-lang";
import { localized } from "@/lib/api/pages";
import { useRouteSegment } from "@/lib/use-route-segment";

export default function TeamDetail({ uuid: segment }: { uuid: string }) {
  const uuid = useRouteSegment(segment);
  const { page, loading } = useTeamMember(uuid);
  /* the whole roster: the profile's own `related.members` is only a handful */
  const { page: roster, loading: rosterLoading } = useTeamPage();
  const { lang } = useLang();

  const related = page?.related;
  /* "أعضاء الفريق" under the profile is the WHOLE current team — every
     member of GET /pages/team, not just the few the profile payload lists in
     `related.members` (that list stands in only if the roster request
     fails). A member who has left Sawt (`status` other than "active") is
     left out, and so is the member being viewed. */
  const current = page?.member?.uuid || uuid;
  const pool = roster?.members?.length ? roster.members : related?.members;
  const members = toCards(
    pool?.filter((m) => m.status === "active" && m.uuid !== current),
    lang,
  );

  return (
    <>
      <TeamHero data={page?.hero} lang={lang} loading={loading} />
      <main>
        {loading ? (
          <TeamProfileSkeleton />
        ) : page?.member ? (
          <TeamMemberProfile
            member={page.member}
            labels={page.labels}
            micBackground={page.mic_background_url}
            lang={lang}
          />
        ) : null}
        <TeamMembersSection
          members={members}
          title={localized(related?.title, lang)}
          viewAllLabel={localized(related?.view_all?.label, lang)}
          viewAllHref={related?.view_all?.url || "/team"}
          loading={loading || rosterLoading}
        />
      </main>
    </>
  );
}
