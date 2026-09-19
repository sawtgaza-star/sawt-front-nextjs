"use client";
import MediaProjectHead from "./MediaProjectHead";
import SnapSliderPlacer from "./SnapSliderPlacer";
import { useSnapSlider } from "./useSnapSlider";

const TRACK_ID = "sm-sv-track";
const OPENING_SLIDE = 1;

/* The stills of the service, dealt as the design's coverflow: the middle frame
   at full size with its two neighbours sitting back a little and running off
   both edges of the viewport. The track is full-bleed on purpose — its side
   padding is what lets the first and last frame still reach the middle — so it
   lives outside the container while the heading stays inside it.

   The track opens on the second frame, so the section is first seen with a
   neighbour either side rather than parked at its own edge.

   Heading and stills are both the API's (`service.title`, `service.gallery`);
   the strings arrive in the reader's language, so no `data-i18n` here. */
export default function MediaServiceGallery({
  title,
  gallery,
}: {
  title: string;
  gallery: string[];
}) {
  const { trackRef, stops, active, activeSlide, onScroll, goTo, next, prev, dragProps } =
    useSnapSlider(gallery.length, OPENING_SLIDE, true);

  if (!gallery.length) return null;

  return (
    <section className="sm-sv-gallery">
      <div className="container">
        <MediaProjectHead title={title} dot="orange" />
      </div>

      <div
        className="sm-sv-track"
        id={TRACK_ID}
        ref={trackRef}
        onScroll={onScroll}
        {...dragProps}
      >
        {gallery.map((src, i) => (
          <figure
            className={"sm-sv-shot" + (i === activeSlide ? " active" : "")}
            key={i}
          >
            <img src={src} alt="" draggable={false} />
          </figure>
        ))}
      </div>
      <SnapSliderPlacer trackId={TRACK_ID} slide={OPENING_SLIDE} />

      <div className="sm-pager sm-pager-olive">
        <button type="button" className="sm-pager-arrow" onClick={prev} aria-label="السابق">
          <i className="fa-solid fa-angle-right"></i>
        </button>

        <span className="sm-pager-dots">
          {stops.map((stop, i) => (
            <button
              key={stop.slide}
              type="button"
              className={"sm-pager-dot" + (i === active ? " active" : "")}
              aria-label={`الصورة ${stop.slide + 1}`}
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
