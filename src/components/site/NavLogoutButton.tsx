"use client";
/* Sign-out control for the top bar and the phone drawer.

   The only interactive piece of an otherwise static nav, so it is its own
   client leaf — SiteNav and NavTopBar stay directive-free.

   The redirect is a full page load, not <Link>: `/` belongs to the (main)
   route group, while the nav also renders under `content`, which loads a
   different stylesheet — the same reason the links around it are plain <a>.
   It also re-runs the pre-paint script in app/layout.tsx, so the guest half
   of the bar is what paints on arrival. */

import { useState } from "react";
import { IconNavLogout } from "@/components/ui/icons";
import { logout } from "@/lib/auth-state";
import { markLoggedOut } from "./logout-flash";

type Props = {
  /** Defaults to the top-bar variant; the drawer group is already
      `.nav-authed-only`, so it passes just `nav-icon-btn`. */
  className?: string;
};

export default function NavLogoutButton({
  className = "nav-icon-btn nav-authed-only",
}: Props) {
  const [pending, setPending] = useState(false);

  async function handleClick() {
    if (pending) return;
    setPending(true);
    // logout() drops the local session even when the API call fails, so the
    // navigation below is unconditional.
    await logout();
    // Survives the page load below; <LogoutToast /> picks it up on the other
    // side and clears it, so the notice shows exactly once.
    markLoggedOut();
    window.location.href = "/";
  }

  return (
    <button
      type="button"
      className={className}
      onClick={handleClick}
      disabled={pending}
      aria-label="تسجيل الخروج"
      title="تسجيل الخروج"
      data-i18n-title="nav_logout"
    >
      <IconNavLogout />
    </button>
  );
}
