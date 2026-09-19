"use client";
/* Submit plumbing shared by the four collaboration wizards: one pending flag,
   the sentence a 201 answers with, and the messages a 422 rejects with.

   Mirrors components/auth/useAuthForm — the difference is that a wizard has no
   <form> to hang an onSubmit on, so `submit` takes the call itself. Nothing is
   checked here first: the API validates every field and answers in the same
   Arabic the rest of the site's forms show (a rule in the browser could only
   disagree with it), and the wizard's own step-1 checks stay where they are,
   for moving between steps.

   State keeps the server's Arabic verbatim; only what is handed to the UI is
   translated, with `lang` in the deps so the panel follows the language button
   — a wizard renders long after applyTranslations() has walked the page, so it
   can't rely on [data-i18n]. */

import { useCallback, useMemo, useRef, useState } from "react";
import { ApiError, type FieldErrors } from "@/lib/api/client";
import { apiMessage } from "@/lib/api/messages";
import { useLang } from "@/lib/use-lang";
import type { CollaborateResult } from "@/lib/api/collaborate-forms";

/** Last-resort text for a throw that isn't an ApiError (a bug, not the API). */
const UNKNOWN_MESSAGE = "حدث خطأ غير متوقع. حاول مرة أخرى.";
/** What a 201 that carries no message of its own is read as. */
const RECEIVED_MESSAGE = "تم استلام طلب التعاون، سنتواصل معك خلال 3–5 أيام عمل.";

const EMPTY_MESSAGES: string[] = [];

export type CollaborateFormState = {
  pending: boolean;
  /** The sentence to print on the done panel; null until the request lands. */
  done: string | null;
  /** Everything that was wrong with the last attempt, top-level message first. */
  messages: string[];
  /** The same rejection by field name, for deciding which step to go back to.
      Also what `submit` resolves with, so the caller doesn't have to wait a
      render for it. */
  fieldErrors: FieldErrors;
  /** Resolves null when the application went through, otherwise the fields the
      API flagged (empty when it rejected without naming any). */
  submit: (send: () => Promise<CollaborateResult>) => Promise<FieldErrors | null>;
};

/** Show what a step's check found and say whether the step may be left.
    `errors` is the map the check returned; `show` is the step's own setter. */
export function passes<E extends object>(errors: E, show: (errors: E) => void): boolean {
  show(errors);
  return Object.keys(errors).length === 0;
}

/** The notes for the boxes being edited, dropped — a message goes as soon as
    the box it is about is answered, rather than waiting for the next press.
    The step's error map is keyed by its own field names, so the patch handed
    to `onChange` names exactly the notes to drop. */
export function clearTouched<E extends object>(errors: E, patch: object): E {
  const rest = { ...errors } as Record<string, unknown>;
  for (const key of Object.keys(patch)) delete rest[key];
  return rest as E;
}

/** The earliest step a rejection touches, so the visitor lands on a box the
    API actually named. Fields the map doesn't list belong to step 1 (index 0),
    which is also where a rejection that names nothing lands. */
export function rejectedStep(
  flagged: FieldErrors,
  stepByField: Record<string, number>,
): number {
  // `socials.0.url` is the socials field, as far as the steps are concerned
  const steps = Object.keys(flagged).map(
    (field) => stepByField[field.split(".")[0]] ?? 0,
  );
  return steps.length ? Math.min(...steps) : 0;
}

/** The same rejection as notes under the boxes of the step the flow opens
    with — the only step whose fields have a place of their own to show one. */
export function rejectedFields<K extends string>(
  flagged: FieldErrors,
  boxByField: Record<string, K>,
): Partial<Record<K, string>> {
  const errors: Partial<Record<K, string>> = {};
  for (const [field, messages] of Object.entries(flagged)) {
    const box = boxByField[field.split(".")[0]];
    if (box && messages[0]) errors[box] = messages[0];
  }
  return errors;
}

export function useCollaborateForm(): CollaborateFormState {
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  // Ref, not the state flag: two presses can land in the same tick, before
  // React has re-rendered with pending === true.
  const inFlight = useRef(false);

  const submit = useCallback(async (send: () => Promise<CollaborateResult>) => {
    // A second press while the first is still out changes nothing — and it
    // must not read as a rejection either.
    if (inFlight.current) return {};

    inFlight.current = true;
    setPending(true);
    setError(null);
    setFieldErrors({});

    try {
      const result = await send();
      /* The server's wording wins over the built-in one, exactly as the
         booking form does it — the fallback is only for a 201 that carries no
         message, and it is the same sentence, so api/messages translates
         either. */
      setDone(result?.message || RECEIVED_MESSAGE);
      return null;
    } catch (caught) {
      if (caught instanceof ApiError) {
        setError(caught.message);
        setFieldErrors(caught.errors);
        return caught.errors;
      }
      console.error(caught);
      setError(UNKNOWN_MESSAGE);
      return {};
    } finally {
      inFlight.current = false;
      setPending(false);
    }
  }, []);

  const { lang } = useLang();

  /* Every distinct thing the API said, top-level message first — the field
     entries are folded in because a 422 flags every box at once while
     `message` only ever echoes the first of them, and the boxes it names are
     spread over steps the visitor has already left. */
  const messages = useMemo(() => {
    const all = [error, ...Object.values(fieldErrors).flat()]
      .map((message) => (message ? apiMessage(message) ?? message : null))
      .filter((message): message is string => !!message);
    return all.length ? Array.from(new Set(all)) : EMPTY_MESSAGES;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, fieldErrors, lang]);

  const shownDone = useMemo(
    () => (done ? (apiMessage(done) ?? done) : null),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [done, lang],
  );

  return { pending, done: shownDone, messages, fieldErrors, submit };
}
