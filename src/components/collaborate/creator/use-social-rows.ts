"use client";
/* The state behind step 3 of the "صانع محتوى" flow — the social-link rows and
   the intro-video drop zone.

   Lifted out of CreatorWizard, which owns the three steps' values so they
   survive moving between steps but had grown past what one file should hold.
   Nothing about the behaviour changed: the rows start as the two the mock
   ships with, "اضافة منصة" adds the first platform that has no row yet, and a
   file outside the rules printed under the zone is refused with the reason. */

import { useRef, useState } from "react";
import type { SocialFields, SocialRow } from "./SocialStep";
import {
  DEFAULT_SOCIAL_ROWS,
  SOCIAL_PLATFORMS,
  VIDEO_MAX_BYTES,
  VIDEO_TYPES,
} from "./creator-form-data";

export type SocialRowsState = {
  social: SocialFields;
  /** The join-terms tick was missed on "تسليم الطلب". */
  agreeError: boolean;
  setAgreeError: (on: boolean) => void;
  change: (patch: Partial<SocialFields>) => void;
  addRow: () => void;
  removeRow: (id: number) => void;
  changeRow: (id: number, patch: Partial<SocialRow>) => void;
  acceptVideo: (picked: File | undefined) => void;
};

export function useSocialRows(): SocialRowsState {
  const [social, setSocial] = useState<SocialFields>({
    rows: DEFAULT_SOCIAL_ROWS.map((platform, i) => ({
      id: i,
      platform,
      url: "",
    })),
    notes: "",
    video: null,
    videoError: null,
    agree: false,
  });
  const [agreeError, setAgreeError] = useState(false);

  /* row ids only have to be unique within this list, so a counter is enough */
  const nextRowId = useRef(DEFAULT_SOCIAL_ROWS.length);

  function change(patch: Partial<SocialFields>) {
    setSocial((v) => ({ ...v, ...patch }));
    if (patch.agree) setAgreeError(false);
  }

  function addRow() {
    setSocial((v) => ({
      ...v,
      rows: [
        ...v.rows,
        {
          id: nextRowId.current++,
          // first platform that has no row yet, else the first one
          platform:
            SOCIAL_PLATFORMS.find(
              (p) => !v.rows.some((r) => r.platform === p.value),
            )?.value ?? SOCIAL_PLATFORMS[0].value,
          url: "",
        },
      ],
    }));
  }

  function removeRow(id: number) {
    setSocial((v) => ({ ...v, rows: v.rows.filter((r) => r.id !== id) }));
  }

  function changeRow(id: number, patch: Partial<SocialRow>) {
    setSocial((v) => ({
      ...v,
      rows: v.rows.map((r) => (r.id === id ? { ...r, ...patch } : r)),
    }));
  }

  /* Both the file input and a drop share this: reject anything outside the
     rules printed under the zone, otherwise keep the file. */
  function acceptVideo(picked: File | undefined) {
    if (!picked) return;
    if (!VIDEO_TYPES.includes(picked.type)) {
      setSocial((s) => ({ ...s, video: null, videoError: "type" }));
      return;
    }
    if (picked.size > VIDEO_MAX_BYTES) {
      setSocial((s) => ({ ...s, video: null, videoError: "size" }));
      return;
    }
    setSocial((s) => ({ ...s, video: picked, videoError: null }));
  }

  return {
    social,
    agreeError,
    setAgreeError,
    change,
    addRow,
    removeRow,
    changeRow,
    acceptVideo,
  };
}
