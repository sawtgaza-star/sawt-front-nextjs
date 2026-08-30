/* =========================================================
   Thin fetch wrapper around the Sawt REST API.

   The site is a STATIC EXPORT (next.config.mjs → output: 'export'), so there
   are no route handlers, no middleware and no server actions: every call goes
   straight from the browser to api.sawtgaza.com. The API sends
   `Access-Control-Allow-Origin: *`, so plain CORS fetch works.

   The backend is Laravel and answers errors in one shape, always:

     { "message": "…", "errors": { "email": ["…"], … } }

   …with 422 even for wrong credentials. Messages are Arabic-only (the API
   ignores Accept-Language), so `ApiError.message` is display-ready for the
   Arabic UI and is shown verbatim.
   ========================================================= */

/** Base URL, without a trailing slash. Set NEXT_PUBLIC_API_BASE_URL to point a
    build at staging; the fallback keeps `npm run dev` working with no .env. */
export const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.sawtgaza.com/api/v1"
).replace(/\/+$/, "");

/** Scheme + host the API is served from, without the `/api/v1` path — the
    uploads under /storage/ are served from here too (see `assetUrl` in
    ./pages). "" if the base URL is relative, which leaves that helper a no-op. */
export const API_ORIGIN = (() => {
  try {
    return new URL(API_BASE_URL).origin;
  } catch {
    return "";
  }
})();

export type FieldErrors = Record<string, string[]>;

/** Status used when the request never reached the server (offline, DNS, CORS). */
export const NETWORK_ERROR_STATUS = 0;

export class ApiError extends Error {
  readonly status: number;
  readonly errors: FieldErrors;

  constructor(message: string, status: number, errors: FieldErrors = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errors = errors;
  }

  /** First validation message for a field, if the server flagged it. */
  field(name: string): string | undefined {
    return this.errors[name]?.[0];
  }

  get isNetworkError(): boolean {
    return this.status === NETWORK_ERROR_STATUS;
  }

  get isValidationError(): boolean {
    return this.status === 422;
  }

  get isUnauthorized(): boolean {
    return this.status === 401;
  }
}

export type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  /** JSON request body. */
  body?: unknown;
  /** Bearer token to send, if any. */
  token?: string | null;
  signal?: AbortSignal;
};

/** Shown when fetch itself rejects — no server message exists in that case. */
const NETWORK_MESSAGE = "تعذر الاتصال بالخادم. تحقق من اتصالك بالإنترنت.";
/** Shown for a non-JSON / empty error body (502 from the CDN, maintenance…). */
const UNEXPECTED_MESSAGE = "حدث خطأ غير متوقع. حاول مرة أخرى.";

export async function apiFetch<T>(
  path: string,
  { method = "GET", body, token, signal }: RequestOptions = {},
): Promise<T> {
  const headers: Record<string, string> = { Accept: "application/json" };
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (token) headers.Authorization = `Bearer ${token}`;

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
      signal,
    });
  } catch (cause) {
    // AbortError must stay an AbortError so callers can ignore it.
    if (cause instanceof DOMException && cause.name === "AbortError") throw cause;
    throw new ApiError(NETWORK_MESSAGE, NETWORK_ERROR_STATUS);
  }

  // 204 and empty bodies parse to null rather than throwing.
  const text = await response.text();
  let payload: any = null;
  if (text) {
    try {
      payload = JSON.parse(text);
    } catch {
      payload = null;
    }
  }

  if (!response.ok) {
    throw new ApiError(
      typeof payload?.message === "string" && payload.message
        ? payload.message
        : UNEXPECTED_MESSAGE,
      response.status,
      payload?.errors && typeof payload.errors === "object" ? payload.errors : {},
    );
  }

  return payload as T;
}
