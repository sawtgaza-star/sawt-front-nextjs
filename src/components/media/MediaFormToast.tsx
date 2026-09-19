"use client";
/* The floating confirmation the booking card answers with — "تم استلام طلب
   الاستشارة، سنتواصل معك قريباً." — shown the way the rest of the site
   confirms an action: the fixed panel of <LogoutToast /> and <DonationToast />
   rather than a line inside the form, which sat below the fold on a long card.

   The message is already translated when it gets here (useAuthForm hands over
   what apiMessage() made of the server's sentence), so it follows the language
   button while the toast is up. Only the × label is this component's own, and
   it goes through tr() rather than [data-i18n]: the toast mounts long after
   initTranslate() has walked the page, so the DOM translator never visits it.

   Auto-dismisses; the × closes it early. Unmounting is the owner's call —
   `onClose` clears the message the toast was handed. */

import { useEffect } from "react";
import { IconCircleCheck } from "@/components/ui/icons";
import { useLang } from "@/lib/use-lang";

const AUTO_DISMISS_MS = 6000;

export default function MediaFormToast({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const timer = setTimeout(onClose, AUTO_DISMISS_MS);
    return () => clearTimeout(timer);
    // a new message restarts the countdown; `onClose` is stable (useCallback)
  }, [message, onClose]);

  const { tr } = useLang();

  return (
    <div className="sm-toast" role="status" aria-live="polite">
      <span className="sm-toast-icon" aria-hidden="true">
        <IconCircleCheck />
      </span>
      <p className="sm-toast-text">{message}</p>
      <button
        type="button"
        className="sm-toast-close"
        onClick={onClose}
        title={tr("sm_form_toast_close")}
      >
        <span aria-hidden="true">&times;</span>
        {/* text, not aria-label — mirrors the other toasts' close button */}
        <span className="sm-toast-sr-only">{tr("sm_form_toast_close")}</span>
      </button>
    </div>
  );
}
