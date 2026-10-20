import type { Metadata } from "next";
import "@/styles/creators.css";
import LegacyInit from "@/components/LegacyInit";
import CreatorProfileContent from "@/components/creators/CreatorProfileContent";
import JoinModal from "@/components/site/JoinModal";
import { fetchCreatorIds, fetchCreatorProfile } from "@/lib/api/creator-profile";
import { localized } from "@/lib/api/pages";
import { withFallback } from "@/lib/route-segment";

/* The segment is the creator's uuid — what every CreatorCard's hover arrow
   links to (creatorSlug in lib/api/creator-profile); GET /pages/creators/{creator} answers the id and the uuid
   alike.

   The build only reads the roster to learn which profiles exist, because
   `output: 'export'` pre-lists every dynamic segment; a creator added after
   the deploy therefore has no file of its own until the next deploy; it is served by
   the fallback page meanwhile (lib/route-segment). Same shape as
   /courses/[id]. */
/* Only the pre-listed segments exist (output: export). Without this, `npm run
   dev` throws "missing param in generateStaticParams()" for an unknown one
   instead of showing the site 404 (global-not-found), as the export does. */
export const dynamicParams = false;

export async function generateStaticParams() {
  try {
    const ids = await fetchCreatorIds();
    return withFallback("id", ids.map((id) => ({ id })));
  } catch (caught) {
    // The API being unreachable must not fail the build: the rest of the site
    // still exports, and this route only gets its fallback page this time round.
    console.warn("[creators] could not list creators for the export:", caught);
    return withFallback("id", []);
  }
}

/* Tab title = the creator's name. This is the one place the build reads a
   profile, and only for <head>; the page's own copy still comes from the
   browser's request, in the reader's language. */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  try {
    const page = await fetchCreatorProfile(id);
    const name = (page?.creator?.name || "").trim();
    const bio = localized(page?.creator?.bio, "ar");
    if (name) return { title: `${name} | Sawt Creator`, description: bio || undefined };
  } catch {
    // fall through to the section's own title
  }

  return {
    title: "ملف صانع المحتوى | Sawt Creator",
    description:
      "تعرّف على صانع المحتوى في منصة صوت — أعماله وتعاوناته وخطوات التعاون معه.",
  };
}

/* /creators/[id] — a single content creator's profile, reached from the
   hover-arrow on any CreatorCard. Server Component; every section's content
   comes from GET /pages/creators/{id}, fetched in the browser by
   <CreatorProfileContent /> (static export: see lib/api/use-creator-profile). */
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="cr-page">
      <LegacyInit page="creators" />
      <CreatorProfileContent creator={id} />
      <JoinModal />
    </div>
  );
}
