/* The payment platforms offered on step 1 of the wizard (اختيار المنصة).
   The mock lists PayPal twice — kept as-is, so the `value` (not the brand)
   is what identifies each row. `brand` picks the logo in PaymentPlatforms. */

export type PaymentBrand = "paypal" | "mastercard";

export interface PaymentPlatform {
  value: string;
  brand: PaymentBrand;
  /* Brand names, so they are NOT translated — no data-i18n on the label. */
  label: string;
}

export const PAYMENT_PLATFORMS: PaymentPlatform[] = [
  { value: "paypal", brand: "paypal", label: "Pay pal" },
  { value: "mastercard", brand: "mastercard", label: "master card" },
  { value: "paypal-2", brand: "paypal", label: "Pay pal" },
];

export const DEFAULT_PLATFORM = PAYMENT_PLATFORMS[0].value;
