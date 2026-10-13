"use client";
/* "الصورة الشخصية" — the optional photo at the top of the join modal's first
   step. Picking a photo opens the same "تعديل الصورة" dialog as the profile
   page (move, zoom, turn); the framed square is previewed here and handed to
   lib/legacy-home through join-photo-store, which sends it with the
   application. "تعديل" reframes the photo as originally picked.

   Rendered by React, so its copy goes through tr() rather than data-i18n
   (see lib/use-lang). */

import { useCallback, useRef, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import "@/styles/join-photo.css";
import { useLang } from "@/lib/use-lang";
import { IconAvatarPlaceholder } from "@/components/account/account-icons";
import { getJoinPhoto, setJoinPhoto, subscribeJoinPhoto } from "./join-photo-store";

const JoinPhotoCropper = dynamic(() => import("./JoinPhotoCropper"), { ssr: false });

const MAX_PHOTO_BYTES = 5 * 1024 * 1024;
const PHOTO_TYPES = ["image/jpeg", "image/png"];

export default function JoinPhotoField() {
  const { tr } = useLang();
  const photo = useSyncExternalStore(subscribeJoinPhoto, getJoinPhoto, () => null);
  const [cropping, setCropping] = useState<File | null>(null);
  // bumped per picked file, so "تغيير الصورة" inside the dialog starts it afresh
  const [cropKey, setCropKey] = useState(0);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const closeCropper = useCallback(() => setCropping(null), []);

  function pick(file?: File) {
    if (!file) return;
    if (!PHOTO_TYPES.includes(file.type)) {
      setError(tr("jm_photo_bad_type"));
      return;
    }
    if (file.size > MAX_PHOTO_BYTES) {
      setError(tr("acc_photo_too_big"));
      return;
    }
    setError("");
    setCropping(file);
    setCropKey((k) => k + 1);
  }

  function take(cropped: File) {
    if (!cropping) return;
    setJoinPhoto({ original: cropping, cropped, preview: URL.createObjectURL(cropped) });
    setCropping(null);
  }

  return (
    /* not a .join-field: legacy-home's validation adds and removes error
       spans inside those, and this markup is React's to manage */
    <div className="jm-photo">
      <label className="join-label">{tr("jm_photo")}</label>
      <div className="jm-photo-row">
        <button
          type="button"
          className="jm-photo-avatar"
          onClick={() => (photo ? pick(photo.original) : fileRef.current?.click())}
          aria-label={photo ? tr("jm_photo_edit") : tr("jm_photo_add")}
        >
          {photo ? <img src={photo.preview} alt="" /> : <IconAvatarPlaceholder />}
        </button>
        <div className="jm-photo-text">
          <span className="join-hint">{tr("acc_photo_hint")}</span>
          <div className="jm-photo-actions">
            {photo ? (
              <>
                <button type="button" className="jm-photo-btn" onClick={() => pick(photo.original)}>
                  {tr("jm_photo_edit")}
                </button>
                <button type="button" className="jm-photo-btn" onClick={() => fileRef.current?.click()}>
                  {tr("acc_photo_change")}
                </button>
                <button
                  type="button"
                  className="jm-photo-btn jm-photo-btn-remove"
                  onClick={() => setJoinPhoto(null)}
                >
                  {tr("jm_photo_remove")}
                </button>
              </>
            ) : (
              <button type="button" className="jm-photo-btn" onClick={() => fileRef.current?.click()}>
                {tr("jm_photo_add")}
              </button>
            )}
          </div>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png"
          hidden
          onChange={(e) => {
            pick(e.target.files?.[0]);
            e.target.value = "";
          }}
        />
      </div>
      {error ? <span className="join-field-error jm-photo-error">{error}</span> : null}

      {cropping ? (
        <JoinPhotoCropper
          key={cropKey}
          file={cropping}
          onCancel={closeCropper}
          onDone={take}
          onPickAnother={() => fileRef.current?.click()}
        />
      ) : null}
    </div>
  );
}
