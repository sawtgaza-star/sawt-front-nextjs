import SiteNav from "@/components/site/SiteNav";
import BreadcrumbHome from "@/components/site/BreadcrumbHome";
import { localized } from "@/lib/api/pages";
import type { SupportHeroContent } from "@/lib/api/support";
import { SupportHeroSkeleton } from "../SupportSkeleton";

/* Breadcrumb hero for /support/methods. Same cr-* hero shell as SupportHero,
   with the trail extended by one level (الرئيسية > ادعم صوت > طرق الدعم).
   Copy and backdrop from GET /support/methods' `hero` block; built-in copy
   otherwise. */
const HERO_IMAGE = "/assets/images/heroSectionImg.jpeg";

export default function MethodsHero({
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
            <a href="/support" data-i18n="nav_support">
              ادعم صوت
            </a>
            <i className="fa-solid fa-angle-left mx-2 cr-breadcrumb-sep arrow"></i>
            <span
              className="cr-breadcrumb-active"
              data-i18n="support_methods_breadcrumb"
            >
              طرق الدعم
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
              <h1 className="cr-hero-title" data-i18n="support_methods_hero_title">
                ادعم صوت
              </h1>
              <p className="cr-hero-desc" data-i18n="support_methods_hero_desc">
                اختر الطريقة الأنسب لك لإتمام تبرعك، وكل مساهمة تتحول إلى قصة تُروى
                من قلب غزة
              </p>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
