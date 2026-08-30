"use client";
/* Shared submit plumbing for the five auth forms: one pending flag, one
   top-level message and the per-field validation map the API returns.

   `submit` wraps an async handler into an onSubmit: it preventDefault()s,
   clears the previous result, blocks double submits, and turns an ApiError
   into displayable state instead of an unhandled rejection. */

import { useCallback, useMemo, useRef, useState } from "react";
import { ApiError, type FieldErrors } from "@/lib/api/client";
import { apiMessage } from "@/lib/api/messages";
import { useLang } from "@/lib/use-lang";

/** Last-resort text for a throw that isn't an ApiError (a bug, not the API). */
const UNKNOWN_MESSAGE = "حدث خطأ غير متوقع. حاول مرة أخرى.";

/* Frozen empties, so "nothing wrong" is always the same object and a consumer's
   useMemo/useEffect deps don't fire on every render. */
const EMPTY_MESSAGES: string[] = [];
const EMPTY_FIELD_ERRORS: FieldErrors = {};

export function useAuthForm() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  /* Which side raised the current result. The two are shown in different
     places: what the API rejects is about the submission as a whole ("هذا
     البريد مسجّل مسبقاً.", "بيانات الدخول غير صحيحة.") and belongs in the
     banner above the form, while a local rule ("… مطلوب", the password policy)
     is about one box and belongs under it. See `apiMessages` /
     `localFieldErrors` below — `error` and `fieldErrors` still hold everything,
     so the forms that don't make this distinction are unaffected. */
  const [fromApi, setFromApi] = useState(false);

  // Ref, not the state flag: two submit events can land in the same tick,
  // before React has re-rendered with pending === true.
  const inFlight = useRef(false);

  const reset = useCallback(() => {
    setError(null);
    setSuccess(null);
    setFieldErrors({});
    setFromApi(false);
  }, []);

  const submit = useCallback(
    (handler: (data: FormData) => Promise<void>) =>
      async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      if (inFlight.current) return;

      inFlight.current = true;
      setPending(true);
      setError(null);
      setSuccess(null);
      setFieldErrors({});
      setFromApi(false);

      try {
        await handler(data);
      } catch (caught) {
        // Both branches are "came back from the round trip", including the
        // unexpected one — neither is a rule the form checked itself.
        setFromApi(true);
        if (caught instanceof ApiError) {
          setError(caught.message);
          setFieldErrors(caught.errors);
        } else {
          console.error(caught);
          setError(UNKNOWN_MESSAGE);
        }
      } finally {
        inFlight.current = false;
        setPending(false);
      }
    },
    [],
  );

  /** Raise a local (client-side) validation message without hitting the API. */
  const fail = useCallback((message: string, fields: FieldErrors = {}) => {
    setError(message);
    setFieldErrors(fields);
    setFromApi(false);
  }, []);

  /** Drop the message(s) for the field(s) being edited, so a "… مطلوب" note
      goes away on the first keystroke rather than waiting for another submit.
      Once nothing is flagged the top-level message goes too: it is the API's
      echo of the first field error, so it would otherwise pop back into the
      banner as the last field is fixed. */
  const clearField = useCallback(
    (...names: (string | undefined | null)[]) => {
      const flagged = names.filter((name): name is string => !!name && !!fieldErrors[name]);
      if (flagged.length === 0) return;

      const rest = { ...fieldErrors };
      for (const name of flagged) delete rest[name];
      setFieldErrors(rest);
      if (Object.keys(rest).length === 0) setError(null);
    },
    [fieldErrors],
  );

  /* State keeps the server's Arabic verbatim; only what is handed to the UI is
     translated. `lang` is in the deps so the messages on screen follow the
     language button — the forms render long after applyTranslations() has
     walked the page, so they can't rely on [data-i18n]. */
  const { lang } = useLang();

  const shownError = useMemo(() => apiMessage(error) ?? null, [error, lang]);
  const shownSuccess = useMemo(() => apiMessage(success) ?? null, [success, lang]);
  const shownFieldErrors = useMemo(() => {
    const translated: FieldErrors = {};
    for (const [name, messages] of Object.entries(fieldErrors)) {
      translated[name] = messages.map((message) => apiMessage(message) ?? message);
    }
    return translated;
  }, [fieldErrors, lang]);

  /* Every distinct thing the API said, top-level message first — the field
     entries are folded in because a 422 can flag two boxes while `message`
     only ever echoes the first of them. Empty unless the API is what failed,
     so a form can hand this straight to the banner. */
  const apiMessages = useMemo(() => {
    if (!fromApi) return EMPTY_MESSAGES;
    const all = [shownError, ...Object.values(shownFieldErrors).flat()].filter(
      (message): message is string => !!message,
    );
    return all.length > 0 ? Array.from(new Set(all)) : EMPTY_MESSAGES;
  }, [fromApi, shownError, shownFieldErrors]);

  /** The per-field map with the API's own rejections taken out, for a form that
      shows those in the banner instead. */
  const localFieldErrors = fromApi ? EMPTY_FIELD_ERRORS : shownFieldErrors;

  return {
    pending,
    error: shownError,
    success: shownSuccess,
    fieldErrors: shownFieldErrors,
    apiMessages,
    localFieldErrors,
    submit,
    reset,
    fail,
    clearField,
    setSuccess,
    setError,
  };
}
