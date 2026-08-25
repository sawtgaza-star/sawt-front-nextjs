"use client";
import { useEffect, useState } from "react";
import { initTranslate } from "@/lib/translations";
import MediaProjectAbout from "./MediaProjectAbout";
import MediaProjectStages from "./MediaProjectStages";
import MediaProjectReview from "./MediaProjectReview";
import type { MediaProject } from "./media-project-data";

const TABS = [
  { id: "about", label: "عن المشروع", labelKey: "sm_pj_tab_about" },
  { id: "stages", label: "المراحل", labelKey: "sm_pj_tab_stages" },
  { id: "review", label: "رأي العميل", labelKey: "sm_pj_tab_review" },
] as const;

type TabId = (typeof TABS)[number]["id"];

/* The segmented bar under the intro and the panel it switches. The page opens
   on "عن المشروع", the tab the design shows selected.

   The i18n dictionary is applied by mutating the DOM (see translations.ts), so
   a panel React swaps in comes back in Arabic — re-run the swap over it. */
export default function MediaProjectTabs({ project }: { project: MediaProject }) {
  const [active, setActive] = useState<TabId>("about");

  useEffect(() => {
    initTranslate();
  }, [active]);

  return (
    <section className="sm-pj-body">
      <div className="container">
        <div className="sm-pj-tabs" role="tablist">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={"sm-pj-tab-" + tab.id}
              aria-selected={active === tab.id}
              aria-controls={"sm-pj-panel-" + tab.id}
              className={"sm-pj-tab" + (active === tab.id ? " active" : "")}
              onClick={() => setActive(tab.id)}
            >
              <span data-i18n={tab.labelKey}>{tab.label}</span>
            </button>
          ))}
        </div>

        <div
          role="tabpanel"
          id={"sm-pj-panel-" + active}
          aria-labelledby={"sm-pj-tab-" + active}
        >
          {active === "about" && <MediaProjectAbout project={project} />}
          {active === "stages" && <MediaProjectStages project={project} />}
          {active === "review" && <MediaProjectReview project={project} />}
        </div>
      </div>
    </section>
  );
}
