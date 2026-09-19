import "@/styles/news-skeleton.css";

/* What the news pages show while their request is in flight. Server-rendered
   as well as client-rendered: `loading` starts true on both sides, so this is
   what ships in the exported HTML and what hydration expects.

   The breadcrumb header is NOT part of it — NewsHero always renders (SiteNav
   lives inside it) and shows the static hero copy until the API's own lands. */

function Line({ width, className = "sk-line" }: { width: string; className?: string }) {
  return <span className={className} style={{ width }} />;
}

/** The hero's title and description, inside the real .about-hero container —
    what the header shows while the request is in flight, in place of copy the
    page no longer carries of its own. */
export function NewsHeroSkeleton() {
  return (
    <div className="sk-nws-hero" aria-busy="true" aria-hidden="true">
      <Line width="62%" className="sk-line sk-line-title" />
      <Line width="84%" />
    </div>
  );
}

/** One card of the listing grid — cover box, two copy lines, footer row. */
function CardSkeleton() {
  return (
    <div className="sk-news-card">
      <span className="sk-block sk-news-cover" />
      <Line width="80%" className="sk-line sk-line-title" />
      <Line width="100%" />
      <Line width="65%" />
    </div>
  );
}

/** The 3×3 grid of /news. /stories renders the same grid under one extra
    class, so it passes its own `className` and the bars line up with the
    poster cards that replace them. */
export function NewsGridSkeleton({
  count = 9,
  className = "news-grid",
}: {
  count?: number;
  className?: string;
}) {
  return (
    <div className={className}>
      {Array.from({ length: count }, (_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

/** The article column of /news/{uuid}: pills, headline, standfirst, meta row,
    gallery stage + thumbs, then a few paragraphs. */
export function NewsArticleSkeleton() {
  return (
    <>
      <div className="sk-nws-tags">
        <span className="sk-block sk-nws-tag" />
        <span className="sk-block sk-nws-tag" />
      </div>
      <Line width="70%" className="sk-line sk-line-title" />
      <Line width="90%" />
      <Line width="45%" />

      <span className="sk-block sk-nws-stage" />
      <div className="sk-nws-thumbs">
        {Array.from({ length: 3 }, (_, i) => (
          <span className="sk-block sk-nws-thumb" key={i} />
        ))}
      </div>

      {["100%", "97%", "92%", "100%", "60%"].map((width, i) => (
        <Line width={width} key={i} />
      ))}
    </>
  );
}
