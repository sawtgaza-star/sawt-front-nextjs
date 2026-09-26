import SiteNav from "@/components/site/SiteNav";
import BreadcrumbHome from "@/components/site/BreadcrumbHome";
import { localized } from "@/lib/api/pages";
import type { SupportHeroContent } from "@/lib/api/support";
import { SupportHeroSkeleton } from "./SupportSkeleton";

/* Breadcrumb hero for the Support page (ادعم صوت). Reuses the creators/team
   hero styling (cr-* classes from creators.css, imported by the support page)
   with the same collage background so the layout matches the rest of the
   secondary pages.

   The copy and backdrop come from GET /pages/support's `hero` block; without
   it (outage, empty field) the built-in copy renders with its data-i18n keys.
   The <header> shell is NOT conditional — <SiteNav /> lives inside it and
   initHeaderPin() wraps it right after mount (see CollaborateHero). */

const HERO_IMAGE = "/assets/images/heroSectionImg.jpeg";

export default function SupportHero({
  data,
  lang = "ar",
  loading = false,
}: {
  data?: SupportHeroContent;
  lang?: string;
  loading?: boolean;
} = {}) {
  const title = localized(data?.title, lang);
  const description = localized(data?.description, lang);

  return (
    <header>
      <div
        className="cr-header py-1"
        style={{ background: `url("${data?.image_url || HERO_IMAGE}")` }}
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
          {loading ? (
            <SupportHeroSkeleton />
          ) : title || description ? (
            <>
              {title ? <h1 className="cr-hero-title">{title}</h1> : null}
              {description ? <p className="cr-hero-desc">{description}</p> : null}
            </>
          ) : (
            <>
              <h1 className="cr-hero-title" data-i18n="support_hero_title">
                ادعم المنصة التي توصل أصواتهم
              </h1>
              <p className="cr-hero-desc" data-i18n="support_hero_desc">
                كل تبرع يتحوّل إلى قصة تُروى، وصوت يصل إلى العالم من قلب غزة
              </p>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
