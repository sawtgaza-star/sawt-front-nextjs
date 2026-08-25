import { IconCircleCheck } from "@/components/ui/icons";
import MediaProjectHead from "./MediaProjectHead";
import type { MediaServicePage } from "./media-service-page-data";

/* "ماذا تشمل الخدمة" — the service's own description as the paragraph (the
   design reuses it here rather than writing a second one), then the three
   points of the scope, each a chip with the design's olive circle-check. */
export default function MediaServiceIncludes({
  service,
}: {
  service: MediaServicePage;
}) {
  return (
    <section className="sm-sv-includes">
      <MediaProjectHead
        title="ماذا تشمل الخدمة"
        titleKey="sm_sv_includes"
        dot="orange"
      />
      <p className="sm-sv-text" data-i18n={service.descKey}>
        {service.desc}
      </p>

      <div className="sm-sv-features">
        {service.features.map((f) => (
          <span className="sm-sv-feature" key={f.key}>
            <IconCircleCheck />
            <span data-i18n={f.key}>{f.text}</span>
          </span>
        ))}
      </div>
    </section>
  );
}
