// @ts-nocheck
/* eslint-disable */
import type { Metadata } from "next";
import LegacyInit from "@/components/LegacyInit";
import AboutHero from "./_components/AboutHero";
import AboutIntro from "./_components/AboutIntro";
import CoreValues from "./_components/CoreValues";
import AboutPlatform from "./_components/AboutPlatform";
import SawtStory from "./_components/SawtStory";
import JoinUs from "./_components/JoinUs";
import FooterNewsletterMobile from "@/components/site/footer/FooterNewsletterMobile";

export const metadata: Metadata = {
  title: "من نحن | About Sawt",
  description:
    "صوت منصة إعلامية مستقلة تُوثّق الواقع وتحكي قصص الناس، لتكون صوتاً لمن لا صوت له.",
};

export default function Page() {
  return (
    <>
      <LegacyInit page="about" />
      <AboutHero />
      <AboutIntro />
      <CoreValues />
      <AboutPlatform />
      <SawtStory />
      <JoinUs />
      {/* mobile-only newsletter card, directly above the footer (as on home) */}
      <FooterNewsletterMobile />
    </>
  );
}
