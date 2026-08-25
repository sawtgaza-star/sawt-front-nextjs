import SiteNav from "@/components/site/SiteNav";

/* Breadcrumb hero for the تعاون معنا pages. Same cr-* hero shell and collage
   background as SupportHero, so it lines up with the other secondary pages.
   `crumb` adds the deepest level of the trail (الرئيسية > تعاون معنا > …) —
   without it "تعاون معنا" is the active crumb, which is /collaborate itself. */
export default function CollaborateHero({
  crumb,
  crumbKey,
}: {
  crumb?: string;
  crumbKey?: string;
} = {}) {
  return (
    <header>
      <div
        className="cr-header py-1"
        style={{ background: 'url("/assets/images/heroSectionImg.jpeg")' }}
      >
        <SiteNav />
        <div className="container cr-hero">
          <nav className="cr-breadcrumb" aria-label="breadcrumb">
            <a href="/" data-i18n="nav_home">
              الرئيسية
            </a>
            <i className="fa-solid fa-angle-left mx-2 cr-breadcrumb-sep arrow"></i>
            {crumb ? (
              <>
                <a href="/collaborate" data-i18n="collab_breadcrumb">
                  تعاون معنا
                </a>
                <i className="fa-solid fa-angle-left mx-2 cr-breadcrumb-sep arrow"></i>
                <span className="cr-breadcrumb-active" data-i18n={crumbKey}>
                  {crumb}
                </span>
              </>
            ) : (
              <span
                className="cr-breadcrumb-active"
                data-i18n="collab_breadcrumb"
              >
                تعاون معنا
              </span>
            )}
          </nav>
          <h1 className="cr-hero-title" data-i18n="collab_hero_title">
            ادعم صوت دعم دعم
          </h1>
          <p className="cr-hero-desc" data-i18n="collab_hero_desc">
            تعرّف على صنّاع المحتوى في صوت، حيث كل فكرة إلها صوت، وكل مبدع إله
            حكاية.
          </p>
        </div>
      </div>
    </header>
  );
}
