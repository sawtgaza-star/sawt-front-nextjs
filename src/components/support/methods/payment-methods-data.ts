/* The donation channels offered on /support/methods — only what
   GET /support/methods returns; there is no built-in list. All cards share
   one neutral look (grey border, olive icon tile) — only the copy and the
   glyph change. */

import { localized } from "@/lib/api/pages";
import type { SupportMethodCategory } from "@/lib/api/support";

export type PaymentMethodValue = "gateway" | "transfer" | "crypto";

export interface PaymentMethod {
  value: PaymentMethodValue;
  title: string;
  desc: string;
  /* Where the card links — step 1 of the wizard (/support/checkout), with the
     API's category key in `?method=` so the wizard can load that category
     (GET /support/methods/category/{key}). */
  href: string;
}

/* GET /support/methods' `categories`, resolved for one language. The
   API calls the gateway `electronic`; the glyph and the destination are this
   site's, matched by key. A category switched off (`is_enabled: false`) or
   one this site has no glyph for is left out. */
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
  return (categories || [])
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
}
