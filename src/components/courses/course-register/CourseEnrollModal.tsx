"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLang } from "@/lib/use-lang";
import { IconClose, IconStepCheck } from "./enroll-icons";
import { StepAcademic, StepGoals, StepPersonal } from "./EnrollSteps";
import { EMPTY_FORM, STEPS, type EnrollForm, type StepId } from "./register-data";

/* "أكمل تسجيلك في الدورة" — the three-step enrollment modal the course page's
   "اشترك الآن" button opens.

   Unlike the "انضم إلينا" modal this one is React state, not a legacy DOM
   script: which step is showing, what has been typed and what the stepper
   paints all come off `step` and `form` below. It borrows that modal's LOOK
   though — the `join-*` classes for the overlay, stepper, fields and footer,
   which style.css defines and this route loads — so the two forms are the
   same control set. Only what the design adds on top is new CSS, under
   `crs-en-*` in course.css: the gradient header, the dropdowns' caret, the
   yes/no pair and the character counter.

   Portalled to <body>: the card it opens from sits in a `position: sticky`
   aside with its own stacking context, so a modal rendered in place would be
   trapped inside it.

   THE FORM GOES NOWHERE YET. The course page has no API behind it at all (see
   course-data.ts), so submitting shows the confirmation pane and stops there —
   the same no-op the site's other forms are. */
export default function CourseEnrollModal({
  courseTitle,
  onClose,
}: {
  /** Shown in the confirmation pane so it names the course just registered. */
  courseTitle: string;
  onClose: () => void;
}) {
  const { tr } = useLang();
  const [step, setStep] = useState<StepId>(1);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState<EnrollForm>(EMPTY_FORM);
  const bodyRef = useRef<HTMLDivElement>(null);
  // drives the open transition: the overlay mounts closed, then opens
  const [shown, setShown] = useState(false);

  const set = <K extends keyof EnrollForm>(key: K, value: EnrollForm[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, []);

  /* Escape closes, and the page behind doesn't scroll while this is open. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [onClose]);

  // a new pane starts at its top, however far the last one was scrolled
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = 0;
  }, [step, done]);

  const next = () => {
    if (step < 3) {
      setStep((s) => (s + 1) as StepId);
      return;
    }
    setDone(true);
  };

  const back = () => {
    if (step > 1) setStep((s) => (s - 1) as StepId);
    else onClose();
  };

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className={"join-modal-overlay crs-en-overlay" + (shown ? " is-open" : "")}
      // a click on the backdrop itself closes; one inside the card does not
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="join-modal crs-en-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="crsEnrollTitle"
      >
        <div className="join-modal-head crs-en-head">
          <button
            type="button"
            className="join-modal-close crs-en-close"
            onClick={onClose}
            aria-label={tr("crs_en_close")}
          >
            <IconClose />
          </button>
          <h3 className="join-modal-title" id="crsEnrollTitle">
            {tr("crs_en_title")}
          </h3>
          <p className="join-modal-subtitle">{tr("crs_en_subtitle")}</p>
        </div>

        {done ? null : (
          <div className="join-stepper">
            {STEPS.map((entry, i) => (
              <Stepper
                key={entry.id}
                entry={entry}
                step={step}
                withLine={i > 0}
                tr={tr}
              />
            ))}
          </div>
        )}

        <div className="join-modal-body crs-en-body" ref={bodyRef}>
          {done ? (
            <div className="join-pane join-success is-active">
              <span className="join-success-icon">
                <i className="fa-solid fa-check"></i>
              </span>
              <h4 className="join-success-title">{tr("crs_en_done_title")}</h4>
              <p className="join-success-text">
                {tr("crs_en_done_text")} {courseTitle}
              </p>
            </div>
          ) : (
            <>
              {step === 1 && <StepPersonal form={form} set={set} tr={tr} />}
              {step === 2 && <StepAcademic form={form} set={set} tr={tr} />}
              {step === 3 && <StepGoals form={form} set={set} tr={tr} />}
            </>
          )}
        </div>

        <div className="join-modal-foot">
          {done ? (
            <button type="button" className="join-btn crs-en-next" onClick={onClose}>
              {tr("crs_en_close_btn")}
            </button>
          ) : (
            <>
              <button type="button" className="join-btn-ghost" onClick={back}>
                {tr(step === 1 ? "crs_en_cancel" : "crs_en_prev")}
              </button>
              <div className="join-dots">
                {STEPS.map((entry) => (
                  <span
                    key={entry.id}
                    className={"join-dot" + (entry.id === step ? " is-active" : "")}
                  ></span>
                ))}
              </div>
              <button type="button" className="join-btn crs-en-next" onClick={next}>
                {tr(step === 3 ? "crs_en_submit" : "crs_en_next")}
              </button>
            </>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}

/** One step of the header stepper, with the connector that precedes it.

    A step behind the current one is `is-done` — an orange disc with a tick,
    and the line leading to it turns orange too, which is what the design uses
    to show how far along the form is. */
function Stepper({
  entry,
  step,
  withLine,
  tr,
}: {
  entry: (typeof STEPS)[number];
  step: StepId;
  withLine: boolean;
  tr: (key: string) => string;
}) {
  const state =
    entry.id < step ? " is-done" : entry.id === step ? " is-active" : "";

  return (
    <>
      {withLine && (
        <span
          className={"join-step-line" + (entry.id <= step ? " is-active" : "")}
        ></span>
      )}
      <div className={"join-step" + state}>
        <span className="join-step-circle">
          <span className="join-step-num">{entry.id}</span>
          <i className="join-step-check">
            <IconStepCheck />
          </i>
        </span>
        <span className="join-step-label">{tr(entry.key)}</span>
      </div>
    </>
  );
}
