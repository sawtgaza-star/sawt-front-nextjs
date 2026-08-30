import SiteNav from "@/components/site/SiteNav";
import BreadcrumbHome from "@/components/site/BreadcrumbHome";

/* Breadcrumb hero for the Support page (ادعم صوت). Reuses the creators/team
   hero styling (cr-* classes from creators.css, imported by the support page)
   with the same collage background so the layout matches the rest of the
   secondary pages. */
export default function SupportHero() {
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
            <span className="cr-breadcrumb-active" data-i18n="nav_support">
              ادعم صوت
            </span>
          </nav>
          <h1 className="cr-hero-title" data-i18n="support_hero_title">
            ادعم المنصة التي توصل أصواتهم
          </h1>
          <p className="cr-hero-desc" data-i18n="support_hero_desc">
            كل تبرع يتحوّل إلى قصة تُروى، وصوت يصل إلى العالم من قلب غزة
          </p>
        </div>
      </div>
    </header>
  );
}
