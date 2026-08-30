"use client";
/* Shown once, on the page the logout button sends the visitor to. Mirrors the
   donation flow's <DonationToast />: a one-shot sessionStorage flag, an auto
   dismiss and an × that closes it early.

   Strings go through `tr()` rather than data-i18n: this mounts in an effect,
   after initTranslate() has already walked the page, so the DOM-based
   translator would never visit it and an English visitor would be left with
   the Arabic fallback. See lib/use-lang.ts. */

import { useEffect, useState } from "react";
import { IconCircleCheck } from "@/components/ui/icons";
import { useLang } from "@/lib/use-lang";
import { consumeLoggedOut } from "./logout-flash";
import "@/styles/logout-toast.css";

const AUTO_DISMISS_MS = 5000;

export default function LogoutToast() {
  const [open, setOpen] = useState(false);
  const { tr } = useLang();

  useEffect(() => {
    if (!consumeLoggedOut()) return;
    setOpen(true);
    const timer = setTimeout(() => setOpen(false), AUTO_DISMISS_MS);
    return () => clearTimeout(timer);
  }, []);

  if (!open) return null;

  return (
    <div className="logout-toast" role="status" aria-live="polite">
      <span className="logout-toast-icon" aria-hidden="true">
        <IconCircleCheck />
      </span>
      <p className="logout-toast-text">{tr("logout_toast")}</p>
      <button
        type="button"
        className="logout-toast-close"
        onClick={() => setOpen(false)}
        title={tr("logout_toast_close")}
      >
        <span aria-hidden="true">&times;</span>
        <span className="logout-toast-sr-only">{tr("logout_toast_close")}</span>
      </button>
    </div>
  );
}
