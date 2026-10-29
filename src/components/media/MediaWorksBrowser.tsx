"use client";
import { useMemo, useState } from "react";
import { localized } from "@/lib/api/pages";
import { sortItems } from "@/lib/api/media-page";
import {
  workFacetValue,
  type MediaWorksFacet,
  type MediaWorksFilters,
} from "@/lib/api/media-works";
import type { MediaWorkItem } from "@/lib/api/media-page";
import { useLang } from "@/lib/use-lang";
import MediaWorksFilterPanel, { type WorksFacet } from "./MediaWorksFilterPanel";
import MediaWorksFilterSheet from "./MediaWorksFilterSheet";
import MediaWorksTile, { type TileWork } from "./MediaWorksTile";

/* Body of /media/works: the filter sidebar (right, as the design lays it out
   in RTL) and the two-column grid of projects. Checking boxes inside one panel
   widens the result (OR), checking across the two panels narrows it (AND); no
   box checked means "everything", which is the state the page opens in.

   Both the panels and the projects are the API's, so the sidebar only ever
   offers filters that some project actually carries. The tiles pass no
   `data-i18n` keys — their strings are already in the reader's language, which
   is also why the old initTranslate() replay after a filter change is gone: it
   would now be rewriting React's own text. The empty-state line is the one
   string the payload doesn't send, so it reads the dictionary directly. */
type Selection = Record<string, string[]>;

const countTicks = (picked: Selection) =>
  Object.values(picked).reduce((n, values) => n + values.length, 0);

/* OR inside a panel, AND across panels; an empty panel doesn't narrow */
function filterWorks(projects: MediaWorkItem[], facets: WorksFacet[], picked: Selection) {
  return projects.filter((work) =>
    facets.every((facet) => {
      const values = picked[facet.key] || [];
      if (!values.length) return true;
      const value = workFacetValue(work, facet.key);
      return value !== undefined && values.includes(value);
    }),
  );
}

function resolveFacet(facet: MediaWorksFacet | undefined, lang: string): WorksFacet | null {
  const key = facet?.key;
  if (!key) return null;

  const options = (facet?.options || [])
    .map((opt) => ({
      value: opt.value || opt.slug || "",
      label: localized(opt.label, lang),
    }))
    .filter((opt) => opt.value);

  if (!options.length) return null;
  return { key, title: localized(facet?.label, lang), options };
}

export default function MediaWorksBrowser({
  filters,
  items,
  lang = "ar",
}: {
  filters?: MediaWorksFilters;
  items?: MediaWorkItem[];
  lang?: string;
}) {
  const { tr } = useLang();
  /* `selected` is what the grid shows. On desktop every tick applies at once,
     so `draft` just mirrors it; in the phone sheet ticks only touch `draft`,
     and "show results" is what copies it over (see MediaWorksFilterSheet). */
  const [selected, setSelected] = useState<Selection>({});
  const [draft, setDraft] = useState<Selection>({});
  const [inSheet, setInSheet] = useState(false);

  const facets = useMemo(
    () =>
      [resolveFacet(filters?.services, lang), resolveFacet(filters?.tags, lang)].filter(
        (facet): facet is WorksFacet => facet !== null,
      ),
    [filters, lang],
  );

  const toggle = (facetKey: string, value: string) => {
    const next = (prev: Selection) => {
      const current = prev[facetKey] || [];
      return {
        ...prev,
        [facetKey]: current.includes(value)
          ? current.filter((x) => x !== value)
          : [...current, value],
      };
    };
    setDraft(next);
    if (!inSheet) setSelected(next);
  };

  const projects = useMemo(() => sortItems(items), [items]);
  const works = useMemo(
    () => filterWorks(projects, facets, selected),
    [projects, facets, selected],
  );
  // what "show results (N)" would give — the sheet's live preview
  const draftResults = useMemo(
    () => filterWorks(projects, facets, draft).length,
    [projects, facets, draft],
  );

  const tiles: TileWork[] = works.map((work) => ({
    photo: work.image_url || "",
    href: work.path || (work.slug ? "/media/works/" + work.slug : "/media/works"),
    tag: localized(work.tag?.label, lang),
    date: localized(work.date, lang),
    title: localized(work.title, lang),
    sub: localized(work.category, lang),
  }));

  return (
    <section className="sm-wp-body">
      <div className="container">
        <div className="sm-wp-layout">
          <MediaWorksFilterSheet
            activeCount={countTicks(selected)}
            draftCount={countTicks(draft)}
            resultCount={draftResults}
            onOpenChange={(open) => {
              setInSheet(open);
              setDraft(selected); // open fresh, and a dismissed sheet drops its ticks
            }}
            onClear={() => {
              setInSheet(false);
              setDraft({});
              setSelected({});
            }}
            onApply={() => {
              setInSheet(false);
              setSelected(draft);
            }}
          >
            {facets.map((facet) => (
              <MediaWorksFilterPanel
                key={facet.key}
                facet={facet}
                selected={draft[facet.key] || []}
                onToggle={toggle}
              />
            ))}
          </MediaWorksFilterSheet>

          <div className="sm-wp-grid">
            {tiles.map((tile, index) => (
              <MediaWorksTile key={index} work={tile} />
            ))}
            {!tiles.length && (
              <p className="sm-wp-empty">{tr("sm_wp_empty")}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
