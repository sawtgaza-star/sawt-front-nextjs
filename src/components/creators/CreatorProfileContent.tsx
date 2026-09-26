"use client";
/* The only data boundary on /creators/[id]: one request for the whole profile
   (GET /pages/creators/{id}) and one `lang` subscription, both handed down as
   props so the sections stay plain functions of their own block.

   The first render, server prerender and hydration alike, shows the hero with
   bars in place of its copy and the profile card, and <CreatorProfileSkeleton />
   for every section below it; they give way to the real
   thing when the response lands, or to a page that is just its hero if the
   request fails — see lib/api/use-creator-profile.

   <CreatorProfileHero /> is outside the loading branch on purpose: <SiteNav />
   lives inside it and initHeaderPin() wraps its bar right after mount.

   RE-RUNNING THE TRANSLATOR: the few `data-i18n` keys left on this page are
   chrome the API doesn't send (the collaboration step titles), and they only
   appear once the payload has landed — so the walk is repeated then, and after
   every language toggle, exactly as on /creators (see CreatorsContent). */

import { useEffect } from "react";
import { useCreatorProfile } from "@/lib/api/use-creator-profile";
import { useLang } from "@/lib/use-lang";
import { initTranslate } from "@/lib/translations";
import CreatorProfileHero from "./CreatorProfileHero";
import CreatorContent from "./CreatorContent";
import CreatorCollaborations from "./CreatorCollaborations";
import CollaborationSteps from "./CollaborationSteps";
import CreatorProfileSkeleton from "./CreatorProfileSkeleton";

export default function CreatorProfileContent({ creator }: { creator: string }) {
  const { page, loading } = useCreatorProfile(creator);
  const { lang } = useLang();

  useEffect(() => {
    if (loading) return;
    initTranslate();
  }, [loading, lang]);

  /* The export's <title> was baked at build time; name the creator once known. */
  const name = (page?.creator?.name || "").trim();
  useEffect(() => {
    if (name) document.title = `${name} | Sawt Creator`;
  }, [name]);

  return (
    <>
      <CreatorProfileHero
        hero={page?.hero}
        creator={page?.creator}
        labels={page?.labels}
        lang={lang}
        loading={loading}
      />
      <main>
        {loading ? (
          <CreatorProfileSkeleton />
        ) : !page ? null : (
          <>
            <CreatorContent content={page.content} creator={page.creator} lang={lang} />
            <CreatorCollaborations data={page.collaborations} labels={page.labels} lang={lang} />
            {page.collaboration ? (
              <CollaborationSteps data={page.collaboration} lang={lang} />
            ) : null}
          </>
        )}
      </main>
    </>
  );
}
