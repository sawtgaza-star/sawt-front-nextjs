"use client";
/* The signed-in user as /account shows it: the stored session user
   (lib/auth-state) with the edits made in "المعلومات الشخصية" laid over it.

   The API has no profile-update endpoint yet, so those edits (name, phone,
   gender, photo) are kept in this browser, per user — the same stop-gap as
   lib/follows. When the endpoint exists, save() becomes the request and the
   overlay goes away. */

import { useCallback, useEffect, useState } from "react";
import { getUser } from "@/lib/auth-state";

export type Gender = "" | "male" | "female";

export type AccountUser = {
  key: string;
  name: string;
  email: string;
  phone: string;
  gender: Gender;
  avatar: string | null;
  createdAt: string | null;
};

type Overlay = Partial<Pick<AccountUser, "name" | "phone" | "gender" | "avatar">>;

const EVENT = "sawt:profilechange";

function overlayKey(id: string): string {
  return `sawt_profile:${id}`;
}

function readOverlay(id: string): Overlay {
  try {
    return JSON.parse(localStorage.getItem(overlayKey(id)) || "{}") || {};
  } catch {
    return {};
  }
}

function readAccountUser(): AccountUser | null {
  const user = getUser();
  if (!user) return null;
  const key = String(user.id ?? user.uuid);
  const overlay = readOverlay(key);
  return {
    key,
    name: overlay.name ?? user.name ?? "",
    email: user.email ?? "",
    phone: overlay.phone ?? user.phone ?? "",
    gender: overlay.gender ?? "",
    avatar: overlay.avatar ?? user.avatar ?? null,
    createdAt: user.created_at ?? null,
  };
}

/** `undefined` until the browser has been read, then the user or null. */
export function useAccountUser() {
  const [user, setUser] = useState<AccountUser | null | undefined>(undefined);

  useEffect(() => {
    const sync = () => setUser(readAccountUser());
    sync();
    document.addEventListener(EVENT, sync);
    return () => document.removeEventListener(EVENT, sync);
  }, []);

  const save = useCallback((patch: Overlay) => {
    const current = readAccountUser();
    if (!current) return;
    try {
      localStorage.setItem(
        overlayKey(current.key),
        JSON.stringify({ ...readOverlay(current.key), ...patch }),
      );
    } catch {
      /* quota / storage disabled */
    }
    document.dispatchEvent(new CustomEvent(EVENT));
  }, []);

  return { user, save };
}

/** "مارس 2026" / "March 2026" — the "في صوت منذ" line. */
export function memberSince(createdAt: string | null, lang: string): string {
  if (!createdAt) return "";
  const date = new Date(createdAt);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString(lang === "en" ? "en-US" : "ar-EG", {
    month: "long",
    year: "numeric",
  });
}

/** Shrinks a picked photo to a 256px JPEG data URL — small enough to keep in
    localStorage, sharp enough for the 56–96px circles it is drawn in. */
export function resizeAvatar(file: File, size = 256): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const side = Math.min(img.width, img.height);
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        URL.revokeObjectURL(url);
        reject(new Error("canvas"));
        return;
      }
      ctx.drawImage(
        img,
        (img.width - side) / 2,
        (img.height - side) / 2,
        side,
        side,
        0,
        0,
        size,
        size,
      );
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/jpeg", 0.85));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("image"));
    };
    img.src = url;
  });
}

/** Fills `{name}`-style holes in a dictionary string. */
export function fill(text: string, params: Record<string, string | number>): string {
  return text.replace(/\{(\w+)\}/g, (_, key) => String(params[key] ?? ""));
}
