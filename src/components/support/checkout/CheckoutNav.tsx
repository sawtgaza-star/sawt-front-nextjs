import { IconChevronLeftSmall } from "@/components/ui/icons";

/* Footer of a wizard step: rule, then "السابق" on the start side and the green
   forward button on the end side.
   Both sides render as a link when they leave the page (`prevHref`) and as a
   button when they only move the wizard on (`onPrev` / `onNext`). The last
   screen has nowhere to go yet, so its forward control stays the "#"
   placeholder the payment-method cards used before this step existed. */
export default function CheckoutNav({
  prevHref,
  onPrev,
  onNext,
}: {
  prevHref?: string;
  onPrev?: () => void;
  onNext?: () => void;
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
      <span data-i18n="checkout_go_to_platform">
        الانتقال إلى المنصة والمتابعة
      </span>
      <i className="sp-wizard-next-arrow" aria-hidden="true">
        <IconChevronLeftSmall />
      </i>
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
