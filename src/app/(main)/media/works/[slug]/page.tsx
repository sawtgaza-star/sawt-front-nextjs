import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Cairo } from "next/font/google";
import "@/styles/media.css";
import LegacyInit from "@/components/LegacyInit";
import MediaProjectHero from "@/components/media/MediaProjectHero";
import MediaProjectIntro from "@/components/media/MediaProjectIntro";
import MediaProjectTabs from "@/components/media/MediaProjectTabs";
import MediaProjectCta from "@/components/media/MediaProjectCta";
import { getProject, PROJECT_SLUGS } from "@/components/media/media-project-data";

/* Same display face as /media and /media/works — headings and the banner
   headline are Cairo, scoped to the page through the variable media.css reads. */
const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700", "900"],
  display: "swap",
  variable: "--sm-font-display",
});

export function generateStaticParams() {
  return PROJECT_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "صوت ميديا" };

  return {
    title: `${project.title} | صوت ميديا`,
    description: project.desc,
  };
}

/* /media/works/[slug] — the case study behind the arrow on every works card.
   Server Component; the tab bar is the one client island and SiteFooter comes
   from the (main) layout. */
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <div className={"sm-page " + cairo.variable}>
      <LegacyInit page="media" />
      <MediaProjectHero project={project} />
      <main>
        <MediaProjectIntro project={project} />
        <MediaProjectTabs project={project} />
        <MediaProjectCta />
      </main>
    </div>
  );
}
