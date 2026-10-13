/* =========================================================
   Footer newsletter (base + error shape: ./client).

     POST /newsletter { email, source, return_url } → 200 { message }

   Double opt-in: the POST only mails a confirmation link; `message` is the
   server's own "check your inbox" sentence and is shown verbatim (through
   apiMessage, so a known one follows the language button). Following the
   link in the email brings the visitor back to `return_url` with a
   `?newsletter=<status>` flag — see components/site/NewsletterConfirmToast.
   Validation comes back as Laravel's 422 { message, errors: { email: […] } }.
   ========================================================= */

import { apiFetch } from "./client";

export type NewsletterRequest = {
  email: string;
  /** Where the form sits — "home_footer", "incubator_footer"… */
  source: string;
  /** Site path the confirmation link sends the visitor back to. */
  return_url: string;
};

export type NewsletterResponse = { message?: string };

export function subscribeToNewsletter(
  body: NewsletterRequest,
  signal?: AbortSignal,
): Promise<NewsletterResponse> {
  return apiFetch<NewsletterResponse>("/newsletter", { method: "POST", body, signal });
}

/** The page the visitor is on, path + query ("/news?page=2"), minus any
    leftover `?newsletter=…` flags from an earlier confirmation. No hash — the
    API appends its own query to this. */
export function newsletterReturnUrl(location: Location): string {
  const url = new URL(location.href);
  ["newsletter", "message", "newsletter_message"].forEach((name) =>
    url.searchParams.delete(name),
  );
  return url.pathname + url.search;
}

/** "/incubator/x" → "incubator_footer", "/" → "home_footer". */
export function newsletterSource(pathname: string): string {
  const first = pathname.split("/").filter(Boolean)[0];
  return `${first || "home"}_footer`;
}
