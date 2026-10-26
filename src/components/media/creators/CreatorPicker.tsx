"use client";
import { useEffect, useRef } from "react";
import { localized } from "@/lib/api/pages";
import type { MediaCreatorItem } from "@/lib/api/media-page";
import { compact } from "@/components/creators/creators-text";
import { CC_COPY, pick } from "./media-creators-data";
import { CcArrow } from "./cc-icons";

/* The row of small creator cards under the spotlight — avatar, name, role
   and a followers tag; the picked one is tinted with an orange dot. It
   scrolls sideways, and the round arrow moves the pick to the next creator
   (wrapping round), keeping it in view. */
export default function CreatorPicker({
  creators,
  selected,
  onSelect,
  followersLabel,
  lang,
}: {
  creators: MediaCreatorItem[];
  selected: number;
  onSelect: (index: number) => void;
  /** the block's `stats_labels.followers` */
  followersLabel: string;
  lang: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const card = track?.children[selected] as HTMLElement | undefined;
    if (!track || !card) return;
    // scroll the track only — scrollIntoView would also move the page
    const t = track.getBoundingClientRect();
    const c = card.getBoundingClientRect();
    if (c.left < t.left || c.right > t.right) {
      track.scrollBy({ left: c.left - t.left - (t.width - c.width) / 2, behavior: "smooth" });
    }
  }, [selected]);

  return (
    <div className="sm-cc-picker">
      <div className="sm-cc-picker-track" ref={trackRef}>
        {creators.map((creator, index) => (
          <button
            type="button"
            key={creator.uuid}
            className={"sm-cc-chip" + (index === selected ? " is-active" : "")}
            aria-pressed={index === selected}
            onClick={() => onSelect(index)}
          >
            <span className="sm-cc-chip-avatar">
              {creator.avatar_url ? <img src={creator.avatar_url} alt="" /> : null}
            </span>
            <span className="sm-cc-chip-text">
              <b>{creator.name}</b>
              <small>{localized(creator.role, lang)}</small>
            </span>
            {typeof creator.stats?.followers === "number" ? (
              <span className="sm-cc-chip-tag">
                {compact(creator.stats.followers)} {followersLabel}
              </span>
            ) : null}
            <i className="sm-cc-chip-dot" aria-hidden="true"></i>
          </button>
        ))}
      </div>
      {creators.length > 1 ? (
        <button
          type="button"
          className="sm-cc-next"
          aria-label={pick(CC_COPY.next, lang)}
          onClick={() => onSelect((selected + 1) % creators.length)}
        >
          <CcArrow />
        </button>
      ) : null}
    </div>
  );
}
