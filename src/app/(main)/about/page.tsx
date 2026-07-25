// @ts-nocheck
/* eslint-disable */
import LegacyInit from "@/components/LegacyInit";
import SiteFooter from "@/components/site/SiteFooter";
import AboutHero from "./_components/AboutHero";
import AboutIntro from "./_components/AboutIntro";
import CoreValues from "./_components/CoreValues";
import AboutPlatform from "./_components/AboutPlatform";
import SawtStory from "./_components/SawtStory";
import JoinUs from "./_components/JoinUs";

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
      <SiteFooter /> {/*  Modal  */} {/*  .....................  */}
    </>
  );
}
