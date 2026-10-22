// @ts-nocheck
/* eslint-disable */
import "@/styles/home-news.css";
import NewsCard from "@/components/news/NewsCard";
import { localized, localizedHtml } from "@/lib/api/pages";
import type { HomeNews } from "@/lib/api/home";
import { splitHeading, formatDate } from "./home-text";
import RichText from "@/components/ui/RichText";

/* The API's `news` block. The heading is one string in the payload but two
   spans in the design (the accent falls on the last word), so it is split
   here — see splitHeading in ./home-text.

   Cards are handed to the shared <NewsCard /> already in the reader's
   language, without `data-i18n` keys: the card supports both that and the
   built-in rows. Each one links to /news/{uuid} — the identifier the article
   endpoint resolves, and the segment /news/[id] is exported under (see
   lib/api/blogs). */
export default function LatestNews({
  data,
  lang = "ar",
}: {
  data?: HomeNews;
  lang?: string;
}) {
  const title = localized(data?.title, lang);
  const [titleHead, titleTail] = splitHeading(title, 1);
  const subtitle = localizedHtml(data?.subtitle, lang);
  const readMore = localized(data?.read_more, lang);
  const viewAll = localized(data?.view_all?.label, lang);

  const items = (Array.isArray(data?.items) ? data.items : []).map((item) => ({
    id: item.uuid || item.id,
    img: item.cover_image || "",
    alt: localized(item.title, lang),
    title: localized(item.title, lang),
    desc: localizedHtml(item.excerpt, lang, { oneLine: true }),
    date: formatDate(item.publish_date, lang),
    readMore,
    href: item.uuid ? `/news/${item.uuid}` : "#",
  }));

  if (!title && !subtitle && !items.length) return null;

  return (
    <section className="latest-news py-5 position-relative">
      {/* soft floating colour blobs — see home-news.css */}
      <div className="ln-shape ln-shape-1" aria-hidden="true" />
      <div className="ln-shape ln-shape-2" aria-hidden="true" />
      <div className="ln-shape ln-shape-3" aria-hidden="true" />
      <div className="bg-icon bg-icon-right"><img loading="lazy" decoding="async" src="/assets/images/fa-solid_microphone-alt.png" alt="" /></div>
      <div className="bg-icon bg-icon-left"><img loading="lazy" decoding="async" src="/assets/images/fa-solid_microphone-alt (1).png" alt="" /></div>
      <div className="container">
        <div className="text-center mb-2">
          {title ? (
            <h2 className="fw-bold who-us font-42">
              <span>{titleHead}</span> <span>{titleTail}</span>
            </h2>
          ) : null}
          {subtitle ? (
            <RichText as="p" className="news-subtitle font-24" style={{ color: "rgba(90, 90, 90, 1)", margin: "20px 0px 35px 0px !important" }} html={subtitle} />
          ) : null}
        </div>
        <div className="owl-carousel creators-carousel">
          {items.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
        {viewAll ? (
          <div className="text-center" style={{ marginTop: "50px " }}>
            {" "}
            <a href="/news" className="px-4 py-2 fw-bold show-more-news">
              {" "}
              <span>{viewAll}</span>{" "}
              <i className="fa-solid fa-angle-left me-2 arrow"></i>{" "}
            </a>{" "}
          </div>
        ) : null}
      </div>
    </section>
  );
}
