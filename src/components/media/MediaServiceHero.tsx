import { localized } from "@/lib/api/pages";
import type { MediaServiceHeroContent } from "@/lib/api/media-service";
import { ctaHref } from "./media-page-view";
import MediaNav from "./MediaNav";
import "@/styles/nav-skeleton.css";

/* Banner of /media/services/[slug] — the same dark collage the works listing
   and the case study use (media.css styles all three through `.sm-wp-hero`),
   with a three-step breadcrumb: الرئيسية › خدماتنا › اسم الخدمة. Only the last
   step is orange.

   `sm-wp-hero-plain` is the works listing's phone treatment, shared here: below
   md the collage drops away and the banner reads as ink on the page's own
   white, the way the artboard opens this page. Desktop is untouched.

   The banner is NOT conditional on the payload: <MediaNav /> lives inside it
   and its `.language-btn` is bound once by initTranslate(), so the shell is on
   screen from the first paint and only its text is drawn as bars while
   `loading` — see MediaHero for the full reasoning.

   Only the background photo is an override: `.sm-wp-hero` already carries the
   design's collage, so `backgroundImage` alone is set and the CSS keeps saying
   how it is positioned and sized. */
export default function MediaServiceHero({
  data,
  lang = "ar",
  loading = false,
}: {
  data?: MediaServiceHeroContent;
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
            <span className="nsk-line" style={{ width: "280px" }} />
          ) : (
            <>
              <a href={ctaHref(crumb?.home, "/media")}>
                {localized(crumb?.home?.label, lang)}
              </a>
              <i className="fa-solid fa-angle-left sm-wp-crumb-sep"></i>
              {/* from here the deck is on another page, so the crumb has to
                  cross back to /media before the anchor */}
              <a
                href={ctaHref(crumb?.services, "/media#sm-services", {
                  services: "/media#sm-services",
                })}
              >
                {localized(crumb?.services?.label, lang)}
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
