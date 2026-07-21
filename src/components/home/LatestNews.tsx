// @ts-nocheck
"use client";
/* eslint-disable */
import { IconCalendar } from "@/components/ui/icons";

const NEWS = [
  { img: "/assets/images/Rectangle 701.png", alt: "صانع المحتوى", titleKey: "news_card1_title", title: "صانع المحتوى في غزة" },
  { img: "/assets/images/Rectangle 703.png", alt: "الام في غزة ", titleKey: "news_card2_title", title: "الام في غزة" },
  { img: "/assets/images/Rectangle 705.png", alt: "صانع المحتوى", titleKey: "news_card1_title", title: "صانع المحتوى في غزة" },
];

function NewsCard({ item }: { item: (typeof NEWS)[number] }) {
  return (
    <div className="item">
      <div className="card h-100 news-card">
        <img src={item.img} className="card-img-top" alt={item.alt} />
        <div className="card-body">
          <h5 className="card-title fw-bold" data-i18n={item.titleKey}>{item.title}</h5>
          <p className="card-text font-md-18" style={{ fontWeight: "500", color: "rgba(109, 109, 109, 1)" }} data-i18n="news_desc">
            نشارككم آخر تحديثات صانع المحتوى في غزة، حيث نعمل على إبراز قصص المبدعين وإيصال صوتهم.
          </p>
        </div>
        <div className="card-footer bg-white border-0 d-flex font-16 text-dark pb-3 fw-bold">
          <span>
            <i style={{ color: "rgba(109, 109, 109, 1)" }}><IconCalendar /></i>{" "}
            <span data-i18n="news_date" style={{ color: "rgba(109, 109, 109, 1)" }}>5 مارس 2026</span>
          </span>
          <span className="readmore">
            <a href="#">
              <span style={{ color: "rgba(76, 92, 55, 1)" }} data-i18n="read_more">اقرأ المزيد</span>
              <i className="fa-solid fa-angle-left me-2 ms-1 arrow" style={{ color: "rgba(76, 92, 55, 1)" }}></i>
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}

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
          {NEWS.map((item) => (
            <NewsCard key={item.titleKey + item.img} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
