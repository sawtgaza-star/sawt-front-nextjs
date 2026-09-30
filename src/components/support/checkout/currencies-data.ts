/* Currencies offered on "إثبات تبرعك" (wizard screen 3). The mock only shows
   the placeholder, so the list is the set the platform already collects in. */

export interface Currency {
  value: string;
  label: string;
  labelKey: string;
}

export const CURRENCIES: Currency[] = [
  { value: "USD", label: "دولار أمريكي", labelKey: "checkout_currency_usd" },
  { value: "EUR", label: "يورو", labelKey: "checkout_currency_eur" },
  { value: "ILS", label: "شيكل", labelKey: "checkout_currency_ils" },
  { value: "JOD", label: "دينار أردني", labelKey: "checkout_currency_jod" },
];

/* the site-wide upload rule (5MB, png/jpg/pdf, checked by content) — see
   lib/attachment */
export { ATTACH_ACCEPT as PROOF_ACCEPT } from "@/lib/attachment";
