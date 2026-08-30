/* =========================================================
   Client-side session store.

   The design has two distinct navbars — the guest one ([أنشئ الحساب]) and the
   signed-in one (account + notifications icons). This module is the single
   switch between them, and now also the place the real API session lives.

   `sawt_auth` stays a plain "1" flag: it is read by the pre-paint script in
   app/layout.tsx, which mirrors it onto <html> as `.sawt-authed` so the CSS —
   not React — decides which half of the top bar is visible. Both halves are in
   the SSR markup, so there is no hydration mismatch and no flash. Do not change
   that key or its value without changing the inline script too.

   The JWT itself lives beside it. localStorage, not an httpOnly cookie, is
   forced by the architecture: the site is a static export served from a
   different origin than the API, so nothing here can set a cookie for it.
   ========================================================= */

import type { AuthSession, AuthUser } from "./api/auth";
import { logoutRequest } from "./api/auth";

export const AUTH_KEY = "sawt_auth";
export const AUTH_CLASS = "sawt-authed";

const TOKEN_KEY = "sawt_token";
const USER_KEY = "sawt_user";
const EXPIRES_KEY = "sawt_token_expires_at";

/** Fired on <document> whenever the session is created or cleared. */
export const AUTH_EVENT = "sawt:authchange";

/** Treat a token that dies within this window as already dead, so a request
    can't leave mid-flight and come back 401. */
const EXPIRY_SKEW_MS = 30_000;

function read(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function isLoggedIn(): boolean {
  return read(AUTH_KEY) === "1";
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
    document.dispatchEvent(new CustomEvent(AUTH_EVENT, { detail: { authed: value } }));
  } catch {
    /* SSR guard */
  }
}

/** Persist a successful login/register/refresh response. */
export function saveSession(session: AuthSession): void {
  try {
    localStorage.setItem(TOKEN_KEY, session.access_token);
    localStorage.setItem(USER_KEY, JSON.stringify(session.user));
    const lifetimeMs = (Number(session.expires_in) || 3600) * 1000;
    localStorage.setItem(EXPIRES_KEY, String(Date.now() + lifetimeMs));
  } catch {
    /* storage disabled — the user stays signed out rather than half signed in */
  }
  setLoggedIn(true);
}

/** The bearer token, or null when absent or expired. */
export function getToken(): string | null {
  const token = read(TOKEN_KEY);
  if (!token) return null;

  const expiresAt = Number(read(EXPIRES_KEY));
  if (expiresAt && Date.now() > expiresAt - EXPIRY_SKEW_MS) {
    clearSession();
    return null;
  }
  return token;
}

export function getUser(): AuthUser | null {
  const raw = read(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

/** Drop the local session only — see logout() for the API round trip. */
export function clearSession(): void {
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(EXPIRES_KEY);
  } catch {
    /* ignore */
  }
  setLoggedIn(false);
}

/** Invalidate the token server-side, then clear locally. The local session is
    dropped even if the request fails — the user asked to leave. */
export async function logout(): Promise<void> {
  const token = read(TOKEN_KEY);
  clearSession();
  if (!token) return;
  try {
    await logoutRequest(token);
  } catch {
    /* already expired or offline — nothing left to do */
  }
}
