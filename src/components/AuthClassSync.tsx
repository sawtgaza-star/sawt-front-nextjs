"use client";

import { useEffect } from "react";
import { AUTH_CLASS, isLoggedIn } from "@/lib/auth-state";

/**
 * Re-asserts `.sawt-authed` on <html> after hydration.
 *
 * The pre-paint script in the root layout adds the class before first paint,
 * but if hydration fails anywhere (iOS Safari wrapping phone numbers / dates in
 * links is the usual culprit) React client-renders the root and writes
 * <html className> back to just the font variable — the class is gone and the
 * phone drawer shows the guest CTAs to a signed-in visitor. Same reason
 * PageAnimations re-adds `sawt-anim`.
 *
 * `pageshow` covers a page restored from the bfcache after the session changed.
 */
export default function AuthClassSync() {
  useEffect(() => {
    const sync = () =>
      document.documentElement.classList.toggle(AUTH_CLASS, isLoggedIn());
    sync();
    window.addEventListener("pageshow", sync);
    return () => window.removeEventListener("pageshow", sync);
  }, []);

  return null;
}
