import { NOTE_MAX, PARTNER_TYPES } from "./partnership-form-data";

/* Step 2 — "طبيعة الشراكة": what the company is proposing (multi-pick tick
   boxes) and the free-text pitch underneath. Nothing here is required — the
   mock shows no error state on this step. */
export type NatureFields = {
  types: string[];
  about: string;
};

export default function NatureStep({
  values,
  onChange,
}: {
  values: NatureFields;
  onChange: (patch: Partial<NatureFields>) => void;
}) {
  const toggle = (value: string) =>
    onChange({
      types: values.types.includes(value)
        ? values.types.filter((t) => t !== value)
        : [...values.types, value],
    });

  return (
    <div className="cl-form">
      <div className="cl-field">
        <span className="cl-label" data-i18n="collab_pa_f_types">
          نوع الشراكة الذي تقترحونها
        </span>

        <div className="cl-checks">
          {PARTNER_TYPES.map((type) => (
            <label className="cl-check" key={type.value}>
              <input
                type="checkbox"
                className="cl-check-input"
                checked={values.types.includes(type.value)}
                onChange={() => toggle(type.value)}
              />
              <span className="cl-check-box" aria-hidden="true">
                <i className="fa-solid fa-check"></i>
              </span>
              <span data-i18n={type.labelKey}>{type.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="cl-field">
        <label className="cl-label" htmlFor="collab-pa-about">
          <span data-i18n="collab_pa_f_about">
            نبذة عن مؤسستكم وهدف الشراكة
          </span>
        </label>
        <textarea
          id="collab-pa-about"
          className="cl-textarea"
          maxLength={NOTE_MAX}
          placeholder="نوع الظهور المطلوب، شراكة إعلامية حصرية.."
          data-i18n-placeholder="collab_pa_f_about_ph"
          value={values.about}
          onChange={(e) => onChange({ about: e.target.value })}
        />
        {/* the mock prints the cap first, then what has been typed */}
        <p className="cl-counter">
          {NOTE_MAX}/{values.about.length}
        </p>
      </div>
    </div>
  );
}
