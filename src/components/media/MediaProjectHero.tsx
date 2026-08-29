import MediaNav from "./MediaNav";
import type { MediaProject } from "./media-project-data";

/* Banner of /media/works/[slug] — the same dark collage the works listing uses
   (media.css styles both through `.sm-wp-hero`), with a three-step breadcrumb:
   أعمالنا › القسم › اسم المشروع. Only the last step is orange.

   `sm-wp-hero-plain` is the works listing's phone treatment, shared here as it
   already is on the service page: below md the collage drops away and the
   banner reads as ink on the page's own white. Desktop is untouched. */
export default function MediaProjectHero({ project }: { project: MediaProject }) {
  return (
    <header className="sm-wp-hero sm-wp-hero-plain">
      <span className="sm-wp-hero-veil" aria-hidden="true" />

      <MediaNav base="/media" />

      <div className="container sm-wp-hero-text">
        <nav className="sm-wp-crumb" aria-label="breadcrumb">
          <a href="/media/works" data-i18n="sm_nav_works">
            أعمالنا
          </a>
          <i className="fa-solid fa-angle-left sm-wp-crumb-sep"></i>
          <a href="/media/works" data-i18n={project.sectionLabelKey}>
            {project.sectionLabel}
          </a>
          <i className="fa-solid fa-angle-left sm-wp-crumb-sep"></i>
          <span className="sm-wp-crumb-active" data-i18n={project.titleKey}>
            {project.title}
          </span>
        </nav>
        <h1 className="sm-wp-hero-title" data-i18n="sm_wp_hero_title">
          حلول رقمية تلتقي فيها الفكرة والتجربة والأثر.
        </h1>
      </div>
    </header>
  );
}
