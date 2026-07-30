import ExpertCard from "./ExpertCard";
import { EXPERTS } from "./experts-data";

/* "فريق خبراء متخصص" — five-up expert cards on a white band. */
export default function ExpertsTeam() {
  return (
    <section className="inc-experts" id="inc-experts">
      <div className="container">
        <div className="inc-section-head">
          <h2 className="inc-section-title">
            <span data-i18n="inc_experts_title_pre">فريق خبراء</span>{" "}
            <span className="inc-highlight" data-i18n="inc_experts_title_hl">
              متخصص
            </span>
          </h2>
          <p className="inc-section-sub" data-i18n="inc_experts_sub">
            أرقام حقيقية تعكس قوة مجتمعنا
          </p>
        </div>

        <div className="inc-expert-row">
          {EXPERTS.map((e) => (
            <ExpertCard expert={e} key={e.key} />
          ))}
        </div>
      </div>
    </section>
  );
}
