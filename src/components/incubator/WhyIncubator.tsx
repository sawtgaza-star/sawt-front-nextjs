import { localized, localizedHtml } from "@/lib/api/pages";
import type { IncubatorWhyContent } from "@/lib/api/incubator-page";
import { IncubatorTitle } from "./IncubatorSectionHead";
import { PLACEHOLDER, sortItems } from "./incubator-page-view";
import RichText from "@/components/ui/RichText";

/* "لماذا حاضنة صوت؟" — intro copy + 2×2 feature grid on the start side, and
   the filming photo layered over two rounded blocks + a dotted grid. Copy,
   photo and the feature icons (uploaded SVGs) are the API's `why` block.
   #inc-about is the anchor the navbar's "عن الحاضنة" link points at. */
export default function WhyIncubator({
  data,
  lang,
}: {
  data?: IncubatorWhyContent;
  lang: string;
}) {
  const title = localized(data?.title, lang);
  const desc = localizedHtml(data?.subtitle, lang);
  const items = sortItems(data?.items);
  if (!data || (!title && !desc && !items.length)) return null;

  return (
    <section className="inc-why" id="inc-about">
      <div className="container">
        <div className="inc-why-grid">
          <div className="inc-why-media">
            <span className="inc-why-shape-green" aria-hidden="true"></span>
            <span className="inc-why-shape-peach" aria-hidden="true"></span>
            <span className="inc-why-dots" aria-hidden="true"></span>
            <img
              className="inc-why-img"
              src={data.image_url || PLACEHOLDER.whyImage}
              alt=""
            />
          </div>

          <div className="inc-why-text">
            <IncubatorTitle title={title} className="inc-section-title inc-why-title" />
            {desc ? <RichText as="p" className="inc-why-desc" html={desc} /> : null}

            {items.length ? (
              <div className="inc-why-features">
                {items.map((item, index) => (
                  <div className="inc-why-feature" key={index}>
                    <span className="inc-why-feature-icon" aria-hidden="true">
                      {item.icon_url ? <img src={item.icon_url} alt="" /> : null}
                    </span>
                    <div className="inc-why-feature-body">
                      <h3 className="inc-why-feature-title">
                        {localized(item.title, lang)}
                      </h3>
                      <RichText as="p" className="inc-why-feature-desc" html={localizedHtml(item.description, lang)} />
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
