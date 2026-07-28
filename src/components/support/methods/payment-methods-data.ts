/* The three donation channels offered on /support/methods.
   `accent` maps to the .sp-method-card--* modifier that colours the card
   border, the tab above it and the icon. Text lives here with its i18n key so
   the section component stays presentational. */

export type PaymentMethodValue = "gateway" | "transfer" | "crypto";
export type PaymentMethodAccent = "orange" | "green" | "gray";

export interface PaymentMethod {
  value: PaymentMethodValue;
  accent: PaymentMethodAccent;
  title: string;
  titleKey: string;
  desc: string;
  descKey: string;
  /* Where "المتابعة" goes — step 1 of the wizard (/support/checkout). The
     wizard has no per-method screen yet, so all three land on the same one. */
  href: string;
}

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    value: "gateway",
    accent: "orange",
    title: "دفع إلكتروني",
    titleKey: "support_method_gateway_title",
    desc: "يتم التبرع باستخدام بوابة دفع آمنة وسهلة الاستخدام، بحيث يقدر المتبرع إتمام العملية بسرعة وبطريقة موثوقة.",
    descKey: "support_method_gateway_desc",
    href: "/support/checkout",
  },
  {
    value: "transfer",
    accent: "green",
    title: "تحويل مباشر",
    titleKey: "support_method_transfer_title",
    desc: "يتم التبرع من خلال بيانات حساب بنكي أو محفظة إلكترونية، ثم يقوم المتبرع بإرفاق إثبات التحويل ليتم توثيق التبرع.",
    descKey: "support_method_transfer_desc",
    href: "/support/checkout",
  },
  {
    value: "crypto",
    accent: "gray",
    title: "عملات رقمية",
    titleKey: "support_method_crypto_title",
    desc: "يتم التبرع باستخدام عملات رقمية مدعومة، مع إمكانية إرسال إثبات العملية بعد التحويل لتأكيد المساهمة.",
    descKey: "support_method_crypto_desc",
    href: "/support/checkout",
  },
];
