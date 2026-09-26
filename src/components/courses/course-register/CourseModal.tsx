"use client";
import { useEffect, useState, type ReactNode, type Ref } from "react";
import { createPortal } from "react-dom";
import { IconClose } from "./enroll-icons";

/* The frame both course dialogs share — the enrollment form (CourseEnrollModal)
   and the waiting-list answer (WaitlistModal): overlay, olive header with the
   close button, a scrolling body and the footer row.

   It wears the "انضم إلينا" modal's `join-*` classes, which style.css defines
   and every (main) route loads, plus the design's `crs-en-*` layer from
   course.css (the header's glow, sizes).

   Portalled to <body>: the card it opens from sits in a `position: sticky`
   aside (or a hover-animated course card) with its own stacking context, so a
   dialog rendered in place would be trapped inside it. Escape and a click on
   the backdrop close it, and the page behind doesn't scroll while it is open. */
export default function CourseModal({
  title,
  subtitle,
  closeLabel,
  onClose,
  above,
  footer,
  bodyRef,
  children,
}: {
  title: string;
  subtitle?: string;
  closeLabel: string;
  onClose: () => void;
  /** Between the header and the body — the enrollment form's stepper. */
  above?: ReactNode;
  footer: ReactNode;
  bodyRef?: Ref<HTMLDivElement>;
  children: ReactNode;
}) {
  // drives the open transition: the overlay mounts closed, then opens
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className={"join-modal-overlay crs-en-overlay" + (shown ? " is-open" : "")}
      // a click on the backdrop itself closes; one inside the card does not
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="join-modal crs-en-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="crsEnrollTitle"
      >
        <div className="join-modal-head crs-en-head">
          <button
            type="button"
            className="join-modal-close crs-en-close"
            onClick={onClose}
            aria-label={closeLabel}
          >
            <IconClose />
          </button>
          <h3 className="join-modal-title" id="crsEnrollTitle">
            {title}
          </h3>
          {subtitle ? <p className="join-modal-subtitle">{subtitle}</p> : null}
        </div>

        {above}

        <div className="join-modal-body crs-en-body" ref={bodyRef}>
          {children}
        </div>

        <div className="join-modal-foot">{footer}</div>
      </div>
    </div>,
    document.body,
  );
}
