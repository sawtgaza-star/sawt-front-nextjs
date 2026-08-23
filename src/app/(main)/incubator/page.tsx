import type { Metadata } from "next";
import "@/styles/incubator.css";
import LegacyInit from "@/components/LegacyInit";
import IncubatorHero from "@/components/incubator/IncubatorHero";
import WhyIncubator from "@/components/incubator/WhyIncubator";
import PopularCourses from "@/components/incubator/PopularCourses";
import ExpertsTeam from "@/components/incubator/ExpertsTeam";
import SponsorStudents from "@/components/incubator/SponsorStudents";
import LatestEvents from "@/components/incubator/LatestEvents";
import IncubatorAlbum from "@/components/incubator/IncubatorAlbum";
import IncubatorFaq from "@/components/incubator/IncubatorFaq";
import GraduatesPartners from "@/components/incubator/GraduatesPartners";
import IncubatorJoin from "@/components/incubator/IncubatorJoin";
import IncubatorTestimonials from "@/components/incubator/IncubatorTestimonials";

export const metadata: Metadata = {
  title: "حاضنة صوت | Sawt Incubator",
  description:
    "حاضنة صوت — بيئة تدريبية تجمع بين التعلم العملي، والإرشاد، والمشاريع الواقعية لتساعدك على صناعة محتوى يترك أثرًا.",
};

/* /incubator — حاضنة صوت. Server Component; the page brings its own navbar
   (IncubatorNav) instead of SiteNav, and inherits SiteFooter from the (main)
   layout. Built section by section from the design mockups. */
export default function Page() {
  return (
    <div className="inc-page">
      <LegacyInit page="incubator" />
      <IncubatorHero />
      <main>
        <WhyIncubator />
        <PopularCourses />
        <SponsorStudents />
        <LatestEvents />
        <IncubatorAlbum />
        <ExpertsTeam />
        <IncubatorFaq />
        <GraduatesPartners />
        <IncubatorJoin />
        <IncubatorTestimonials />
      </main>
    </div>
  );
}
