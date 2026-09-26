/* What GET /pages/incubator does NOT send: how the design draws it.
   Everything a visitor reads comes from the payload (lib/api/incubator-page);
   what is left here is the two-tone headings, the stand-in photos for the
   slots whose layout collapses without one, and where each button goes. */

/* ---------------------------------------------------------------------------
   Two-tone headings.

   Every section heading is ink with an olive tail ("لماذا حاضنة **صوت**؟",
   "دوراتنا الأكثر **شهرة**"), but the API sends one string. The editor's own
   separator decides when there is one ("الحاضنة بيتك الثاني ، **البوم
   الحاضنة**"); otherwise the last word carries the highlight, with a trailing
   ?/؟ kept outside it as the design draws it. Returns [head, highlight, tail].
   --------------------------------------------------------------------------- */
const SEPARATORS = ["،", ",", "—", "–", ":"];
const TRAILING = /[?؟!.]+$/;

export function splitTitle(text: string): [string, string, string] {
  const trimmed = text.trim();
  if (!trimmed) return ["", "", ""];

  let at = -1;
  for (const separator of SEPARATORS) at = Math.max(at, trimmed.lastIndexOf(separator));
  if (at > 0 && at < trimmed.length - 1) {
    return [trimmed.slice(0, at + 1), trimmed.slice(at + 1).trim(), ""];
  }

  const tail = trimmed.match(TRAILING)?.[0] ?? "";
  const body = trimmed.slice(0, trimmed.length - tail.length).trim();
  const space = body.lastIndexOf(" ");
  if (space < 0) return ["", body, tail];
  return [body.slice(0, space), body.slice(space + 1), tail];
}

/* The hero headline is three-toned — "حوّل قصتك / **إلى محتوى** / (line break)
   **يصنع أثرًا**" — ink, olive, then orange on its own line. Word-counted from
   the end: the last two words are orange, the two before them olive, the rest
   ink. A headline of four words or fewer is split in half (olive / orange). */
export function splitHeroTitle(text: string): [string, string, string] {
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (words.length <= 1) return ["", "", words.join(" ")];
  if (words.length <= 4) {
    const half = Math.ceil(words.length / 2);
    return ["", words.slice(0, half).join(" "), words.slice(half).join(" ")];
  }
  return [
    words.slice(0, -4).join(" "),
    words.slice(-4, -2).join(" "),
    words.slice(-2).join(" "),
  ];
}

/* ---------------------------------------------------------------------------
   Stand-in photos.

   These slots are sized boxes (aspect-ratio / fixed grid rows) whose layout
   and hover states are built around a photo. The seed payload leaves most of
   them null, so an empty one is drawn with the design's own placeholder until
   the editor uploads something — the copy on top of it is still the API's.
   --------------------------------------------------------------------------- */
export const PLACEHOLDER = {
  heroImage: "/assets/images/tree.jpg",
  whyImage: "/assets/images/story.png",
  card: "/assets/images/Rectangle 596.png",
  person: "/assets/images/Image (أحمد المنصور).png",
  faq: "/assets/images/Frame 1984080629.png",
  join: "/assets/images/join-img.jpg",
  album: "/assets/images/042ae163aa0d78003024d720046b35cdf2cea552.jpg",
} as const;

/* ---------------------------------------------------------------------------
   Destinations — never from the payload (it sends none for these), always to
   something this app actually serves.
   --------------------------------------------------------------------------- */
export const INCUBATOR_ROUTES = {
  /** "ابدأ رحلتك التعليمية" — down to the courses row. */
  heroCta: "#inc-courses",
  /** Every sponsorship package pays through the same page. */
  sponsor: "/support/methods",
} as const;

/** The course detail page. Its pages are prebuilt from GET /pages/courses
    (static export — see app/(main)/courses/[id]), the same list these cards
    come from, so every slug the API sends has a page. */
export function courseHref(slug: string | null | undefined): string {
  const key = (slug || "").trim();
  return key ? `/courses/${encodeURIComponent(key)}` : "#";
}

/** Items in the order the editor arranged them; entries without `sort_order`
    keep the order the API listed them in. */
export { sortItems } from "@/lib/api/media-page";
