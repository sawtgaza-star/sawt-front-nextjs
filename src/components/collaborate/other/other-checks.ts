/* What each step of the "تعاون آخر" flow must answer before it can be left.
   Pure functions of the step's values — OtherWizard shows what they return and
   decides whether to move on (see `passes` in use-collaborate-form).

   Every box is required: a request the team can act on is one that answers all
   of it. The only thing left out is the file, which the API doesn't ask for
   either. The wording is the API's own wherever it has a message for that box,
   so a note reads the same whichever side raised it. */

import type { ContactErrors, ContactFields } from "./ContactStep";
import type { IdeaErrors, IdeaFields } from "./IdeaStep";

/* Same shape the browser uses for <input type="email">: something, an @, then
   a dotted domain. Kept deliberately loose — the address is only checked for
   typos here, never verified. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Step 1 — "بيانات التواصل". */
export function checkContact(values: ContactFields): ContactErrors {
  const errors: ContactErrors = {};
  if (!values.name.trim()) errors.name = "الرجاء إدخال الأسم / اسم المؤسسة.";
  const email = values.email.trim();
  if (!email) errors.email = "الرجاء إدخال البريد الالكتروني.";
  else if (!EMAIL_RE.test(email))
    errors.email = "الرجاء إدخال بريد الكتروني صحيح.";
  if (!values.phone.trim()) errors.phone = "الرجاء إدخال رقم الهاتف.";
  return errors;
}

/** Step 2 — "شرح الفكرة". The file is optional, and so is "ملاحظات إضافية" —
    the one box that is genuinely an extra. */
export function checkIdea(values: IdeaFields): IdeaErrors {
  const errors: IdeaErrors = {};
  if (!values.idea.trim()) errors.idea = "الرجاء إدخال فكرة التعاون التي تقترحها.";
  return errors;
}
