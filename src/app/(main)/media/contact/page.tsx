import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "@/styles/media.css";
import LegacyInit from "@/components/LegacyInit";
import MediaContactHero from "@/components/media/MediaContactHero";
import MediaContactSection from "@/components/media/MediaContactSection";

/* Same display face as the rest of /media — headings and the banner headline
   are Cairo, scoped to the page through the variable media.css reads. */
const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700", "900"],
  display: "swap",
  variable: "--sm-font-display",
});

export const metadata: Metadata = {
  title: "تواصل معنا | صوت ميديا",
  description:
    "تواصل مع صوت ميديا عبر واتساب أو البريد الإلكتروني لبدء مشروعك الإعلامي — تصوير وإنتاج وتصميم وتسويق رقمي.",
};

/* /media/contact — where the navbar's "ابدأ مشروعك" lands. Server Component
   throughout; the banner brings MediaNav and SiteFooter comes from the (main)
   layout. */
export default function Page() {
  return (
    <div className={"sm-page " + cairo.variable}>
      <LegacyInit page="media" />
      <MediaContactHero />
      <main>
        <MediaContactSection />
      </main>
    </div>
  );
}
