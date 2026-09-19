import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "@/styles/media.css";
import LegacyInit from "@/components/LegacyInit";
import MediaServiceContent from "@/components/media/MediaServiceContent";
import { fetchMediaService, fetchMediaServiceSlugs } from "@/lib/api/media-service";
import { localized } from "@/lib/api/pages";

/* Same display face as /media and /media/works — headings and the banner
   headline are Cairo, scoped to the page through the variable media.css reads. */
const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700", "900"],
  display: "swap",
  variable: "--sm-font-display",
});

/* The segment is the service's slug — GET /pages/media/services/{service}
   resolves the uuid and the slug alike, and the payload's own `path` is built
   from the slug, which is what /media's cards link to.

   The build only reads the service list to learn which pages exist, because
   `output: 'export'` pre-lists every dynamic segment; a service added after the
   deploy therefore needs a rebuild before its URL exists. Same shape as
   /news/[id]. */
export async function generateStaticParams() {
  try {
    const slugs = await fetchMediaServiceSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch (caught) {
    // The API being unreachable must not fail the build: the rest of the site
    // still exports, and this route simply has no pages this time round.
    console.warn("[media services] could not list services for the export:", caught);
    return [];
  }
}

/* Tab title = the service's name. This is the one place the build reads a
   service's content, and only for <head>; the page's own copy still comes from
   the browser's request, in the reader's language. */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const data = await fetchMediaService(slug);
    const title = localized(data?.service?.title, "ar");
    const description = localized(data?.includes?.body, "ar");
    if (title) return { title: `${title} | صوت ميديا`, description };
  } catch {
    // fall through to the section's own title
  }

  return { title: "صوت ميديا | Sawt Media" };
}

/* /media/services/[slug] — the service page behind "استكشف المزيد" on every card
   of the services deck. Server Component; every section's content comes from
   GET /pages/media/services/{slug}, fetched in the browser by
   <MediaServiceContent /> (static export: see lib/api/use-media-service).
   SiteFooter comes from the (main) layout. */
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div className={"sm-page " + cairo.variable}>
      <LegacyInit page="media" />
      <MediaServiceContent slug={slug} />
    </div>
  );
}
