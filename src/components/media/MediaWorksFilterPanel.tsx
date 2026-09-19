"use client";
import { useState } from "react";
import { IconCheckMark } from "@/components/ui/icons";

/** One sidebar panel, already resolved to the current language. `key` is the
    field of a project its options are matched against — "service" or "tag". */
export type WorksFacet = {
  key: string;
  title: string;
  options: { value: string; label: string }[];
};

/* One panel of the /media/works sidebar ("القسم", "التخصص"): a titled white
   card whose dash in the corner folds the list away. The checkboxes are real
   inputs kept off-screen, so the olive box next to each label is a plain
   sibling that CSS fills in when the input is checked.

   The heading and the options are the API's — only the fold glyph is the
   design's — so there are no `data-i18n` keys here. */
export default function MediaWorksFilterPanel({
  facet,
  selected,
  onToggle,
}: {
  facet: WorksFacet;
  selected: string[];
  onToggle: (facetKey: string, value: string) => void;
}) {
  const [open, setOpen] = useState(true);

  return (
    <section className="sm-wp-panel">
      <div className="sm-wp-panel-head">
        <h2 className="sm-wp-panel-title">{facet.title}</h2>
        <button
          type="button"
          className="sm-wp-panel-toggle"
          aria-expanded={open}
          aria-label={facet.title}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "—" : "+"}
        </button>
      </div>

      {open && (
        <ul className="sm-wp-opts">
          {facet.options.map((opt) => (
            <li key={opt.value}>
              <label className="sm-wp-opt">
                <input
                  type="checkbox"
                  className="sm-wp-input"
                  checked={selected.includes(opt.value)}
                  onChange={() => onToggle(facet.key, opt.value)}
                />
                <span className="sm-wp-box" aria-hidden="true">
                  <IconCheckMark />
                </span>
                <span>{opt.label}</span>
              </label>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
