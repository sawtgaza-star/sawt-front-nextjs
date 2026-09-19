import { localized } from "@/lib/api/pages";
import type { MediaWorksHeroContent } from "@/lib/api/media-works";
import { ctaHref } from "./media-page-view";
import MediaNav from "./MediaNav";
import "@/styles/nav-skeleton.css";

/* Banner of /media/works — the صوت photo collage (heroSectionImg) under an
   olive veil, with صوت ميديا's own navbar on top of it, then the breadcrumb and
   the headline. Unlike /media's hero this one is dark, so the nav's
   "العودة لمنصة صوت" link flips to white (media.css).

   `sm-wp-hero-plain` is what sets this banner apart from the other three that
   share `.sm-wp-hero`: on a phone it drops the collage and reads as ink on the
   page's own white, the way every other page opens on mobile.

   The banner is NOT conditional on the payload: <MediaNav /> lives inside it
   and its `.language-btn` is bound once by initTranslate(), so the shell is on
   screen from the first paint and only its text is drawn as bars while
   `loading` — see MediaHero for the full reasoning.

   `.sm-wp-hero` already carries the design's collage, so only `backgroundImage`
   is overridden when the payload names one and the CSS keeps saying how it is
   positioned and sized. */
export default function MediaWorksHero({
  data,
  lang = "ar",
  loading = false,
}: {
  data?: MediaWorksHeroContent;
  lang?: string;
  loading?: boolean;
}) {
  const crumb = data?.breadcrumb;
  const title = localized(data?.title, lang);
  const current = localized(crumb?.current, lang);
  const image = data?.image_url;

  return (
    <header
      className="sm-wp-hero sm-wp-hero-plain"
      style={image ? { backgroundImage: `url("${image}")` } : undefined}
    >
      <span className="sm-wp-hero-veil" aria-hidden="true" />

      <MediaNav base="/media" />

      <div className="container sm-wp-hero-text">
        <nav className="sm-wp-crumb" aria-label="breadcrumb">
          {loading ? (
            <span className="nsk-line" style={{ width: "190px" }} />
          ) : (
            <>
              {/* `home` means صوت ميديا's landing page here, not the site's —
                  the same rule BreadcrumbHome applies by path */}
              <a href={ctaHref(crumb?.home, "/media", { home: "/media" })}>
                {localized(crumb?.home?.label, lang)}
              </a>
              <i className="fa-solid fa-angle-left sm-wp-crumb-sep"></i>
              <span className="sm-wp-crumb-active">{current}</span>
            </>
          )}
        </nav>
        {loading ? (
          <h1 className="sm-wp-hero-title">
            <span className="nsk-line" style={{ width: "min(520px, 80%)", height: "28px" }} />
          </h1>
        ) : title ? (
          <h1 className="sm-wp-hero-title">{title}</h1>
        ) : null}
      </div>
    </header>
  );
}
