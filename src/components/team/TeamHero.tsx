import SiteNav from "@/components/site/SiteNav";

/* Breadcrumb hero for the Team page (الفريق). Uses the content-creators hero
   styling (cr-* classes, from creators.css) with the same collage background,
   so the birds + sound-wave centre of the image frames the title — matching
   the mock. creators.css is imported by the team page. */
export default function TeamHero() {
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
            <span className="cr-breadcrumb-active" data-i18n="nav_team">
              الفريق
            </span>
          </nav>
          <h1 className="cr-hero-title" data-i18n="team_hero_title">
            صناع الأثر..الفريق خلف منصة صوت
          </h1>
        </div>
      </div>
    </header>
  );
}
