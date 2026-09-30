/* "التواصل" (wizard screen 4): the donor's contact details and the checks
   "اتمام العملية" runs on them. The WhatsApp dial code comes from the shared
   list in `@/lib/countries`. */

export interface ContactDetails {
  email: string;
  /* ISO2 code of the WhatsApp dial-code country (`ps`, `eg`…) — the code, not
     the dial, since +1 is shared by the US and Canada */
  country: string;
  whatsapp: string;
  name: string;
  notes: string;
}

export type ContactField = keyof ContactDetails;

export interface ContactErrors {
  email?: "required" | "invalid";
  whatsapp?: "required" | "invalid";
  name?: "required";
}

export const EMPTY_CONTACT: ContactDetails = {
  email: "",
  country: "ps",
  whatsapp: "",
  name: "",
  notes: "",
};

/* Same shape the browser uses for <input type="email">: something, an @, then
   a dotted domain. Kept deliberately loose — the address is only checked for
   typos here, never verified. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* Local part of a phone number: digits with optional spaces/dashes, 6–14
   digits in total (E.164 caps the whole number at 15 incl. the dial code). */
const PHONE_RE = /^[\d\s-]+$/;

/* E-mail, WhatsApp number and donor name are required; notes are optional.
   Returns an empty object when everything is usable. */
export function validateContact(contact: ContactDetails): ContactErrors {
  const errors: ContactErrors = {};
  const email = contact.email.trim();
  if (!email) errors.email = "required";
  else if (!EMAIL_RE.test(email)) errors.email = "invalid";

  const phone = contact.whatsapp.trim();
  if (!phone) errors.whatsapp = "required";
  else {
    const digits = phone.replace(/\D/g, "").length;
    if (!PHONE_RE.test(phone) || digits < 6 || digits > 14) {
      errors.whatsapp = "invalid";
    }
  }

  if (!contact.name.trim()) errors.name = "required";
  return errors;
}
