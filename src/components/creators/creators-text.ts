/* Text shaping the /creators sections share. Pure functions, no DOM.

   Kept separate from home/home-text.ts and about/_components/about-text.ts on
   purpose — an edit meant for one page's headings can't reach another's. */

/* Every heading on this page paints part of itself in an accent colour, and
   the legacy markup hard-codes the split with a <span>:

     <span class="cr-title-orange">+47</span>
     <span>صانع محتوى ناجح في</span>
     <span class="cr-highlight">صوت</span>

   The API sends the heading as one string, so the split has to be recreated by
   word count — the designer put the accent in the same place in Arabic and in
   English. */

/** [head, tail] — the accent falls on the last `tailWords` words. A heading
    that is no longer than the tail becomes all tail. */
export function splitTail(text: string, tailWords: number): [string, string] {
  const parts = words(text);
  if (parts.length <= tailWords) return ["", parts.join(" ")];
  return [
    parts.slice(0, parts.length - tailWords).join(" "),
    parts.slice(parts.length - tailWords).join(" "),
  ];
}

/** [lead, middle, tail] — `leadWords` at the front and `tailWords` at the back
    carry their own accent, everything between them is plain. Whatever is left
    over after the two ends collides goes to the lead, so no word is dropped. */
export function splitEnds(
  text: string,
  leadWords: number,
  tailWords: number,
): [string, string, string] {
  const parts = words(text);
  if (parts.length <= leadWords + tailWords)
    return [parts.slice(0, leadWords).join(" "), "", parts.slice(leadWords).join(" ")];
  return [
    parts.slice(0, leadWords).join(" "),
    parts.slice(leadWords, parts.length - tailWords).join(" "),
    parts.slice(parts.length - tailWords).join(" "),
  ];
}

function words(text: string): string[] {
  return (text || "").trim().split(/\s+/).filter(Boolean);
}

/* The stat cards read "+45" / "250K$+" / "+4M" in the design, so the raw
   `value` is compacted the same way the creator card's follower badge is:
   250000 → "250K", 4000000 → "4M". Below 1000 the number is shown as it is. */
export function compact(value: number | null | undefined): string {
  if (typeof value !== "number" || !Number.isFinite(value)) return "";
  if (Math.abs(value) < 1000) return String(value);
  const thousands = value / 1000;
  if (Math.abs(thousands) >= 1000) return `${trimZero(thousands / 1000)}M`;
  return `${trimZero(thousands)}K`;
}

/** The figure as the card shows it: the editor's `prefix`, the compacted
    number, the editor's `suffix` — in that order, which is how the payload
    describes them ("+$" + "250K", "45" + "+"). */
export function statFigure(
  value: number | null | undefined,
  prefix?: string | null,
  suffix?: string | null,
): string {
  const number = compact(value);
  if (!number) return "";
  return `${prefix || ""}${number}${suffix || ""}`;
}

/** The card's badge reads "31.4K متابع": the count compacted, then the
    payload's own word for "followers". Either half may be missing. */
export function followersLabel(
  count: number | null | undefined,
  suffix: string,
): string {
  const number = compact(count);
  return number ? [number, suffix].filter(Boolean).join(" ") : "";
}

/** The step card's figure — the API's 1, 2, 3 as the design's "01", "02". */
export function stepNumber(value: number | null | undefined, index: number): string {
  const number = typeof value === "number" && Number.isFinite(value) ? value : index + 1;
  return String(number).padStart(2, "0");
}

/** Items in the order the editor arranged them. Entries without `sort_order`
    keep the order the API listed them in — same rule as `sorted()` in
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

/** One decimal place, and none at all when it would be a trailing zero. */
function trimZero(value: number): string {
  const fixed = value.toFixed(1);
  return fixed.endsWith(".0") ? fixed.slice(0, -2) : fixed;
}
