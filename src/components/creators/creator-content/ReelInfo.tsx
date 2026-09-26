"use client";
import { useState } from "react";
import type { PointerEvent as ReactPointerEvent, RefObject } from "react";
import { REEL_META, type ReelMeta } from "./data";
import { fmtTime } from "./video-utils";
import { IconFollow, IconFollowCheck } from "./reel-icons";
import { useLang } from "@/lib/use-lang";

type Props = {
  current: number;
  duration: number;
  pct: number;
  progressRef: RefObject<HTMLDivElement | null>;
  onProgressPointerDown: (e: ReactPointerEvent<HTMLDivElement>) => void;
  /** Who posted the reel — fields left out fall back to REEL_META. */
  meta?: Partial<ReelMeta>;
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
  meta: override,
}: Props) {
  // a field passed as undefined keeps the default rather than blanking it
  const meta: ReelMeta = {
    ...REEL_META,
    ...Object.fromEntries(
      Object.entries(override ?? {}).filter(([, value]) => value !== undefined),
    ),
  };
  const [following, setFollowing] = useState(false);
  /* Rendered from tr(), not data-i18n — the viewer mounts long after
     applyTranslations() has walked the page. Same as ReelActions. */
  const { tr } = useLang();

  return (
    <div className="cr-reel-info">
      <div className="cr-reel-user">
        <img src={meta.avatar} alt={meta.user} />
        {/* Plain <a>: the reel viewer runs inside the creators and content
            route groups, which load different stylesheets — the same reason
            the links in SiteNav are not <Link>. */}
        <a className="cr-reel-user-link" href={meta.profile}>
          <span>{meta.user}</span>
        </a>
        <button
          type="button"
          className={"cr-reel-follow" + (following ? " is-following" : "")}
          onClick={() => setFollowing((f) => !f)}
          aria-pressed={following}
          aria-label={tr(following ? "reel_unfollow" : "reel_follow")}
          title={tr(following ? "reel_unfollow" : "reel_follow")}
        >
          {following ? <IconFollowCheck /> : <IconFollow />}
        </button>
        {/* The state in words, next to the icon. aria-hidden because the
            button already announces it through aria-pressed + its label —
            without this the change would be read out twice. */}
        {following && (
          <span className="cr-reel-follow-hint" aria-hidden="true">
            {tr("reel_followed")}
          </span>
        )}
      </div>
      <p className="cr-reel-caption">{meta.caption}</p>
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
      <span className="cr-reel-posted">{meta.posted}</span>
    </div>
  );
}
