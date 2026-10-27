import { localized, type Localized, localizedHtml } from "@/lib/api/pages";
import type { CreatorCollaborationsBlock } from "@/lib/api/creator-profile";
import { IconTag } from "@/components/ui/icons";
import { bySortOrder } from "./creators-text";
import RichText from "@/components/ui/RichText";
import { textDir } from "@/components/home/home-text";

/* "ابرز التعاونات" on a creator's page (/creators/[id]), from the profile
   payload's `collaborations` block: the title + description centered on top
   like the page's other sections (.cr-section-head), and under them a
   centered row of cards, one per collaboration — the company's first letter
   in a white square, then its name and its field as a small tag (the sector
   stands in when there is no field). Nothing is shown when the creator has no
   collaborations. */

/** A plain string or a { ar, en } pair — whichever the payload sent. */
function text(value: Localized | string | null | undefined, lang: string): string {
  if (!value) return "";
  return typeof value === "string" ? value.trim() : localized(value, lang);
}

type Item = { name: string; field: string; sector: string };

function CollabCard({ item, lang }: { item: Item; lang: string }) {
  // the first letter (not a leading "ال") stands in for a logo
  const letter = Array.from(item.name.replace(/^ال(?=\S{2})/, ""))[0] || "";
  return (
    // each card reads in its company's own script — an English name lays
    // out left-to-right even on the Arabic page, and the reverse
    <article className="cr-collab-card" dir={textDir(item.name, lang === "en" ? "ltr" : "rtl")}>
      <span className="cr-collab-card-letter" aria-hidden="true">
        {letter}
      </span>
      <div className="cr-collab-card-text">
        <h3 className="cr-collab-card-name">{item.name}</h3>
        {item.field || item.sector ? (
          <span className="cr-collab-card-tag" dir={textDir(item.field || item.sector, lang === "en" ? "ltr" : "rtl")}>
            <span className="cr-collab-card-tag-icon" aria-hidden="true">
              <IconTag />
            </span>
            {item.field || item.sector}
          </span>
        ) : null}
      </div>
    </article>
  );
}

export default function CreatorCollaborations({
  data,
  lang = "ar",
}: {
  data?: CreatorCollaborationsBlock;
  /** Kept for the caller's signature; the reel card that used them is gone. */
  labels?: unknown;
  lang?: string;
}) {
  const items: Item[] = bySortOrder(data?.items)
    .map((item) => {
      const category = item.company?.category;
      return {
        name: text(item.company?.name, lang),
        field: text(item.company?.field, lang),
        sector: text(Array.isArray(category) ? category[0] : category, lang),
      };
    })
    .filter((item) => item.name);
  if (!items.length) return null;

  // the last word gets the peach stroke, like the page's other headings
  const title = localized(data?.title, lang);
  const words = title.trim().split(/\s+/).filter(Boolean);
  const titleHead = words.slice(0, -1).join(" ");
  const titleTail = words[words.length - 1] || "";
  const description = localizedHtml(data?.description, lang);

  return (
    <section className="cr-collabs-strip-section">
      <div className="container">
        {title || description ? (
          <div className="cr-section-head">
            {title ? (
              <h2 className="cr-section-title">
                {titleHead ? <>{titleHead} </> : null}
                <span className="cr-highlight">{titleTail}</span>
              </h2>
            ) : null}
            {description ? <RichText as="p" className="cr-section-sub" html={description} /> : null}
          </div>
        ) : null}

        <div className="cr-collab-cards">
          {items.map((item, index) => (
            <CollabCard item={item} lang={lang} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
