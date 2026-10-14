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
import { logoutRequest, refresh } from "./api/auth";
import { ApiError, setTokenRenewer } from "./api/client";

export const AUTH_KEY = "sawt_auth";
export const AUTH_CLASS = "sawt-authed";

const TOKEN_KEY = "sawt_token";
const USER_KEY = "sawt_user";
const EXPIRES_KEY = "sawt_token_expires_at";
/** The Google account photo of a Google sign-in (see setSocialAvatar). */
const SOCIAL_AVATAR_KEY = "sawt_social_avatar";
/** "google" / "facebook" when this session came from a social sign-in. */
const SOCIAL_PROVIDER_KEY = "sawt_social_provider";

/** Fired on <document> whenever the session is created or cleared. */
export const AUTH_EVENT = "sawt:authchange";

/** Renew the token this long before it runs out (it lives an hour), so a
    request never leaves with one that dies mid-flight. */
const RENEW_BEFORE_MS = 5 * 60_000;
/** How often an open page checks whether it is time to renew. */
const KEEPALIVE_EVERY_MS = 60_000;

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
    // a new session starts without the previous account's Google photo
    localStorage.removeItem(SOCIAL_AVATAR_KEY);
    localStorage.removeItem(SOCIAL_PROVIDER_KEY);
  } catch {
    /* storage disabled — the user stays signed out rather than half signed in */
  }
  setLoggedIn(true);
}

/** The bearer token, or null when signed out.

    An expired token is still returned on purpose: it used to drop the whole
    session here, which signed the visitor out an hour after login even though
    the API can renew it. Now the request goes out, a 401 renews the token
    (apiFetch → renewSession) and the request is replayed; only a refused
    renewal ends the session. keepSessionAlive() renews ahead of time so that
    path is rarely needed. */
export function getToken(): string | null {
  return read(TOKEN_KEY);
}

/* --- renewal (POST /auth/refresh) ----------------------------------------- */

let renewing: Promise<string | null> | null = null;

/** Swap the stored token for a fresh one. Concurrent callers share one
    request. Resolves to the new token, or null — and then the session is
    cleared only when the API refused it (401/403/422); offline or a 5xx keeps
    it for the next try. The stored user is left alone (the refresh answer
    lacks what GET /auth/profile adds to it). */
export function renewSession(): Promise<string | null> {
  if (renewing) return renewing;
  const token = read(TOKEN_KEY);
  if (!token) return Promise.resolve(null);

  renewing = refresh(token)
    .then((session) => {
      try {
        localStorage.setItem(TOKEN_KEY, session.access_token);
        const lifetimeMs = (Number(session.expires_in) || 3600) * 1000;
        localStorage.setItem(EXPIRES_KEY, String(Date.now() + lifetimeMs));
      } catch {
        /* storage disabled */
      }
      return session.access_token;
    })
    .catch((error) => {
      if (error instanceof ApiError && [401, 403, 422].includes(error.status)) clearSession();
      return null;
    })
    .finally(() => {
      renewing = null;
    });
  return renewing;
}

/* apiFetch's 401 path: another request may already have renewed the token
   this one was sent with — reuse that instead of renewing again. */
setTokenRenewer(async (staleToken) => {
  const current = read(TOKEN_KEY);
  if (current && current !== staleToken) return current;
  return renewSession();
});

/** While a page is open, renew the token a few minutes before its hour is up
    — checked every minute and whenever the tab comes back into view (timers
    are throttled in background tabs). Returns the cleanup. */
export function keepSessionAlive(): () => void {
  const check = () => {
    if (!isLoggedIn() || !read(TOKEN_KEY)) return;
    const expiresAt = Number(read(EXPIRES_KEY));
    if (!expiresAt || Date.now() > expiresAt - RENEW_BEFORE_MS) void renewSession();
  };
  const onVisible = () => {
    if (document.visibilityState === "visible") check();
  };
  check();
  const timer = window.setInterval(check, KEEPALIVE_EVERY_MS);
  document.addEventListener("visibilitychange", onVisible);
  return () => {
    window.clearInterval(timer);
    document.removeEventListener("visibilitychange", onVisible);
  };
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

/** Fired on <document> when the stored user is replaced (profile fetched or
    edited) — /account and the navbar avatar re-read it. */
export const USER_EVENT = "sawt:profilechange";

/** Replace the stored user, keeping the token as it is. */
export function setUser(user: AuthUser): void {
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch {
    /* storage disabled — the page still shows what it was handed */
  }
  try {
    document.dispatchEvent(new CustomEvent(USER_EVENT));
  } catch {
    /* SSR guard */
  }
}

/** The photo a Google sign-in came with, kept apart from the stored user:
    GET /auth/profile replaces that user when /account opens, and may answer
    without it. Shown only while the account has no photo of its own (see
    account-user); dropped with the session. */
export function setSocialAvatar(url: string | null): void {
  try {
    if (url) localStorage.setItem(SOCIAL_AVATAR_KEY, url);
    else localStorage.removeItem(SOCIAL_AVATAR_KEY);
  } catch {
    /* storage disabled */
  }
}

export function getSocialAvatar(): string | null {
  return read(SOCIAL_AVATAR_KEY);
}

export type SocialProvider = "google" | "facebook";

/** Remembers that this session came from a Google/Facebook sign-in — such an
    account may have no password yet (see account-user's needsCurrentPassword). */
export function setSocialProvider(provider: SocialProvider): void {
  try {
    localStorage.setItem(SOCIAL_PROVIDER_KEY, provider);
  } catch {
    /* storage disabled */
  }
}

export function getSocialProvider(): SocialProvider | null {
  const value = read(SOCIAL_PROVIDER_KEY);
  return value === "google" || value === "facebook" ? value : null;
}

/** Forget the stored session without touching the page (no class flip, no
    event) — for a caller that is about to reload it anyway. */
function forgetSession(): void {
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(EXPIRES_KEY);
    localStorage.removeItem(SOCIAL_AVATAR_KEY);
    localStorage.removeItem(SOCIAL_PROVIDER_KEY);
    localStorage.removeItem(AUTH_KEY);
  } catch {
    /* ignore */
  }
}

/** Drop the local session only — see logout() for the API round trip. */
export function clearSession(): void {
  forgetSession();
  setLoggedIn(false);
}

/** Invalidate the token server-side, then clear locally. The local session is
    dropped even if the request fails — the user asked to leave.

    The page itself is left as it is: the caller reloads it, and the pre-paint
    script draws the guest bar on arrival — flipping `.sawt-authed` here showed
    the signed-out navbar for the length of the round trip and the load. */
export async function logout(): Promise<void> {
  const token = read(TOKEN_KEY);
  forgetSession();
  if (!token) return;
  try {
    await logoutRequest(token);
  } catch {
    /* already expired or offline — nothing left to do */
  }
}

/* --- back to where you were ---------------------------------------------- */

/** /login, remembering the page to come back to after signing in. */
export function loginHref(next?: string): string {
  const back =
    next ??
    (typeof window === "undefined"
      ? ""
      : window.location.pathname + window.location.search + window.location.hash);
  return back ? `/login?next=${encodeURIComponent(back)}` : "/login";
}

/** Where /login should send the visitor: its `?next=` when that is a path on
    this site ("/courses/…"), never another origin ("//evil.com", "https:…"). */
export function safeNext(value: string | null | undefined, fallback = "/"): string {
  const next = (value || "").trim();
  return next.startsWith("/") && !next.startsWith("//") && !next.startsWith("/\\")
    ? next
    : fallback;
}
