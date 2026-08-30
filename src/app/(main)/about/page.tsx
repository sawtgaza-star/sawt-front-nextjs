// @ts-nocheck
/* eslint-disable */
import type { Metadata } from "next";
import LegacyInit from "@/components/LegacyInit";
import AboutContent from "./_components/AboutContent";

export const metadata: Metadata = {
  title: "من نحن | About Sawt",
  description:
    "صوت منصة إعلامية مستقلة تُوثّق الواقع وتحكي قصص الناس، لتكون صوتاً لمن لا صوت له.",
};

/* Server Component — every section's content comes from GET /pages/about,
   fetched in the browser by <AboutContent /> (static export: see
   lib/api/use-about-page). Nothing on this page is hard-coded any more. */
export default function Page() {
  return (
    <>
      <LegacyInit page="about" />
      <AboutContent />
    </>
  );
}
