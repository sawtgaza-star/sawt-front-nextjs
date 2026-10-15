/* The CMS's rich-text editor sends some fields as HTML
   ('<p dir="rtl">إختر صانع المحتوى المناسب&nbsp;</p><p dir="rtl">استعرض…</p>'),
   which React would print tag for tag. This keeps only the words: one line per
   paragraph / <br>, tags dropped, the common entities decoded. Plain text
   passes through unchanged. Lines are joined with "\n" — an element with
   `white-space: pre-line` shows them as lines, any other reads them as spaces.
   Pure, no DOM, so it runs on the server too. */
const ENTITIES: Record<string, string> = {
  nbsp: " ",
  amp: "&",
  quot: '"',
  apos: "'",
  lt: "<",
  gt: ">",
};

export function htmlToLines(html: string | null | undefined): string {
  if (!html) return "";
  return String(html)
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|li|h[1-6])\s*>/gi, "\n")
    .replace(/<\/?[a-z][^>]*>/gi, "")
    .replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, code: string) => {
      if (code[0] === "#") {
        const n = code[1] === "x" || code[1] === "X"
          ? parseInt(code.slice(2), 16)
          : parseInt(code.slice(1), 10);
        return Number.isFinite(n) ? String.fromCodePoint(n) : match;
      }
      return ENTITIES[code.toLowerCase()] ?? match;
    })
    .split("\n")
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .join("\n");
}
