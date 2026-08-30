/* =========================================================
   Auth endpoints of the Sawt API (base + error shape: ./client).

   Route map, verified against the live API:

     POST /auth/login            { email, password }
     POST /auth/register         { first_name, last_name, email, phone?,
                                   password, password_confirmation }
     POST /auth/forgot-password  { email }                → mails a 6-digit code
     POST /auth/resend-code      { email }
     POST /auth/verify-code      { email, code }          → reset_token
     POST /auth/reset-password   { reset_token, password, password_confirmation }
     POST /auth/logout           (bearer)
     POST /auth/refresh          (bearer)                 → new access_token
     GET  /auth/me               (bearer)                 → user

   Server-side rules worth knowing: password is min 8 chars and must match
   `password_confirmation`; the login endpoint answers 422 (not 401) with
   `errors.email` when the credentials are wrong.
   ========================================================= */

import { apiFetch, ApiError } from "./client";

export type AuthUser = {
  id: number;
  uuid: string;
  name: string;
  email: string;
  phone: string | null;
  country_code: string | null;
  avatar: string | null;
  status: string;
  type: string;
  roles: string[];
  permissions: string[];
  is_content_creator: boolean;
  created_at: string;
};

export type AuthSession = {
  user: AuthUser;
  access_token: string;
  token_type: string;
  /** Lifetime in seconds — 3600 on the current backend. */
  expires_in: number;
};

/** Every successful response is wrapped as { message, data }. */
type Envelope<T> = { message?: string; data?: T };

export type LoginInput = { email: string; password: string };

export type RegisterInput = {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  password: string;
  password_confirmation: string;
};

/** The session, plus the API's own "تم تسجيل الدخول بنجاح." — the sign-in ends
    in a full page load, so the caller parks the message for the page it lands
    on rather than showing it here. Defaulted, since only `data` is guaranteed;
    the fallback is the same sentence the server sends, so lib/api/messages.ts
    translates it for an English visitor either way (api_login_success). */
export async function login(
  input: LoginInput,
): Promise<{ session: AuthSession; message: string }> {
  const payload = await apiFetch<Envelope<AuthSession>>("/auth/login", {
    method: "POST",
    body: input,
  });
  const session = payload?.data;
  if (!session?.access_token) {
    throw new ApiError("تعذر إتمام تسجيل الدخول. حاول مرة أخرى.", 500);
  }
  return { session, message: payload?.message || "تم تسجيل الدخول بنجاح." };
}

/** Register. The backend may or may not hand back a token on 201 — when it
    does the caller can sign the user straight in, otherwise send them to
    /login. `access_token` is therefore optional here on purpose. */
export async function register(
  input: RegisterInput,
): Promise<{ user: AuthUser; session: AuthSession | null }> {
  const payload = await apiFetch<Envelope<Partial<AuthSession> & { user: AuthUser }>>(
    "/auth/register",
    { method: "POST", body: input },
  );
  const data = payload?.data;
  if (!data?.user) {
    throw new ApiError("تعذر إنشاء الحساب. حاول مرة أخرى.", 500);
  }
  return {
    user: data.user,
    session: data.access_token ? (data as AuthSession) : null,
  };
}

/** Mails a 6-digit reset code to the address. Returns the API's own message. */
/** What the two code-sending endpoints answer with. `expires_in` is how long
    the code stays valid (seconds) and `attempts_left` how many more times it
    may be asked for — both optional, since only the message is guaranteed. */
export type CodeDelivery = {
  message: string;
  expiresIn?: number;
  attemptsLeft?: number;
};

/* /auth/forgot-password and /auth/resend-code take the same body and answer in
   the same shape, so they share one reader. */
async function requestCode(path: string, email: string): Promise<CodeDelivery> {
  const payload = await apiFetch<Envelope<{ expires_in?: number; attempts_left?: number }>>(path, {
    method: "POST",
    body: { email },
  });
  return {
    message: payload?.message ?? "",
    expiresIn: payload?.data?.expires_in,
    attemptsLeft: payload?.data?.attempts_left,
  };
}

export function forgotPassword(email: string): Promise<CodeDelivery> {
  return requestCode("/auth/forgot-password", email);
}

export function resendCode(email: string): Promise<CodeDelivery> {
  return requestCode("/auth/resend-code", email);
}

/** Exchanges the emailed code for the reset_token that /auth/reset-password
    wants. The message comes back with it so the next page can confirm the step
    ("تم التحقق من الرمز بنجاح.") instead of arriving silently. */
export async function verifyCode(
  email: string,
  code: string,
): Promise<{ token: string; message: string }> {
  const payload = await apiFetch<Envelope<{ reset_token?: string; token?: string }>>(
    "/auth/verify-code",
    { method: "POST", body: { email, code } },
  );
  const token = payload?.data?.reset_token ?? payload?.data?.token;
  if (!token) {
    throw new ApiError("تعذر التحقق من الرمز. حاول مرة أخرى.", 500);
  }
  return { token, message: payload?.message ?? "" };
}

export async function resetPassword(input: {
  reset_token: string;
  password: string;
  password_confirmation: string;
}): Promise<string> {
  const payload = await apiFetch<Envelope<unknown>>("/auth/reset-password", {
    method: "POST",
    body: input,
  });
  return payload?.message ?? "";
}

export async function logoutRequest(token: string): Promise<void> {
  await apiFetch<Envelope<unknown>>("/auth/logout", { method: "POST", token });
}

export async function refresh(token: string): Promise<AuthSession> {
  const payload = await apiFetch<Envelope<AuthSession>>("/auth/refresh", {
    method: "POST",
    token,
  });
  const session = payload?.data;
  if (!session?.access_token) throw new ApiError("انتهت الجلسة.", 401);
  return session;
}

export async function me(token: string): Promise<AuthUser> {
  const payload = await apiFetch<Envelope<{ user: AuthUser }> & { user?: AuthUser }>(
    "/auth/me",
    { token },
  );
  const user = payload?.data?.user ?? payload?.user;
  if (!user) throw new ApiError("انتهت الجلسة.", 401);
  return user;
}
