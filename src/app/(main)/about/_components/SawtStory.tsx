import type { CSSProperties } from "react";
import { localized, sorted, type AboutStoryContent } from "@/lib/api/pages";
import { splitHeading } from "./about-text";

/* API `story` block, and nothing else — the three built-in cards and their
   bundled icons are gone, so a card shows an icon only once an editor uploads
   one (`icon_url`). See AboutHero for the rest of the reasoning.

   The heading's accent is on its last word ("قصة صوت" → صوت); see ./about-text.
   The olive branch is background art, not content, so it stays. */
type StoryCardData = { title: string; desc: string; iconUrl?: string | null };

/* ≥992px the first four cards stand over the four glowing dots of the
   background (sawt-story-bg.jpg — the upload with its dark bottom strip
   cropped off), two per side as in the mock: each side's pair is stacked in a
   column centred on that side's dots, so the cards cover them. `x` / `y` are %
   of the image (the dots' own midpoint), so they hold at any width. Reading
   order is RTL: the right column takes cards 1 and 3, the left 2 and 4. Cards
   past the fourth fall back to the plain grid under the image; below 992px
   everything stacks as before. */
const STORY_COLUMNS = [
  { x: 76.7, y: 52.2, cards: [0, 2] },
  { x: 22.25, y: 51.35, cards: [1, 3] },
];
const PINNED_COUNT = 4;

function StoryCard({
  card,
  pinned = false,
  order,
}: {
  card: StoryCardData;
  pinned?: boolean;
  /** the card's place in the payload: below 992px the two columns dissolve
      (display: contents) and this keeps the stacked cards in reading order */
  order?: number;
}) {
  return (
    <div
      className={"col-12 col-md-6 col-lg-4 sawt-story-grid-col" + (pinned ? " sawt-story-pin" : "")}
      style={order === undefined ? undefined : { order }}
    >
      {" "}
      <div className="sawt-story-card">
        {" "}
        {/* the mock's small outline circle in the card's far corner */}
        {pinned ? <span className="sawt-story-card-dot" aria-hidden="true" /> : null}
        <div className="sawt-story-icon">
          {" "}
          {/* 31px ≈ the 1.3em the bundled SVGs drew at against
              .sawt-story-icon's 24px font-size, inside its 64px green
              circle. See CoreValues for the same note. */}
          {card.iconUrl ? (
            <i>
              <img
                src={card.iconUrl}
                alt=""
                width={31}
                height={31}
                style={{ objectFit: "contain" }}
              />
            </i>
          ) : null}{" "}
        </div>{" "}
        <h3 className="sawt-story-card-title">{card.title}</h3>{" "}
        <p className="sawt-story-card-desc">{card.desc}</p>{" "}
      </div>{" "}
    </div>
  );
}

export default function SawtStory({
  data,
  lang = "ar",
}: {
  data?: AboutStoryContent;
  lang?: string;
}) {
  const title = localized(data?.title, lang);
  const subtitle = localized(data?.subtitle, lang);
  const [titleHead, titleTail] = splitHeading(title, 1);

  const cards = sorted(data?.cards).map((card) => ({
    title: localized(card.title, lang),
    desc: localized(card.description, lang),
    iconUrl: card.icon_url,
  }));

  if (!title && !subtitle && !cards.length) return null;

  const pinned = cards.slice(0, PINNED_COUNT);
  const rest = cards.slice(PINNED_COUNT);

  return (
    <section className="sawt-story-section">
      {" "}
      <img
        src="/assets/images/leaf_cutout.png"
        className="olive-branch branch-right-bottom-sawt-story"
        alt="Olive Branch"
      />{" "}
      <div className="container" dir="rtl">
        {" "}
        <div className="text-center sawt-story-head">
          {" "}
          {title ? (
            <h2 className="sawt-story-title">
              {" "}
              <span>{titleHead} </span>{" "}
              <span className="sawt-story-highlight">{titleTail}</span>{" "}
            </h2>
          ) : null}{" "}
          {subtitle ? (
            <p className="sawt-story-subtitle">{subtitle}</p>
          ) : null}{" "}
        </div>{" "}
        {pinned.length ? (
          <div className="sawt-story-map">
            {" "}
            <div className="sawt-story-map-frame">
              {" "}
              <img
                src="/assets/images/sawt-story-bg.jpg"
                alt=""
                className="sawt-story-map-bg"
                width={2400}
                height={536}
              />{" "}
              <div className="row g-4 justify-content-center sawt-story-grid">
                {" "}
                {STORY_COLUMNS.map((column) => (
                  <div
                    className="sawt-story-stack"
                    key={column.x}
                    style={{ "--pin-x": `${column.x}%`, "--pin-y": `${column.y}%` } as CSSProperties}
                  >
                    {column.cards
                      .filter((index) => pinned[index])
                      .map((index) => (
                        <StoryCard card={pinned[index]} key={index} pinned order={index} />
                      ))}
                  </div>
                ))}{" "}
              </div>{" "}
            </div>{" "}
          </div>
        ) : null}{" "}
        {rest.length ? (
          <div className="row g-4 justify-content-center sawt-story-grid sawt-story-grid-rest">
            {" "}
            {rest.map((card, index) => (
              <StoryCard card={card} key={index} />
            ))}{" "}
          </div>
        ) : null}{" "}
      </div>{" "}
    </section>
  );
}
