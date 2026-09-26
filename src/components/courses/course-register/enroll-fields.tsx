"use client";
import type { ReactNode } from "react";
import type { Option } from "./register-data";
import { IconCaretDown } from "./enroll-icons";

/* The enrollment form's building blocks. They render the join modal's field
   classes — `style.css` defines them and this route loads it — so a labelled
   input here is the same control the "انضم إلينا" stepper shows. What the
   design adds on top (a dropdown with a leading icon, the yes/no pair, the
   character counter) wears `crs-en-*` classes defined in course.css. */

/** A labelled field; `error` is the API's note for it, painted the join
    modal's way (red box + message under it). */
export function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className={"join-field" + (error ? " has-error" : "")}>
      <label className="join-label">{label}</label>
      {children}
      {error ? <span className="join-field-error">{error}</span> : null}
    </div>
  );
}

/** A text input with the design's leading icon. */
export function IconField({
  icon,
  ...input
}: {
  icon: ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="join-input-wrap">
      <i className="join-input-icon">{icon}</i>
      <input className="join-input" {...input} />
    </div>
  );
}

/** The two dropdowns: leading icon, caret at the far end, and a first option
    that stands in for the placeholder (a native select has none). */
export function SelectField({
  icon,
  placeholder,
  options,
  value,
  onChange,
  name,
  tr,
}: {
  icon: ReactNode;
  placeholder: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  name: string;
  tr: (key: string) => string;
}) {
  return (
    <div className="join-input-wrap crs-en-select-wrap">
      <i className="join-input-icon">{icon}</i>
      <select
        className={"join-input crs-en-select" + (value ? "" : " is-empty")}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {tr(option.key)}
          </option>
        ))}
      </select>
      <i className="crs-en-select-caret crs-en-caret">
        <IconCaretDown />
      </i>
    </div>
  );
}

/** "هل سبق لك الالتحاق بدورة مشابهة؟" — two boxes, each its own radio. */
export function ChoiceRow({
  name,
  value,
  onChange,
  options,
}: {
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="crs-en-choices">
      {options.map((option) => (
        <label
          key={option.value}
          className={
            "crs-en-choice" + (value === option.value ? " is-selected" : "")
          }
        >
          <span className="crs-en-choice-label">{option.label}</span>
          <input
            type="radio"
            className="crs-en-choice-input"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
          />
          <span className="crs-en-choice-mark" aria-hidden="true"></span>
        </label>
      ))}
    </div>
  );
}

/** A textarea, with the design's "typed/max" counter when `max` is given. */
export function TextareaField({
  value,
  onChange,
  placeholder,
  name,
  max,
  rows = 3,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  name: string;
  max?: number;
  rows?: number;
}) {
  return (
    <>
      <textarea
        className="join-textarea"
        name={name}
        rows={rows}
        value={value}
        maxLength={max}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      ></textarea>
      {max ? (
        // latin digits and a fixed order in both languages, as in the design
        <span className="crs-en-counter" dir="ltr">
          {value.length}/{max}
        </span>
      ) : null}
    </>
  );
}
