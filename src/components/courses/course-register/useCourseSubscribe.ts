"use client";
import { useCallback, useRef, useState } from "react";
import { ApiError, type FieldErrors } from "@/lib/api/client";
import {
  subscribeToCourse,
  type CourseSubscribeRequest,
  type CourseSubscribeResponse,
} from "@/lib/api/courses";
import { getToken } from "@/lib/auth-state";
import { apiMessageKey } from "@/lib/api/messages";
import { GOALS, LEVELS, type EnrollForm, type StepId } from "./register-data";

/** Last-resort text for a throw that isn't an ApiError (a bug, not the API). */
const UNKNOWN_MESSAGE = "حدث خطأ غير متوقع. حاول مرة أخرى.";

/** Which pane each API field lives on — a 422 sends the visitor back to the
    first pane that has something to fix. */
const STEP_FIELDS: Record<StepId, string[]> = {
  1: ["full_name", "phone", "phone_country_code", "email"],
  2: ["academic_level", "attended_similar_course", "goals_interests"],
  3: ["join_goal", "additional_notes"],
};

/** The form's own field names → the API's, so editing a box clears its note. */
export const FORM_TO_API: Partial<Record<keyof EnrollForm, string[]>> = {
  fullname: ["full_name"],
  dialCode: ["phone_country_code"],
  phone: ["phone"],
  email: ["email"],
  level: ["academic_level"],
  attendedBefore: ["attended_similar_course"],
  interests: ["goals_interests"],
  goal: ["join_goal"],
  notes: ["additional_notes"],
};

export function firstStepWithError(errors: FieldErrors): StepId | null {
  for (const step of [1, 2, 3] as StepId[]) {
    if (STEP_FIELDS[step].some((field) => errors[field]?.length)) return step;
  }
  return null;
}

/* Required before "التالي" moves on — everything but "ملاحظات إضافية", which
   the form itself labels optional. Messages are i18n keys (the modal runs them
   through tr()), stored under the API's field names so they paint exactly
   where a 422 would. The API still validates the whole thing on submit. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateStep(step: StepId, form: EnrollForm): FieldErrors {
  const errors: FieldErrors = {};
  const need = (ok: boolean, field: string, key = "crs_en_required") => {
    if (!ok) errors[field] = [key];
  };

  if (step === 1) {
    need(Boolean(form.fullname.trim()), "full_name");
    need(Boolean(form.phone.trim()), "phone");
    const email = form.email.trim();
    if (!email) need(false, "email");
    else need(EMAIL_RE.test(email), "email", "crs_en_email_invalid");
  }
  if (step === 2) {
    need(Boolean(form.level), "academic_level");
    need(form.attendedBefore !== "", "attended_similar_course");
    need(Boolean(form.interests.trim()), "goals_interests");
  }
  if (step === 3) {
    need(Boolean(form.goal), "join_goal");
  }
  return errors;
}

/* The dropdowns hold option keys; the API takes the option's Arabic wording
   ("طالب جامعي", as its own example request does), so that is what is sent. */
const labelOf = (options: typeof LEVELS, value: string) =>
  options.find((option) => option.value === value)?.label ?? value;

function toRequest(form: EnrollForm): CourseSubscribeRequest {
  const optional = (value: string) => value.trim() || undefined;
  return {
    full_name: form.fullname.trim(),
    phone: form.phone.trim(),
    phone_country_code: form.dialCode,
    email: form.email.trim(),
    academic_level: form.level ? labelOf(LEVELS, form.level) : "",
    attended_similar_course:
      form.attendedBefore === "" ? undefined : form.attendedBefore === "yes",
    goals_interests: optional(form.interests),
    join_goal: form.goal ? labelOf(GOALS, form.goal) : "",
    additional_notes: optional(form.notes),
  };
}

/* The POST behind the modal's last "تسجيل في الكورس". Nothing is checked in
   the browser first — the API validates every field and answers in the same
   Arabic the rest of the site's forms show (see MediaConsultForm). A bearer
   token rides along when the visitor is signed in, for a course whose `cta`
   says `requires_auth`. */
export function useCourseSubscribe(path: string) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [result, setResult] = useState<CourseSubscribeResponse | null>(null);
  /** The server's "لديك طلب اشتراك قيد المراجعة لهذا الكورس." — a 422 on
      `email` that no edit to the form can fix, so the modal gives it its own
      pane instead of sending the visitor back to step 1. */
  const [duplicate, setDuplicate] = useState<string | null>(null);
  // a ref, not `pending`: two clicks can land before React re-renders
  const inFlight = useRef(false);

  const submit = useCallback(
    async (form: EnrollForm): Promise<FieldErrors | null> => {
      if (inFlight.current) return null;
      inFlight.current = true;
      setPending(true);
      setError(null);
      setFieldErrors({});

      try {
        setResult(await subscribeToCourse(path, toRequest(form), getToken()));
        return null;
      } catch (caught) {
        if (caught instanceof ApiError) {
          const already = [caught.message, ...(caught.errors.email ?? [])].find(
            (message) => apiMessageKey(message) === "api_course_already_pending",
          );
          if (already) {
            setDuplicate(already);
            return null;
          }
          setError(caught.message);
          setFieldErrors(caught.errors);
          return caught.errors;
        }
        console.error(caught);
        setError(UNKNOWN_MESSAGE);
        return null;
      } finally {
        inFlight.current = false;
        setPending(false);
      }
    },
    [path],
  );

  /** Drop a field's note on the first edit, and the banner with the last one. */
  const clearField = useCallback((...names: string[]) => {
    setFieldErrors((prev) => {
      if (!names.some((name) => prev[name])) return prev;
      const rest = { ...prev };
      for (const name of names) delete rest[name];
      if (!Object.keys(rest).length) setError(null);
      return rest;
    });
  }, []);

  /** Show the browser's own notes (see validateStep) without a request. */
  const fail = useCallback((errors: FieldErrors) => {
    setError(null);
    setFieldErrors(errors);
  }, []);

  return { pending, error, fieldErrors, result, duplicate, submit, clearField, fail };
}
