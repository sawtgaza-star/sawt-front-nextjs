"use client";
import { useState } from "react";
import { useLang } from "@/lib/use-lang";
import CourseEnrollModal from "./CourseEnrollModal";

/* The registration card's "اشترك الآن" button, and the enrollment modal it
   opens. The smallest client leaf that can hold that one piece of state —
   CourseRegisterCard around it stays a Server Component.

   The modal is mounted only while it is open: it is portalled to <body> and
   carries the whole three-step form, so there is nothing to gain from keeping
   it in the tree. Closing it therefore also resets it, which is what you want
   after a completed registration. */
export default function CourseSubscribeButton({
  courseTitle,
}: {
  /** Named in the modal's confirmation pane. */
  courseTitle: string;
}) {
  const [open, setOpen] = useState(false);
  const { tr } = useLang();

  return (
    <>
      <button
        type="button"
        className="crs-btn-green"
        onClick={() => setOpen(true)}
      >
        {/* `data-i18n` still, not tr(): this button is in the page from the
            first paint, so the DOM translator does visit it. */}
        <span data-i18n="crs_subscribe">اشترك الآن</span>
        <i className="fa-solid fa-angle-left"></i>
      </button>

      {open && (
        <CourseEnrollModal
          courseTitle={courseTitle}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
