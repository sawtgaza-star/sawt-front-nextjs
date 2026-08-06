"use client";
import { useState } from "react";
import type { PointerEvent as ReactPointerEvent, RefObject } from "react";
import { REEL_META } from "./data";
import { fmtTime } from "./video-utils";
import { IconFollow } from "./reel-icons";

type Props = {
  current: number;
  duration: number;
  pct: number;
  progressRef: RefObject<HTMLDivElement | null>;
  onProgressPointerDown: (e: ReactPointerEvent<HTMLDivElement>) => void;
};

/* The bar across the bottom of the reel: creator + follow, caption, scrubber
   and the "posted" line. Extracted from ReelModal unchanged — same markup,
   same classes. */
export default function ReelInfo({
  current,
  duration,
  pct,
  progressRef,
  onProgressPointerDown,
}: Props) {
  const [following, setFollowing] = useState(false);

  return (
    <div className="cr-reel-info">
      <div className="cr-reel-user">
        <img src={REEL_META.avatar} alt={REEL_META.user} />
        <span>{REEL_META.user}</span>
        <button
          type="button"
          className={"cr-reel-follow" + (following ? " is-following" : "")}
          onClick={() => setFollowing((f) => !f)}
          aria-pressed={following}
          aria-label={following ? "unfollow" : "follow"}
        >
          <IconFollow />
        </button>
      </div>
      <p className="cr-reel-caption">{REEL_META.caption}</p>
      <div className="cr-reel-progress-row">
        <span>{fmtTime(current)}</span>
        <div
          className="cr-reel-progress"
          ref={progressRef}
          onPointerDown={onProgressPointerDown}
          role="slider"
          aria-label="seek"
        >
          <div className="cr-reel-progress-fill" style={{ width: pct + "%" }} />
          <div className="cr-reel-progress-thumb" style={{ left: pct + "%" }} />
        </div>
        <span>{duration > 0 ? fmtTime(duration) : "--:--"}</span>
      </div>
      <span className="cr-reel-posted">{REEL_META.posted}</span>
    </div>
  );
}
