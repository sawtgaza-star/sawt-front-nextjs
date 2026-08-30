/* The one place the password rules live: /register and /set-new-password both
   create a password, so both check against this.

   Checked client-side so the user isn't made to wait on a round trip for a rule
   they can see — exactly like the mismatch check that was already in the reset
   form. It is not a substitute for the API's own validation: whatever the
   server rejects still surfaces through AuthMessage as usual.

   Every message returned here is one of the Arabic strings in translations.ts
   (the `api_password_*` keys), never a sentence assembled at runtime, so
   lib/api/messages.ts can translate it for an English visitor the same way it
   translates the server's own text. That is also why an unmet rule is its own
   whole sentence rather than a fragment in a list. */

export const MIN_PASSWORD_LENGTH = 8;

/* No separate lowercase rule: an uppercase letter is a letter, so the stated
   policy ("letters, numbers and symbols, at least one uppercase") is already
   met without one. Add a rule below if that turns out to be wanted. */
const RULES: { test: RegExp; message: string }[] = [
  {
    test: /[A-Z]/,
    message: "كلمة المرور يجب أن تحتوي على حرف كبير واحد على الأقل.",
  },
  {
    test: /[0-9]/,
    message: "كلمة المرور يجب أن تحتوي على رقم واحد على الأقل.",
  },
  {
    /* Anything that is neither a letter nor a digit nor whitespace counts as a
       symbol — a wider net than a hand-written punctuation list, so a keyboard
       the design never anticipated doesn't get its password rejected. */
    test: /[^A-Za-z0-9\s]/,
    message: "كلمة المرور يجب أن تحتوي على رمز واحد على الأقل.",
  },
];

const REQUIRED_MESSAGE = "كلمة المرور مطلوبة.";
const TOO_SHORT_MESSAGE = "كلمة المرور يجب أن تكون 8 أحرف على الأقل.";

/** One message per rule the password breaks, so the user is told everything
    that is missing at once instead of one rule per submit. Empty when it
    passes. */
export function passwordPolicyErrors(password: string): string[] {
  // An empty box is "required", not four separate complaints.
  if (password.length === 0) return [REQUIRED_MESSAGE];

  const errors: string[] = [];
  if (password.length < MIN_PASSWORD_LENGTH) errors.push(TOO_SHORT_MESSAGE);
  for (const rule of RULES) {
    if (!rule.test.test(password)) errors.push(rule.message);
  }
  return errors;
}
