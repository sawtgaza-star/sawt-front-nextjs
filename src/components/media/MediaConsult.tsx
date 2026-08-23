import MediaSectionHead from "./MediaSectionHead";
import MediaConsultForm from "./MediaConsultForm";
import {
  IconGoalUsers,
  IconGoalGrid,
  IconReqUser,
  IconNavMic,
} from "@/components/ui/icons";

/* "احجز استشارتك مع خبراء صوت ميديا" — copy + selling points on the right,
   the booking form card on the left. */
const PERKS = [
  { key: "sm_consult_perk_team", text: "فريق متخصص ومحترف", icon: <IconGoalUsers /> },
  { key: "sm_consult_perk_full", text: "حلول إعلامية متكاملة", icon: <IconGoalGrid /> },
  { key: "sm_consult_perk_privacy", text: "سرية تامة", icon: <IconReqUser /> },
  { key: "sm_consult_perk_impact", text: "صناعة أثر حقيقي ومستدام", icon: <IconNavMic /> },
];

export default function MediaConsult() {
  return (
    <section className="sm-consult" id="sm-consult">
      <div className="container">
        <div className="sm-consult-row">
          <div className="sm-consult-copy">
            <MediaSectionHead
              align="start"
              pill="الاستشارات"
              pillKey="sm_consult_pill"
              title="احجز استشارتك مع خبراء صوت ميديا"
              titleKey="sm_consult_title"
            />
            <p className="sm-consult-desc" data-i18n="sm_consult_desc">
              صوت ميديا وكالة إعلامية إبداعية متكاملة، تقدم حلولاً إعلامية شاملة
              من الاستراتيجية إلى الإنتاج والنشر. لسنا مجرد مزود خدمات — نحن
              شريكك الإبداعي الذي يفهم أهدافك ويعمل على تحقيقها.
            </p>

            <ul className="sm-consult-perks">
              {PERKS.map((p) => (
                <li key={p.key}>
                  <span className="sm-consult-perk-icon" aria-hidden="true">
                    {p.icon}
                  </span>
                  <span data-i18n={p.key}>{p.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <MediaConsultForm />
        </div>
      </div>
    </section>
  );
}
