"use client";
import { localized, localizedHtml } from "@/lib/api/pages";
import { sortItems, type MediaTestimonialsContent } from "@/lib/api/media-page";
import MediaSectionHead from "./MediaSectionHead";
import RatingStars from "@/components/ui/RatingStars";
import { IconReviewQuote } from "./media-icons";
import { useSnapSlider } from "./useSnapSlider";
import RichText from "@/components/ui/RichText";

/* "ماذا يقول عنّا عملاؤنا" — a centre-focused slider: the active card is
   full-strength while its neighbours sit behind it, dimmed and blurred (the
   design's 0.4 opacity + 2px blur). The centring comes from the track's side
   padding, so the first and last cards can still reach the middle — and the
   track opens on the second card, so the section is first seen with a card
   flanked on both sides rather than parked at its own edge.

   The quotes are GET /pages/media's `testimonials` block. The stars follow an
   item's `rating`; the payload doesn't carry one yet, so until it does every
   card shows the design's four. */
const FALLBACK_RATING = 4;

export default function MediaTestimonials({
  data,
  lang = "ar",
}: {
  data?: MediaTestimonialsContent;
  lang?: string;
}) {
  const items = sortItems(data?.items);
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
  } = useSnapSlider(items.length, 1);

  if (!data || !items.length) return null;

  return (
    <section className="sm-testi">
      <div className="container">
        <MediaSectionHead
          pill={localized(data.eyebrow, lang)}
          title={localized(data.title, lang)}
          sub={localizedHtml(data.subtitle, lang)}
        />
      </div>

      <div className="sm-testi-track" ref={trackRef} onScroll={onScroll} {...dragProps}>
        {items.map((item, i) => (
          <article
            className={
              "sm-testi-card" +
              (i === activeSlide ? " active" : "") +
              /* only the centred card and its two neighbours are on show —
                 anything further out keeps its place in the track but fades
                 away, so no fourth card creeps in at the edges */
              (Math.abs(i - activeSlide) > 1 ? " is-far" : "")
            }
            key={i}
          >
            <span className="sm-testi-avatar">
              {item.avatar_url ? (
                <img src={item.avatar_url} alt="" draggable={false} />
              ) : null}
              {/* the peach disc the design tucks under the avatar's inner corner */}
              <span className="sm-testi-quote-badge" aria-hidden="true">
                <IconReviewQuote />
              </span>
            </span>

            <div className="sm-testi-stars" aria-hidden="true">
              <RatingStars value={item.rating ?? FALLBACK_RATING} />
            </div>

            <RichText as="p" className="sm-testi-quote" html={localizedHtml(item.quote, lang)} />

            <b className="sm-testi-name">{item.name}</b>
            <span className="sm-testi-meta">{localized(item.role, lang)}</span>
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
              key={i}
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
