import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Cairo } from "next/font/google";
import "@/styles/media.css";
import LegacyInit from "@/components/LegacyInit";
import MediaServiceHero from "@/components/media/MediaServiceHero";
import MediaServiceGallery from "@/components/media/MediaServiceGallery";
import MediaServiceIncludes from "@/components/media/MediaServiceIncludes";
import MediaServiceWorks from "@/components/media/MediaServiceWorks";
import MediaProjectCta from "@/components/media/MediaProjectCta";
import { getService, SERVICE_SLUGS } from "@/components/media/media-service-page-data";

/* Same display face as /media and /media/works — headings and the banner
   headline are Cairo, scoped to the page through the variable media.css reads. */
const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700", "900"],
  display: "swap",
  variable: "--sm-font-display",
});

export function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "صوت ميديا" };

  return {
    title: `${service.title} | صوت ميديا`,
    description: service.desc,
  };
}

/* /media/services/[slug] — the service page behind "استكشف المزيد" on every card
   of the services deck. Server Component; the coverflow is the one client
   island and SiteFooter comes from the (main) layout. */
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <div className={"sm-page " + cairo.variable}>
      <LegacyInit page="media" />
      <MediaServiceHero service={service} />
      <main>
        <MediaServiceGallery service={service} />
        <div className="container sm-sv-body">
          <MediaServiceIncludes service={service} />
          <MediaServiceWorks service={service} />
        </div>
        <MediaProjectCta />
      </main>
    </div>
  );
}
