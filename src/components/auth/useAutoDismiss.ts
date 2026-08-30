"use client";
/* Takes a banner off the page on its own: it stays for SHOW_MS, then plays the
   same slide-off-the-inline-end exit as the reset-flow flash (see
   "auth-alert-leaving" in styles/legacy/password.css) and calls `dismiss()`.

   Used for the OTP error on /code-verification, which sits above the six boxes
   and would otherwise stay there while the user is already retyping the code.
   `dismiss` must be stable (a setState updater or a useCallback) — it is an
   effect dependency. */

import { useEffect, useState } from "react";

/** Visible before the exit starts. */
const SHOW_MS = 4000;
/** Length of the auth-alert-out animation — keep in step with password.css. */
const EXIT_MS = 450;

export function useAutoDismiss(
  message: string | null | undefined,
  dismiss: () => void,
  showMs: number = SHOW_MS,
) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (!message) {
      setLeaving(false);
      return;
    }
    /* A new message (a second failed attempt) restarts the clock rather than
       inheriting the tail of the previous one's. */
    setLeaving(false);

    const startExit = window.setTimeout(() => setLeaving(true), showMs);
    const remove = window.setTimeout(() => {
      setLeaving(false);
      dismiss();
    }, showMs + EXIT_MS);

    return () => {
      window.clearTimeout(startExit);
      window.clearTimeout(remove);
    };
  }, [message, showMs, dismiss]);

  return leaving ? "auth-alert-leaving" : "";
}
