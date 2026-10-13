import SkeletonText from "@/components/ui/SkeletonText";
import {
  IconGoalGrid,
  IconGoalUsers,
  IconMail,
  IconNavMic,
  IconReqUser,
  IconUser,
} from "@/components/ui/icons";
import { IconFormPhone } from "./media-icons";
import { cycle } from "./media-page-view";
import { SkHead } from "./MediaSkeletonParts";

/* The booking block of /media while GET /pages/media is in flight —
   MediaConsult and MediaConsultForm, element for element, with every string
   swapped for a <SkeletonText /> of the current copy's length and the form's
   controls inert. Keep it in step with those two components. */

const CONSULT = {
  pill: 10,
  title: 32,
  body: 102,
  perks: [17, 20, 9, 23],
  form: { title: 9, name: 12, phone: 10, email: 17, service: 15, submit: 13 },
};
const PERK_ICONS = [
  <IconGoalUsers key="users" />,
  <IconGoalGrid key="grid" />,
  <IconReqUser key="user" />,
  <IconNavMic key="mic" />,
];

function Field({ label, icon, children }: {
  label: number;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className="sm-field">
      <label className="sm-label">
        <SkeletonText chars={label} />
      </label>
      {children ?? (
        <div className="sm-input-wrap">
          <i className="sm-input-icon">{icon}</i>
          <input type="text" className="sm-input" disabled tabIndex={-1} />
        </div>
      )}
    </div>
  );
}

export default function MediaSkeletonConsult() {
  const form = CONSULT.form;
  return (
    <section className="sm-consult">
      <div className="container">
        <div className="sm-consult-row">
          <div className="sm-consult-copy">
            <SkHead align="start" pill={CONSULT.pill} title={CONSULT.title} />
            <p className="sm-consult-desc">
              <SkeletonText chars={CONSULT.body} />
            </p>
            <ul className="sm-consult-perks">
              {CONSULT.perks.map((chars, index) => (
                <li key={index}>
                  <span className="sm-consult-perk-icon" aria-hidden="true">
                    {cycle(PERK_ICONS, index)}
                  </span>
                  <span>
                    <SkeletonText chars={chars} />
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* MediaConsultForm, inert */}
          <form className="sm-form" aria-hidden="true">
            <h3 className="sm-form-title">
              <SkeletonText chars={form.title} />
            </h3>
            <Field label={form.name} icon={<IconUser />} />
            <Field label={form.phone}>
              <div className="sm-phone-wrap">
                <div className="sm-country-select">
                  <button type="button" className="sm-country-box" disabled tabIndex={-1}>
                    <i className="fa-solid fa-chevron-down sm-country-caret"></i>
                    <span className="sm-country-code">
                      <SkeletonText chars={4} />
                    </span>
                    <span className="sm-country-flag smk-fill smk-flag"></span>
                  </button>
                </div>
                <div className="sm-input-wrap sm-phone-num">
                  <i className="sm-input-icon">
                    <IconFormPhone />
                  </i>
                  <input type="tel" className="sm-input" disabled tabIndex={-1} />
                </div>
              </div>
            </Field>
            <Field label={form.email} icon={<IconMail />} />
            <Field label={form.service}>
              <div className="sm-input-wrap sm-select-wrap">
                <i className="fa-solid fa-chevron-down sm-select-caret"></i>
                <select className="sm-input sm-select" disabled tabIndex={-1}></select>
              </div>
            </Field>
            <div
              className="sawt-recaptcha"
              style={{ display: "flex", justifyContent: "flex-start", margin: "16px 0" }}
            >
              <span className="smk-fill smk-recaptcha" />
            </div>
            <button type="button" className="sm-btn-green sm-form-submit" disabled tabIndex={-1}>
              <span>
                <SkeletonText chars={form.submit} />
              </span>
              <i className="fa-solid fa-angle-left"></i>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
