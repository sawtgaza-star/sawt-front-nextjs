/* Same CSS pair, in the same order, as /news/[id]: creators.css first (card /
   pager rules), news.css on top of it. That is what makes the story page
   pixel-identical to the news article page, desktop and mobile. */
import type { Metadata } from "next";
import "@/styles/creators.css";
import "@/styles/news.css";
import LegacyInit from "@/components/LegacyInit";
import NewsHero from "@/components/news/NewsHero";
import NewsShareCard from "@/components/news/detail/NewsShareCard";
import NewsArticleHead from "@/components/news/detail/NewsArticleHead";
import NewsGallery from "@/components/news/detail/NewsGallery";
import NewsBody from "@/components/news/detail/NewsBody";
import RelatedNews from "@/components/news/detail/RelatedNews";
import StoryCard from "@/components/stories/StoryCard";
import {
  RELATED_STORIES,
  STORY_PARAMS,
  getStory,
} from "@/components/stories/story-data";
import {
  STORIES_PARENT,
  STORIES_HERO,
  STORIES_RELATED_HEADING,
  STORIES_RELATED_MORE,
} from "@/components/stories/story-chrome";

/* /stories/[id] — the page behind the arrow on a `.rs-card` and behind
   "اقرأ المزيد" on the /stories listing. It is the news article page with
   story copy: identical components, identical layout ([content | aside] grid
   with the narrow share/donate column on the outside), identical stylesheet. */

/* `output: 'export'` needs every dynamic segment pre-listed — the two named
   slugs the sliders link to, plus every listing id. */
export function generateStaticParams() {
  return STORY_PARAMS.map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const { article } = getStory(id);

  return {
    title: `${article.title} | Sawt`,
    description: article.desc,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const story = getStory(id);
  const { article } = story;

  return (
    <div className="news-page nws-detail">
      <LegacyInit page="news" />
      <NewsHero
        article={{ titleKey: story.titleKey, title: story.title }}
        parent={STORIES_PARENT}
        hero={STORIES_HERO}
      />
      <main className="nws-main">
        <div className="container">
          <div className="nws-layout">
            <div className="nws-content">
              <NewsArticleHead article={article} />
              <NewsGallery images={article.gallery} />
              <NewsBody article={article} />
            </div>
            <aside className="nws-aside">
              <NewsShareCard />
            </aside>
          </div>
        </div>
      </main>
      {/* same strip as /news/[id] — "قصص ذات صلة" + "عرض جميع القصص" →
          /stories — carrying the home slider's poster cards */}
      <RelatedNews heading={STORIES_RELATED_HEADING} more={STORIES_RELATED_MORE}>
        {RELATED_STORIES.map((story) => (
          <div className="item" key={story.id}>
            <StoryCard story={story} />
          </div>
        ))}
      </RelatedNews>
    </div>
  );
}
