"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import CollaborateTypeCard from "./CollaborateTypeCard";
import type { CollaborateType } from "./collaborate-types-data";
import { CollaborateTypesSkeleton } from "./CollaborateSkeleton";

/* "اختر نوع التعاون" — the collaboration types the API lists, as one radio
   group. Client leaf because the group owns the pick; nothing starts selected,
   which is the state the mock shows. Picking a type marks the card and then
   moves on to that type's own flow — `href`, which collaborate-types-data
   matched to the API's key.
   Reuses cr-section-head / cr-highlight from creators.css like the rest of the
   secondary pages. The heading is the page's own chrome, not the payload's, so
   it keeps its `data-i18n` keys. */
export default function CollaborateTypes({
  types,
  loading = false,
}: {
  types: CollaborateType[];
  /** The payload is still on its way — hold the row's height with bars. */
  loading?: boolean;
}) {
  const [selected, setSelected] = useState("");
  const router = useRouter();

  function select(type: CollaborateType) {
    setSelected(type.value);
    if (type.href) router.push(type.href);
  }

  return (
    <section className="cl-section">
      <div className="container">
        <div className="cr-section-head">
          <h2 className="cr-section-title">
            <span data-i18n="collab_types_title_pre">اختر نوع</span>{" "}
            <span className="cr-highlight" data-i18n="collab_types_title_hl">
              التعاون
            </span>
          </h2>
        </div>

        {loading ? (
          <CollaborateTypesSkeleton />
        ) : (
          <div className="cl-types-row">
            {types.map((type) => (
              <CollaborateTypeCard
                key={type.value}
                type={type}
                checked={type.value === selected}
                onSelect={() => select(type)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
