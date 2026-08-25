"use client";
import MediaSectionHead from "./MediaSectionHead";
import { IconRatingStar } from "@/components/ui/icons";
import { IconReviewQuote } from "./media-icons";
import { MEDIA_TESTIMONIALS } from "./media-testimonials-data";
import { useSnapSlider } from "./useSnapSlider";

/* "ماذا يقول عنّا عملاؤنا" — a centre-focused slider: the active card is
   full-strength while its neighbours sit behind it, dimmed and blurred (the
   design's 0.4 opacity + 2px blur). The centring comes from the track's side
   padding, so the first and last cards can still reach the middle — and the
   track opens on the second card, so the section is first seen with a card
   flanked on both sides rather than parked at its own edge. */
export default function MediaTestimonials() {
  const {
    trackRef,
    stops,
    active,
    activeSlide,
    onScroll,
    goTo,
    next,
    prev,
    dragProps,
  } = useSnapSlider(MEDIA_TESTIMONIALS.length, 1);

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

      <div className="sm-testi-track" ref={trackRef} onScroll={onScroll} {...dragProps}>
        {MEDIA_TESTIMONIALS.map((t, i) => (
          <article
            className={
              "sm-testi-card" +
              (i === activeSlide ? " active" : "") +
              /* only the centred card and its two neighbours are on show —
                 anything further out keeps its place in the track but fades
                 away, so no fourth card creeps in at the edges */
              (Math.abs(i - activeSlide) > 1 ? " is-far" : "")
            }
            key={t.key}
          >
            <span className="sm-testi-avatar">
              <img src={t.photo} alt="" draggable={false} />
              {/* the peach disc the design tucks under the avatar's inner corner */}
              <span className="sm-testi-quote-badge" aria-hidden="true">
                <IconReviewQuote />
              </span>
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
          {stops.map((stop, i) => (
            <button
              key={MEDIA_TESTIMONIALS[stop.slide].key}
              type="button"
              className={"sm-pager-dot" + (i === active ? " active" : "")}
              aria-label={`الرأي ${stop.slide + 1}`}
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
