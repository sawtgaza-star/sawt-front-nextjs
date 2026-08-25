import type { MediaService } from "./media-services-data";

/* One service card. The giant translucent number is a decorative watermark
   (400px Cairo black in the design) — aria-hidden, and it is the reason the
   card clips its overflow. It sits inside .sm-svc-copy so it always lands on
   the text side of the card, never over the photo. */
export default function MediaServiceCard({
  service,
  reverse,
}: {
  service: MediaService;
  reverse: boolean;
}) {
  return (
    <article
      className={
        "sm-svc sm-svc-" + service.theme + (reverse ? " sm-svc-reverse" : "")
      }
      data-service={service.key}
    >
      <div className="sm-svc-copy">
        <span className="sm-svc-watermark" aria-hidden="true">
          {service.num}
        </span>
        <span className="sm-svc-num" aria-hidden="true">
          <i></i>
          {service.num}
        </span>
        <h3 className="sm-svc-title" data-i18n={service.titleKey}>
          {service.title}
        </h3>
        <p className="sm-svc-tagline" data-i18n={service.taglineKey}>
          {service.tagline}
        </p>

        <div className="sm-svc-tags">
          {service.tags.map((t) => (
            <span className="sm-svc-tag" key={t.key} data-i18n={t.key}>
              {t.text}
            </span>
          ))}
        </div>

        <p className="sm-svc-desc" data-i18n={service.descKey}>
          {service.desc}
        </p>

        <a
          className="sm-btn-green sm-svc-btn"
          href={"/media/services/" + service.key}
        >
          <span data-i18n="sm_svc_more">استكشف المزيد</span>
          <i className="fa-solid fa-arrow-left-long"></i>
        </a>
      </div>

      <div className="sm-svc-media">
        <img src={service.photo} alt="" />
      </div>
    </article>
  );
}
