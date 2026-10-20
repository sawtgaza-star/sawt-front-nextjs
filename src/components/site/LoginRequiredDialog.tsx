"use client";
/* "Sign in first" — shown when a guest presses a creator's "متابعة" (the home
   creator cards and the creator profile). A centred card over a blurred
   backdrop: a lock badge, a title, the reason, and two actions — sign in
   (back to `next` afterwards — this page by default, via loginHref) or
   "ليس الآن". It fades and rises in; nothing shakes.

   Escape, the ×, the backdrop and "ليس الآن" all close it. Rendered into
   <body> for the same reason as NewsletterToast: inside a section it would be
   caught under the navbar's stacking context. Strings use tr() — it mounts
   after initTranslate() ran. */

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLang } from "@/lib/use-lang";
import { loginHref } from "@/lib/auth-state";
import "@/styles/login-required-dialog.css";

export default function LoginRequiredDialog({
  onClose,
  next,
}: {
  onClose: () => void;
  /** Where sign-in returns to; the current page (path + query + hash) if unset. */
  next?: string;
}) {
  const { tr } = useLang();
  const [mounted, setMounted] = useState(false);
  const primary = useRef<HTMLAnchorElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    primary.current?.focus({ preventScroll: true });
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mounted, onClose]);

  if (!mounted) return null;

  return createPortal(
    <div className="lrd-backdrop" onClick={onClose}>
      <div
        className="lrd-card"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="lrd-title"
        aria-describedby="lrd-text"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="lrd-close" onClick={onClose} aria-label={tr("logout_toast_close")}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <span className="lrd-badge" aria-hidden="true">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" />
            <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
            <circle cx="12" cy="15.5" r="1.3" fill="currentColor" stroke="none" />
          </svg>
        </span>

        <h2 id="lrd-title" className="lrd-title">
          {tr("login_required_title")}
        </h2>
        <p id="lrd-text" className="lrd-text">
          {tr("follow_login_required")}
        </p>

        <div className="lrd-actions">
          <a ref={primary} href={loginHref(next)} className="lrd-btn lrd-btn-primary">
            {tr("login_required_signin")}
          </a>
          <button type="button" className="lrd-btn lrd-btn-ghost" onClick={onClose}>
            {tr("login_required_later")}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
