// @ts-nocheck
/* eslint-disable */
import SiteNav from "@/components/site/SiteNav";

export default function AboutHero() {
  return (
    <header>
      {" "}
      <div
        className="about-header py-1"
        style={{ background: 'url("/assets/images/WhoUs.jpg")' }}
      >
        {" "}
        <SiteNav />{" "}
        {/*  Mobile search panel (revealed by the mobile search icon)  */}{" "}
        <div className="container about-hero text-center text-white">
          {" "}
          <nav className="about-breadcrumb" aria-label="breadcrumb">
            {" "}
            <a href="/" data-i18n="nav_home">
              الرئيسية
            </a>{" "}
            <i className="fa-solid fa-angle-left mx-2 about-breadcrumb-sep arrow"></i>{" "}
            <span className="about-breadcrumb-active" data-i18n="nav_about">
              من نحن
            </span>{" "}
          </nav>{" "}
          <h1 className="about-hero-title" data-i18n="about_hero_title">
            صناع الأثر.. الفريق خلف منصة صوت
          </h1>{" "}
          <p className="about-hero-desc" data-i18n="about_hero_desc">
            صوت منصة إعلامية مستقلة تُوثّق الواقع وتحكي قصص الناس، لتكون صوتاً
            لمن لا صوت له.
          </p>{" "}
        </div>{" "}
      </div>{" "}
    </header>
  );
}
