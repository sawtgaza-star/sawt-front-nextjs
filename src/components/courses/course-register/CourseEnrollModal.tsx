"use client";
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/use-lang";
import { apiMessage } from "@/lib/api/messages";
import CourseModal from "./CourseModal";
import { StepAcademic, StepGoals, StepPersonal } from "./EnrollSteps";
import EnrollDone, { EnrollAlready } from "./EnrollDone";
import { DoneButton, Stepper } from "./EnrollModalParts";
import {
  FORM_TO_API,
  firstStepWithError,
  useCourseSubscribe,
  validateStep,
} from "./useCourseSubscribe";
import { EMPTY_FORM, STEPS, type EnrollForm, type StepId } from "./register-data";

/* "أكمل تسجيلك في الدورة" — the three-step enrollment modal the course page's
   "اشترك الآن" button opens.

   Unlike the "انضم إلينا" modal this one is React state, not a legacy DOM
   script: which step is showing, what has been typed and what the stepper
   paints all come off `step` and `form` below. The frame (overlay, header,
   Escape, scroll lock, portal) is ./CourseModal, shared with the waiting list.

   The last step POSTs to the course's own subscribe endpoint (see
   ./useCourseSubscribe). A 422 sends the visitor back to the first pane with
   something to fix, its messages under the fields they name; a 201 swaps the
   panes for the server's confirmation (./EnrollDone). */
export default function CourseEnrollModal({
  path,
  onClose,
}: {
  /** The subscribe endpoint, relative to the API base. */
  path: string;
  onClose: () => void;
}) {
  const { lang, tr } = useLang();
  const [step, setStep] = useState<StepId>(1);
  const [form, setForm] = useState<EnrollForm>(EMPTY_FORM);
  const { pending, error, fieldErrors, result, duplicate, submit, clearField, fail } =
    useCourseSubscribe(path);
  const done = result !== null || duplicate !== null;
  const hasFieldErrors = Object.keys(fieldErrors).length > 0;
  const bodyRef = useRef<HTMLDivElement>(null);

  const set = <K extends keyof EnrollForm>(key: K, value: EnrollForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    clearField(...(FORM_TO_API[key] ?? []));
  };
  /** The API's first message for a field, in the current language. */
  const fieldError = (name: string) => {
    const message = fieldErrors[name]?.[0];
    // the browser's own notes are i18n keys; the API's are Arabic sentences
    return message?.startsWith("crs_en_") ? tr(message) : apiMessage(message);
  };

  // a new pane starts at its top, however far the last one was scrolled
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = 0;
  }, [step, done]);

  const next = async () => {
    const missing = validateStep(step, form);
    if (Object.keys(missing).length) {
      fail(missing);
      return;
    }
    if (step < 3) {
      setStep((s) => (s + 1) as StepId);
      return;
    }
    const errors = await submit(form);
    const back = errors && firstStepWithError(errors);
    if (back) setStep(back);
  };

  const back = () => {
    if (step > 1) setStep((s) => (s - 1) as StepId);
    else onClose();
  };

  return (
    <CourseModal
      title={tr("crs_en_title")}
      subtitle={tr("crs_en_subtitle")}
      closeLabel={tr("crs_en_close")}
      onClose={onClose}
      bodyRef={bodyRef}
      above={
        done ? null : (
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
        )
      }
      footer={
        <>
          {done ? (
            <DoneButton result={result} onClose={onClose} lang={lang} tr={tr} />
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
              <button
                type="button"
                className="join-btn crs-en-next"
                onClick={next}
                disabled={pending}
              >
                {tr(pending ? "crs_en_sending" : step === 3 ? "crs_en_submit" : "crs_en_next")}
              </button>
            </>
          )}
        </>
      }
    >
      {done ? (
        result ? (
          <EnrollDone result={result} lang={lang} tr={tr} />
        ) : (
          <EnrollAlready message={duplicate ?? ""} tr={tr} />
        )
      ) : (
        <>
          {step === 1 && <StepPersonal form={form} set={set} tr={tr} error={fieldError} />}
          {step === 2 && <StepAcademic form={form} set={set} tr={tr} error={fieldError} />}
          {step === 3 && <StepGoals form={form} set={set} tr={tr} error={fieldError} />}
          {/* A 422's top-level message only echoes the first field note,
              already under its box — the banner is for everything else
              (a 401, a 500, a dropped connection). */}
          {error && !hasFieldErrors && (
            <p className="join-field-error crs-en-error" role="alert">
              {apiMessage(error)}
            </p>
          )}
        </>
      )}
    </CourseModal>
  );
}
