import SiteNav from "@/components/site/SiteNav";
import BreadcrumbHome from "@/components/site/BreadcrumbHome";
import { localized } from "@/lib/api/pages";
import type { TeamHeroContent } from "@/lib/api/team";
import { TeamHeroSkeleton } from "./TeamSkeleton";

/* Breadcrumb hero for the Team page (الفريق). Uses the content-creators hero
   styling (cr-* classes, from creators.css) with the same collage background,
   so the birds + sound-wave centre of the image frames the title — matching
   the mock. creators.css is imported by the team page.

   The copy and the backdrop come from the API's `hero` block. Called with no
   props — as /team/{id} does while its own request is in flight — it falls
   back to the built-in title and collage, which is also what a failed request
   leaves on screen. Once the payload lands the title is rendered without a
   `data-i18n` key: the payload carries ar and en at once and `lang` picks one,
   so the DOM translator has nothing to do and nothing of React's to overwrite.

   The <header> shell is NOT conditional. <SiteNav /> lives inside it and
   initHeaderPin() (lib/legacy-main) wraps `.nav-face` + `.navbar` into
   `.header-bar` right after mount; a header that appeared only once the
   payload landed would bring its nav up too late to be wrapped. The breadcrumb
   stays for the same reason — it is site chrome, and the API doesn't send it. */

const HERO_IMAGE = "/assets/images/heroSectionImg.jpeg";

export default function TeamHero({
  data,
  lang = "ar",
  loading = false,
}: {
  data?: TeamHeroContent;
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
            <span className="cr-breadcrumb-active" data-i18n="nav_team">
              الفريق
            </span>
          </nav>
          {loading ? (
            <TeamHeroSkeleton />
          ) : (
            <>
              {title ? <h1 className="cr-hero-title">{title}</h1> : null}
              {description ? (
                <p className="cr-hero-desc">{description}</p>
              ) : null}
            </>
          )}
        </div>
      </div>
    </header>
  );
}
