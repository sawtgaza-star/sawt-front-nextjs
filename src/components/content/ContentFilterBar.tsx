"use client";
import {
  CATEGORIES,
  SORT_OPTIONS,
  type CategoryValue,
  type SortValue,
} from "./content-data";

type Props = {
  active: CategoryValue;
  onSelect: (value: CategoryValue) => void;
  sort: SortValue;
  onSortChange: (value: SortValue) => void;
};

/* Category pills (right, RTL) + the sort dropdown (left) above the reel grid.
   Pills reuse the .cr-content-tab look from the creator page. */
export default function ContentFilterBar({
  active,
  onSelect,
  sort,
  onSortChange,
}: Props) {
  return (
    <div className="ct-filter-bar">
      <ul className="ct-tabs">
        {CATEGORIES.map((c) => (
          <li key={c.value}>
            <button
              type="button"
              className={
                "cr-content-tab" + (active === c.value ? " active" : "")
              }
              onClick={() => onSelect(c.value)}
              aria-pressed={active === c.value}
              data-i18n={c.key}
            >
              {c.label}
            </button>
          </li>
        ))}
      </ul>

      <div className="ct-sort">
        <span className="ct-sort-label" data-i18n="content_sort_label">
          الترتيب
        </span>
        <select
          className="ct-sort-select"
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortValue)}
          aria-label="الترتيب"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value} data-i18n={o.key}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
