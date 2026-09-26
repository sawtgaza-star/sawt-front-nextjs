import { localized } from "@/lib/api/pages";
import type { IncubatorExpertsContent } from "@/lib/api/incubator-page";
import ExpertCard from "./ExpertCard";
import IncubatorSectionHead from "./IncubatorSectionHead";
import { toExpert } from "./experts-data";
import { sortItems } from "./incubator-page-view";

/* "فريق خبراء متخصص" — expert cards on a white band, from the API's
   `experts` block. */
export default function ExpertsTeam({
  data,
  lang,
}: {
  data?: IncubatorExpertsContent;
  lang: string;
}) {
  const items = sortItems(data?.items);
  if (!data || !items.length) return null;

  return (
    <section className="inc-experts" id="inc-experts">
      <div className="container">
        <IncubatorSectionHead
          title={localized(data.title, lang)}
          sub={localized(data.subtitle, lang)}
        />

        <div className="inc-expert-row">
          {items.map((item, index) => {
            const expert = toExpert(item, lang, index);
            return <ExpertCard expert={expert} key={expert.key} />;
          })}
        </div>
      </div>
    </section>
  );
}
