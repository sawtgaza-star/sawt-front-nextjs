import { localized } from "@/lib/api/pages";
import { sortItems, type MediaWhyContent } from "@/lib/api/media-page";
import { WHY_ACCENTS, cycle } from "./media-page-view";
import MediaSectionHead from "./MediaSectionHead";
import MediaWhyStrip from "./MediaWhyStrip";

/* "لماذا صوت ميديا" — right-aligned heading over a horizontal card strip that
   deliberately bleeds past the container's left edge, exactly as the design
   crops it. The set is rendered twice so MediaWhyStrip's hover auto-scroll can
   loop without a seam; the clones are hidden from assistive tech.

   The icons are uploads now (`icon_url`), so each card shows one only once an
   editor has added it and the colour is the SVG's own. `accent` — the dot in
   the card's top corner — stays a design token walked down the list. */
type WhyCardView = {
  iconUrl: string | null;
  title: string;
  description: string;
  accent: string;
};

function WhyCard({ card, clone }: { card: WhyCardView; clone?: boolean }) {
  return (
    <article
      className="sm-why-card"
      style={{ "--sm-why-accent": card.accent } as React.CSSProperties}
      aria-hidden={clone || undefined}
    >
      <i className="sm-why-dot" aria-hidden="true"></i>
      <span className="sm-why-icon">
        {card.iconUrl ? <img src={card.iconUrl} alt="" /> : null}
      </span>
      <h3 className="sm-why-card-title">{card.title}</h3>
      <p className="sm-why-card-desc">{card.description}</p>
    </article>
  );
}

export default function MediaWhy({
  data,
  lang = "ar",
}: {
  data?: MediaWhyContent;
  lang?: string;
}) {
  const cards: WhyCardView[] = sortItems(data?.items).map((item, index) => ({
    iconUrl: item.icon_url || null,
    title: localized(item.title, lang),
    description: localized(item.description, lang),
    accent: cycle(WHY_ACCENTS, index),
  }));

  if (!data || !cards.length) return null;

  return (
    <section className="sm-why">
      <div className="container">
        <MediaSectionHead
          align="start"
          pill={localized(data.eyebrow, lang)}
          title={localized(data.title, lang)}
          sub={localized(data.subtitle, lang)}
        />
      </div>

      <MediaWhyStrip>
        {cards.map((card, index) => (
          <WhyCard key={index} card={card} />
        ))}
        {cards.map((card, index) => (
          <WhyCard key={"loop-" + index} card={card} clone />
        ))}
      </MediaWhyStrip>
    </section>
  );
}
