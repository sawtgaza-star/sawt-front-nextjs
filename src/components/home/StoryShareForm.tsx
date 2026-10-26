"use client";
/* The "شاركنا قصتك" box beside the home stories slider — same markup and
   classes as the legacy no-op form it replaces; it now POSTs the text to
   /pages/stories/share (lib/api/stories).

   The signed-in account is the story's author, so a guest gets the "sign in
   first" dialog instead of a request. What they typed is parked in
   sessionStorage and put back when sign-in returns them to this section, so
   nothing is lost on the way. A 401 mid-way means the stored session is
   stale: it is dropped and the same dialog asks them to sign in again.

   The login check runs first, so a guest is asked to sign in even with an
   empty box. Only then is too short (under STORY_MIN_LENGTH) caught here,
   before any request; the API's own 422 on `body` is shown the same way. Every answer — success or
   refusal — lands in the site's <NewsletterToast />, which runs the Arabic
   text through apiMessage() so it follows the language button. */

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { ApiError } from "@/lib/api/client";
import { shareStory, STORY_MIN_LENGTH } from "@/lib/api/stories";
import { clearSession, getToken } from "@/lib/auth-state";
import { translations } from "@/lib/translations";
import { useLang } from "@/lib/use-lang";
import LoginRequiredDialog from "@/components/site/LoginRequiredDialog";
import NewsletterToast, { type NewsletterNotice } from "@/components/site/NewsletterToast";

const DRAFT_KEY = "sawt_story_draft";

/* Arabic source text of a key — the toast runs it back through apiMessage() */
const ar = (key: string): string => (translations.ar as Record<string, string>)[key];

function readDraft(): string {
  try {
    return sessionStorage.getItem(DRAFT_KEY) || "";
  } catch {
    return "";
  }
}

function writeDraft(text: string | null): void {
  try {
    if (text) sessionStorage.setItem(DRAFT_KEY, text);
    else sessionStorage.removeItem(DRAFT_KEY);
  } catch {
    /* private mode / blocked storage: the draft just isn't kept */
  }
}

export default function StoryShareForm() {
  const { tr } = useLang();
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [needsLogin, setNeedsLogin] = useState(false);
  const [notice, setNotice] = useState<NewsletterNotice | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const closeNotice = useCallback(() => setNotice(null), []);
  const closeLogin = useCallback(() => setNeedsLogin(false), []);

  // back from sign-in: restore what the guest had typed
  useEffect(() => {
    const draft = readDraft();
    if (draft) setText(draft);
  }, []);

  /* this page, at the section holding the form, so sign-in lands the visitor
     back in front of it */
  const returnTo = () => {
    const { pathname, search, hash } = window.location;
    const section = formRef.current?.closest<HTMLElement>("section[id]");
    return pathname + search + (section ? `#${section.id}` : hash);
  };

  const askToSignIn = (story: string) => {
    writeDraft(story);
    setNeedsLogin(true);
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;

    // sign-in comes first: a guest is asked to log in before any validation
    const story = text.trim();
    const token = getToken();
    if (!token) {
      askToSignIn(story);
      return;
    }

    if (story.length < STORY_MIN_LENGTH) {
      setInvalid(true);
      setNotice({ kind: "error", message: ar("story_share_too_short") });
      return;
    }

    setBusy(true);
    setNotice(null);
    try {
      const result = await shareStory(story, token);
      setText("");
      setInvalid(false);
      writeDraft(null);
      setNotice({ kind: "success", message: result?.message || ar("story_share_sent") });
    } catch (caught) {
      if (caught instanceof ApiError && caught.isUnauthorized) {
        clearSession();
        askToSignIn(story);
        return;
      }
      if (!(caught instanceof ApiError)) console.error(caught);
      const fieldError = caught instanceof ApiError ? caught.field("body") : undefined;
      setInvalid(Boolean(fieldError));
      setNotice({
        kind: "error",
        message: fieldError || (caught instanceof ApiError ? caught.message : ar("api_unexpected")),
      });
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <form className="rs-comment-box" ref={formRef} onSubmit={onSubmit} noValidate>
        {" "}
        <textarea
          className="rs-input"
          rows={4}
          placeholder="شاركنا قصتك"
          data-i18n-placeholder="realstories_input_placeholder"
          value={text}
          onChange={(event) => {
            setText(event.target.value);
            if (invalid) setInvalid(false);
          }}
          disabled={busy}
          aria-invalid={invalid || undefined}
        ></textarea>{" "}
        <button
          type="submit"
          className="rs-send"
          aria-label={busy ? tr("story_share_sending") : "إرسال"}
          disabled={busy}
          aria-busy={busy || undefined}
        >
          {" "}
          <i>
            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"> <path d="M0 0h24v24H0z" fill="none"></path> <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m9.498 15l7.5-7.5m-8.992.179l7.321-3.46c3.042-1.438 4.563-2.157 5.533-1.436s.693 2.365.138 5.652l-.954 5.662c-.363 2.149-.544 3.223-1.345 3.692s-1.842.109-3.923-.611l-6.365-2.202c-3.892-1.346-5.838-2.019-5.91-3.34c-.074-1.32 1.786-2.2 5.505-3.957M9.498 15.5v2.227c0 2.374 0 3.56.71 3.75s1.458-.798 2.954-2.773l.836-1.204"></path> </svg>
          </i>{" "}
        </button>{" "}
      </form>

      {needsLogin && (
        <LoginRequiredDialog
          onClose={closeLogin}
          next={returnTo()}
          titleKey="story_login_title"
          messageKey="story_login_required"
        />
      )}

      {notice && <NewsletterToast notice={notice} onClose={closeNotice} />}
    </>
  );
}
