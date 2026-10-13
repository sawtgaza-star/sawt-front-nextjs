"use client";
/* The newsletter input + send button, shared by the mobile card and the
   desktop footer column. Same markup and classes as the legacy no-op block it
   replaces — only the wrapper is now a <form> so Enter submits too.

   POSTs to /newsletter (lib/api/newsletter) with the page it sits on as both
   `source` and `return_url`, and answers with the server's own message in a
   <NewsletterToast /> — success or validation error alike. */

import { useCallback, useState, type FormEvent } from "react";
import { ApiError } from "@/lib/api/client";
import {
  newsletterReturnUrl,
  newsletterSource,
  subscribeToNewsletter,
} from "@/lib/api/newsletter";
import { translations } from "@/lib/translations";
import NewsletterToast, { type NewsletterNotice } from "@/components/site/NewsletterToast";

/* Arabic source text of a key — the toast runs it back through apiMessage(),
   so it is shown in whichever language is current. */
const ar = (key: string): string => (translations.ar as Record<string, string>)[key];

export default function NewsletterForm({
  placeholder,
  className = "custom-newsletter-input",
}: {
  placeholder: string;
  className?: string;
}) {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<NewsletterNotice | null>(null);
  const closeNotice = useCallback(() => setNotice(null), []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;

    setBusy(true);
    setNotice(null);
    try {
      const result = await subscribeToNewsletter({
        email: email.trim(),
        source: newsletterSource(window.location.pathname),
        return_url: newsletterReturnUrl(window.location),
      });
      setEmail("");
      setNotice({
        kind: "success",
        // an empty 200 still means the mail went out
        message: result?.message || ar("api_newsletter_sent"),
      });
    } catch (error) {
      setNotice({
        kind: "error",
        message:
          error instanceof ApiError
            ? error.field("email") || error.message
            : ar("api_unexpected"),
      });
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <form className={className} onSubmit={onSubmit} noValidate>
        {" "}
        <div className="newsletter-input-wrapper">
          {" "}
          <i className="fa-solid fa-magnifying-glass"> </i>{" "}
          <input
            type="email"
            name="email"
            autoComplete="email"
            placeholder={placeholder}
            className="font-18 fw-bold"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={busy}
          />{" "}
        </div>{" "}
        <button className="rs-send" type="submit" disabled={busy} aria-busy={busy}>
          {" "}
          <i>
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.4em"
              height="1.2em"
              viewBox="0 0 24 24"
            >
              {" "}
              <path d="M0 0h24v24H0z" fill="none"></path>{" "}
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="m9.498 15l7.5-7.5m-8.992.179l7.321-3.46c3.042-1.438 4.563-2.157 5.533-1.436s.693 2.365.138 5.652l-.954 5.662c-.363 2.149-.544 3.223-1.345 3.692s-1.842.109-3.923-.611l-6.365-2.202c-3.892-1.346-5.838-2.019-5.91-3.34c-.074-1.32 1.786-2.2 5.505-3.957M9.498 15.5v2.227c0 2.374 0 3.56.71 3.75s1.458-.798 2.954-2.773l.836-1.204"
              ></path>
            </svg>
          </i>{" "}
        </button>{" "}
      </form>
      {notice && <NewsletterToast notice={notice} onClose={closeNotice} />}
    </>
  );
}
