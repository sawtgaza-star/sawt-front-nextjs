// @ts-nocheck
/* eslint-disable */
import SiteNav from "@/components/site/SiteNav";
import BreadcrumbHome from "@/components/site/BreadcrumbHome";
import { localized } from "@/lib/api/pages";
import type { CreatorsHeroContent } from "@/lib/api/creators-page";
import { CreatorsHeroSkeleton } from "./CreatorsSkeleton";

/* Breadcrumb hero for the Content Creators page.
   Mirrors the about-page header pattern but with cr- classes.

   The copy and the backdrop come from the API's `hero` block. Called with no
   props — as /creators/all and /creators/{id} do, neither of which has a
   payload of its own — it shows the collage with no copy over it; there is no
   built-in title behind the payload any more, so nothing can contradict what
   the API says. The title is rendered without a `data-i18n` key: it carries ar
   and en at once and `lang` picks one, so the DOM translator has nothing to do
   and nothing of React's to overwrite.

   The <header> shell is NOT conditional. <SiteNav /> lives inside it and
   initHeaderPin() (lib/legacy-main) wraps `.nav-face` + `.navbar` into
   `.header-bar` right after mount; a header that appeared only once the
   payload landed would bring its nav up too late to be wrapped. The breadcrumb
   stays for the same reason — it is site chrome, and the API doesn't send it. */

const HERO_IMAGE = "/assets/images/heroSectionImg.jpeg";

export default function CreatorsHero({
  data,
  lang = "ar",
  loading = false,
}: {
  data?: CreatorsHeroContent;
  lang?: string;
  /** The payload is still on its way — hold the hero's height with bars. */
  loading?: boolean;
}) {
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
            <span className="cr-breadcrumb-active" data-i18n="nav_creators">
              صناع المحتوى
            </span>
          </nav>
          {loading ? (
            <CreatorsHeroSkeleton />
          ) : (
            <>
              {title ? <h1 className="cr-hero-title">{title}</h1> : null}
              {description ? <p className="cr-hero-desc">{description}</p> : null}
            </>
          )}
        </div>
      </div>
    </header>
  );
}
