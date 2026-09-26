"use client";
import { localized } from "@/lib/api/pages";
import { apiMessage } from "@/lib/api/messages";
import type { CourseSubscribeResponse } from "@/lib/api/courses";

/* The confirmation pane after a successful subscription — the server's own
   `confirmation` block: its greeting, its "under review" note, the course,
   the request's status and where the acceptance email will go. The greeting
   and notes arrive in Arabic only (the API ignores Accept-Language), so they
   are shown as sent; the course name and status are { ar, en } pairs. */
export default function EnrollDone({
  result,
  lang,
  tr,
}: {
  result: CourseSubscribeResponse;
  lang: string;
  tr: (key: string) => string;
}) {
  const confirmation = result.data?.confirmation;
  const title =
    confirmation?.title || apiMessage(result.message) || tr("crs_en_done_title");
  const courseName = localized(confirmation?.course_name, lang);
  const status = localized(confirmation?.course_status?.label, lang);

  return (
    <div className="join-pane join-success is-active">
      <span className="join-success-icon">
        <i className="fa-solid fa-check"></i>
      </span>
      <h4 className="join-success-title">{title}</h4>
      {confirmation?.subtitle && (
        <p className="join-success-text">{confirmation.subtitle}</p>
      )}

      {(courseName || status) && (
        <ul className="crs-en-done-facts">
          {courseName && (
            <li>
              <span>{tr("crs_en_done_course")}</span> <b>{courseName}</b>
            </li>
          )}
          {status && (
            <li>
              <span>{tr("crs_en_done_status")}</span>{" "}
              <b className="crs-en-done-status">{status}</b>
            </li>
          )}
        </ul>
      )}

      {confirmation?.email_notice && (
        <p className="join-success-text crs-en-done-notice">
          <i className="fa-regular fa-envelope"></i> {confirmation.email_notice}
        </p>
      )}
    </div>
  );
}

/* The pane for a second subscription to the same course: the API refuses it
   with "لديك طلب اشتراك قيد المراجعة لهذا الكورس." (422 on `email`), and
   nothing in the form can change that — so instead of a red note back on
   step 1, the visitor is told plainly that their request already exists. */
export function EnrollAlready({
  message,
  tr,
  titleKey = "crs_en_already_title",
}: {
  message: string;
  tr: (key: string) => string;
  /** The heading's i18n key — the waiting list reuses this pane for its
      refusals ("already on the list", a closed list…). */
  titleKey?: string;
}) {
  return (
    <div className="join-pane join-success is-active">
      <span className="join-success-icon crs-en-notice-icon">
        <i className="fa-solid fa-circle-info"></i>
      </span>
      <h4 className="join-success-title">{tr(titleKey)}</h4>
      <p className="join-success-text">{apiMessage(message)}</p>
    </div>
  );
}
