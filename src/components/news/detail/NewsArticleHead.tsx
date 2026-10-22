import {
  IconEyeViews,
  IconReadClock,
  IconMetaCalendar,
  IconMetaPencil,
} from "./news-icons";
import type { NewsArticle } from "./news-article-data";
import RichText from "@/components/ui/RichText";

/* Category pills · headline · standfirst · meta row, above the gallery.
   RTL DOM order is the mock's right-to-left reading order: views, read time,
   date, author. */
export default function NewsArticleHead({ article }: { article: NewsArticle }) {
  return (
    <header className="nws-head">
      <div className="nws-tags">
        {/* a story's own pill ("قصة نجاح") leads, in the brand olive */}
        {article.badge ? (
          <span className="nws-tag nws-tag-badge">{article.badge}</span>
        ) : null}
        {/* the API sends the article's categories as a list; the static
            article has exactly the mock's two pills */}
        {article.tags ? (
          article.tags.map((tag, i) => (
            <span className="nws-tag" key={tag + i}>
              {tag}
            </span>
          ))
        ) : (
          <>
            <span className="nws-tag" data-i18n={article.categoryKey}>
              {article.category}
            </span>
            <span className="nws-tag" data-i18n={article.sectionKey}>
              {article.section}
            </span>
          </>
        )}
      </div>

      <h1 className="nws-title" data-i18n={article.titleKey}>
        {article.title}
      </h1>
      <RichText as="p" className="nws-standfirst" data-i18n={article.descKey} html={article.desc} />

      <ul className="nws-meta">
        <li className="nws-meta-item">
          <IconEyeViews />
          <span data-i18n={article.viewsKey}>{article.views}</span>
        </li>
        <li className="nws-meta-item">
          <IconReadClock />
          <span data-i18n={article.readTimeKey}>{article.readTime}</span>
        </li>
        <li className="nws-meta-item">
          <IconMetaCalendar />
          <span data-i18n={article.dateKey}>{article.date}</span>
        </li>
        {/* the mock pushes the byline to the far (end) side of the row and
            drops the hairline before it */}
        <li className="nws-meta-item nws-meta-author">
          <IconMetaPencil />
          <span data-i18n={article.authorKey}>{article.author}</span>
        </li>
      </ul>
    </header>
  );
}
