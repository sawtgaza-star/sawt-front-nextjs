import SiteNav from "@/components/site/SiteNav";
import BreadcrumbHome from "@/components/site/BreadcrumbHome";
import { localized } from "@/lib/api/pages";
import type { CollaborateHeroContent } from "@/lib/api/collaborate";
import { CollaborateHeroSkeleton } from "./CollaborateSkeleton";

/* Breadcrumb hero for the تعاون معنا pages. Same cr-* hero shell and collage
   background as SupportHero, so it lines up with the other secondary pages.
   `crumb` adds the deepest level of the trail (الرئيسية > تعاون معنا > …) —
   without it "تعاون معنا" is the active crumb, which is /collaborate itself.

   The copy and the backdrop come from GET /pages/collaborate's `hero` block,
   which only /collaborate fetches (<CollaborateContent />). The four flow
   pages render this hero with no `data`, and so does /collaborate itself if
   the request fails — both then show the built-in copy below, which is why it
   keeps its `data-i18n` keys. What the API sends does not: it carries ar and
   en at once and `lang` picks one, so the DOM translator has nothing to do and
   nothing of React's to overwrite.

   The <header> shell is NOT conditional. <SiteNav /> lives inside it and
   initHeaderPin() (lib/legacy-main) wraps `.nav-face` + `.navbar` into
   `.header-bar` right after mount; a header that appeared only once the
   payload landed would bring its nav up too late to be wrapped. */

const HERO_IMAGE = "/assets/images/heroSectionImg.jpeg";

export default function CollaborateHero({
  crumb,
  crumbKey,
  data,
  lang = "ar",
  loading = false,
}: {
  crumb?: string;
  crumbKey?: string;
  data?: CollaborateHeroContent;
  lang?: string;
  /** The payload is still on its way — hold the hero's height with bars. */
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
          {loading ? (
            <CollaborateHeroSkeleton />
          ) : title || description ? (
            <>
              {title ? <h1 className="cr-hero-title">{title}</h1> : null}
              {description ? <p className="cr-hero-desc">{description}</p> : null}
            </>
          ) : (
            <>
              <h1 className="cr-hero-title" data-i18n="collab_hero_title">
                ادعم صوت دعم دعم
              </h1>
              <p className="cr-hero-desc" data-i18n="collab_hero_desc">
                تعرّف على صنّاع المحتوى في صوت، حيث كل فكرة إلها صوت، وكل مبدع
                إله حكاية.
              </p>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
