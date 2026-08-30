import MediaNav from "./MediaNav";
import BreadcrumbHome from "@/components/site/BreadcrumbHome";

/* Banner of /media/contact — the same dark collage the works listing and the
   case studies use (media.css styles them all through `.sm-wp-hero`), with the
   two-step breadcrumb الرئيسية › تواصل معنا and a line of copy under the
   headline, which is what sets this banner apart from the others.

   `sm-wp-hero-plain` is the phone treatment the other banners share: the
   collage drops away and the crumb reads as ink on the page's own white.
   `sm-ct-hero` is this page's own hook — the artboard runs the crumb straight
   into the still, so the headline and its line step out below md (media.css).
   Desktop is untouched. */
export default function MediaContactHero() {
  return (
    <header className="sm-wp-hero sm-wp-hero-plain sm-ct-hero">
      <span className="sm-wp-hero-veil" aria-hidden="true" />

      <MediaNav base="/media" />

      <div className="container sm-wp-hero-text">
        <nav className="sm-wp-crumb" aria-label="breadcrumb">
          <BreadcrumbHome />
          <i className="fa-solid fa-angle-left sm-wp-crumb-sep"></i>
          <span className="sm-wp-crumb-active" data-i18n="sm_ct_crumb">
            تواصل معنا
          </span>
        </nav>

        <h1 className="sm-wp-hero-title" data-i18n="sm_ct_hero_title">
          تواصل معنا
        </h1>
        <p className="sm-ct-hero-sub" data-i18n="sm_ct_hero_sub">
          تعرّف على صنّاع المحتوى في صوت، حيث كل قصة إلها صوت، وكل مبدع إله
          حكاية.
        </p>
      </div>
    </header>
  );
}
