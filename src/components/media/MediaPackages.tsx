"use client";
import { localized } from "@/lib/api/pages";
import {
  localizedFeatures,
  sortItems,
  type MediaPackagesContent,
} from "@/lib/api/media-page";
import MediaSectionHead from "./MediaSectionHead";
import { IconChevronLeftSmall } from "@/components/ui/icons";
import { PACKAGE_TONES, ctaHref, cycle, splitHighlight } from "./media-page-view";
import { useSnapSlider } from "./useSnapSlider";

/* "اختر باقتك" — the bundle cards on a snap track with the arrow+dot pager
   under them. Three cards fit at desktop width and the rest are paged in, so
   the dots come from the slider's measured stops rather than one per package
   (see useSnapSlider). Client component because of the pager.

   Everything the cards say is GET /pages/media's `packages` block; the tab
   colour walks the design's three tones down the list, and the heading's olive
   tail is split off the one string the API sends (see ./media-page-view). */
export default function MediaPackages({
  data,
  lang = "ar",
}: {
  data?: MediaPackagesContent;
  lang?: string;
}) {
  const items = sortItems(data?.items);
  const { trackRef, stops, active, onScroll, goTo, next, prev, dragProps } =
    useSnapSlider(items.length);

  if (!data || !items.length) return null;

  const [title, titleHl] = splitHighlight(localized(data.title, lang));
  const ctaLabel = localized(data.cta?.label, lang);

  return (
    <section className="sm-packages">
      <div className="container">
        <MediaSectionHead
          pill={localized(data.eyebrow, lang)}
          title={title}
          titleHl={titleHl}
          sub={localized(data.subtitle, lang)}
        />

        <div className="sm-pkg-track" ref={trackRef} onScroll={onScroll} {...dragProps}>
          {items.map((item, index) => (
            <article
              className={"sm-pkg sm-pkg-" + cycle(PACKAGE_TONES, index)}
              key={index}
            >
              <span className="sm-pkg-tab" aria-hidden="true"></span>

              <div className="sm-pkg-body">
                <h3 className="sm-pkg-title">{localized(item.title, lang)}</h3>
                <p className="sm-pkg-tagline">{localized(item.tagline, lang)}</p>
                <p className="sm-pkg-desc">{localized(item.description, lang)}</p>

                <ul className="sm-pkg-features">
                  {localizedFeatures(item.features, lang).map((feature, i) => (
                    <li key={i}>
                      <i aria-hidden="true"></i>
                      <span className="sm-pkg-feature-text">
                        <b>{feature.title}</b>
                        <small>{feature.description}</small>
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Goes to تواصل معنا, like the navbar and hero CTAs of the
                    same name — it used to jump back up the page to the
                    consultation block (#sm-consult), above this section. */}
                {ctaLabel ? (
                  <a className="sm-pkg-cta" href={ctaHref(data.cta, "/media/contact")}>
                    <span>{ctaLabel}</span>
                    <IconChevronLeftSmall />
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>

        <div className="sm-pager">
          <button
            type="button"
            className="sm-pager-arrow"
            onClick={prev}
            aria-label="السابق"
          >
            <i className="fa-solid fa-angle-right"></i>
          </button>

          <span className="sm-pager-dots">
            {stops.map((stop, i) => (
              <button
                key={i}
                type="button"
                className={"sm-pager-dot" + (i === active ? " active" : "")}
                aria-label={`الباقة ${stop.slide + 1}`}
                onClick={() => goTo(i)}
              ></button>
            ))}
          </span>

          <button
            type="button"
            className="sm-pager-arrow"
            onClick={next}
            aria-label="التالي"
          >
            <i className="fa-solid fa-angle-left"></i>
          </button>
        </div>
      </div>
    </section>
  );
}
