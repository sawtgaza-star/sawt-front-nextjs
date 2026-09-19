"use client";
import { useState } from "react";
import { localized } from "@/lib/api/pages";
import type { MediaWorkPage } from "@/lib/api/media-work";
import MediaProjectAbout from "./MediaProjectAbout";
import MediaProjectStages from "./MediaProjectStages";
import MediaProjectReview from "./MediaProjectReview";

/* The segmented bar under the intro and the panel it switches. The page opens
   on the first tab — "عن المشروع" in the design's order, which is the order the
   payload lists them in.

   The labels are the API's `tabs` block and double as each panel's own
   heading, so the two can never disagree. The old initTranslate() replay after
   a switch is gone with them: a panel now renders in the reader's language
   already, and re-running the DOM translator over React's own text is what
   caused the removeChild crash on /about. */
type TabId = "about" | "stages" | "client";

export default function MediaProjectTabs({
  page,
  lang = "ar",
}: {
  page: MediaWorkPage;
  lang?: string;
}) {
  const tabs = (
    [
      { id: "about" as const, tab: page.tabs?.about },
      { id: "stages" as const, tab: page.tabs?.stages },
      { id: "client" as const, tab: page.tabs?.client },
    ]
  )
    .map((entry) => ({ id: entry.id, label: localized(entry.tab?.label, lang) }))
    .filter((entry) => entry.label);

  const [active, setActive] = useState<TabId>("about");
  const current = tabs.find((tab) => tab.id === active) ?? tabs[0];

  if (!tabs.length) return null;

  return (
    <section className="sm-pj-body">
      <div className="container">
        <div className="sm-pj-tabs" role="tablist">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={"sm-pj-tab-" + tab.id}
              aria-selected={current?.id === tab.id}
              aria-controls={"sm-pj-panel-" + tab.id}
              className={"sm-pj-tab" + (current?.id === tab.id ? " active" : "")}
              onClick={() => setActive(tab.id)}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div
          role="tabpanel"
          id={"sm-pj-panel-" + current?.id}
          aria-labelledby={"sm-pj-tab-" + current?.id}
        >
          {current?.id === "about" && (
            <MediaProjectAbout
              title={current.label}
              data={page.about}
              results={page.results}
              gallery={page.gallery}
              lang={lang}
            />
          )}
          {current?.id === "stages" && (
            <MediaProjectStages title={current.label} data={page.stages} lang={lang} />
          )}
          {current?.id === "client" && (
            <MediaProjectReview title={current.label} data={page.client} lang={lang} />
          )}
        </div>
      </div>
    </section>
  );
}
