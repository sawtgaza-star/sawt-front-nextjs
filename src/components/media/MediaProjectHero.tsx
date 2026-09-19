import { localized } from "@/lib/api/pages";
import type { MediaWorkHeroContent } from "@/lib/api/media-work";
import { ctaHref } from "./media-page-view";
import MediaNav from "./MediaNav";
import "@/styles/nav-skeleton.css";

/* Banner of /media/works/[slug] — the same dark collage the works listing uses
   (media.css styles both through `.sm-wp-hero`), with a three-step breadcrumb:
   أعمالنا › القسم › اسم المشروع. Only the last step is orange.

   `sm-wp-hero-plain` is the works listing's phone treatment, shared here as it
   already is on the service page: below md the collage drops away and the
   banner reads as ink on the page's own white. Desktop is untouched.

   The banner is NOT conditional on the payload: <MediaNav /> lives inside it
   and its `.language-btn` is bound once by initTranslate(), so the shell is on
   screen from the first paint and only its text is drawn as bars while
   `loading` — see MediaHero for the full reasoning. */
export default function MediaProjectHero({
  data,
  lang = "ar",
  loading = false,
}: {
  data?: MediaWorkHeroContent;
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
            <span className="nsk-line" style={{ width: "300px" }} />
          ) : (
            <>
              {/* the works crumb means the full portfolio, which is a page of
                  its own — the payload's `/media#works` is the wall on /media */}
              <a href={ctaHref(crumb?.works, "/media/works")}>
                {localized(crumb?.works?.label, lang)}
              </a>
              <i className="fa-solid fa-angle-left sm-wp-crumb-sep"></i>
              <a href={crumb?.service?.path || "/media/works"}>
                {localized(crumb?.service?.label, lang)}
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
