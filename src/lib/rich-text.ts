/* The CMS's rich-text editor sends prose fields as HTML:

     '<p dir="rtl"><strong>صوت ميديا…</strong></p><p dir="rtl">&nbsp;تقدم…</p><p><br></p>'

   `htmlToLines` (./html-text) throws all of that away. This keeps what the
   editor actually chose — paragraphs, line breaks, bold / italic / underline,
   links — and nothing else, in a shape that is safe to drop inside ANY element
   the design already uses for the text (a <p>, an <h2>, a <span>, a button):

     - every paragraph / block becomes one line, lines joined with <br>
       (a <p> inside the design's own <p> would be invalid markup)
     - inline formatting is kept, all attributes dropped (dir, style, class —
       the section's CSS decides the look) except a link's http(s)/mailto href
     - the editor's padding goes: empty paragraphs (`<p><br></p>`), &nbsp; at
       the start / end of a line, runs of blank lines
     - any other tag (script, img, iframe…) is removed, its text kept

   Plain text (no tags) is escaped and its newlines become <br>, so a field the
   editor typed without the rich editor reads the same way.
   Pure, no DOM, so it runs on the server too. */

const INLINE_TAGS: Record<string, string> = {
  strong: "strong",
  b: "strong",
  em: "em",
  i: "em",
  u: "u",
  s: "s",
  strike: "s",
  del: "s",
  sub: "sub",
  sup: "sup",
  mark: "mark",
  a: "a",
};

/* closing one of these (or <br>) ends a line */
const BLOCK_TAGS = /^(p|div|h[1-6]|li|blockquote|ul|ol|pre|section|article|tr|figure|figcaption)$/;

/* their content is never text worth keeping */
const DROPPED_WITH_CONTENT = /<(script|style|iframe|object|embed|noscript|template)\b[\s\S]*?<\/\1\s*>/gi;

const SAFE_HREF = /^(https?:|mailto:|tel:|\/|#)/i;

const BREAK = "\u0000"; // placeholder for a line break while tags are rewritten

function escapeText(text: string): string {
  return text.replace(/&(?!(#x[0-9a-f]+|#\d+|[a-z]+);)/gi, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function escapeAttr(value: string): string {
  return value.replace(/&(?!(#x[0-9a-f]+|#\d+|[a-z]+);)/gi, "&amp;").replace(/"/g, "&quot;");
}

function hrefOf(attrs: string): string | null {
  const m = /\bhref\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i.exec(attrs);
  const href = (m?.[1] ?? m?.[2] ?? m?.[3] ?? "").trim();
  return href && SAFE_HREF.test(href) ? href : null;
}

/** Editor HTML (or plain text) → inline-safe HTML; "" when nothing is left.
    `oneLine` joins the lines with a space instead of <br> — for a card text
    the design clamps to a line or two. */
export function richInline(
  html: string | null | undefined,
  { oneLine = false }: { oneLine?: boolean } = {},
): string {
  const glue = oneLine ? " " : "<br>";
  if (!html) return "";
  const source = String(html);

  // plain text: escape it, keep the editor's own line breaks
  if (!/<[a-z!/][^>]*>/i.test(source)) {
    return source
      .split(/\r?\n/)
      .map((line) => escapeText(line.trim()))
      .filter(Boolean)
      .join(glue);
  }

  const openLinks: boolean[] = [];
  const rewritten = source
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(DROPPED_WITH_CONTENT, "")
    .replace(/<(\/?)([a-z][a-z0-9]*)\b([^>]*)>/gi, (_tag, slash: string, rawName: string, attrs: string) => {
      const name = rawName.toLowerCase();
      if (name === "br") return BREAK;
      if (BLOCK_TAGS.test(name)) return slash ? BREAK : "";
      const inline = INLINE_TAGS[name];
      if (!inline) return "";
      if (inline === "a") {
        if (slash) return openLinks.pop() ? "</a>" : "";
        const href = hrefOf(attrs);
        openLinks.push(Boolean(href));
        if (!href) return "";
        const external = /^https?:/i.test(href);
        return `<a href="${escapeAttr(href)}"${external ? ' target="_blank" rel="noopener noreferrer"' : ""}>`;
      }
      return slash ? `</${inline}>` : `<${inline}>`;
    });

  return rewritten
    .split(BREAK)
    .map((line) =>
      line
        .replace(/\s+/g, " ")
        // &nbsp; the editor leaves at either end of a line
        .replace(/^(?:\s|&nbsp;|&#160;)+|(?:\s|&nbsp;|&#160;)+$/gi, ""),
    )
    // a line that is only formatting tags around nothing is an empty paragraph
    .filter((line) => line.replace(/<[^>]*>|&nbsp;|&#160;|\s/gi, "") !== "")
    .join(glue);
}
