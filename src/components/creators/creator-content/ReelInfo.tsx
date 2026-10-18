"use client";
import { useState } from "react";
import type { PointerEvent as ReactPointerEvent, ReactNode, RefObject } from "react";
import type { ReelMeta } from "./data";
import { DEFAULT_AVATAR } from "./reel-data";
import { fmtTime } from "./video-utils";
import { IconFollow, IconFollowCheck } from "./reel-icons";
import { useLang } from "@/lib/use-lang";
import { linkifyCaption } from "./ReelExtra";

const SAWT_MARK = encodeURI("/assets/images/شعار صوت اخضر.svg");

type Props = {
  current: number;
  duration: number;
  pct: number;
  progressRef: RefObject<HTMLDivElement | null>;
  onProgressPointerDown: (e: ReactPointerEvent<HTMLDivElement>) => void;
  /** Who posted the reel, its caption and when — see ReelModal. */
  meta: ReelMeta;
  /** the rest of the reel's details, under the caption (ReelExtra) */
  extra?: ReactNode;
};

/* The bar across the bottom of the reel: creator + follow, caption, scrubber
   and the "posted" line. Extracted from ReelModal — same markup, same
   classes. */
export default function ReelInfo({
  current,
  duration,
  pct,
  progressRef,
  onProgressPointerDown,
  meta,
  extra,
}: Props) {
  const external = /^https?:/.test(meta.profile);
  const [following, setFollowing] = useState(false);
  // a long caption opens to its full length on demand
  const [expanded, setExpanded] = useState(false);
  // no picture of its own: the platform's mark, not the stock silhouette
  const brandAvatar = !meta.avatar || meta.avatar === DEFAULT_AVATAR;
  /* Rendered from tr(), not data-i18n — the viewer mounts long after
     applyTranslations() has walked the page. Same as ReelActions. */
  const { tr } = useLang();

  return (
    <div className="cr-reel-info">
      <div className="cr-reel-user">
        {brandAvatar ? (
          <img src={SAWT_MARK} alt={meta.user} className="is-brand" />
        ) : (
          <img src={meta.avatar} alt={meta.user} />
        )}
        {/* Plain <a>: the reel viewer runs inside the creators and content
            route groups, which load different stylesheets — the same reason
            the links in SiteNav are not <Link>. */}
        <a
          className="cr-reel-user-link"
          href={meta.profile || "#"}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
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
      {meta.caption && (
        <p
          className={"cr-reel-caption" + (expanded ? " is-open" : "")}
          onClick={(e) => {
            e.stopPropagation();
            setExpanded((x) => !x);
          }}
          title={expanded ? undefined : tr("reel_caption_more")}
        >
          {linkifyCaption(meta.caption)}
        </p>
      )}
      {extra}
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
      {/* ReelExtra already carries the date (and how long ago) */}
      {!extra && meta.posted && <span className="cr-reel-posted">{meta.posted}</span>}
    </div>
  );
}
