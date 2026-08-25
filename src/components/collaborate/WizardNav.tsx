import { IconArrowUpLeftThin, IconChevronLeftSmall } from "@/components/ui/icons";

/* Footer of a wizard step: rule, then the back control on the start side, the
   step dots in the middle and the green forward button on the end side.
   Step 1's back control cancels the whole thing ("الغاء") instead of stepping
   back, and the last step's forward button submits ("تسليم الطلب").
   `total` is the flow's step count — three for /collaborate/creator, /funding
   and /partnership, two for /collaborate/other. */
export default function WizardNav({
  index,
  total,
  onBack,
  onNext,
}: {
  index: number;
  total: number;
  onBack: () => void;
  onNext: () => void;
}) {
  const first = index === 0;
  const last = index === total - 1;

  return (
    <div className="cl-nav">
      <button type="button" className="cl-nav-back" onClick={onBack}>
        {first ? (
          <span data-i18n="collab_cancel">الغاء</span>
        ) : (
          <>
            <span data-i18n="collab_prev">السابق</span>
            <i className="cl-nav-back-arrow" aria-hidden="true">
              <IconChevronLeftSmall />
            </i>
          </>
        )}
      </button>

      <span className="cl-nav-dots" aria-hidden="true">
        {Array.from({ length: total }, (_, i) => (
          <span
            key={i}
            className={"cl-nav-dot" + (i === index ? " is-on" : "")}
          ></span>
        ))}
      </span>

      <button type="button" className="cl-nav-next" onClick={onNext}>
        {last ? (
          <>
            <span data-i18n="collab_submit">تسليم الطلب</span>
            {/* diagonal, not a chevron — English mirrors it instead of turning
                it upside down (see .is-diagonal in collaborate.css) */}
            <i className="cl-nav-next-arrow is-diagonal" aria-hidden="true">
              <IconArrowUpLeftThin />
            </i>
          </>
        ) : (
          <>
            <span data-i18n="collab_next">التالي</span>
            <i className="cl-nav-next-arrow" aria-hidden="true">
              <IconChevronLeftSmall />
            </i>
          </>
        )}
      </button>
    </div>
  );
}
