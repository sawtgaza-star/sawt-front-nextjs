"use client";
import { useState } from "react";
import { subscribePath, type CourseCta } from "@/lib/api/courses";
import CourseEnrollModal from "./CourseEnrollModal";

/* The registration card's "اشترك الآن" button, and the enrollment modal it
   opens. The label and the endpoint are the course payload's `cta`.

   The modal is mounted only while it is open: it is portalled to <body> and
   carries the whole three-step form, so there is nothing to gain from keeping
   it in the tree. Closing it therefore also resets it, which is what you want
   after a completed registration. */
export default function CourseSubscribeButton({
  slug,
  cta,
  label,
}: {
  slug: string;
  cta: CourseCta;
  /** Already localized by the card. */
  label: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="crs-btn-green"
        onClick={() => setOpen(true)}
      >
        <span>{label}</span>
        <i className="fa-solid fa-angle-left"></i>
      </button>

      {open && (
        <CourseEnrollModal
          path={subscribePath(slug, cta.path)}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
