import { localized } from "@/lib/api/pages";
import type { MediaCreatorsContent } from "@/lib/api/media-page";
import { IconChevronLeftSmall } from "@/components/ui/icons";
import { ctaHref } from "@/components/media/media-page-view";

/* "خطوات التعاون" under the creators panel — the block's `steps_title`
   between two hairlines, its numbered `steps`, and its `cta` as the green
   pill (a plain <a>, like the packages' buttons). Each part is left out when
   the editor leaves it empty. */
export default function CreatorSteps({
  data,
  lang,
}: {
  data: MediaCreatorsContent;
  lang: string;
}) {
  const title = localized(data.steps_title, lang);
  const steps = (data.steps ?? [])
    .map((step, index) => ({
      number: step.number || String(index + 1).padStart(2, "0"),
      text: localized(step.text, lang),
    }))
    .filter((step) => step.text);
  const ctaLabel = localized(data.cta?.label, lang);
  if (!title && !steps.length && !ctaLabel) return null;

  return (
    <div className="sm-cc-steps">
      {title ? (
        <h3 className="sm-cc-steps-title">
          <span>{title}</span>
        </h3>
      ) : null}
      {steps.length ? (
        <ol className="sm-cc-steps-list">
          {steps.map((step, index) => (
            <li key={index}>
              <span className="sm-cc-step-num">{step.number}</span>
              <span>{step.text}</span>
            </li>
          ))}
        </ol>
      ) : null}
      {ctaLabel ? (
        <div className="sm-cc-cta-wrap">
          <a className="sm-cc-cta" href={ctaHref(data.cta, "/media/contact")}>
            <span>{ctaLabel}</span>
            <IconChevronLeftSmall />
          </a>
        </div>
      ) : null}
    </div>
  );
}
