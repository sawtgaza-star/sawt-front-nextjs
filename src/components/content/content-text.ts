/* Text shaping the محتوانا sections share. Pure functions, no DOM.

   Same two helpers the home and about pages keep locally — deliberately not
   imported across pages, so an edit meant for one heading can't change
   another's. */

/* The "الأكثر مشاهدة" heading paints its last word in the accent colour; the
   legacy markup hard-codes the split with a <span>:

     <span>الأكثر</span> <span class="cr-highlight">مشاهدة</span>

   The API sends it as one string, so the split has to be recreated: the accent
   falls on the last `tailWords` words, in Arabic and in English alike. */
export function splitHeading(text: string, tailWords: number): [string, string] {
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (words.length <= tailWords) return ["", words.join(" ")];
  return [
    words.slice(0, words.length - tailWords).join(" "),
    words.slice(words.length - tailWords).join(" "),
  ];
}

/* Items in the order the editor arranged them. Entries without `sort_order`
   keep the order the API listed them in. */
export function bySortOrder<T extends { sort_order?: number }>(
  items: T[] | undefined,
): T[] {
  if (!Array.isArray(items)) return [];
  return items
    .map((item, index) => ({ item, index }))
    .sort(
      (a, b) =>
        (a.item.sort_order ?? a.index) - (b.item.sort_order ?? b.index) ||
        a.index - b.index,
    )
    .map((entry) => entry.item);
}
