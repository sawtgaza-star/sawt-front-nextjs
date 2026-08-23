import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "@/styles/media.css";
import LegacyInit from "@/components/LegacyInit";
import MediaHero from "@/components/media/MediaHero";
import MediaAbout from "@/components/media/MediaAbout";
import MediaStats from "@/components/media/MediaStats";
import MediaServices from "@/components/media/MediaServices";
import MediaWhy from "@/components/media/MediaWhy";
import MediaProcess from "@/components/media/MediaProcess";
import MediaWorks from "@/components/media/MediaWorks";
import MediaSectors from "@/components/media/MediaSectors";
import MediaPartners from "@/components/media/MediaPartners";
import MediaConsult from "@/components/media/MediaConsult";
import MediaPackages from "@/components/media/MediaPackages";
import MediaTestimonials from "@/components/media/MediaTestimonials";
import MediaFaq from "@/components/media/MediaFaq";

/* The design sets every heading and the big watermark numbers in Cairo. It is
   scoped to this page (the rest of the site stays on Rubik) via the variable
   below, which media.css reads — self-hosted by next/font, no runtime CDN. */
const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700", "900"],
  display: "swap",
  variable: "--sm-font-display",
});

export const metadata: Metadata = {
  title: "صوت ميديا | Sawt Media",
  description:
    "صوت ميديا — وكالة إعلامية إبداعية متكاملة تقدم حلولاً شاملة من الاستراتيجية إلى الإنتاج والنشر.",
};

/* /media — صوت ميديا. Server Component; the page brings its own navbar
   (MediaNav) instead of SiteNav, and inherits SiteFooter from the (main)
   layout. Built section by section from the design mockups. */
export default function Page() {
  return (
    <div className={"sm-page " + cairo.variable}>
      <LegacyInit page="media" />
      <MediaHero />
      <main>
        <MediaAbout />
        <MediaStats />
        <MediaServices />
        <MediaWhy />
        <MediaProcess />
        <MediaWorks />
        <MediaSectors />
        <MediaPartners />
        <MediaConsult />
        <MediaPackages />
        <MediaTestimonials />
        <MediaFaq />
      </main>
    </div>
  );
}
