/* Turns an API platform (GET /support/methods/{uuid}) into what "بيانات
   التحويل" shows: the copyable rows and the numbered instructions. */

import { localized } from "@/lib/api/pages";
import type { SupportMethod } from "@/lib/api/support-methods";
import type { TransferField } from "./transfer-details-data";

const text = (value: string | null | undefined) => (value || "").trim();

/* The account holder and identifier first (they are what gets copied), then
   the editor's own `fields`. Empty values are dropped, and a field that just
   repeats the network/identifier already shown is not listed twice. */
export function methodRows(method: SupportMethod, lang: string): TransferField[] {
  const en = lang === "en";
  const rows: TransferField[] = [];
  const holder = text(method.account?.holder);
  const identifier = text(method.account?.identifier);

  if (holder) {
    rows.push({
      label: en ? "Account holder" : "صاحب الحساب",
      value: holder,
    });
  }
  if (identifier) {
    rows.push({
      label:
        method.category === "crypto"
          ? en ? "Wallet address" : "عنوان المحفظة"
          : en ? "Account / wallet number" : "رقم الحساب / المحفظة",
      value: identifier,
    });
  }

  for (const field of method.fields || []) {
    const value = text(field.value);
    const label = localized(field.label, lang);
    if (!value || !label || rows.some((r) => r.value === value)) continue;
    rows.push({ label, value, copyable: field.is_copyable !== false });
  }
  return rows;
}

/* "١. …\n٢. …" → one entry per line, with the editor's own numbering taken
   off (the list numbers itself). */
export function methodSteps(method: SupportMethod, lang: string): string[] {
  return localized(method.instructions, lang)
    .split(/\r?\n/)
    .map((line) => line.replace(/^\s*[\d٠-٩]+\s*[.\-)]\s*/, "").trim())
    .filter(Boolean);
}
