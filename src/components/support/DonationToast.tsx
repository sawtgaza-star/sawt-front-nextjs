"use client";
import { useEffect, useState } from "react";
import { IconInfoCircle } from "@/components/ui/icons";
import { consumeDonationComplete } from "./donation-complete";

/* Shown on /support right after the wizard's "اتمام العملية" sends the donor
   back here. Wears the same orange panel as the wizard's notes so the flow
   ends the way it looked. Auto-dismisses; the × closes it early. */
const AUTO_DISMISS_MS = 9000;

export default function DonationToast() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!consumeDonationComplete()) return;
    setOpen(true);
    const timer = setTimeout(() => setOpen(false), AUTO_DISMISS_MS);
    return () => clearTimeout(timer);
  }, []);

  if (!open) return null;

  return (
    <div className="sp-toast" role="status" aria-live="polite">
      <span className="sp-toast-icon" aria-hidden="true">
        <IconInfoCircle />
      </span>
      <p className="sp-toast-text" data-i18n="support_donation_toast">
        شكرا لك، تم استلام بيانات التبرع بنجاح. سنقوم بالتواصل معك قريبًا
        لتأكيد التبرع.
      </p>
      <button
        type="button"
        className="sp-toast-close"
        onClick={() => setOpen(false)}
        title="إغلاق"
        data-i18n-title="support_donation_toast_close"
      >
        <span aria-hidden="true">&times;</span>
        {/* text, not aria-label, so initTranslate() reaches it */}
        <span className="sp-sr-only" data-i18n="support_donation_toast_close">
          إغلاق
        </span>
      </button>
    </div>
  );
}
