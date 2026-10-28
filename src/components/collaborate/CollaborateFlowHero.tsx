"use client";
import { useCollaboratePage } from "@/lib/api/use-collaborate-page";
import { useLang } from "@/lib/use-lang";
import CollaborateHero from "./CollaborateHero";

/* The hero of the four flow pages (/collaborate/creator, /funding, /other,
   /partnership): the SAME banner as /collaborate — its backdrop and copy from
   GET /pages/collaborate's `hero` block — with the page's own crumb added.
   Without this they rendered <CollaborateHero /> with no data, i.e. the
   bundled collage. While the request is in flight the hero shows the flat
   loading ground and bars (CollaborateHero's `loading`), so no built-in
   picture flashes first. */
export default function CollaborateFlowHero({
  crumb,
  crumbKey,
}: {
  crumb: string;
  crumbKey: string;
}) {
  const { page, loading } = useCollaboratePage();
  const { lang } = useLang();

  return (
    <CollaborateHero
      crumb={crumb}
      crumbKey={crumbKey}
      data={page?.hero}
      lang={lang}
      loading={loading}
    />
  );
}
