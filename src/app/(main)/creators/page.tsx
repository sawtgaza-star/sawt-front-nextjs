// @ts-nocheck
"use client";
/* eslint-disable */
import "@/styles/creators.css";
import LegacyInit from "@/components/LegacyInit";
import CreatorsHero from "@/components/creators/CreatorsHero";
import CreatorsGrid from "@/components/creators/CreatorsGrid";
import CreatorsStats from "@/components/creators/CreatorsStats";
import PartnerCompanies from "@/components/creators/PartnerCompanies";
import CollaborationSteps from "@/components/creators/CollaborationSteps";
import CreatorsFaq from "@/components/creators/CreatorsFaq";
import SiteFooter from "@/components/site/SiteFooter";
import JoinUs from "@/components/home/JoinUs";
import JoinModal from "@/components/site/JoinModal";

export default function Page() {
  return (
    <div className="cr-page">
      <LegacyInit page="creators" />
      <CreatorsHero />
      <main>
        <CreatorsGrid />
        <CreatorsStats />
         <JoinUs />
        <PartnerCompanies />
        <CollaborationSteps />
       
        <CreatorsFaq />
      </main>
      <SiteFooter />
      <JoinModal />
    </div>
  );
}
