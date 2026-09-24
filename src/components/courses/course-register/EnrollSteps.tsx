"use client";
import {
  ChoiceRow,
  Field,
  IconField,
  SelectField,
  TextareaField,
} from "./enroll-fields";
import {
  IconIdCard,
  IconMail,
  IconPhone,
  IconUser,
} from "./enroll-icons";
import EnrollCountrySelect from "./EnrollCountrySelect";
import { GOALS, LEVELS, NOTES_MAX, type EnrollForm } from "./register-data";

/* The three panes of the enrollment modal, in the order the stepper walks
   them. They share one `form` object and one setter, so the answers survive
   stepping back and forth; the shell owns both (see CourseEnrollModal).

   Every string goes through `tr()` rather than a `data-i18n` attribute: this
   markup mounts when the modal opens, long after initTranslate() walked the
   page, so the DOM translator would never visit it. That is the case
   lib/use-lang exists for. */

type PaneProps = {
  form: EnrollForm;
  set: <K extends keyof EnrollForm>(key: K, value: EnrollForm[K]) => void;
  tr: (key: string) => string;
};

/** Step 1 — المعلومات الشخصية. */
export function StepPersonal({ form, set, tr }: PaneProps) {
  return (
    <div className="join-pane is-active">
      <Field label={tr("crs_en_fullname")}>
        <IconField
          icon={<IconUser />}
          type="text"
          name="fullname"
          value={form.fullname}
          placeholder={tr("crs_en_fullname_ph")}
          onChange={(e) => set("fullname", e.target.value)}
        />
      </Field>

      <Field label={tr("crs_en_phone")}>
        <div className="join-phone-wrap">
          <EnrollCountrySelect
            value={form.dialCode}
            onChange={(code) => set("dialCode", code)}
          />
          <div className="join-input-wrap join-phone-num">
            <i className="join-input-icon">
              <IconPhone />
            </i>
            <input
              type="tel"
              className="join-input"
              name="phone"
              dir="rtl"
              value={form.phone}
              placeholder={tr("crs_en_phone_ph")}
              onChange={(e) => set("phone", e.target.value)}
            />
          </div>
        </div>
      </Field>

      <Field label={tr("crs_en_email")}>
        <IconField
          icon={<IconMail />}
          type="email"
          name="email"
          value={form.email}
          placeholder={tr("crs_en_email_ph")}
          onChange={(e) => set("email", e.target.value)}
        />
      </Field>
    </div>
  );
}

/** Step 2 — البيانات الأكاديمية والمهنية. */
export function StepAcademic({ form, set, tr }: PaneProps) {
  return (
    <div className="join-pane is-active">
      <Field label={tr("crs_en_level")}>
        <SelectField
          icon={<IconIdCard />}
          placeholder={tr("crs_en_level_ph")}
          options={LEVELS}
          value={form.level}
          onChange={(value) => set("level", value)}
          name="level"
          tr={tr}
        />
      </Field>

      <Field label={tr("crs_en_attended")}>
        <ChoiceRow
          name="attended_before"
          value={form.attendedBefore}
          onChange={(value) =>
            set("attendedBefore", value as EnrollForm["attendedBefore"])
          }
          options={[
            { value: "yes", label: tr("crs_en_yes") },
            { value: "no", label: tr("crs_en_no") },
          ]}
        />
      </Field>

      <Field label={tr("crs_en_interests")}>
        <TextareaField
          name="interests"
          value={form.interests}
          placeholder={tr("crs_en_interests_ph")}
          onChange={(value) => set("interests", value)}
        />
      </Field>
    </div>
  );
}

/** Step 3 — أهدافك واهتماماتك. */
export function StepGoals({ form, set, tr }: PaneProps) {
  return (
    <div className="join-pane is-active">
      <Field label={tr("crs_en_goal")}>
        <SelectField
          icon={<IconIdCard />}
          placeholder={tr("crs_en_goal_ph")}
          options={GOALS}
          value={form.goal}
          onChange={(value) => set("goal", value)}
          name="goal"
          tr={tr}
        />
      </Field>

      <Field label={tr("crs_en_notes")}>
        <TextareaField
          name="notes"
          value={form.notes}
          max={NOTES_MAX}
          rows={4}
          placeholder={tr("crs_en_notes_ph")}
          onChange={(value) => set("notes", value)}
        />
      </Field>
    </div>
  );
}
