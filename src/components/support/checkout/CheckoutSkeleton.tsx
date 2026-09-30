import "@/styles/creators-skeleton.css";

/* What the donation wizard shows while GET /support/methods/category/{key}
   is in flight: the steps card, the "اختر وسيلة الدفع" title, the platform
   options and the notes panel. The bars sit inside the REAL wrappers
   (.sp-steps-card, .sp-pay-row) so the screen arrives into the same layout. */
export default function CheckoutSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="sp-wizard" aria-busy="true" aria-hidden="true">
      <div className="sp-steps-card">
        <span className="sk-line sp-sk-counter" />
        <div className="sp-sk-steps">
          {Array.from({ length: 4 }, (_, i) => (
            <span key={i} className="sp-sk-step">
              <span className="sk-block sp-sk-step-icon" />
              <span className="sk-line sp-sk-step-label" />
            </span>
          ))}
        </div>
      </div>

      <span className="sk-line-title sp-sk-pay-title" />
      <div className="sp-pay-row">
        {Array.from({ length: count }, (_, i) => (
          <span key={i} className="sk-block sp-sk-pay-option" />
        ))}
      </div>
      <span className="sk-block sp-sk-notes" />
    </div>
  );
}
