// @ts-nocheck
/* eslint-disable */
import LegacyInit from "@/components/LegacyInit";
import AboutHero from "./_components/AboutHero";
import AboutIntro from "./_components/AboutIntro";
import CoreValues from "./_components/CoreValues";
import AboutPlatform from "./_components/AboutPlatform";
import SawtStory from "./_components/SawtStory";
import JoinUs from "./_components/JoinUs";
import FooterNewsletterMobile from "@/components/site/footer/FooterNewsletterMobile";

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
