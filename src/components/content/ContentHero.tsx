import SiteNav from "@/components/site/SiteNav";
import HeroReelsSlider from "./HeroReelsSlider";
import BreadcrumbHome from "@/components/site/BreadcrumbHome";

/* Breadcrumb hero for the محتوانا page. Reuses the creators/team hero classes
   (cr-*) so the breadcrumb, title and description match the rest of the site;
   the dark-green backdrop and the coverflow strip below come from content.css. */
export default function ContentHero() {
  return (
    <header>
      <div className="cr-header ct-header py-1">
        <SiteNav />
        <div className="container cr-hero ct-hero">
          <nav className="cr-breadcrumb" aria-label="breadcrumb">
            <BreadcrumbHome />
            <i className="fa-solid fa-angle-left mx-2 cr-breadcrumb-sep arrow"></i>
            <span className="cr-breadcrumb-active" data-i18n="nav_content">
              محتوانا
            </span>
          </nav>
          <h1 className="cr-hero-title" data-i18n="welcome_title">
            كل فكرة إلها صوت... وصوت بيجمعهم
          </h1>
          <p className="cr-hero-desc ct-hero-desc" data-i18n="content_hero_desc">
            خلف كل محتوى تشاهده وتسمعه فريق من المختصين في تكنولوجيا المعلومات
            والإنتاج الإعلامي، نؤمن أن التكنولوجيا هي وسيلتنا لنقل الحقيقة، وأن
            إبداعنا هو الصوت الذي يصل بصدى غزة إلى آفاق العالم.
          </p>
        </div>
        <HeroReelsSlider />
      </div>
    </header>
  );
}
