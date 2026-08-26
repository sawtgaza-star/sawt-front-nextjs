/* The three donation channels offered on /support/methods.
   All three cards share one neutral look in the design (grey border, olive
   icon tile), so there is no per-card accent any more — only the copy and the
   glyph change. Text lives here with its i18n key so the section component
   stays presentational. */

export type PaymentMethodValue = "gateway" | "transfer" | "crypto";

export interface PaymentMethod {
  value: PaymentMethodValue;
  title: string;
  titleKey: string;
  desc: string;
  descKey: string;
  /* Where the card links — step 1 of the wizard (/support/checkout). The
     wizard has no per-method screen yet, so all three land on the same one. */
  href: string;
}

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    value: "gateway",
    title: "دفع إلكتروني",
    titleKey: "support_method_gateway_title",
    desc: "يتم التبرع عبر منصة خارجية آمنة وسهلة الاستخدام، بحيث يقدر المتبرع إتمام العملية بسرعة وبطريقة موثوقة.",
    descKey: "support_method_gateway_desc",
    href: "/support/checkout",
  },
  {
    value: "transfer",
    title: "رعاية أو تمويل",
    titleKey: "support_method_transfer_title",
    desc: "يتم التبرع من خلال بيانات حساب بنكي أو محفظة إلكترونية، ثم يقوم المتبرع بإرفاق إثبات التحويل ليتم توثيق التبرع.",
    descKey: "support_method_transfer_desc",
    href: "/support/checkout",
  },
  {
    value: "crypto",
    title: "عملات رقمية",
    titleKey: "support_method_crypto_title",
    desc: "يتم التبرع عبر منصة خارجية آمنة وسهلة الاستخدام، بحيث يقدر المتبرع إتمام العملية بسرعة وبطريقة موثوقة.",
    descKey: "support_method_crypto_desc",
    href: "/support/checkout",
  },
];
