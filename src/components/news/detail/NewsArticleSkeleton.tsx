import SkeletonText from "@/components/ui/SkeletonText";
import { NewsCardSkeleton, StoryCardSkeleton } from "@/components/news/NewsSkeleton";
import type { ArticleSkeletonShape, BodyBlockLen } from "./article-skeleton-data";

/* /news/{uuid} and /stories/{uuid} while the article request is in flight.

   The real markup of NewsArticleHead, NewsGallery, NewsBody and RelatedNews —
   same elements, same classes — with each text swapped for a <SkeletonText />
   (see FooterSkeleton) and each picture for a block of the same box. Its
   lengths come from `shape` (article-skeleton-data). Keep it in step with
   those components when their markup changes. */

/** An empty box the size of the meta row's 20px icons (16px on phones, by the
    same `.nws-meta-item svg` rule). */
const MetaIcon = () => <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" />;

const META_CLASS = ["nws-meta-item", "nws-meta-item", "nws-meta-item", "nws-meta-item nws-meta-author"];

function Blocks({ blocks }: { blocks: BodyBlockLen[] }) {
  return (
    <div className="nws-html">
      {blocks.map((block, i) =>
        block.tag === "h2" ? (
          <h2 key={i}>
            <SkeletonText chars={block.chars} />
          </h2>
        ) : (
          <p key={i}>
            <SkeletonText chars={block.chars} />
          </p>
        ),
      )}
    </div>
  );
}

/** The article column: NewsArticleHead · NewsGallery · NewsBody. */
export function NewsArticleSkeleton({ shape }: { shape: ArticleSkeletonShape }) {
  return (
    <>
      <header className="nws-head" aria-busy="true" aria-hidden="true">
        <div className="nws-tags">
          {shape.tags.map((chars, i) => (
            <span className="nws-tag nph-tag" key={i}>
              <SkeletonText chars={chars} />
            </span>
          ))}
        </div>
        <h1 className="nws-title">
          <SkeletonText chars={shape.title} />
        </h1>
        <p className="nws-standfirst">
          <SkeletonText chars={shape.desc} />
        </p>
        <ul className="nws-meta">
          {shape.meta.map((chars, i) => (
            <li className={META_CLASS[i]} key={i}>
              <MetaIcon />
              <span>
                <SkeletonText chars={chars} />
              </span>
            </li>
          ))}
        </ul>
      </header>

      {shape.frames ? (
        <div className="nws-gallery" aria-hidden="true">
          <div className="nws-gallery-stage nph-stage">
            <span className="nph-frame" />
          </div>
          <div className="nws-gallery-thumbs">
            {Array.from({ length: shape.frames }, (_, i) => (
              <span className="nws-gallery-thumb nph-block" key={i} />
            ))}
          </div>
        </div>
      ) : null}

      <div className="nws-body" aria-hidden="true">
        <Blocks blocks={shape.lead} />
        {shape.quote ? (
          <blockquote className="nws-quote">
            <p className="nws-quote-text">
              <SkeletonText chars={shape.quote.text} />
            </p>
            <cite className="nws-quote-by">
              <SkeletonText chars={shape.quote.by} />
            </cite>
          </blockquote>
        ) : null}
        {shape.rest.length ? <Blocks blocks={shape.rest} /> : null}
      </div>
    </>
  );
}

/** RelatedNews: the heading, the two (disabled) nav buttons, the track of
    cards — NewsCard on /news/{uuid}, the poster StoryCard on /stories/{uuid} —
    and the "عرض جميع …" link. */
export function RelatedNewsSkeleton({
  shape,
  card,
  moreHref,
}: {
  shape: ArticleSkeletonShape;
  card: "news" | "story";
  moreHref: string;
}) {
  const { related } = shape;
  return (
    <section className="nws-related position-relative" aria-busy="true" aria-hidden="true">
      <div className="bg-icon bg-icon-right">
        <img src="/assets/images/fa-solid_microphone-alt.png" alt="" />
      </div>
      <div className="bg-icon bg-icon-left">
        <img src="/assets/images/fa-solid_microphone-alt (1).png" alt="" />
      </div>

      <div className="container">
        <div className="text-center mb-2">
          <h2 className="fw-bold font-42 nws-related-title">
            <SkeletonText chars={related.title} />
          </h2>
          <p className="news-subtitle font-24" style={{ color: "rgba(90, 90, 90, 1)" }}>
            <SkeletonText chars={related.sub} />
          </p>
        </div>

        <div className="nws-related-slider">
          <button type="button" className="nws-related-nav nws-related-prev" disabled tabIndex={-1}>
            <i className="fa-solid fa-angle-right"></i>
          </button>
          <button type="button" className="nws-related-nav nws-related-next" disabled tabIndex={-1}>
            <i className="fa-solid fa-angle-left"></i>
          </button>
          <div className="nws-related-track">
            {Array.from({ length: related.cards }, (_, i) =>
              card === "news" ? (
                <NewsCardSkeleton key={i} />
              ) : (
                <div className="item" key={i}>
                  <StoryCardSkeleton />
                </div>
              ),
            )}
          </div>
        </div>

        <div className="text-center nws-related-more">
          <a href={moreHref} className="px-4 py-2 fw-bold show-more-news" tabIndex={-1}>
            <span>
              <SkeletonText chars={related.more} />
            </span>{" "}
            <i className="fa-solid fa-angle-left me-2 arrow nph-glyph"></i>
          </a>
        </div>
      </div>
    </section>
  );
}
