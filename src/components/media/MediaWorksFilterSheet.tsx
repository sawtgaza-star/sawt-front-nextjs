"use client";
import { useEffect, useState, type ReactNode } from "react";
import { useLang } from "@/lib/use-lang";

/* The /media/works filter sidebar. On desktop it is just the column of panels
   beside the grid; below lg the panels no longer sit above the projects —
   a "Filter" button (with the number of filters applied) opens them as a
   bottom sheet, with "clear" and "show results" at its foot. Ticks in the
   sheet are a draft: the grid only changes on "show results" (`onApply`);
   "clear all" wipes the applied filters too and closes the sheet; closing
   any other way drops them (`onOpenChange(false)` — the parent
   resets its draft to what is applied). The trigger, header,
   footer and backdrop are display:none on desktop, so the wide layout is
   untouched. */
export default function MediaWorksFilterSheet({
  children,
  activeCount,
  draftCount,
  resultCount,
  onClear,
  onApply,
  onOpenChange,
}: {
  children: ReactNode;
  /** boxes ticked on the filter button (applied) / in the sheet (draft) */
  activeCount: number;
  draftCount: number;
  resultCount: number;
  onClear: () => void;
  onApply: () => void;
  onOpenChange: (open: boolean) => void;
}) {
  const { tr } = useLang();
  const [open, setOpenState] = useState(false);
  const setOpen = (next: boolean) => {
    setOpenState(next);
    onOpenChange(next);
  };

  useEffect(() => {
    if (!open) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    // the sheet is mobile-only: widening past lg must not leave the page locked
    const wide = window.matchMedia("(min-width: 992px)");
    const onWide = () => wide.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    wide.addEventListener("change", onWide);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", onWide);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="sm-wp-filter-btn"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M4 6h16M7 12h10M10 18h4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <span>{tr("sm_wp_filters")}</span>
        {activeCount > 0 && <span className="sm-wp-filter-count">{activeCount}</span>}
      </button>

      {/* a tap on the dimmed page does nothing — the sheet closes only
          through its own ×, "clear all" or "show results" */}
      <div
        className={"sm-wp-backdrop" + (open ? " is-open" : "")}
        aria-hidden="true"
      />

      <aside className={"sm-wp-side" + (open ? " is-open" : "")}>
        <div className="sm-wp-sheet-head">
          <span className="sm-wp-sheet-grip" aria-hidden="true" />
          <h2 className="sm-wp-sheet-title">{tr("sm_wp_filters")}</h2>
          <button
            type="button"
            className="sm-wp-sheet-close"
            aria-label={tr("sm_wp_filter_close")}
            onClick={() => setOpen(false)}
          >
            ×
          </button>
        </div>

        <div className="sm-wp-sheet-body">{children}</div>

        <div className="sm-wp-sheet-foot">
          <button
            type="button"
            className="sm-wp-sheet-clear"
            disabled={!draftCount && !activeCount}
            onClick={() => {
              setOpenState(false);
              onClear();
            }}
          >
            {tr("sm_wp_filter_clear")}
          </button>
          <button
            type="button"
            className="sm-wp-sheet-apply"
            onClick={() => {
              setOpenState(false);
              onApply();
            }}
          >
            {tr("sm_wp_filter_show")} ({resultCount})
          </button>
        </div>
      </aside>
    </>
  );
}
