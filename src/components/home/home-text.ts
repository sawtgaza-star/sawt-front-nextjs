/* Text shaping the home sections share. Pure functions, no DOM. */

/* Six headings on this page paint their last word(s) in the accent colour —
   the legacy markup hard-codes the split with a <span>, e.g.

     <span>آخر</span> <span class="who-us">أخبارنا</span>

   The API sends the heading as one string, so the split has to be recreated:
   the accent falls on the last `tailWords` words, which is where the designer
   put it in every one of them, in Arabic and in English. Same helper as
   about/_components/about-text.ts — kept separate so neither page's headings
   can be changed by an edit meant for the other. */
export function splitHeading(text: string, tailWords: number): [string, string] {
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (words.length <= tailWords) return ["", words.join(" ")];
  return [
    words.slice(0, words.length - tailWords).join(" "),
    words.slice(words.length - tailWords).join(" "),
  ];
}

/* `publish_date` is an ISO timestamp; the card shows a plain date in the
   reader's language ("5 مارس 2026" / "March 5, 2026" — the shape the legacy
   `news_date` string had). An unparsable value renders as it arrived rather
   than as "Invalid Date". */
export function formatDate(iso: string | null | undefined, lang: string): string {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  try {
    return new Intl.DateTimeFormat(lang === "en" ? "en-US" : "ar-EG", {
      day: "numeric",
      month: "long",
      year: "numeric",
      // The Gregorian calendar in Arabic too — the legacy copy used it.
      calendar: "gregory",
      numberingSystem: "latn",
    }).format(date);
  } catch {
    return iso;
  }
}

/* The creator card's badge reads "31.4K متابع" in the design, so a raw
   `followers_count` is compacted the same way: 60000 -> "60K", 50630 ->
   "50.6K", 2000 -> "2K". Below 1000 the number is shown as it is. */
export function formatFollowers(count: number | null | undefined): string {
  if (typeof count !== "number" || !Number.isFinite(count)) return "";
  if (Math.abs(count) < 1000) return String(count);
  const thousands = count / 1000;
  if (Math.abs(thousands) >= 1000) {
    const millions = thousands / 1000;
    return `${trimZero(millions)}M`;
  }
  return `${trimZero(thousands)}K`;
}

/* A reel's view count is compacted the same way — "200k مشاهدة" is how the
   design writes it, and the API sends the raw number. */
export function formatViews(count: number | null | undefined): string {
  return formatFollowers(count);
}

/** One decimal place, and none at all when it would be a trailing zero. */
function trimZero(value: number): string {
  const fixed = value.toFixed(1);
  return fixed.endsWith(".0") ? fixed.slice(0, -2) : fixed;
}

/* Items in the order the editor arranged them. Entries without `sort_order`
   keep the order the API listed them in. Same rule as `sorted()` in
   lib/api/pages, over any of this page's item shapes. */
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
