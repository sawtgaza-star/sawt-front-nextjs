// @ts-nocheck
"use client";
/* eslint-disable */
import LegacyInit from "@/components/LegacyInit";
import HeroHeader from "@/components/home/HeroHeader";
import SoutSection from "@/components/home/SoutSection";
import LatestNews from "@/components/home/LatestNews";
import ContentCreators from "@/components/home/ContentCreators";
import PlatformSections from "@/components/home/PlatformSections";
import MidBanner from "@/components/home/MidBanner";
import RealStories from "@/components/home/RealStories";
import TeamSection from "@/components/home/TeamSection";
import JoinUs from "@/components/home/JoinUs";
import Reviews from "@/components/home/Reviews";
import SiteFooter from "@/components/site/SiteFooter";
import JoinModal from "@/components/site/JoinModal";

export default function Page() {
  return (
    <>
      <LegacyInit page="home" />
      <HeroHeader />
      <main className="my-5">
       <SoutSection />
        <LatestNews />
        <ContentCreators />
        <PlatformSections />
        <MidBanner />
        <RealStories />
        <TeamSection />
        <JoinUs />
        <Reviews />
      </main>
      <SiteFooter mobileNewsletter />
      <JoinModal />
    </>
  );
}
