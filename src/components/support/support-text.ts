/* Text shaping the /support sections share. Pure functions, no DOM. */

/* The section headings paint their last word in the accent colour — the
   built-in markup hard-codes that split with a <span>, but the API sends each
   heading as one string, so the split is recreated on the last `tailWords`
   words. Same helper as home/home-text.ts — kept separate so neither page's
   headings can be changed by an edit meant for the other. */
export function splitHeading(text: string, tailWords = 1): [string, string] {
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (words.length <= tailWords) return ["", words.join(" ")];
  return [
    words.slice(0, words.length - tailWords).join(" "),
    words.slice(words.length - tailWords).join(" "),
  ];
}

/** A figure as the design prints it: 32450 → "32,450". */
export function formatNumber(value: number): string {
  return Math.round(value).toLocaleString("en-US");
}

/** "USD" → "$". Anything else is shown as it came ("EUR"). */
export function currencySymbol(currency: string | null | undefined): string {
  const code = (currency || "USD").trim();
  return code.toUpperCase() === "USD" ? "$" : code;
}

/** Splits a sentence around its `:amount` placeholder, so the figure can be
    set in bold between the two halves. No placeholder → the whole sentence is
    the head and the figure is left out. */
export function splitAmount(text: string): [string, string, boolean] {
  const at = text.indexOf(":amount");
  if (at < 0) return [text, "", false];
  return [text.slice(0, at), text.slice(at + ":amount".length), true];
}

/** "100% موزّع بشفافية" → ["100%", "موزّع بشفافية"], for the donut's hole. */
export function splitPercentBadge(text: string): [string, string] {
  const match = text.trim().match(/^(\d+(?:\.\d+)?\s*%)\s*(.*)$/);
  return match ? [match[1].replace(/\s+/g, ""), match[2]] : ["100%", text.trim()];
}
