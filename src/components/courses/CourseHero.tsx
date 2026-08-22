import IncubatorNav from "@/components/incubator/IncubatorNav";
import type { Course } from "./course-data";

/* Olive hero of the course detail page — the incubator navbar on top (courses
   are reached from /incubator, so the page keeps that bar), centered breadcrumb,
   then the badge/title/description block. The copy sits in the same
   1fr/360px grid as the body so it never runs under the floating
   registration card (which the aside pulls up over this hero). */
export default function CourseHero({ course }: { course: Course }) {
  return (
    <header className="crs-hero">
      <IncubatorNav />

      <div className="container">
        <nav className="crs-breadcrumb" aria-label="breadcrumb">
          <a href="/" data-i18n="nav_home">
            الرئيسية
          </a>
          <i className="fa-solid fa-angle-left crs-breadcrumb-sep"></i>
          <span className="crs-breadcrumb-active" data-i18n={course.titleKey}>
            {course.title}
          </span>
        </nav>

        <div className="crs-hero-grid">
          <div className="crs-hero-copy">
            <span className="crs-badge" data-i18n={course.categoryKey}>
              {course.category}
            </span>
            <h1 className="crs-hero-title" data-i18n={course.titleKey}>
              {course.title}
            </h1>
            <p className="crs-hero-desc" data-i18n={course.descKey}>
              {course.desc}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
