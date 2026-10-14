"use client";
/* The floating notice the newsletter answers with — both the footer form's
   "check your inbox" (or its validation error) and the "subscription confirmed"
   the visitor lands on after following the email link. Same panel as
   <LogoutToast /> (its stylesheet, plus an `is-error` tint), so every
   confirmation on the site looks alike.

   `message` is the raw Arabic text (from the API or a translations.ts key's
   Arabic value) and is run through apiMessage() at render time, so a known
   sentence follows the language button while the toast is up. Strings use
   tr() rather than [data-i18n]: the toast mounts after initTranslate() ran.

   Auto-dismisses; the × closes it early. Unmounting is the owner's call.

   Rendered into <body> (a portal), not where the owner sits: inside a form or
   a page section it was caught in that ancestor's stacking context and slid
   under the navbar whatever its z-index. */

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { IconCircleCheck, IconInfoCircle } from "@/components/ui/icons";
import { useLang } from "@/lib/use-lang";
import { apiMessage } from "@/lib/api/messages";
import "@/styles/logout-toast.css";

const AUTO_DISMISS_MS = 6000;

export type NewsletterNotice = { kind: "success" | "error"; message: string };

export default function NewsletterToast({
  notice,
  onClose,
}: {
  notice: NewsletterNotice;
  onClose: () => void;
}) {
  const { tr } = useLang();
  // the portal target exists only in the browser, after mount
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const timer = setTimeout(onClose, AUTO_DISMISS_MS);
    return () => clearTimeout(timer);
    // a new notice restarts the countdown; `onClose` is stable (useCallback)
  }, [notice, onClose]);

  const isError = notice.kind === "error";

  if (!mounted) return null;

  return createPortal(
    <div
      className={`logout-toast${isError ? " is-error" : ""}`}
      role={isError ? "alert" : "status"}
      aria-live={isError ? "assertive" : "polite"}
    >
      <span className="logout-toast-icon" aria-hidden="true">
        {isError ? <IconInfoCircle /> : <IconCircleCheck />}
      </span>
      <p className="logout-toast-text">{apiMessage(notice.message) ?? notice.message}</p>
      <button
        type="button"
        className="logout-toast-close"
        onClick={onClose}
        title={tr("logout_toast_close")}
      >
        <span aria-hidden="true">&times;</span>
        <span className="logout-toast-sr-only">{tr("logout_toast_close")}</span>
      </button>
    </div>,
    document.body,
  );
}
