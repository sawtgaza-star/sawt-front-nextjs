import MediaNav from "./MediaNav";
import BreadcrumbHome from "@/components/site/BreadcrumbHome";

/* Banner of /media/works — the صوت photo collage (heroSectionImg) under an
   olive veil, with صوت ميديا's own navbar on top of it, then the breadcrumb and
   the headline. Unlike /media's hero this one is dark, so the nav's
   "العودة لمنصة صوت" link flips to white (media.css).

   `sm-wp-hero-plain` is what sets this banner apart from the other three that
   share `.sm-wp-hero`: on a phone it drops the collage and reads as ink on the
   page's own white, the way every other page opens on mobile. */
export default function MediaWorksHero() {
  return (
    <header className="sm-wp-hero sm-wp-hero-plain">
      <span className="sm-wp-hero-veil" aria-hidden="true" />

      <MediaNav base="/media" />

      <div className="container sm-wp-hero-text">
        <nav className="sm-wp-crumb" aria-label="breadcrumb">
          <BreadcrumbHome />
          <i className="fa-solid fa-angle-left sm-wp-crumb-sep"></i>
          <span className="sm-wp-crumb-active" data-i18n="sm_nav_works">
            أعمالنا
          </span>
        </nav>
        <h1 className="sm-wp-hero-title" data-i18n="sm_wp_hero_title">
          حلول رقمية تلتقي فيها الفكرة والتجربة والأثر.
        </h1>
      </div>
    </header>
  );
}
