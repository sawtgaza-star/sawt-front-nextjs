import { localized } from "@/lib/api/pages";
import { localizedList, type MediaConsultationContent } from "@/lib/api/media-page";
import { cycle } from "./media-page-view";
import MediaSectionHead from "./MediaSectionHead";
import MediaConsultForm from "./MediaConsultForm";
import {
  IconGoalUsers,
  IconGoalGrid,
  IconReqUser,
  IconNavMic,
} from "@/components/ui/icons";

/* "احجز استشارتك مع خبراء صوت ميديا" — copy + selling points on the right,
   the booking form card on the left.

   The selling points are the API's `bullets`; their icons are not in the
   payload, so the design's four are walked down the list in order (and repeat
   if an editor adds a fifth point). */
const PERK_ICONS = [
  <IconGoalUsers key="users" />,
  <IconGoalGrid key="grid" />,
  <IconReqUser key="user" />,
  <IconNavMic key="mic" />,
];

export default function MediaConsult({
  data,
  lang = "ar",
}: {
  data?: MediaConsultationContent;
  lang?: string;
}) {
  const body = localized(data?.body, lang);
  const perks = localizedList(data?.bullets, lang);

  if (!data) return null;

  return (
    <section className="sm-consult" id="sm-consult">
      <div className="container">
        <div className="sm-consult-row">
          <div className="sm-consult-copy">
            <MediaSectionHead
              align="start"
              pill={localized(data.eyebrow, lang)}
              title={localized(data.title, lang)}
            />
            {body ? <p className="sm-consult-desc">{body}</p> : null}

            {perks.length ? (
              <ul className="sm-consult-perks">
                {perks.map((perk, index) => (
                  <li key={index}>
                    <span className="sm-consult-perk-icon" aria-hidden="true">
                      {cycle(PERK_ICONS, index)}
                    </span>
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <MediaConsultForm form={data.form} lang={lang} />
        </div>
      </div>
    </section>
  );
}
