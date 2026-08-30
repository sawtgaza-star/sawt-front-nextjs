import SiteNav from "@/components/site/SiteNav";
import BreadcrumbHome from "@/components/site/BreadcrumbHome";

/* Breadcrumb hero for /support/methods. Same cr-* hero shell as SupportHero,
   with the trail extended by one level (الرئيسية > ادعم صوت > طرق الدعم). */
export default function MethodsHero() {
  return (
    <header>
      <div
        className="cr-header py-1"
        style={{ background: 'url("/assets/images/heroSectionImg.jpeg")' }}
      >
        <SiteNav />
        <div className="container cr-hero">
          <nav className="cr-breadcrumb" aria-label="breadcrumb">
            <BreadcrumbHome />
            <i className="fa-solid fa-angle-left mx-2 cr-breadcrumb-sep arrow"></i>
            <a href="/support" data-i18n="nav_support">
              ادعم صوت
            </a>
            <i className="fa-solid fa-angle-left mx-2 cr-breadcrumb-sep arrow"></i>
            <span
              className="cr-breadcrumb-active"
              data-i18n="support_methods_breadcrumb"
            >
              طرق الدعم
            </span>
          </nav>
          <h1 className="cr-hero-title" data-i18n="support_methods_hero_title">
            ادعم صوت
          </h1>
          <p className="cr-hero-desc" data-i18n="support_methods_hero_desc">
            اختر الطريقة الأنسب لك لإتمام تبرعك، وكل مساهمة تتحول إلى قصة تُروى
            من قلب غزة
          </p>
        </div>
      </div>
    </header>
  );
}
