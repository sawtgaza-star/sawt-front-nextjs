/* What GET /pages/media does NOT send: the design tokens and the shapes the
   layout needs. Everything a visitor reads comes from the payload (see
   lib/api/media-page); what is left here is how the page draws it.

   Each palette is walked in the order the API lists its items, exactly as the
   design walks it card by card, and it repeats if an editor adds more items
   than the design had — a sixth service card is dealt the first palette again
   rather than rendering unstyled. */

/** Service card palettes, in the design's order (media.css: `.sm-svc-*`). */
export const SERVICE_THEMES = [
  "beige",
  "olive-dark",
  "olive-light",
  "ink",
  "peach",
] as const;
export type ServiceTheme = (typeof SERVICE_THEMES)[number];

/** "لماذا صوت ميديا" — the token that paints each card's corner dot:
    oliveGreen-300 → Orange-200 → oliveGreen-500 → Orange-300 → oliveGreen-700.
    (The icon itself is an upload now, so it carries its own colour.) */
export const WHY_ACCENTS = ["#879279", "#FFB181", "#4C5C37", "#FF7420", "#364127"];

/** Bundle card tab colour / border / accent, cycling down the list. */
export const PACKAGE_TONES = ["orange", "olive", "gray"] as const;
export type PackageTone = (typeof PACKAGE_TONES)[number];

/** The palette entry for item `index`, wrapping round for a longer list. */
export function cycle<T>(palette: readonly T[], index: number): T {
  return palette[index % palette.length];
}

/* ---------------------------------------------------------------------------
   CTA destinations.

   Same reasoning as the navbar's and the footer's ROUTE_BY_KEY: a call to
   action is matched by its `key` (stable; the editor doesn't type it) to
   something this page actually has, and the payload's own `path` is the
   fallback for a key nothing here knows about.

   It is not hypothetical here — the payload sends `/media#services` for
   "تعرف على خدماتنا" and `/media#works` for "عرض المزيد", but those sections'
   ids are `sm-services` and `sm-works`, so honouring the paths would leave
   both buttons doing nothing at all.
   --------------------------------------------------------------------------- */
const ROUTE_BY_KEY: Record<string, string> = {
  media: "/media",
  start_project: "/media/contact",
  works: "/media/works",
};

/* `services` is deliberately not in there: it means "the services deck", which
   is an anchor on /media itself and a cross-page link from anywhere else. The
   page that renders the CTA says which, through `overrides`. */
export function ctaHref(
  cta: { key?: string | null; path?: string | null } | undefined,
  fallback = "#",
  overrides?: Record<string, string>,
): string {
  const key = cta?.key;
  if (key && overrides?.[key]) return overrides[key];
  if (key && ROUTE_BY_KEY[key]) return ROUTE_BY_KEY[key];
  return cta?.path || fallback;
}

/* The hero's fanned deck has a fixed number of seats: media.css lays out
   `.sm-fan-0` … `.sm-fan-5` — five visible cards plus the hidden seat past the
   left edge that a card fades through on its way back round — and there is no
   seat 6 to give a seventh card. So the deck is always exactly this many cards
   whatever the editor uploads: a shorter list repeats (five stills fill the six
   seats with one shown twice, rather than leaving a gap in the arc) and a
   longer one is cut to the seats that exist. */
export const HERO_SEATS = 6;

export function heroDeck(urls: string[], seats = HERO_SEATS): string[] {
  if (!urls.length) return [];
  return Array.from({ length: seats }, (_, index) => urls[index % urls.length]);
}

/* The works wall is three vertical columns (three sideways rows on a phone),
   each looping its own list. The API sends one flat, service-ordered list, so
   it is dealt round-robin: each column gets a mix of services rather than one
   service's projects stacked together, and an item count that isn't a multiple
   of three still spreads evenly. */
export const WORKS_COLUMNS = 3;

export function dealIntoColumns<T>(items: T[], columns = WORKS_COLUMNS): T[][] {
  const wall: T[][] = Array.from({ length: columns }, () => []);
  items.forEach((item, index) => wall[index % columns].push(item));
  return wall.filter((column) => column.length > 0);
}

