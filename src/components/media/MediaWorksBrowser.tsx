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
  const [selected, setSelected] = useState<Record<string, string[]>>({});

  const facets = useMemo(
    () =>
      [resolveFacet(filters?.services, lang), resolveFacet(filters?.tags, lang)].filter(
        (facet): facet is WorksFacet => facet !== null,
      ),
    [filters, lang],
  );

  const toggle = (facetKey: string, value: string) =>
    setSelected((prev) => {
      const current = prev[facetKey] || [];
      return {
        ...prev,
        [facetKey]: current.includes(value)
          ? current.filter((x) => x !== value)
          : [...current, value],
      };
    });

  const works = useMemo(() => {
    const projects = sortItems(items);
    return projects.filter((work) =>
      facets.every((facet) => {
        const picked = selected[facet.key] || [];
        if (!picked.length) return true;
        const value = workFacetValue(work, facet.key);
        return value !== undefined && picked.includes(value);
      }),
    );
  }, [items, facets, selected]);

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
          <aside className="sm-wp-side">
            {facets.map((facet) => (
              <MediaWorksFilterPanel
                key={facet.key}
                facet={facet}
                selected={selected[facet.key] || []}
                onToggle={toggle}
              />
            ))}
          </aside>

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
