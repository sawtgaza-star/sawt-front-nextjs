"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import CollaborateTypeCard from "./CollaborateTypeCard";
import { COLLABORATE_TYPES } from "./collaborate-types-data";

/* Where each type's own flow lives — all four have one. */
const TYPE_HREF: Record<string, string> = {
  creator: "/collaborate/creator",
  funding: "/collaborate/funding",
  partnership: "/collaborate/partnership",
  other: "/collaborate/other",
};

/* "اختر نوع التعاون" — the four collaboration types as one radio group.
   Client leaf because the group owns the pick; nothing starts selected, which
   is the state the mock shows. Picking a type that has a flow marks the card
   and then moves on to that flow's own page.
   Reuses cr-section-head / cr-highlight from creators.css like the rest of the
   secondary pages. */
export default function CollaborateTypes() {
  const [selected, setSelected] = useState("");
  const router = useRouter();

  function select(value: string) {
    setSelected(value);
    const href = TYPE_HREF[value];
    if (href) router.push(href);
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

        <div className="cl-types-row">
          {COLLABORATE_TYPES.map((type) => (
            <CollaborateTypeCard
              key={type.value}
              type={type}
              checked={type.value === selected}
              onSelect={() => select(type.value)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