/* The packages heading is two-toned in the design — "…في باقة واحدة ," in ink,
   "اختر باقتك" in olive — but the API sends it as one string. The editor's own
   separator is where it splits: the last comma or dash, which is how the
   heading is punctuated in both languages ("Bundled services — choose your
   package"). The separator stays with the ink half, as the design draws it.
   A heading with no separator is simply not two-toned. */
const SEPARATORS = ["،", ",", "—", "–", ":"];

export function splitHighlight(text: string): [string, string] {
  const trimmed = text.trim();
  let at = -1;
  for (const separator of SEPARATORS) at = Math.max(at, trimmed.lastIndexOf(separator));
  if (at < 0) return [trimmed, ""];

  const head = trimmed.slice(0, at + 1).trim();
  const tail = trimmed.slice(at + 1).trim();
  return tail ? [head, tail] : [trimmed, ""];
}

/* The about collage is four fixed slots: a taller photo over a shorter one on
   the start side (right in RTL), the reverse on the end side. The API names
   them, so the slot is read by key; an editor who uploads without keys still
   fills them in the order they arrive. */
export const ABOUT_SLOTS = ["top_start", "top_end", "bottom_start", "bottom_end"] as const;

export function slotUrl(
  images: { key?: string | null; url?: string | null }[],
  slot: string,
  index: number,
): string | null {
  const byKey = images.find((image) => image.key === slot);
  return (byKey ?? images[index])?.url ?? null;
}

/* The closing banner's headline paints "صوت ميديا" orange inside an otherwise
   ink sentence — "فريق صوت ميديا يدعم نموك" — but the API sends it as one
   string. The brand is what the highlight falls on in both languages, so it is
   found by name and the two sides are returned as exact slices: the English
   headline reads "Sawt Media’s team…", and joining the pieces back with a
   space would put one in front of the apostrophe.

   A headline that doesn't name the brand is simply not two-toned. */
const BRAND_NAMES = ["صوت ميديا", "Sawt Media"];

export function splitBrand(title: string): [string, string, string] {
  for (const brand of BRAND_NAMES) {
    const at = title.indexOf(brand);
    if (at >= 0) return [title.slice(0, at), brand, title.slice(at + brand.length)];
  }
  return [title, "", ""];
}

/* ---------------------------------------------------------------------------
   The case-study gallery.

   The artboard lays out one block of five frames: a narrow frame beside a wide
   one, the same split mirrored on the next row, then a full-width frame
   closing the block. The payload's count is the editor's, not the artboard's,
   so the block repeats — and the run always ends on that full-width frame
   rather than on a half-empty row, whatever the count:

     1 → full                       6 → block + full
     2 → narrow|broad               7 → block + narrow|broad
     3 → narrow|broad, full         8 → block + narrow|broad + full
     4 → narrow|broad, broad|narrow 9 → block + narrow|broad + broad|narrow
     5 → the artboard's own block  10 → two blocks

   Exactly one narrow frame lands in every paired row, which is what gives the
   row its height — media.css puts the artboard's proportions on that one and
   the grid stretches its partner to match.
   --------------------------------------------------------------------------- */
export type GalleryFrame = "narrow" | "broad" | "full";

export function galleryLayout(count: number): GalleryFrame[] {
  const frames: GalleryFrame[] = [];
  /* how far into the current block of five we are */
  let pos = 0;

  for (let i = 0; i < count; i++) {
    const slot = pos % 2; // 0 = first of the row, 1 = its partner
    const alone = i === count - 1 && slot === 0;

    // the block's closing frame, or a last frame with no partner to pair with
    if (pos === 4 || alone) {
      frames.push("full");
      pos = 0;
      continue;
    }

    // row 1 of the block reads narrow|broad, row 2 mirrors it
    const narrowFirst = Math.floor(pos / 2) % 2 === 0;
    frames.push(slot === 0 ? (narrowFirst ? "narrow" : "broad") : narrowFirst ? "broad" : "narrow");
    pos++;
  }

  return frames;
}
