import { IconArrowUpLeftSolid } from "@/components/ui/icons";
import { localized } from "@/lib/api/pages";
import type { IncubatorTestimonialsContent } from "@/lib/api/incubator-page";
import TestimonialsSlider from "./TestimonialsSlider";
import { sortItems, splitTitle } from "./incubator-page-view";

/* "شهادات وتجارب خريجينا" — last section of /incubator, from the API's
   `testimonials` block: a rounded olive canvas with the shared pattern.png
   scatter showing through a translucent inner panel; the copy + "عرض الكل"
   button sit on the start side and the testimonial card strip
   (TestimonialsSlider) on the end side. The heading breaks before its olive
   tail, as in the mock. */
export default function IncubatorTestimonials({
  data,
  lang,
}: {
  data?: IncubatorTestimonialsContent;
  lang: string;
}) {
  const items = sortItems(data?.items);
  if (!data || !items.length) return null;

  const [head, highlight, tail] = splitTitle(localized(data.title, lang));
  const sub = localized(data.subtitle, lang);
  const viewAll = localized(data.view_all?.label, lang);

  return (
    <section className="inc-testi">
      <div className="container">
        <div className="inc-testi-wrap">
          <div className="inc-testi-panel">
            <div className="inc-testi-copy">
              {head || highlight ? (
                <h2 className="inc-testi-title">
                  {head ? (
                    <>
                      <span>{head}</span>
                      <br />
                    </>
                  ) : null}
                  {highlight ? <span className="inc-highlight">{highlight}</span> : null}
                  {tail}
                </h2>
              ) : null}
              {sub ? <p className="inc-testi-sub">{sub}</p> : null}
              {viewAll ? (
                <a className="inc-testi-btn" href="#">
                  <span>{viewAll}</span>
                  <IconArrowUpLeftSolid />
                </a>
              ) : null}
            </div>

            <TestimonialsSlider
              items={items}
              lang={lang}
              readMore={localized(data.read_more?.label, lang)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
