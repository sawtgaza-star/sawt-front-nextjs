import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "@/styles/media.css";
import LegacyInit from "@/components/LegacyInit";
import MediaContent from "@/components/media/MediaContent";

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

/* /media — صوت ميديا. Server Component; every section's content comes from
   GET /pages/media, fetched in the browser by <MediaContent /> (static export:
   see lib/api/use-media-page). The page brings its own navbar (MediaNav,
   inside the hero) instead of SiteNav, and inherits SiteFooter from the (main)
   layout. Nothing on this page is hard-coded any more. */
export default function Page() {
  return (
    <div className={"sm-page " + cairo.variable}>
      <LegacyInit page="media" />
      <MediaContent />
    </div>
  );
}
