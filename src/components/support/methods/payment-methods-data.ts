/* The three donation channels offered on /support/methods.
   All three cards share one neutral look in the design (grey border, olive
   icon tile), so there is no per-card accent any more — only the copy and the
   glyph change. Text lives here with its i18n key so the section component
   stays presentational. */

import { localized } from "@/lib/api/pages";
import type { SupportMethodCategory } from "@/lib/api/support";

export type PaymentMethodValue = "gateway" | "transfer" | "crypto";

export interface PaymentMethod {
  value: PaymentMethodValue;
  title: string;
  /** Only the built-in copy carries i18n keys. */
  titleKey?: string;
  desc: string;
  descKey?: string;
  /* Where the card links — step 1 of the wizard (/support/checkout), with the
     API's category key in `?method=` so the wizard can load that category
     (GET /support/methods/category/{key}). */
  href: string;
}

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    value: "gateway",
    title: "دفع إلكتروني",
    titleKey: "support_method_gateway_title",
    desc: "يتم التبرع عبر منصة خارجية آمنة وسهلة الاستخدام، بحيث يقدر المتبرع إتمام العملية بسرعة وبطريقة موثوقة.",
    descKey: "support_method_gateway_desc",
    href: "/support/checkout?method=electronic",
  },
  {
    value: "transfer",
    title: "رعاية أو تمويل",
    titleKey: "support_method_transfer_title",
    desc: "يتم التبرع من خلال بيانات حساب بنكي أو محفظة إلكترونية، ثم يقوم المتبرع بإرفاق إثبات التحويل ليتم توثيق التبرع.",
    descKey: "support_method_transfer_desc",
    href: "/support/checkout?method=transfer",
  },
  {
    value: "crypto",
    title: "عملات رقمية",
    titleKey: "support_method_crypto_title",
    desc: "يتم التبرع عبر منصة خارجية آمنة وسهلة الاستخدام، بحيث يقدر المتبرع إتمام العملية بسرعة وبطريقة موثوقة.",
    descKey: "support_method_crypto_desc",
    href: "/support/checkout?method=crypto",
  },
];

/* GET /support/methods' `categories`, resolved for one language. The
   API calls the gateway `electronic`; the glyph and the destination are this
   site's, matched by key. A category switched off (`is_enabled: false`) or
   one this site has no glyph for is left out; the built-in three stand in
   when nothing is left. */
const VALUE_BY_KEY: Record<string, PaymentMethodValue> = {
  electronic: "gateway",
  gateway: "gateway",
  transfer: "transfer",
  crypto: "crypto",
};

export function resolvePaymentMethods(
  categories: SupportMethodCategory[] | undefined,
  lang: string,
): PaymentMethod[] {
  const resolved = (categories || [])
    .filter((c) => c.is_enabled !== false)
    .map((c): PaymentMethod | null => {
      const value = VALUE_BY_KEY[(c.key || "").trim().toLowerCase()];
      const title = localized(c.title, lang);
      if (!value || !title) return null;
      const key = (c.key || "").trim().toLowerCase();
      return {
        value,
        title,
        desc: localized(c.description, lang),
        href: `/support/checkout?method=${encodeURIComponent(key)}`,
      };
    })
    .filter((m): m is PaymentMethod => m !== null);

  return resolved.length ? resolved : PAYMENT_METHODS;
}
