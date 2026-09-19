/* creators.css first: the listing's card/pager rules live there, and news.css
   overrides some of them. */
import type { Metadata } from "next";
import "@/styles/creators.css";
import "@/styles/news.css";
import LegacyInit from "@/components/LegacyInit";
import NewsArticleContent from "@/components/news/detail/NewsArticleContent";
import { fetchAllBlogUuids, fetchBlog } from "@/lib/api/blogs";
import { localized } from "@/lib/api/pages";

/* /news/[id] — the article behind a card's "اقرأ المزيد". The segment is the
   blog's `uuid`: GET /pages/blogs/{uuid} resolves that identifier only (a
   numeric id or the slug both answer 404), so every link into an article uses
   it too.

   The article itself is fetched in the browser — see NewsArticleContent — so
   an edit is live without a deploy. The build only reads the feed to learn
   which pages exist, because `output: 'export'` pre-lists every dynamic
   segment; a post added after the deploy therefore needs a rebuild before its
   URL exists. */

export async function generateStaticParams() {
  try {
    const uuids = await fetchAllBlogUuids();
    return uuids.map((id) => ({ id }));
  } catch (caught) {
    // The API being unreachable must not fail the build: the rest of the site
    // still exports, and this route simply has no pages this time round.
    console.warn("[news] could not list articles for the export:", caught);
    return [];
  }
}

/* Tab title = the article headline. This is the one place the build reads an
   article's content, and only for <head>; the page's own copy still comes from
   the browser's request, in the reader's language. */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  try {
    const data = await fetchBlog(id);
    const title = localized(data?.blog?.title, "ar");
    const description = localized(data?.blog?.excerpt, "ar");
    if (title) return { title: `${title} | Sawt News`, description };
  } catch {
    // fall through to the listing's own title
  }

  return { title: "آخر أخبارنا | Sawt News" };
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
      <NewsArticleContent uuid={id} />
    </div>
  );
}
