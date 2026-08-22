import {
  IconEyeViews,
  IconReadClock,
  IconMetaCalendar,
  IconMetaPencil,
} from "./news-icons";
import type { NewsArticle } from "./news-article-data";

/* Category pills · headline · standfirst · meta row, above the gallery.
   RTL DOM order is the mock's right-to-left reading order: views, read time,
   date, author. */
export default function NewsArticleHead({ article }: { article: NewsArticle }) {
  return (
    <header className="nws-head">
      <div className="nws-tags">
        <span className="nws-tag" data-i18n={article.categoryKey}>
          {article.category}
        </span>
        <span className="nws-tag" data-i18n={article.sectionKey}>
          {article.section}
        </span>
      </div>

      <h1 className="nws-title" data-i18n={article.titleKey}>
        {article.title}
      </h1>
      <p className="nws-standfirst" data-i18n={article.descKey}>
        {article.desc}
      </p>

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
