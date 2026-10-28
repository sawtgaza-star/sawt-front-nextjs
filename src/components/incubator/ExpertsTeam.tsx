import { localized, localizedHtml } from "@/lib/api/pages";
import type { IncubatorExpertsContent } from "@/lib/api/incubator-page";
import ExpertCard from "./ExpertCard";
import ExpertsSlider from "./ExpertsSlider";
import IncubatorSectionHead from "./IncubatorSectionHead";
import { toExpert } from "./experts-data";
import { sortItems } from "./incubator-page-view";

/* "فريق خبراء متخصص" — expert cards on a white band, from the API's
   `experts` block. Up to a full desktop row they sit side by side; past that
   a fifth card would wrap onto a lonely second line, so the row becomes a
   slider instead (ExpertsSlider). */
const ROW_SIZE = 4;

export default function ExpertsTeam({
  data,
  lang,
}: {
  data?: IncubatorExpertsContent;
  lang: string;
}) {
  const items = sortItems(data?.items);
  if (!data || !items.length) return null;

  const cards = items.map((item, index) => {
    const expert = toExpert(item, lang, index);
    return <ExpertCard expert={expert} key={expert.key} />;
  });

  return (
    <section className="inc-experts" id="inc-experts">
      <div className="container">
        <IncubatorSectionHead
          title={localized(data.title, lang)}
          sub={localizedHtml(data.subtitle, lang)}
        />

        {items.length > ROW_SIZE ? (
          <ExpertsSlider>{cards}</ExpertsSlider>
        ) : (
          <div className="inc-expert-row">{cards}</div>
        )}
      </div>
    </section>
  );
}
