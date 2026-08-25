"use client";
import MediaSectionHead from "./MediaSectionHead";
import { IconChevronLeftSmall } from "@/components/ui/icons";
import { MEDIA_PACKAGES } from "./media-packages-data";
import { useSnapSlider } from "./useSnapSlider";

/* "اختر باقتك" — the bundle cards on a snap track with the arrow+dot pager
   under them. Three cards fit at desktop width and the rest are paged in, so
   the dots come from the slider's measured stops rather than one per package
   (see useSnapSlider). Client component because of the pager; the cards
   themselves are plain markup driven by media-packages-data. */
export default function MediaPackages() {
  const { trackRef, stops, active, onScroll, goTo, next, prev, dragProps } =
    useSnapSlider(MEDIA_PACKAGES.length);

  return (
    <section className="sm-packages">
      <div className="container">
        <MediaSectionHead
          pill="الباقات"
          pillKey="sm_pkg_pill"
          title="جمعنا لك الخدمات المناسبة في باقة واحدة ,"
          titleKey="sm_pkg_title"
          titleHl="اختر باقتك"
          titleHlKey="sm_pkg_title_hl"
          sub="باقات متخصصة حسب نوع الخدمة — كل باقة مصممة لتلبية احتياجات محددة بدقة."
          subKey="sm_pkg_sub"
        />

        <div className="sm-pkg-track" ref={trackRef} onScroll={onScroll} {...dragProps}>
          {MEDIA_PACKAGES.map((p) => (
            <article className={"sm-pkg sm-pkg-" + p.tone} key={p.key}>
              <span className="sm-pkg-tab" aria-hidden="true"></span>

              <div className="sm-pkg-body">
                <h3 className="sm-pkg-title" data-i18n={p.titleKey}>
                  {p.title}
                </h3>
                <p className="sm-pkg-tagline" data-i18n={p.taglineKey}>
                  {p.tagline}
                </p>
                <p className="sm-pkg-desc" data-i18n={p.descKey}>
                  {p.desc}
                </p>

                <ul className="sm-pkg-features">
                  {p.features.map((f) => (
                    <li key={f.key}>
                      <i aria-hidden="true"></i>
                      <span className="sm-pkg-feature-text">
                        <b data-i18n={"sm_pkg_f_" + f.key}>{f.name}</b>
                        <small data-i18n={f.noteKey}>{f.note}</small>
                      </span>
                    </li>
                  ))}
                </ul>

                <a className="sm-pkg-cta" href="#sm-consult">
                  <span data-i18n="sm_cta_start">ابدأ مشروعك</span>
                  <IconChevronLeftSmall />
                </a>
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
                key={MEDIA_PACKAGES[stop.slide].key}
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
