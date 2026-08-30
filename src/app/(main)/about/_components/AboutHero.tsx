import SiteNav from "@/components/site/SiteNav";
import { localized, type AboutHeroContent } from "@/lib/api/pages";
import { AboutHeroSkeleton } from "./AboutSkeleton";
import BreadcrumbHome from "@/components/site/BreadcrumbHome";

/* Everything this section says comes from the API's `hero` block. There is no
   built-in copy behind it any more and no `data-i18n` key on the text: a field
   the API doesn't send is simply not rendered, and the language toggle is
   served by `lang` (the payload carries ar + en at once), not by the DOM
   translator. Dropping those keys is also what ended the removeChild crash —
   applyTranslations() no longer has anything of React's to rewrite here.

   The <header> shell around the copy is NOT conditional. <SiteNav /> lives
   inside it, and initHeaderPin() (lib/legacy-main) wraps `.nav-face` + `.navbar`
   into `.header-bar` once, right after mount; a header that appeared only when
   the payload landed would bring its nav up after that ran, leaving it
   unwrapped and the whole header misplaced. The breadcrumb stays for the same
   reason — it is site chrome, not page content, and the API doesn't send it. */
export default function AboutHero({
  data,
  lang = "ar",
  loading = false,
}: {
  data?: AboutHeroContent;
  lang?: string;
  /** The payload is still on its way — hold the hero's height with bars. */
  loading?: boolean;
}) {
  const title = localized(data?.title, lang);
  const description = localized(data?.description, lang);
  const image = data?.image_url;

  return (
    <header>
      {" "}
      <div
        className="about-header py-1"
        style={image ? { background: `url("${image}")` } : undefined}
      >
        {" "}
        <SiteNav />{" "}
        {/*  Mobile search panel (revealed by the mobile search icon)  */}{" "}
        <div className="container about-hero text-center text-white">
          {" "}
          <nav className="about-breadcrumb" aria-label="breadcrumb">
            {" "}
            <BreadcrumbHome />{" "}
            <i className="fa-solid fa-angle-left mx-2 about-breadcrumb-sep arrow"></i>{" "}
            <span className="about-breadcrumb-active" data-i18n="nav_about">
              من نحن
            </span>{" "}
          </nav>{" "}
          {loading ? (
            <AboutHeroSkeleton />
          ) : (
            <>
              {title ? <h1 className="about-hero-title">{title}</h1> : null}{" "}
              {description ? (
                <p className="about-hero-desc">{description}</p>
              ) : null}
            </>
          )}{" "}
        </div>{" "}
      </div>{" "}
    </header>
  );
}
