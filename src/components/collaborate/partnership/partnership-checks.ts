/* What each step of the "شراكة استراتيجية" flow must answer before it can be
   left. Pure functions of the step's values — PartnershipWizard shows what
   they return and decides whether to move on (see `passes` in
   use-collaborate-form).

   Every box is required: a proposal the team can act on is one that answers
   all of it. What is left out is step 3 — the company profile and the extra
   notes, neither of which the API asks for either. The wording is the API's
   own wherever it has a message for that box, so a note reads the same
   whichever side raised it. */

import type { CompanyErrors, CompanyFields } from "./CompanyStep";
import type { NatureErrors, NatureFields } from "./NatureStep";

/* Same shape the browser uses for <input type="email">: something, an @, then
   a dotted domain. Kept deliberately loose — the address is only checked for
   typos here, never verified. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Step 1 — "بيانات الشركة". */
export function checkCompany(values: CompanyFields): CompanyErrors {
  const errors: CompanyErrors = {};
  if (!values.company.trim())
    errors.company = "الرجاء إدخال اسم الشركة / المؤسسة.";
  const email = values.email.trim();
  if (!email) errors.email = "الرجاء إدخال البريد الالكتروني.";
  else if (!EMAIL_RE.test(email))
    errors.email = "الرجاء إدخال بريد الكتروني صحيح.";
  if (!values.phone.trim()) errors.phone = "الرجاء إدخال رقم الهاتف.";
  if (!values.site.trim()) errors.site = "الرجاء إدخال موقع الشركة الإلكتروني.";
  return errors;
}

/** Step 2 — "طبيعة الشراكة". */
export function checkNature(values: NatureFields): NatureErrors {
  const errors: NatureErrors = {};
  if (values.types.length === 0)
    errors.types = "الرجاء اختيار نوع شراكة واحد على الأقل.";
  if (!values.about.trim())
    errors.about = "الرجاء إدخال نبذة عن مؤسستكم وهدف الشراكة.";
  return errors;
}

/* Step 3 — "مرفقات وملاحظات" — has no check: both of its boxes, the company
   profile and "ملاحظات إضافية", are genuinely optional. */
