"use client";
import MediaSectionHead from "./MediaSectionHead";
import { IconRatingStar } from "@/components/ui/icons";
import { MEDIA_TESTIMONIALS } from "./media-testimonials-data";
import { useSnapSlider } from "./useSnapSlider";

/* "ماذا يقول عنّا عملاؤنا" — a centre-focused slider: the active card is
   full-strength while its neighbours sit behind it, dimmed and blurred (the
   design's 0.4 opacity + 2px blur). The centring comes from the track's side
   padding, so the first and last cards can still reach the middle. */
export default function MediaTestimonials() {
  const { trackRef, active, onScroll, goTo, next, prev } = useSnapSlider(
    MEDIA_TESTIMONIALS.length
  );

  return (
    <section className="sm-testi">
      <div className="container">
        <MediaSectionHead
          pill="اراء العملاء"
          pillKey="sm_testi_pill"
          title="ماذا يقول عنّا عملاؤنا"
          titleKey="sm_testi_title"
          sub="باقات متخصصة حسب نوع الخدمة — كل باقة مصممة لتلبية احتياجات محددة بدقة."
          subKey="sm_pkg_sub"
        />
      </div>

      <div className="sm-testi-track" ref={trackRef} onScroll={onScroll}>
        {MEDIA_TESTIMONIALS.map((t, i) => (
          <article
            className={"sm-testi-card" + (i === active ? " active" : "")}
            key={t.key}
          >
            <span className="sm-testi-avatar">
              <img src={t.photo} alt="" draggable={false} />
            </span>

            <div className="sm-testi-stars" aria-hidden="true">
              {Array.from({ length: 5 }, (_, s) => (
                <IconRatingStar key={s} filled={s < t.rating} />
              ))}
            </div>

            <p className="sm-testi-quote" data-i18n={t.quoteKey}>
              {t.quote}
            </p>

            <b className="sm-testi-name" data-i18n={t.nameKey}>
              {t.name}
            </b>
            <span className="sm-testi-meta" data-i18n={t.metaKey}>
              {t.meta}
            </span>
          </article>
        ))}
      </div>

      <div className="sm-pager sm-pager-olive">
        <button type="button" className="sm-pager-arrow" onClick={prev} aria-label="السابق">
          <i className="fa-solid fa-angle-right"></i>
        </button>

        <span className="sm-pager-dots">
          {MEDIA_TESTIMONIALS.map((t, i) => (
            <button
              key={t.key}
              type="button"
              className={"sm-pager-dot" + (i === active ? " active" : "")}
              aria-label={`الرأي ${i + 1}`}
              onClick={() => goTo(i)}
            ></button>
          ))}
        </span>

        <button type="button" className="sm-pager-arrow" onClick={next} aria-label="التالي">
          <i className="fa-solid fa-angle-left"></i>
        </button>
      </div>
    </section>
  );
}
