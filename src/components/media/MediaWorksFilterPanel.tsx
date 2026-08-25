"use client";
import { useState } from "react";
import { IconCheckMark } from "@/components/ui/icons";
import type { WorkFilterGroup } from "./media-works-page-data";

/* One panel of the /media/works sidebar ("القسم", "التخصص"): a titled white
   card whose dash in the corner folds the list away. The checkboxes are real
   inputs kept off-screen, so the olive box next to each label is a plain
   sibling that CSS fills in when the input is checked. */
export default function MediaWorksFilterPanel({
  group,
  selected,
  onToggle,
}: {
  group: WorkFilterGroup;
  selected: string[];
  onToggle: (facet: WorkFilterGroup["facet"], id: string) => void;
}) {
  const [open, setOpen] = useState(true);

  return (
    <section className="sm-wp-panel">
      <div className="sm-wp-panel-head">
        <h2 className="sm-wp-panel-title" data-i18n={group.titleKey}>
          {group.title}
        </h2>
        <button
          type="button"
          className="sm-wp-panel-toggle"
          aria-expanded={open}
          aria-label={group.title}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "—" : "+"}
        </button>
      </div>

      {open && (
        <ul className="sm-wp-opts">
          {group.options.map((opt) => (
            <li key={opt.id}>
              <label className="sm-wp-opt">
                <input
                  type="checkbox"
                  className="sm-wp-input"
                  checked={selected.includes(opt.id)}
                  onChange={() => onToggle(group.facet, opt.id)}
                />
                <span className="sm-wp-box" aria-hidden="true">
                  <IconCheckMark />
                </span>
                <span data-i18n={opt.labelKey}>{opt.label}</span>
              </label>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
