import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "@/styles/media.css";
import LegacyInit from "@/components/LegacyInit";
import MediaWorkContent from "@/components/media/MediaWorkContent";
import { fetchMediaWork, fetchMediaWorkSlugs } from "@/lib/api/media-work";
import { localized } from "@/lib/api/pages";

/* Same display face as /media and /media/works — headings and the banner
   headline are Cairo, scoped to the page through the variable media.css reads. */
const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700", "900"],
  display: "swap",
  variable: "--sm-font-display",
});

/* The segment is the project's slug, which is what the listing and /media's
   works wall both link to. The build only reads the portfolio to learn which
   pages exist, because `output: 'export'` pre-lists every dynamic segment; a
   project added after the deploy therefore needs a rebuild before its URL
   exists. Same shape as /news/[id] and the service pages. */
export async function generateStaticParams() {
  try {
    const slugs = await fetchMediaWorkSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch (caught) {
    // The API being unreachable must not fail the build: the rest of the site
    // still exports, and this route simply has no pages this time round.
    console.warn("[media works] could not list projects for the export:", caught);
    return [];
  }
}

/* Tab title = the project's name. This is the one place the build reads a case
   study's content, and only for <head>; the page's own copy still comes from
   the browser's request, in the reader's language. */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const data = await fetchMediaWork(slug);
    const title = localized(data?.work?.title, "ar");
    const description = localized(data?.work?.summary, "ar");
    if (title) return { title: `${title} | صوت ميديا`, description };
  } catch {
    // fall through to the section's own title
  }

  return { title: "أعمالنا | صوت ميديا" };
}

/* /media/works/[slug] — the case study behind the arrow on every works card.
   Server Component; every block comes from GET /pages/media/works/{slug},
   fetched in the browser by <MediaWorkContent /> (static export: see
   lib/api/use-media-work). SiteFooter comes from the (main) layout. */
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <div className={"sm-page " + cairo.variable}>
      <LegacyInit page="media" />
      <MediaWorkContent slug={slug} />
    </div>
  );
}
