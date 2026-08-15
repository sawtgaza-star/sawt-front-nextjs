import { IconChevronLeftSmall } from "@/components/ui/icons";

/* Footer of a wizard step: rule, then "السابق" on the start side and the green
   forward button on the end side.
   Both sides render as a link when they leave the page (`prevHref`) and as a
   button when they act on the wizard (`onPrev` / `onNext`) — including the
   last screen, whose handler validates the contact e-mail before leaving, so
   it relabels itself ("اتمام العملية") and drops the chevron. Without either
   handler the forward control falls back to the "#" placeholder. */
export default function CheckoutNav({
  prevHref,
  onPrev,
  onNext,
  nextLabel = "التالي",
  nextLabelKey = "checkout_next",
  nextArrow = true,
}: {
  prevHref?: string;
  onPrev?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  nextLabelKey?: string;
  nextArrow?: boolean;
}) {
  /* points back = towards the start edge, so it is flipped in RTL */
  const backArrow = (
    <i className="sp-wizard-back-arrow" aria-hidden="true">
      <IconChevronLeftSmall />
    </i>
  );
  const backLabel = <span data-i18n="checkout_prev">السابق</span>;

  const nextInner = (
    <>
      <span data-i18n={nextLabelKey}>{nextLabel}</span>
      {nextArrow && (
        <i className="sp-wizard-next-arrow" aria-hidden="true">
          <IconChevronLeftSmall />
        </i>
      )}
    </>
  );

  return (
    <div className="sp-wizard-nav">
      {prevHref ? (
        <a href={prevHref} className="sp-wizard-back">
          {backArrow}
          {backLabel}
        </a>
      ) : (
        <button type="button" className="sp-wizard-back" onClick={onPrev}>
          {backArrow}
          {backLabel}
        </button>
      )}

      {onNext ? (
        <button type="button" className="sp-wizard-next" onClick={onNext}>
          {nextInner}
        </button>
      ) : (
        <a href="#" className="sp-wizard-next">
          {nextInner}
        </a>
      )}
    </div>
  );
}
