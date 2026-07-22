// @ts-nocheck
"use client";
/* eslint-disable */
import "@/styles/creators.css";
import LegacyInit from "@/components/LegacyInit";
import CreatorProfileHero from "@/components/creators/CreatorProfileHero";
import CreatorContent from "@/components/creators/CreatorContent";
import CreatorCollaborations from "@/components/creators/CreatorCollaborations";
import CollaborationSteps from "@/components/creators/CollaborationSteps";
import SiteFooter from "@/components/site/SiteFooter";
import JoinModal from "@/components/site/JoinModal";

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
      <SiteFooter />
      <JoinModal />
    </div>
  );
}
