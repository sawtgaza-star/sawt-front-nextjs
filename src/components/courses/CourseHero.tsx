import IncubatorNav from "@/components/incubator/IncubatorNav";
import BreadcrumbHome from "@/components/site/BreadcrumbHome";
import SkeletonText from "@/components/ui/SkeletonText";
import { HERO } from "./course-skeleton/skeleton-data";
import RichText from "@/components/ui/RichText";

export type CourseHeroCopy = {
  title: string;
  category: string;
  desc: string;
};

/* Olive hero of the course detail page — the incubator navbar on top (courses
   are reached from /incubator, so the page keeps that bar), centered breadcrumb,
   then the badge/title/description block. The copy sits in the same
   1fr/360px grid as the body so it never runs under the floating
   registration card (which the aside pulls up over this hero).

   Always mounted, loading or not: <IncubatorNav /> lives here and its
   `.language-btn` is bound once by initTranslate(). While the course is in
   flight its text is filler of the current copy's length
   (./course-skeleton/skeleton-data); if it fails (`copy` null after loading)
   the hero is just its bar and crumb. */
export default function CourseHero({
  copy,
  loading,
}: {
  copy: CourseHeroCopy | null;
  loading: boolean;
}) {
  return (
    <header className="crs-hero">
      <IncubatorNav />

      <div className="container">
        <nav className="crs-breadcrumb" aria-label="breadcrumb">
          <BreadcrumbHome />
          <i className="fa-solid fa-angle-left crs-breadcrumb-sep"></i>
          {copy ? (
            <span className="crs-breadcrumb-active">{copy.title}</span>
          ) : loading ? (
            <span className="crs-breadcrumb-active">
              <SkeletonText chars={HERO.title} />
            </span>
          ) : null}
        </nav>

        <div className="crs-hero-grid">
          {copy ? (
            <div className="crs-hero-copy">
              {copy.category && <span className="crs-badge">{copy.category}</span>}
              <h1 className="crs-hero-title">{copy.title}</h1>
              {copy.desc && <RichText as="p" className="crs-hero-desc" html={copy.desc} />}
            </div>
          ) : loading ? (
            <div className="crs-hero-copy" aria-busy="true" aria-hidden="true">
              <span className="crs-badge">
                <SkeletonText chars={HERO.category} />
              </span>
              <h1 className="crs-hero-title">
                <SkeletonText chars={HERO.title} />
              </h1>
              <p className="crs-hero-desc">
                <SkeletonText chars={HERO.desc} />
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
