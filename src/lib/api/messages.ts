/* =========================================================
   Arabic API text → i18n key.

   The API ignores Accept-Language and answers in Arabic only (see client.ts),
   and the site's translator is DOM-based on [data-i18n] keys — which a message
   that arrives at runtime doesn't have. So messages are matched back to a key
   by their text and then read out of translations.ts like any other string.

   Matching is on a normalised form (diacritics, tatweel, alef spellings and
   trailing punctuation removed) so a harmless difference in how the server
   spells a word doesn't lose the match. A message that isn't in the table is
   shown exactly as the server sent it — never dropped, never guessed at.
   ========================================================= */

import { translations, getCurrentLang } from "@/lib/translations";

/** Strip what shouldn't decide a match: diacritics/shadda (U+064B–U+0652,
    U+0670), tatweel, alef spellings, doubled spaces, trailing punctuation. */
function normalize(text: string): string {
  return text
    .replace(/[ً-ْٰـ]/g, "")
    .replace(/[أإآٱ]/g, "ا")
    .replace(/\s+/g, " ")
    .replace(/[.!؟\s]+$/g, "")
    .trim();
}

/* Built from the Arabic dictionary itself, so a key only ever has to be
   written once — in translations.ts, next to its English text. */
const KEY_BY_TEXT: Record<string, string> = (() => {
  const table: Record<string, string> = {};
  for (const [key, value] of Object.entries(translations.ar as Record<string, string>)) {
    if (key.startsWith("api_") && typeof value === "string") {
      table[normalize(value)] = key;
    }
  }
  return table;
})();

/** The message to show for a server (or locally raised) Arabic message. */
export function apiMessage(message?: string | null): string | undefined {
  if (!message) return undefined;

  const key = KEY_BY_TEXT[normalize(message)];
  if (!key) return message;

  const lang = getCurrentLang();
  return translations[lang]?.[key] || message;
}
