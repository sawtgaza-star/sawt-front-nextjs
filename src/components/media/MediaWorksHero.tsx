import MediaNav from "./MediaNav";

/* Banner of /media/works — the صوت photo collage (heroSectionImg) under an
   olive veil, with صوت ميديا's own navbar on top of it, then the breadcrumb and
   the headline. Unlike /media's hero this one is dark, so the nav's
   "العودة لمنصة صوت" link flips to white (media.css). */
export default function MediaWorksHero() {
  return (
    <header className="sm-wp-hero">
      <span className="sm-wp-hero-veil" aria-hidden="true" />

      <MediaNav base="/media" />

      <div className="container sm-wp-hero-text">
        <nav className="sm-wp-crumb" aria-label="breadcrumb">
          <a href="/" data-i18n="nav_home">
            الرئيسية
          </a>
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
