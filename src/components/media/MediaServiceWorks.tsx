import MediaProjectHead from "./MediaProjectHead";
import MediaWorksTile from "./MediaWorksTile";
import type { MediaServicePage } from "./media-service-page-data";

/* "نماذج من أعمالنا" — three projects of the portfolio that stand for this
   service, on the same tiles the /media/works grid uses (media.css narrows them
   for this three-column row), and the outline button through to the full
   listing. */
export default function MediaServiceWorks({
  service,
}: {
  service: MediaServicePage;
}) {
  return (
    <section className="sm-sv-works">
      <MediaProjectHead title="نماذج من أعمالنا" titleKey="sm_sv_works" dot="orange" />

      <div className="sm-sv-grid">
        {service.works.map((work) => (
          <MediaWorksTile key={work.key} work={work} />
        ))}
      </div>

      <div className="sm-sv-more">
        <a className="sm-btn-outline" href="/media/works">
          <span data-i18n="sm_sv_more">عرض المزيد</span>
        </a>
      </div>
    </section>
  );
}
