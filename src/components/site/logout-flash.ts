/* Hand-off between the nav's logout button and the page it lands on: the
   button raises this flag, then leaves for `/`, where <LogoutToast /> takes it
   down again and shows the confirmation. Same shape as the donation flow's
   `donation-complete.ts` — sessionStorage rather than a query string keeps the
   URL clean and makes the notice one-shot, so a reload of the home page won't
   show it a second time. */

export const LOGGED_OUT_KEY = "sawt-logged-out";

export function markLoggedOut() {
  try {
    sessionStorage.setItem(LOGGED_OUT_KEY, "1");
  } catch {
    /* private mode / storage disabled — the sign-out still happened */
  }
}

/* Reads the flag and clears it in the same breath, so the caller is the only
   one that ever sees it. */
export function consumeLoggedOut() {
  try {
    if (sessionStorage.getItem(LOGGED_OUT_KEY) !== "1") return false;
    sessionStorage.removeItem(LOGGED_OUT_KEY);
    return true;
  } catch {
    return false;
  }
}
