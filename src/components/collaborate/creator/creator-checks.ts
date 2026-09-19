/* What each step of the "صانع محتوى" flow must answer before it can be left.

   Pure functions of the step's values — CreatorWizard shows what they return
   and decides whether to move on (see `passes` in use-collaborate-form). Every
   box is required: an application the team can act on is one that answers all
   of it. The only thing left out is the intro video, which the API doesn't ask
   for either.

   The wording is the API's own wherever it has a message for that box, so a
   note reads the same whichever side raised it (the two sides check the same
   things, and the round trip is what has the last word). */

import type { ContentErrors, ContentFields } from "./ContentStep";
import type { PersonalErrors, PersonalFields } from "./PersonalStep";
import type { SocialErrors, SocialFields } from "./SocialStep";

/* Same shape the browser uses for <input type="email">: something, an @, then
   a dotted domain. Kept deliberately loose — the address is only checked for
   typos here, never verified. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Step 1 — "المعلومات الشخصية". */
export function checkPersonal(values: PersonalFields): PersonalErrors {
  const errors: PersonalErrors = {};
  if (!values.name.trim()) errors.name = "الرجاء إدخال الاسم الكامل.";
  if (!values.phone.trim()) errors.phone = "الرجاء إدخال رقم الهاتف.";
  const email = values.email.trim();
  if (!email) errors.email = "الرجاء إدخال البريد الالكتروني.";
  else if (!EMAIL_RE.test(email))
    errors.email = "الرجاء إدخال بريد الكتروني صحيح.";
  return errors;
}

/** Step 2 — "تفاصيل المحتوى". */
export function checkContent(values: ContentFields): ContentErrors {
  const errors: ContentErrors = {};
  if (values.categories.length === 0)
    errors.categories = "الرجاء اختيار نوع محتوى واحد على الأقل.";
  if (!values.followers.trim())
    errors.followers = "الرجاء إدخال عدد المتابعين التقريبي.";
  if (!values.about.trim()) errors.about = "الرجاء إدخال نبذة عن محتواك.";
  return errors;
}

/** Step 3 — "مواقع التواصل". The rows are flagged as one group: a platform
    with no link is the same mistake wherever in the list it is, and the team
    can't follow an empty one. Two things on this step are not in here: the
    join-terms tick, which is a control of its own with its own flag in the
    wizard, and "ملاحظات إضافية" — the one box that is genuinely an extra, as
    its own placeholder says. */
export function checkSocial(values: SocialFields): SocialErrors {
  const errors: SocialErrors = {};
  if (values.rows.length === 0 || values.rows.some((row) => !row.url.trim()))
    errors.rows = "الرجاء إدخال رابط لكل منصة مضافة.";
  return errors;
}
