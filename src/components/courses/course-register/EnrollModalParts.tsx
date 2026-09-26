"use client";
import { localized } from "@/lib/api/pages";
import type { CourseSubscribeResponse } from "@/lib/api/courses";
import { IconStepCheck } from "./enroll-icons";
import { STEPS, type StepId } from "./register-data";

/* The enrollment modal's chrome, kept apart from its state (CourseEnrollModal):
   the header stepper and the confirmation pane's footer button. */

/** After a 201: the confirmation's own "تصفح كورسات ثانية" link when it sends
    one, otherwise a plain close. */
export function DoneButton({
  result,
  onClose,
  lang,
  tr,
}: {
  /** null after the "already subscribed" answer — a plain close then. */
  result: CourseSubscribeResponse | null;
  onClose: () => void;
  lang: string;
  tr: (key: string) => string;
}) {
  const cta = result?.data?.confirmation?.cta;
  const label = localized(cta?.label, lang);
  if (cta?.url && label) {
    return (
      <a className="join-btn crs-en-next" href={cta.url}>
        {label}
      </a>
    );
  }
  return (
    <button type="button" className="join-btn crs-en-next" onClick={onClose}>
      {tr("crs_en_close_btn")}
    </button>
  );
}

/** One step of the header stepper, with the connector that precedes it.

    A step behind the current one is `is-done` — an orange disc with a tick,
    and the line leading to it turns orange too, which is what the design uses
    to show how far along the form is. */
export function Stepper({
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
