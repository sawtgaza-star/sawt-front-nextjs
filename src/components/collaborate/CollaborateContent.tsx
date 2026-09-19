"use client";
/* The only client boundary on /collaborate: one request for the whole page
   (the API returns both blocks in a single payload) and one `lang`
   subscription, handed down as props so the hero and the picker stay plain
   functions of their own block.

   The four flow pages (/collaborate/creator …) render <CollaborateHero /> on
   their own, without this — they show the same breadcrumb shell and the hero's
   built-in copy, and make no request of their own.

   An outage leaves `page` null: the hero falls back to its built-in copy and
   the picker to the built-in four, so the flows stay reachable — see
   collaborate-types-data. */

import { useCollaboratePage } from "@/lib/api/use-collaborate-page";
import { useLang } from "@/lib/use-lang";
import CollaborateHero from "./CollaborateHero";
import CollaborateTypes from "./CollaborateTypes";
import { resolveCollaborateTypes } from "./collaborate-types-data";

export default function CollaborateContent() {
  const { page, loading } = useCollaboratePage();
  const { lang } = useLang();

  return (
    <>
      <CollaborateHero data={page?.hero} lang={lang} loading={loading} />
      <main>
        <CollaborateTypes
          types={resolveCollaborateTypes(page?.types, lang)}
          loading={loading}
        />
      </main>
    </>
  );
}
