"use client";
/* The landing half of the newsletter's double opt-in. The confirmation link in
   the email goes to the API, which then sends the visitor back to the
   `return_url` the footer form posted, carrying the outcome in the query:

     /incubator?newsletter=confirmed
     /incubator?newsletter=already_confirmed
     /incubator?newsletter=invalid            (or expired / error / failed)
     …&message=<text>                         optional — wins over the defaults

   This reads that once on mount, shows it in a <NewsletterToast />, and takes
   the params back off the URL (replaceState) so a reload or a shared link
   doesn't announce it again. Mounted by SiteNav next to <LogoutToast />, so it
   works on whatever page the visitor returns to. Renders nothing otherwise. */

import { useCallback, useEffect, useState } from "react";
import { translations } from "@/lib/translations";
import NewsletterToast, { type NewsletterNotice } from "./NewsletterToast";

const PARAM = "newsletter";
const MESSAGE_PARAMS = ["message", "newsletter_message"];

const ERROR_STATUSES = ["invalid", "expired", "error", "failed", "fail"];
const ALREADY_STATUSES = ["already_confirmed", "already", "already_subscribed"];

const ar = (key: string): string => (translations.ar as Record<string, string>)[key];

function noticeFor(status: string, message: string | null): NewsletterNotice {
  const value = status.toLowerCase();
  const kind = ERROR_STATUSES.includes(value) ? "error" : "success";
  if (message) return { kind, message };

  const key =
    kind === "error"
      ? "api_newsletter_invalid"
      : ALREADY_STATUSES.includes(value)
        ? "api_newsletter_already"
        : "api_newsletter_confirmed";
  return { kind, message: ar(key) };
}

export default function NewsletterConfirmToast() {
  const [notice, setNotice] = useState<NewsletterNotice | null>(null);
  const closeNotice = useCallback(() => setNotice(null), []);

  useEffect(() => {
    const url = new URL(window.location.href);
    const status = url.searchParams.get(PARAM);
    if (!status) return;

    const message =
      MESSAGE_PARAMS.map((name) => url.searchParams.get(name)).find(Boolean) || null;

    setNotice(noticeFor(status, message));

    url.searchParams.delete(PARAM);
    MESSAGE_PARAMS.forEach((name) => url.searchParams.delete(name));
    window.history.replaceState(window.history.state, "", url.pathname + url.search + url.hash);
  }, []);

  if (!notice) return null;
  return <NewsletterToast notice={notice} onClose={closeNotice} />;
}
