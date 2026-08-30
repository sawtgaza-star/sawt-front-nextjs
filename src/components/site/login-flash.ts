/* Hand-off between /login and the page it lands on: the form parks the "تم
   تسجيل الدخول بنجاح." the API answered with, then leaves for `/`, where the
   session toast reads it and shows it once.

   Same shape as `logout-flash.ts` next to it — the difference is that the text
   comes from the server rather than from a fixed i18n key, so the message
   itself is what travels. sessionStorage rather than a query string keeps the
   URL clean and the token out of history, and reading it clears it, so a
   reload of the home page won't confirm a sign-in that isn't happening again.

   It is deliberately NOT the auth flash of `lib/api/reset-flow.ts`: that one is
   consumed by the auth pages' own banner, and the sign-in is over — the user is
   already on the site when the message is due. */

export const LOGGED_IN_KEY = "sawt-logged-in-message";

export function markLoggedIn(message: string) {
  if (!message) return;
  try {
    sessionStorage.setItem(LOGGED_IN_KEY, message);
  } catch {
    /* private mode / storage disabled — the sign-in still happened */
  }
}

/* Reads the message and clears it in the same breath, so the caller is the only
   one that ever sees it. */
export function consumeLoggedIn(): string | null {
  try {
    const message = sessionStorage.getItem(LOGGED_IN_KEY);
    if (!message) return null;
    sessionStorage.removeItem(LOGGED_IN_KEY);
    return message;
  } catch {
    return null;
  }
}
