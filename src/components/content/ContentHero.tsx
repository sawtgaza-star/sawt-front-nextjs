import type { CSSProperties } from "react";
import SiteNav from "@/components/site/SiteNav";
import HeroReelsSlider from "./HeroReelsSlider";
import BreadcrumbHome from "@/components/site/BreadcrumbHome";
import { localized } from "@/lib/api/pages";
import type { ContentHeroContent } from "@/lib/api/content";
import { bySortOrder } from "./content-text";
import { heroSlides } from "./content-data";
import { ContentHeroSkeleton, ContentPostersSkeleton } from "./ContentSkeleton";

/* Breadcrumb hero for the محتوانا page. Reuses the creators/team hero classes
   (cr-*) so the breadcrumb, title and description match the rest of the site;
   the backdrop and the coverflow strip below come from the API's `hero` block.

   No `data-i18n` on the headline or the lead any more: the payload carries ar
   and en at once and `lang` picks one, so the DOM translator has nothing to do
   — and nothing of React's to overwrite. The breadcrumb keeps its key; it is
   site chrome, not page content, and the API doesn't send it.

   The <header> shell is NOT conditional. <SiteNav /> lives inside it and
   initHeaderPin() (lib/legacy-main) wraps `.nav-face` + `.navbar` into
   `.header-bar` right after mount; a header that appeared only once the
   payload landed would bring its nav up too late to be wrapped.

   THE BACKDROP is set through `--ct-hero-bg` rather than `background-image`:
   content.css declares that rule `!important` (it has to beat creators.css),
   and an inline style can't outrank an `!important` — but it can feed the
   custom property the rule reads, whose fallback is the bundled image. */
export default function ContentHero({
  data,
  lang = "ar",
  loading = false,
}: {
  data?: ContentHeroContent;
  lang?: string;
  /** The payload is still on its way — hold the hero's height with bars. */
  loading?: boolean;
}) {
  const title = localized(data?.title, lang);
  const description = localized(data?.description, lang);
  const backdrop = data?.image_url;
  const posters = bySortOrder(data?.items)
    .map((poster) => poster.image_url || "")
    .filter(Boolean);

  return (
    <header>
      <div
        className="cr-header ct-header py-1"
        style={
          backdrop
            ? ({ "--ct-hero-bg": `url("${backdrop}")` } as CSSProperties)
            : undefined
        }
      >
        <SiteNav />
        <div className="container cr-hero ct-hero">
          <nav className="cr-breadcrumb" aria-label="breadcrumb">
            <BreadcrumbHome />
            <i className="fa-solid fa-angle-left mx-2 cr-breadcrumb-sep arrow"></i>
            <span className="cr-breadcrumb-active" data-i18n="nav_content">
              محتوانا
            </span>
          </nav>
          {loading ? (
            <ContentHeroSkeleton />
          ) : (
            <>
              {title ? <h1 className="cr-hero-title">{title}</h1> : null}
              {description ? (
                <p className="cr-hero-desc ct-hero-desc">{description}</p>
              ) : null}
            </>
          )}
        </div>
        {loading ? (
          <div className="ct-hero-slider">
            <ContentPostersSkeleton />
          </div>
        ) : (
          <HeroReelsSlider slides={heroSlides(posters)} />
        )}
      </div>
    </header>
  );
}
