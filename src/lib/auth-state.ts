/* =========================================================
   Client-side "am I signed in?" flag.

   There is no backend yet (see CLAUDE.md roadmap item 7 — the auth forms are
   no-ops, exactly as in the legacy site), but the design has two distinct
   navbars: the guest one ([أنشئ الحساب]) and the signed-in one (account +
   notifications icons). This module is the single switch between them.

   The flag lives in localStorage and is mirrored onto <html> as `.sawt-authed`
   by the pre-paint script in app/layout.tsx, so the CSS — not React — decides
   which half of the top bar is visible. Both halves are always in the SSR
   markup, so there is no hydration mismatch and no flash.

   When a real API arrives, replace the body of these three functions (e.g.
   with a session cookie read) and nothing else has to change.
   ========================================================= */

export const AUTH_KEY = "sawt_auth";
export const AUTH_CLASS = "sawt-authed";

export function isLoggedIn(): boolean {
  try {
    return localStorage.getItem(AUTH_KEY) === "1";
  } catch {
    return false;
  }
}

export function setLoggedIn(value: boolean): void {
  try {
    if (value) localStorage.setItem(AUTH_KEY, "1");
    else localStorage.removeItem(AUTH_KEY);
  } catch {
    /* private mode / storage disabled — the UI just stays signed out */
  }
  try {
    document.documentElement.classList.toggle(AUTH_CLASS, value);
  } catch {
    /* SSR guard */
  }
}

export function logout(): void {
  setLoggedIn(false);
}
