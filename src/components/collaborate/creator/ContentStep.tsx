import { IconFieldUser } from "@/components/collaborate/collaborate-icons";
import { CONTENT_CATEGORIES, NOTE_MAX } from "./creator-form-data";

/* Step 2 — "تفاصيل المحتوى": the content-type chips (multi-pick), the rough
   follower count on the creator's biggest platform, and the free-text pitch. */
export type ContentFields = {
  categories: string[];
  followers: string;
  about: string;
};

export default function ContentStep({
  values,
  onChange,
}: {
  values: ContentFields;
  onChange: (patch: Partial<ContentFields>) => void;
}) {
  const toggle = (value: string) =>
    onChange({
      categories: values.categories.includes(value)
        ? values.categories.filter((c) => c !== value)
        : [...values.categories, value],
    });

  return (
    <div className="cl-form">
      <div className="cl-field">
        <span className="cl-label" data-i18n="collab_f_categories">
          نوع المحتوى الذي تنتجه
        </span>
        <div className="cl-chips">
          {CONTENT_CATEGORIES.map((cat) => {
            const on = values.categories.includes(cat.value);
            return (
              <button
                key={cat.value}
                type="button"
                className={"cl-chip" + (on ? " is-on" : "")}
                aria-pressed={on}
                onClick={() => toggle(cat.value)}
                data-i18n={cat.labelKey}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
        <p className="cl-hint" data-i18n="collab_f_categories_hint">
          *بإمكانك اختيار اكثر من خيار
        </p>
      </div>

      <div className="cl-field">
        <label className="cl-label" htmlFor="collab-followers">
          <span data-i18n="collab_f_followers">
            عدد المتابعين التقريبي في المنصة الواحدة (الاعلى شهرة )
          </span>
        </label>
        <div className="cl-input-wrap">
          <span className="cl-input-icon" aria-hidden="true">
            <IconFieldUser />
          </span>
          <input
            id="collab-followers"
            type="number"
            min={0}
            className="cl-input"
            placeholder="5000"
            data-i18n-placeholder="collab_f_followers_ph"
            value={values.followers}
            onChange={(e) => onChange({ followers: e.target.value })}
          />
        </div>
      </div>

      <div className="cl-field">
        <label className="cl-label" htmlFor="collab-about">
          <span data-i18n="collab_f_about">نبذة عن محتواك</span>
        </label>
        <textarea
          id="collab-about"
          className="cl-textarea"
          maxLength={NOTE_MAX}
          placeholder="اشرح ما تقدمه، لماذا تريد الانضمام، وما يميزك."
          data-i18n-placeholder="collab_f_about_ph"
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
