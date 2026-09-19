/* Same CSS pair, in the same order, as /news/[id]: creators.css first (card /
   pager rules), news.css on top of it. That is what makes the story page
   pixel-identical to the news article page, desktop and mobile. */
import type { Metadata } from "next";
import "@/styles/creators.css";
import "@/styles/news.css";
import LegacyInit from "@/components/LegacyInit";
import StoryArticleContent from "@/components/stories/StoryArticleContent";
import { fetchAllStoryUuids, fetchStory } from "@/lib/api/stories";
import { localized } from "@/lib/api/pages";

/* /stories/[id] — the page behind the arrow on a `.rs-card` and behind the
   listing's cards. The segment is the story's `uuid`: GET /pages/stories/{uuid}
   resolves that identifier only, so every link into a story uses it too.

   The story itself is fetched in the browser — see StoryArticleContent — so an
   edit is live without a deploy. The build only reads the feed to learn which
   pages exist, because `output: 'export'` pre-lists every dynamic segment; a
   story added after the deploy therefore needs a rebuild before its URL
   exists. */

export async function generateStaticParams() {
  try {
    const uuids = await fetchAllStoryUuids();
    return uuids.map((id) => ({ id }));
  } catch (caught) {
    // The API being unreachable must not fail the build: the rest of the site
    // still exports, and this route simply has no pages this time round.
    console.warn("[stories] could not list stories for the export:", caught);
    return [];
  }
}

/* Tab title = the story's headline. This is the one place the build reads a
   story's content, and only for <head>; the page's own copy still comes from
   the browser's request, in the reader's language. */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  try {
    const data = await fetchStory(id);
    const title = localized(data?.story?.title, "ar");
    const description = localized(data?.story?.excerpt, "ar");
    if (title) return { title: `${title} | Sawt`, description };
  } catch {
    // fall through to the listing's own title
  }

  return { title: "قصص النجاح | Sawt" };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="news-page nws-detail">
      <LegacyInit page="news" />
      <StoryArticleContent uuid={id} />
    </div>
  );
}
