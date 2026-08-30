/* =========================================================
   State carried across the three password-reset pages:

     /forgot-password   → asks for the email, API mails a 6-digit code
     /code-verification → posts { email, code }, gets a reset_token back
     /set-new-password  → posts { reset_token, password, … }

   The email and the reset_token have to survive two navigations. Query strings
   are out: the pages are separate documents in the auth CSS group (plain <a>,
   full reload), and putting a reset_token in the URL leaks it into history and
   the Referer header. sessionStorage keeps it to the one tab and drops it when
   the tab closes.
   ========================================================= */

const EMAIL_KEY = "sawt_reset_email";
const TOKEN_KEY = "sawt_reset_token";
const FLASH_KEY = "sawt_auth_flash";

function read(key: string): string | null {
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function write(key: string, value: string): void {
  try {
    sessionStorage.setItem(key, value);
  } catch {
    /* private mode — the next page will bounce the user back to the start */
  }
}

export function setResetEmail(email: string): void {
  write(EMAIL_KEY, email);
}

export function getResetEmail(): string | null {
  return read(EMAIL_KEY);
}

export function setResetToken(token: string): void {
  write(TOKEN_KEY, token);
}

export function getResetToken(): string | null {
  return read(TOKEN_KEY);
}

/* Each step of the flow ends in a full page load, which would throw away the
   "تم …" the API just answered with. So the message is parked here and the
   next page shows it in its success banner — the same hand-off the donation
   and logout notices use. One-shot: reading it clears it, so a reload of the
   destination doesn't repeat a confirmation for something that isn't happening
   again. */
export function setAuthFlash(message: string): void {
  if (!message) return;
  write(FLASH_KEY, message);
}

export function consumeAuthFlash(): string | null {
  const message = read(FLASH_KEY);
  if (!message) return null;
  try {
    sessionStorage.removeItem(FLASH_KEY);
  } catch {
    /* ignore */
  }
  return message;
}

export function clearResetFlow(): void {
  try {
    sessionStorage.removeItem(EMAIL_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
  } catch {
    /* ignore */
  }
}
