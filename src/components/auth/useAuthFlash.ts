"use client";
/* Picks up the "تم …" the previous step of the reset flow parked before it
   navigated, and puts it in this page's success banner. Every auth page that
   can be arrived at from another one calls this; on a page reached directly
   there is nothing to consume and it does nothing.

   The banner reports the step the user just finished, not this form, so it
   takes itself away instead of sitting above the inputs for the whole visit:
   it shows for SHOW_MS, then slides off the page's inline end and unmounts.
   The class it returns is what plays that exit — see "auth-alert-leaving" in
   styles/legacy/password.css. */

import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { consumeAuthFlash } from "@/lib/api/reset-flow";

/** Visible before the exit starts. */
const SHOW_MS = 3000;
/** Length of the auth-alert-out animation — keep in step with password.css. */
const EXIT_MS = 450;

export function useAuthFlash(setSuccess: Dispatch<SetStateAction<string | null>>) {
  /* Held in state rather than shown straight from the effect: consumeAuthFlash()
     empties the store, so a second run (React StrictMode remounts effects in
     dev) would find nothing and never arm the timers. */
  const [message, setMessage] = useState<string | null>(null);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const flash = consumeAuthFlash();
    if (flash) setMessage(flash);
  }, []);

  useEffect(() => {
    if (!message) return;
    setSuccess(message);
    setLeaving(false);

    const startExit = window.setTimeout(() => setLeaving(true), SHOW_MS);
    const remove = window.setTimeout(() => {
      /* Only the flash goes: if the page raised its own message in the meantime
         (the resend on /code-verification), that one stays. */
      setSuccess((current) => (current === message ? null : current));
      setLeaving(false);
    }, SHOW_MS + EXIT_MS);

    return () => {
      window.clearTimeout(startExit);
      window.clearTimeout(remove);
    };
  }, [message, setSuccess]);

  return { flashClassName: leaving ? "auth-alert-leaving" : "" };
}
