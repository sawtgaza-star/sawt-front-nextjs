// @ts-nocheck
"use client";
/* eslint-disable */
import NewsCard from "@/components/news/NewsCard";
import { HOME_NEWS } from "@/components/news/news-data";

export default function LatestNews() {
  return (
    <section className="latest-news py-5 position-relative">
      <div className="bg-icon bg-icon-right"><img src="/assets/images/fa-solid_microphone-alt.png" alt="" /></div>
      <div className="bg-icon bg-icon-left"><img src="/assets/images/fa-solid_microphone-alt (1).png" alt="" /></div>
      <div className="container">
        <div className="text-center mb-2">
          <h2 className="fw-bold who-us font-42">
            <span data-i18n="news_title_pre">آخر</span> <span data-i18n="news_title_highlight">أخبارنا</span>
          </h2>
          <p className="news-subtitle font-24" style={{ color: "rgba(90, 90, 90, 1)", margin: "20px 0px 35px 0px !important" }} data-i18n="news_subtitle">
            شاهد أحدث القصص والفيديوهات من منصة صوت
          </p>
        </div>
        <div className="owl-carousel creators-carousel">
          {HOME_NEWS.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
        <div className="text-center" style={{ marginTop: "50px " }}>
          {" "}
          <a href="/news" className="px-4 py-2 fw-bold show-more-news">
            {" "}
            <span data-i18n="view_all_news">عرض جميع الأخبار</span>{" "}
            <i className="fa-solid fa-angle-left me-2 arrow"></i>{" "}
          </a>{" "}
        </div>
      </div>
    </section>
  );
}
