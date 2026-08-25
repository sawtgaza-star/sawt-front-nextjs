"use client";
import { useEffect, useMemo, useState } from "react";
import { initTranslate } from "@/lib/translations";
import MediaWorksFilterPanel from "./MediaWorksFilterPanel";
import MediaWorksTile from "./MediaWorksTile";
import { ALL_WORKS, WORK_FILTERS, type WorkFilterGroup } from "./media-works-page-data";

type Facet = WorkFilterGroup["facet"];

/* Body of /media/works: the filter sidebar (right, as the design lays it out
   in RTL) and the two-column grid of projects. Checking boxes inside one panel
   widens the result (OR), checking across the two panels narrows it (AND); no
   box checked means "everything", which is the state the page opens in. */
export default function MediaWorksBrowser() {
  const [selected, setSelected] = useState<Record<Facet, string[]>>({
    section: [],
    specialty: [],
  });

  const toggle = (facet: Facet, id: string) =>
    setSelected((prev) => ({
      ...prev,
      [facet]: prev[facet].includes(id)
        ? prev[facet].filter((x) => x !== id)
        : [...prev[facet], id],
    }));

  const works = useMemo(
    () =>
      ALL_WORKS.filter(
        (w) =>
          (!selected.section.length || selected.section.includes(w.section)) &&
          (!selected.specialty.length || selected.specialty.includes(w.specialty))
      ),
    [selected]
  );

  // The i18n dictionary is applied by mutating the DOM (see translations.ts),
  // so the tiles React re-renders after a filter change come back in Arabic —
  // re-run the swap over the new markup.
  useEffect(() => {
    initTranslate();
  }, [works]);

  return (
    <section className="sm-wp-body">
      <div className="container">
        <div className="sm-wp-layout">
          <aside className="sm-wp-side">
            {WORK_FILTERS.map((group) => (
              <MediaWorksFilterPanel
                key={group.facet}
                group={group}
                selected={selected[group.facet]}
                onToggle={toggle}
              />
            ))}
          </aside>

          <div className="sm-wp-grid">
            {works.map((work) => (
              <MediaWorksTile key={work.key} work={work} />
            ))}
            {!works.length && (
              <p className="sm-wp-empty" data-i18n="sm_wp_empty">
                لا توجد أعمال مطابقة للفلاتر المختارة.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
