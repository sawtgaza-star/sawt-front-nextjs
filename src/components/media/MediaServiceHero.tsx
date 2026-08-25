import MediaNav from "./MediaNav";
import type { MediaServicePage } from "./media-service-page-data";

/* Banner of /media/services/[slug] — the same dark collage the works listing
   and the case study use (media.css styles all three through `.sm-wp-hero`),
   with a three-step breadcrumb: الرئيسية › خدماتنا › اسم الخدمة. Only the last
   step is orange. */
export default function MediaServiceHero({
  service,
}: {
  service: MediaServicePage;
}) {
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
          <a href="/media#sm-services" data-i18n="sm_nav_services">
            خدماتنا
          </a>
          <i className="fa-solid fa-angle-left sm-wp-crumb-sep"></i>
          <span className="sm-wp-crumb-active" data-i18n={service.titleKey}>
            {service.title}
          </span>
        </nav>
        <h1 className="sm-wp-hero-title" data-i18n="sm_wp_hero_title">
          حلول رقمية تلتقي فيها الفكرة والتجربة والأثر.
        </h1>
      </div>
    </header>
  );
}
