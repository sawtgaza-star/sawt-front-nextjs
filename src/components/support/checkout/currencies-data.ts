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

/* Upload rules printed under the drop zone (5MB, png/jpg/pdf). */
export const PROOF_MAX_BYTES = 5 * 1024 * 1024;
export const PROOF_ACCEPT = ".png,.jpg,.jpeg,.pdf";
export const PROOF_TYPES = ["image/png", "image/jpeg", "application/pdf"];
