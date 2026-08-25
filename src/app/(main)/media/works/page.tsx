import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "@/styles/media.css";
import LegacyInit from "@/components/LegacyInit";
import MediaWorksHero from "@/components/media/MediaWorksHero";
import MediaWorksBrowser from "@/components/media/MediaWorksBrowser";

/* Same display face as /media — headings and the banner headline are Cairo,
   scoped to the page through the variable media.css reads. */
const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700", "900"],
  display: "swap",
  variable: "--sm-font-display",
});

export const metadata: Metadata = {
  title: "أعمالنا | صوت ميديا",
  description:
    "معرض أعمال صوت ميديا — مشاريع التصوير والتصميم والإنتاج والتسويق الرقمي، مرتبة حسب القسم والتخصص.",
};

/* /media/works — the full portfolio behind "شاهد المزيد من اعمالنا". Server
   Component; the banner brings MediaNav, the filterable grid is the one client
   island, and SiteFooter comes from the (main) layout. */
export default function Page() {
  return (
    <div className={"sm-page " + cairo.variable}>
      <LegacyInit page="media" />
      <MediaWorksHero />
      <main>
        <MediaWorksBrowser />
      </main>
    </div>
  );
}
