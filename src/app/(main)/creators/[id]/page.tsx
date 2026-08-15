// @ts-nocheck
/* eslint-disable */
import "@/styles/creators.css";
import LegacyInit from "@/components/LegacyInit";
import CreatorProfileHero from "@/components/creators/CreatorProfileHero";
import CreatorContent from "@/components/creators/CreatorContent";
import CreatorCollaborations from "@/components/creators/CreatorCollaborations";
import CollaborationSteps from "@/components/creators/CollaborationSteps";
import JoinModal from "@/components/site/JoinModal";

/* `output: 'export'` needs every dynamic segment pre-listed. The creator ids
   are the 0..149 placeholders rendered by /creators/all (CreatorsGrid shows the
   first 10 of the same range). */
export function generateStaticParams() {
  return Array.from({ length: 150 }, (_, i) => ({ id: String(i) }));
}

/* Single content-creator detail page — reached from the hover-arrow on any
   CreatorCard (/creators/[id]). Composes the shared creators-page sections. */
export default function Page() {
  return (
    <div className="cr-page">
      <LegacyInit page="creators" />
      <CreatorProfileHero />
      <main>
        <CreatorContent />
        <CreatorCollaborations />
        <CollaborationSteps />
      </main>
      <JoinModal />
    </div>
  );
}
