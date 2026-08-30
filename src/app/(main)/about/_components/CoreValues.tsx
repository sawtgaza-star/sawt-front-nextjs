import { localized, sorted, type AboutValuesContent } from "@/lib/api/pages";
import { splitHeading } from "./about-text";

/* API `values` block, and nothing else — the four built-in cards and their
   bundled SVG icons are gone, so a card shows an icon only once an editor
   uploads one (`icon_url`). See AboutHero for the rest of the reasoning.

   The heading is one string in the API but two halves in the design — the
   accent colour is on the last two words. See ./about-text.

   The olive branches stay: they are the section's background art, positioned by
   style.css, not content the API knows about. */
export default function CoreValues({
  data,
  lang = "ar",
}: {
  data?: AboutValuesContent;
  lang?: string;
}) {
  const title = localized(data?.title, lang);
  const subtitle = localized(data?.subtitle, lang);
  const [titleHead, titleTail] = splitHeading(title, 2);

  const cards = sorted(data?.items).map((item) => ({
    title: localized(item.title, lang),
    desc: localized(item.description, lang),
    iconUrl: item.icon_url,
  }));

  if (!title && !subtitle && !cards.length) return null;

  return (
    <section className="core-values-section">
      {" "}
      <img
        src="/assets/images/leaf_cutout.png"
        className="olive-branch branch-right-bottom-about"
        alt="Olive Branch"
      />{" "}
      <img
        src="/assets/images/leaf_cutout.png"
        className="olive-branch branch-left-bottom-about"
        alt="Olive Branch"
      />{" "}
      <div className="container" dir="rtl">
        {" "}
        <div className="text-center core-values-head">
          {" "}
          {title ? (
            <h2 className="core-values-title">
              {titleHead}{" "}
              <span className="core-values-highlight">{titleTail}</span>
            </h2>
          ) : null}{" "}
          {subtitle ? (
            <p className="core-values-subtitle">{subtitle}</p>
          ) : null}{" "}
        </div>{" "}
        <div className="row g-4 justify-content-center core-values-grid">
          {" "}
          {cards.map((card, index) => (
            <div className="col-12 col-sm-6 col-lg-3" key={index}>
              {" "}
              <div className="value-card">
                {" "}
                <div className="value-card-icon">
                  {" "}
                  {/* 36px is what the bundled SVGs drew at before the API took
                      over the icons: 1.5em against .value-card-icon's 24px
                      font-size. The tile itself is 56px and keeps its brush
                      stroke (Vector.svg) as a background, so the icon sits on
                      top of it exactly as it used to. `contain` keeps an
                      upload that isn't square from being stretched. */}
                  {card.iconUrl ? (
                    <img
                      src={card.iconUrl}
                      alt=""
                      width={36}
                      height={36}
                      style={{ objectFit: "contain" }}
                    />
                  ) : null}{" "}
                </div>{" "}
                <h3 className="value-card-title">{card.title}</h3>{" "}
                <p className="value-card-desc">{card.desc}</p>{" "}
              </div>{" "}
            </div>
          ))}{" "}
        </div>{" "}
      </div>{" "}
    </section>
  );
}
