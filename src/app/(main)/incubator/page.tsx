import type { Metadata } from "next";
import "@/styles/incubator.css";
/* the course dialog's layer (crs-en-*) — the coming-soon cards' "انضم لقائمة
   الانتظار" opens it here too; every rule in it is crs- scoped */
import "@/styles/course.css";
import LegacyInit from "@/components/LegacyInit";
import IncubatorContent from "@/components/incubator/IncubatorContent";

export const metadata: Metadata = {
  title: "حاضنة صوت | Sawt Incubator",
  description:
    "حاضنة صوت — بيئة تدريبية تجمع بين التعلم العملي، والإرشاد، والمشاريع الواقعية لتساعدك على صناعة محتوى يترك أثرًا.",
};

/* /incubator — حاضنة صوت. Server Component; every section's content comes
   from GET /pages/incubator, fetched in the browser by <IncubatorContent />
   (static export: see lib/api/use-incubator-page). The page brings its own
   navbar (IncubatorNav, inside the hero) instead of SiteNav, and inherits
   SiteFooter from the (main) layout. */
export default function Page() {
  return (
    <div className="inc-page">
      <LegacyInit page="incubator" />
      <IncubatorContent />
    </div>
  );
}
