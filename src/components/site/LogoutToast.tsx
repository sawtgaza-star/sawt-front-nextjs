"use client";
/* Shown once, on the page a session action sends the visitor to — the sign-out
   button (`logout-flash.ts`) and the sign-in form (`login-flash.ts`). Mirrors
   the donation flow's <DonationToast />: a one-shot sessionStorage flag, an
   auto dismiss and an × that closes it early.

   Strings go through `tr()` / `apiMessage()` rather than data-i18n: this mounts
   in an effect, after initTranslate() has already walked the page, so the
   DOM-based translator would never visit it and an English visitor would be
   left with the Arabic fallback. See lib/use-lang.ts.

   Which notice is pending is what's held in state, not the finished text — so
   the toast follows the language button while it is on screen. Sign-out has a
   fixed sentence with its own key; sign-in shows what the API answered with,
   matched back to a key by its text (lib/api/messages.ts). */

import { useEffect, useState } from "react";
import { IconCircleCheck } from "@/components/ui/icons";
import { useLang } from "@/lib/use-lang";
import { apiMessage } from "@/lib/api/messages";
import { consumeLoggedOut } from "./logout-flash";
import { consumeLoggedIn } from "./login-flash";
import "@/styles/logout-toast.css";

const AUTO_DISMISS_MS = 5000;

type Notice = { kind: "logout" } | { kind: "login"; message: string };

export default function LogoutToast() {
  const [notice, setNotice] = useState<Notice | null>(null);
  const { tr } = useLang();

  useEffect(() => {
    /* Both are read, never just the first: leaving one behind would let it
       surface on some later page load, long after the action it confirms. */
    const loggedOut = consumeLoggedOut();
    const loginMessage = consumeLoggedIn();

    const pending: Notice | null = loggedOut
      ? { kind: "logout" }
      : loginMessage
        ? { kind: "login", message: loginMessage }
        : null;
    if (!pending) return;

    setNotice(pending);
    const timer = setTimeout(() => setNotice(null), AUTO_DISMISS_MS);
    return () => clearTimeout(timer);
  }, []);

  if (!notice) return null;

  const text =
    notice.kind === "logout"
      ? tr("logout_toast")
      : (apiMessage(notice.message) ?? notice.message);

  return (
    <div className="logout-toast" role="status" aria-live="polite">
      <span className="logout-toast-icon" aria-hidden="true">
        <IconCircleCheck />
      </span>
      <p className="logout-toast-text">{text}</p>
      <button
        type="button"
        className="logout-toast-close"
        onClick={() => setNotice(null)}
        title={tr("logout_toast_close")}
      >
        <span aria-hidden="true">&times;</span>
        <span className="logout-toast-sr-only">{tr("logout_toast_close")}</span>
      </button>
    </div>
  );
}
