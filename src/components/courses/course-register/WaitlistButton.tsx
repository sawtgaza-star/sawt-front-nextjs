"use client";
import { useState } from "react";
import { ApiError } from "@/lib/api/client";
import { joinWaitlist, type CourseSubscribeResponse } from "@/lib/api/courses";
import { clearSession, getToken, loginHref } from "@/lib/auth-state";
import { useLang } from "@/lib/use-lang";
import CourseModal from "./CourseModal";
import EnrollDone, { EnrollAlready } from "./EnrollDone";
import { DoneButton } from "./EnrollModalParts";

/** Last-resort text for a throw that isn't an ApiError (a bug, not the API). */
const UNKNOWN_MESSAGE = "حدث خطأ غير متوقع. حاول مرة أخرى.";

type Outcome =
  | { kind: "joined"; result: CourseSubscribeResponse }
  | { kind: "refused"; message: string };

/* "انضم لقائمة الانتظار" — a coming-soon course's CTA, on the incubator's
   course card and on the course page's registration card.

   There is no form: POST /pages/courses/{uuid}/join takes the signed-in
   account as the application, so a visitor without a session is sent to
   /login first (and brought back here — see loginHref / the login page's
   `?next=`). A 401 on the way means the stored session is stale: it is
   dropped and the visitor goes to sign in again.

   Whatever the API answers is shown in the course dialog: its confirmation on
   a 201 (the subscription's own pane), its message otherwise — "already on
   the list" is a 422 like any other refusal, so it needs no special case. */
export default function WaitlistButton({
  path,
  label,
  className,
}: {
  /** The join endpoint, relative to the API base. */
  path: string;
  label: string;
  className: string;
}) {
  const { lang, tr } = useLang();
  const [pending, setPending] = useState(false);
  const [outcome, setOutcome] = useState<Outcome | null>(null);

  const join = async () => {
    if (pending) return;
    const token = getToken();
    if (!token) {
      window.location.href = loginHref();
      return;
    }

    setPending(true);
    try {
      setOutcome({ kind: "joined", result: await joinWaitlist(path, token) });
    } catch (caught) {
      if (caught instanceof ApiError && caught.isUnauthorized) {
        clearSession();
        window.location.href = loginHref();
        return;
      }
      if (!(caught instanceof ApiError)) console.error(caught);
      setOutcome({
        kind: "refused",
        message: caught instanceof ApiError ? caught.message : UNKNOWN_MESSAGE,
      });
    } finally {
      setPending(false);
    }
  };

  const close = () => setOutcome(null);

  return (
    <>
      <button
        type="button"
        className={className}
        onClick={join}
        disabled={pending}
        aria-busy={pending || undefined}
      >
        <span>{pending ? tr("crs_en_sending") : label}</span>
        <i className="fa-solid fa-angle-left"></i>
      </button>

      {outcome && (
        <CourseModal
          title={tr("crs_wl_title")}
          closeLabel={tr("crs_en_close")}
          onClose={close}
          footer={
            <DoneButton
              result={outcome.kind === "joined" ? outcome.result : null}
              onClose={close}
              lang={lang}
              tr={tr}
            />
          }
        >
          {outcome.kind === "joined" ? (
            <EnrollDone result={outcome.result} lang={lang} tr={tr} />
          ) : (
            <EnrollAlready message={outcome.message} tr={tr} titleKey="crs_wl_refused_title" />
          )}
        </CourseModal>
      )}
    </>
  );
}
