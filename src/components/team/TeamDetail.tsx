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
import { useTeamMember } from "@/lib/api/use-team-page";
import { useLang } from "@/lib/use-lang";
import { localized } from "@/lib/api/pages";

export default function TeamDetail({ uuid }: { uuid: string }) {
  const { page, loading } = useTeamMember(uuid);
  const { lang } = useLang();

  const related = page?.related;
  const members = toCards(related?.members, lang);

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
            lang={lang}
          />
        ) : null}
        <TeamMembersSection
          members={members}
          title={localized(related?.title, lang)}
          viewAllLabel={localized(related?.view_all?.label, lang)}
          viewAllHref={related?.view_all?.url || "/team"}
          loading={loading}
        />
      </main>
    </>
  );
}
