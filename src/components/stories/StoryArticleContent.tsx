"use client";
import NewsHero from "@/components/news/NewsHero";
import NewsShareCard from "@/components/news/detail/NewsShareCard";
import NewsArticleHead from "@/components/news/detail/NewsArticleHead";
import NewsGallery from "@/components/news/detail/NewsGallery";
import NewsBody from "@/components/news/detail/NewsBody";
import RelatedNews from "@/components/news/detail/RelatedNews";
import StoryCard from "./StoryCard";
import { NewsArticleSkeleton } from "@/components/news/NewsSkeleton";
import { storyCards } from "./story-cards";
import { storyArticle } from "./story-article";
import { STORIES_PARENT } from "./story-chrome";
import { useStory } from "@/lib/api/use-stories";
import { useLang } from "@/lib/use-lang";
import { localized } from "@/lib/api/pages";
import { splitHeading } from "@/components/home/home-text";

/* Everything /stories/{uuid} shows, from GET /pages/stories/{uuid}: the
   breadcrumb header, the story, and the "قصص ذات صلة" strip — one request
   carries all three (`hero`, `story`, `related`).

   It is the news article page with story copy: identical components, identical
   layout ([content | aside] grid with the narrow share/donate column on the
   outside), identical stylesheet — the same arrangement NewsArticleContent
   renders, and for the same reasons. The client boundary is here rather than
   on the page so the route file keeps its `generateStaticParams` /
   `generateMetadata`, which the static export needs; the header renders
   throughout, with the static chrome until the payload's own arrives, because
   SiteNav lives inside it.

   The related strip's heading arrives as one line ("قصص ذات صلة") where the
   markup wants two — the last word is the olive one — so it is split the way
   the home page splits its own headings. Its cards are the poster `.rs-card`,
   passed as children; RelatedNews renders NewsCards otherwise.

   A story that no longer exists (the uuid 404s) settles into the header with
   an empty page under it — the same outcome as an outage, and the same as
   everywhere else on the site: the error is logged, not surfaced. */
export default function StoryArticleContent({ uuid }: { uuid: string }) {
  const { data, loading } = useStory(uuid);
  const { lang } = useLang();

  const hero = data?.hero;
  const heroTitle = localized(hero?.title, lang);
  const heroDesc = localized(hero?.description, lang);

  const story = data?.story;
  const article = story ? storyArticle(story, lang) : null;
  const crumb = localized(story?.breadcrumb?.current, lang) || article?.title;
  const parentLabel = localized(story?.breadcrumb?.stories, lang);

  const related = data?.related;
  const relatedItems = storyCards(related?.items, lang);
  const relatedTitle = localized(related?.title, lang);
  const [relatedPre, relatedHighlight] = splitHeading(relatedTitle, 1);
  const relatedSub = localized(related?.subtitle, lang);
  const viewAll = localized(related?.view_all?.label, lang);

  return (
    <>
      <NewsHero
        article={crumb ? { title: crumb } : undefined}
        parent={
          parentLabel
            ? { href: STORIES_PARENT.href, title: parentLabel }
            : STORIES_PARENT
        }
        hero={{ title: heroTitle, desc: heroDesc }}
        image={hero?.image_url}
        loading={loading}
      />
      <main className="nws-main">
        <div className="container">
          <div className="nws-layout">
            <div className="nws-content">
              {loading ? <NewsArticleSkeleton /> : null}
              {article ? (
                <>
                  <NewsArticleHead article={article} />
                  <NewsGallery images={article.gallery} />
                  <NewsBody article={article} />
                </>
              ) : null}
            </div>
            <aside className="nws-aside">
              <NewsShareCard />
            </aside>
          </div>
        </div>
      </main>
      {relatedItems.length ? (
        <RelatedNews
          heading={{
            pre: relatedPre,
            highlight: relatedHighlight,
            sub: relatedSub,
          }}
          more={{ href: STORIES_PARENT.href, label: viewAll }}
        >
          {relatedItems.map((story) => (
            <div className="item" key={story.id}>
              <StoryCard story={story} />
            </div>
          ))}
        </RelatedNews>
      ) : null}
    </>
  );
}
