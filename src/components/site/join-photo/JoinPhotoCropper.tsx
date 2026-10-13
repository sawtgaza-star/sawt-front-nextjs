"use client";
/* The profile page's "تعديل الصورة" dialog (account/AvatarCropper), opened
   from the join modal. Loaded on demand by JoinPhotoField — account.css comes
   with it only once someone actually picks a photo.

   Portalled to <body>: the join modal's legacy listeners close it on a click
   whose target is its overlay, and on Escape anywhere. `.acc-page` carries
   the --acc-* colours the dialog reads; `.jm-photo-crop` lifts it above the
   modal (join-photo.css). */

import { useEffect } from "react";
import { createPortal } from "react-dom";
import "@/styles/account.css";
import AvatarCropper from "@/components/account/AvatarCropper";

export default function JoinPhotoCropper({
  file,
  onCancel,
  onDone,
  onPickAnother,
}: {
  file: File;
  onCancel: () => void;
  onDone: (cropped: File) => void;
  onPickAnother: () => void;
}) {
  /* Escape closes the cropper only — caught on window, ahead of the join
     modal's document listener (and the cropper's own, so it fires once). */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      e.stopPropagation();
      onCancel();
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [onCancel]);

  return createPortal(
    <div className="acc-page jm-photo-crop">
      <AvatarCropper file={file} onCancel={onCancel} onDone={onDone} onPickAnother={onPickAnother} />
    </div>,
    document.body,
  );
}
