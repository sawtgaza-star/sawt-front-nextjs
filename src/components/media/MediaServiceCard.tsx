import type { ServiceTheme } from "./media-page-view";

/** One card of the services deck, already resolved to the current language. */
export type ServiceCard = {
  number: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  imageUrl: string | null;
  href: string;
  ctaLabel: string;
  theme: ServiceTheme;
};

/* One service card. The giant translucent number is a decorative watermark
   (400px Cairo black in the design) — aria-hidden, and it is the reason the
   card clips its overflow. It sits inside .sm-svc-copy so it always lands on
   the text side of the card, never over the photo.

   Everything the card says is GET /pages/media's; the palette and which side
   the photo takes are the design's, decided by the card's position in the list
   (see MediaServicesSlider). */
export default function MediaServiceCard({
  service,
  reverse,
}: {
  service: ServiceCard;
  reverse: boolean;
}) {
  return (
    <article
      className={
        "sm-svc sm-svc-" + service.theme + (reverse ? " sm-svc-reverse" : "")
      }
    >
      <div className="sm-svc-copy">
        <span className="sm-svc-watermark" aria-hidden="true">
          {service.number}
        </span>
        <span className="sm-svc-num" aria-hidden="true">
          <i></i>
          {service.number}
        </span>
        <h3 className="sm-svc-title">{service.title}</h3>
        <p className="sm-svc-tagline">{service.tagline}</p>

        <div className="sm-svc-tags">
          {service.tags.map((tag, index) => (
            <span className="sm-svc-tag" key={index}>
              {tag}
            </span>
          ))}
        </div>

        <p className="sm-svc-desc">{service.description}</p>

        {service.ctaLabel ? (
          <a className="sm-btn-green sm-svc-btn" href={service.href}>
            <span>{service.ctaLabel}</span>
            <i className="fa-solid fa-arrow-left-long"></i>
          </a>
        ) : null}
      </div>

      <div className="sm-svc-media">
        {service.imageUrl ? <img src={service.imageUrl} alt="" /> : null}
      </div>
    </article>
  );
}
