import type { CSSProperties } from "react";
import SiteNav from "@/components/site/SiteNav";
import HeroReelsSlider from "./HeroReelsSlider";
import BreadcrumbHome from "@/components/site/BreadcrumbHome";
import type { ContentHeroContent, ContentReels } from "@/lib/api/content";
import { bySortOrder } from "./content-text";
import { heroSlides, type HeroSlide } from "./content-data";
import { ContentPostersSkeleton } from "./ContentSkeleton";
import ContentHeroStats from "./ContentHeroStats";

/* Breadcrumb hero for the محتوانا page. Reuses the creators/team hero classes
   (cr-*) so the breadcrumb matches the rest of the site; the backdrop and the
   coverflow strip below come from the API's `hero` block.

   The hero's headline and lead are deliberately not rendered (the API still
   sends `hero.title` / `hero.description`): the page opens straight onto the
   reels strip, so it sits in the first screen. The breadcrumb keeps its
   data-i18n key; it is site chrome, not page content.

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
  reelsBlock,
  reelPosters = [],
  onSelectReel,
  lang = "ar",
  loading = false,
}: {
  data?: ContentHeroContent;
  /** The reels block — what the views / videos cards count. */
  reelsBlock?: ContentReels | null;
  /** The reels' thumbnails — what the strip fans out; a tap on one scrolls
      down to that reel (`onSelectReel`). */
  reelPosters?: HeroSlide[];
  onSelectReel?: (reelId: string) => void;
  lang?: string;
  /** The payload is still on its way — hold the hero's height with bars. */
  loading?: boolean;
}) {
  const backdrop = data?.image_url;
  const heroPosters: HeroSlide[] = bySortOrder(data?.items)
    .map((poster) => ({ src: poster.image_url || "" }))
    .filter((poster) => poster.src);
  // the reels' own thumbnails first (each leads to its video below); else the
  // editor's `hero.items`; else no strip
  const reels = reelPosters.filter((poster) => poster.src);
  const posters = reels.length ? reels : heroPosters;

  return (
    <header>
      <div
        className={`cr-header ct-header py-1${loading ? " hero-bg-loading" : ""}`}
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
        </div>
        {loading ? null : <ContentHeroStats reels={reelsBlock} lang={lang} />}
        {loading ? (
          <div className="ct-hero-slider">
            <ContentPostersSkeleton />
          </div>
        ) : posters.length ? (
          <HeroReelsSlider slides={heroSlides(posters)} onSelect={onSelectReel} />
        ) : null}
      </div>
    </header>
  );
}
