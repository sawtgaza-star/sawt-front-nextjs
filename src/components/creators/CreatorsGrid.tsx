// @ts-nocheck
"use client";
/* eslint-disable */
import CreatorCard from "@/components/creators/CreatorCard";

/* "+47 صانع محتوى ناجح في صوت" — same card design as the home page
   (ContentCreators flip/hover card), laid out in a static grid. */
const CREATORS = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  photo: "/assets/images/محمود زعيتر 2.png",
  name: "محمود عبد الله زعيتر",
  role: "ممثل مسرحية",
  followers: "31.4K متابع",
}));

export default function CreatorsGrid() {
  return (
    <section className="content-section cr-grid-section">
          <div className="container position-relative">
        
          <img
            src="/assets/images/leaf_cutout.png"
            className="olive-branch branch-right-top-creators-section"
            alt="Olive Branch"
          />
          <img
            src="/assets/images/leaf_cutout.png"
            className="olive-branch branch-left-bottom-creators-section"
            alt="Olive Branch"
          />{" "}
        <div className="cr-section-head">
          <h2 className="cr-section-title">
            <span className="cr-title-orange" data-i18n="creators_grid_count">
              +47
            </span>{" "}
            <span data-i18n="creators_grid_title_pre">صانع محتوى ناجح في</span>{" "}
            <span className="cr-highlight" data-i18n="brand_sawt">
              صوت
            </span>
          </h2>
          <p className="cr-section-sub" data-i18n="creators_grid_sub">
            تعرّف على صنّاع المحتوى في صوت، حيث كل فكرة إلها صوت، وكل مبدع إله
            حكاية.
          </p>
        </div>
        <div className="cr-creators-grid">
          {CREATORS.map((c) => (
            <CreatorCard key={c.id} item={c} />
          ))}
        </div>
        <div className="text-center" style={{ marginTop: "50px" }}>
          {" "}
          <a href="/creators/all" className="px-4 py-2 fw-bold show-more-news">
            {" "}
            <span data-i18n="view_all">عرض الكل</span>{" "}
            <i className="fa-solid fa-angle-left me-2 arrow"></i>{" "}
          </a>{" "}
        </div>{" "}
      </div>
    </section>
  );
}
