/* What each step of the "رعاية أو تمويل" flow must answer before it can be
   left. Pure functions of the step's values — FundingWizard shows what they
   return and decides whether to move on (see `passes` in use-collaborate-form).

   Every box is required: an offer the team can act on is one that answers all
   of it. The only thing left out is the company profile, which the API doesn't
   ask for either. The wording is the API's own wherever it has a message for
   that box, so a note reads the same whichever side raised it. */

import type { ExtrasErrors, ExtrasFields } from "./ExtrasStep";
import type { OrgErrors, OrgFields } from "./OrgStep";
import type { SupportErrors, SupportFields } from "./SupportStep";

/* Same shape the browser uses for <input type="email">: something, an @, then
   a dotted domain. Kept deliberately loose — the address is only checked for
   typos here, never verified. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Step 1 — "بيانات الجهة". */
export function checkOrg(values: OrgFields): OrgErrors {
  const errors: OrgErrors = {};
  if (!values.org.trim()) errors.org = "الرجاء إدخال اسم الشركة / المؤسسة.";
  const email = values.email.trim();
  if (!email) errors.email = "الرجاء إدخال البريد الالكتروني.";
  else if (!EMAIL_RE.test(email))
    errors.email = "الرجاء إدخال بريد الكتروني صحيح.";
  if (!values.phone.trim()) errors.phone = "الرجاء إدخال رقم الهاتف.";
  if (!values.site.trim())
    errors.site = "الرجاء إدخال موقع الشركة / المؤسسة الإلكتروني.";
  return errors;
}

/** Step 2 — "تفاصيل عرض الدعم". */
export function checkSupport(values: SupportFields): SupportErrors {
  const errors: SupportErrors = {};
  if (values.types.length === 0)
    errors.types = "الرجاء اختيار نوع دعم واحد على الأقل.";
  if (!values.about.trim())
    errors.about = "الرجاء إدخال نبذة عن مؤسستكم ولماذا ترغبون بالتعاون معنا.";
  return errors;
}

/** Step 3 — "تفاصيل إضافية ومرفقات". The company profile is optional, and so
    is "ملاحظات إضافية" — the one box that is genuinely an extra. */
export function checkExtras(values: ExtrasFields): ExtrasErrors {
  const errors: ExtrasErrors = {};
  if (!values.terms.trim())
    errors.terms = "الرجاء إدخال الشروط أو المقترحات المحددة للتعاون.";
  return errors;
}
