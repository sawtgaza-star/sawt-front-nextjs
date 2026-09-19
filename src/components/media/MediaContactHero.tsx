import { localized } from "@/lib/api/pages";
import type { MediaContactHeroContent } from "@/lib/api/media-contact";
import MediaNav from "./MediaNav";
import BreadcrumbHome from "@/components/site/BreadcrumbHome";
import "@/styles/nav-skeleton.css";

/* Banner of /media/contact — the same dark collage the works listing and the
   case studies use (media.css styles them all through `.sm-wp-hero`), with the
   two-step breadcrumb الرئيسية › تواصل معنا and a line of copy under the
   headline, which is what sets this banner apart from the others.

   `sm-wp-hero-plain` is the phone treatment the other banners share: the
   collage drops away and the crumb reads as ink on the page's own white.
   `sm-ct-hero` is this page's own hook — the artboard runs the crumb straight
   into the still, so the headline and its line step out below md (media.css).
   Desktop is untouched.

   The headline and the line under it come from GET /pages/media/contact; the
   crumb does not — the payload carries no breadcrumb, so it stays the page's
   own translated markup. The banner is NOT conditional on the payload:
   <MediaNav /> lives inside it and its `.language-btn` is bound once by
   initTranslate(), so the shell is on screen from the first paint and only its
   text is drawn as bars while `loading` (same as MediaWorksHero). */
export default function MediaContactHero({
  data,
  lang = "ar",
  loading = false,
}: {
  data?: MediaContactHeroContent;
  lang?: string;
  loading?: boolean;
}) {
  const title = localized(data?.title, lang);
  const subtitle = localized(data?.subtitle, lang);

  return (
    <header className="sm-wp-hero sm-wp-hero-plain sm-ct-hero">
      <span className="sm-wp-hero-veil" aria-hidden="true" />

      <MediaNav base="/media" />

      <div className="container sm-wp-hero-text">
        <nav className="sm-wp-crumb" aria-label="breadcrumb">
          <BreadcrumbHome />
          <i className="fa-solid fa-angle-left sm-wp-crumb-sep"></i>
          <span className="sm-wp-crumb-active" data-i18n="sm_ct_crumb">
            تواصل معنا
          </span>
        </nav>

        {loading ? (
          <>
            <h1 className="sm-wp-hero-title">
              <span className="nsk-line" style={{ width: "min(320px, 60%)", height: "28px" }} />
            </h1>
            <p className="sm-ct-hero-sub">
              <span className="nsk-line" style={{ width: "min(520px, 85%)" }} />
            </p>
          </>
        ) : (
          <>
            {title ? <h1 className="sm-wp-hero-title">{title}</h1> : null}
            {subtitle ? <p className="sm-ct-hero-sub">{subtitle}</p> : null}
          </>
        )}
      </div>
    </header>
  );
}
