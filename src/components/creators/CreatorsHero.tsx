// @ts-nocheck
"use client";
/* eslint-disable */
import SiteNav from "@/components/site/SiteNav";

/* Breadcrumb hero for the Content Creators page.
   Mirrors the about-page header pattern but with cr- classes. */
export default function CreatorsHero() {
  return (
    <header>
      <div
        className="cr-header py-1"
        style={{ background: 'url("/assets/images/heroSectionImg.jpeg")' }}
      >
        <SiteNav />
        <div className="container cr-hero">
          <nav className="cr-breadcrumb" aria-label="breadcrumb">
            <a href="/" data-i18n="nav_home">
              الرئيسية
            </a>
            <i className="fa-solid fa-angle-left mx-2 cr-breadcrumb-sep arrow"></i>
            <span className="cr-breadcrumb-active" data-i18n="nav_creators">
              صناع المحتوى
            </span>
          </nav>
          <h1 className="cr-hero-title" data-i18n="creators_hero_title">
            صنّاع المحتوى في صوت
          </h1>
          <p className="cr-hero-desc" data-i18n="creators_hero_desc">
            تعرّف على صنّاع المحتوى في صوت، حيث كل فكرة إلها صوت، وكل مبدع إله
            حكاية.
          </p>
        </div>
      </div>
    </header>
  );
}
