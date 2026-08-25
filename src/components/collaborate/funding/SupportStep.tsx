import { NOTE_MAX, SUPPORT_TYPES } from "./funding-form-data";

/* Step 2 — "تفاصيل عرض الدعم": what the organisation is offering (multi-pick
   tick boxes) and the free-text pitch underneath. Nothing here is required —
   the mock shows no error state on this step. */
export type SupportFields = {
  types: string[];
  about: string;
};

export default function SupportStep({
  values,
  onChange,
}: {
  values: SupportFields;
  onChange: (patch: Partial<SupportFields>) => void;
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
        <span className="cl-label" data-i18n="collab_fu_f_support">
          نوع الدعم الذي ترغبون بتقديمه
        </span>

        <div className="cl-checks">
          {SUPPORT_TYPES.map((type) => (
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
        <label className="cl-label" htmlFor="collab-fu-about">
          <span data-i18n="collab_fu_f_about">
            نبذة عن مؤسستكم ولماذا ترغبون بالتعاون معنا
          </span>
        </label>
        <textarea
          id="collab-fu-about"
          className="cl-textarea"
          maxLength={NOTE_MAX}
          placeholder="نوع الظهور المطلوب، شراكة إعلامية حصرية.."
          data-i18n-placeholder="collab_fu_f_about_ph"
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
