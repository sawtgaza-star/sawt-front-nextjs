import SiteNav from "@/components/site/SiteNav";
import BreadcrumbHome from "@/components/site/BreadcrumbHome";
import CheckoutHeroBackdrop from "./CheckoutHeroBackdrop";

/* Breadcrumb hero for /support/checkout. Same cr-* hero shell as MethodsHero,
   with the trail extended by the wizard's own level
   (الرئيسية > ادعم صوت > طرق الدعم > اختيار المنصة). The backdrop is the
   methods page's own, from the API — see CheckoutHeroBackdrop. */
export default function CheckoutHero() {
  return (
    <header>
      <CheckoutHeroBackdrop>
        <SiteNav />
        <div className="container cr-hero">
          <nav className="cr-breadcrumb" aria-label="breadcrumb">
            <BreadcrumbHome />
            <i className="fa-solid fa-angle-left mx-2 cr-breadcrumb-sep arrow"></i>
            <a href="/support" data-i18n="nav_support">
              ادعم صوت
            </a>
            <i className="fa-solid fa-angle-left mx-2 cr-breadcrumb-sep arrow"></i>
            <a href="/support/methods" data-i18n="support_methods_breadcrumb">
              طرق الدعم
            </a>
            <i className="fa-solid fa-angle-left mx-2 cr-breadcrumb-sep arrow"></i>
            <span
              className="cr-breadcrumb-active"
              data-i18n="checkout_step_platform"
            >
              اختيار المنصة
            </span>
          </nav>
          <h1 className="cr-hero-title" data-i18n="support_methods_hero_title">
            ادعم صوت
          </h1>
          <p className="cr-hero-desc" data-i18n="support_methods_hero_desc">
            اختر الطريقة الأنسب لك لإتمام تبرعك، وكل مساهمة تتحول إلى قصة تُروى
            من قلب غزة
          </p>
        </div>
      </CheckoutHeroBackdrop>
    </header>
  );
}
