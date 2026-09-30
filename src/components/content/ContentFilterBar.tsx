"use client";
import {
  SORT_OPTIONS,
  type ContentCategoryPill,
  type SortValue,
} from "./content-data";

type Props = {
  categories: ContentCategoryPill[];
  active: string;
  onSelect: (value: string) => void;
  sort: SortValue;
  onSortChange: (value: SortValue) => void;
};

/* Category pills (right, RTL) + the sort dropdown (left) above the reel grid.
   Pills reuse the .cr-content-tab look from the creator page; they are the
   API's `categories`, already in the current language, so no data-i18n. */
export default function ContentFilterBar({
  categories,
  active,
  onSelect,
  sort,
  onSortChange,
}: Props) {
  return (
    <div className="ct-filter-bar">
      <ul className="ct-tabs">
        {categories.map((c) => (
          <li key={c.value}>
            <button
              type="button"
              className={
                "cr-content-tab" + (active === c.value ? " active" : "")
              }
              onClick={() => onSelect(c.value)}
              aria-pressed={active === c.value}
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
