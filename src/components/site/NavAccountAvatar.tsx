"use client";
/* The account button's face: the signed-in user's photo when they have one,
   the outline person icon otherwise (and on the server, before the browser's
   stored session has been read).

   The photo is the same one /account shows — the session user's `avatar` with
   the "المعلومات الشخصية" overlay on top (account-user.ts) — so a photo
   changed there shows up here at once. A photo URL that fails to load falls
   back to the icon rather than leaving a broken image in the bar. */

import { useEffect, useState } from "react";
import { IconNavAccount } from "@/components/ui/icons";
import { useAccountUser } from "@/components/account/account-user";
import { assetUrl } from "@/lib/api/pages";
import "@/styles/nav-account.css";

export default function NavAccountAvatar() {
  const { user } = useAccountUser();
  const src = assetUrl(user?.avatar);
  const [failed, setFailed] = useState(false);

  useEffect(() => setFailed(false), [src]);

  if (!src || failed) return <IconNavAccount />;

  return (
    <img
      className="nav-account-avatar"
      src={src}
      alt={user?.name || ""}
      onError={() => setFailed(true)}
    />
  );
}
