"use client";
import { forwardRef } from "react";
import { useLang } from "@/lib/use-lang";

/* "عرض المزيد" under the grid's preview rows, and "عرض أقل" once the grid is
   open. One element for both, so the grid can hold it in place on screen
   while the rows above it fold away (ContentGrid). The label goes through
   tr(): it changes after initTranslate() has walked the page, so a
   data-i18n attribute would never be revisited. */
const ContentGridMore = forwardRef<
  HTMLDivElement,
  { open?: boolean; onToggle: () => void }
>(function ContentGridMore({ open = false, onToggle }, ref) {
  const { tr } = useLang();
  return (
    <div className="ct-grid-more-wrap" ref={ref}>
      <button
        type="button"
        className={"ct-grid-more" + (open ? " is-less" : "")}
        aria-expanded={open}
        onClick={onToggle}
      >
        <span>{tr(open ? "view_less" : "view_more")}</span>
        <i
          className={open ? "fa-solid fa-chevron-up" : "fa-solid fa-chevron-down"}
          aria-hidden="true"
        ></i>
      </button>
    </div>
  );
});

export default ContentGridMore;
