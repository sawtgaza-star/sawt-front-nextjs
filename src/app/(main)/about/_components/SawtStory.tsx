import { localized, sorted, type AboutStoryContent } from "@/lib/api/pages";
import { splitHeading } from "./about-text";

/* API `story` block, and nothing else — the three built-in cards and their
   bundled icons are gone, so a card shows an icon only once an editor uploads
   one (`icon_url`). See AboutHero for the rest of the reasoning.

   The heading's accent is on its last word ("قصة صوت" → صوت); see ./about-text.
   The olive branch is background art, not content, so it stays. */
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
        <div className="row g-4 justify-content-center sawt-story-grid">
          {" "}
          {cards.map((card, index) => (
            <div
              className="col-12 col-md-6 col-lg-4 sawt-story-grid-col"
              key={index}
            >
              {" "}
              <div className="sawt-story-card">
                {" "}
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
          ))}{" "}
        </div>{" "}
      </div>{" "}
    </section>
  );
}
