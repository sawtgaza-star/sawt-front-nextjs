"use client";
import { useRef, useState } from "react";
import { localized } from "@/lib/api/pages";
import type { MediaCreatorItem } from "@/lib/api/media-page";
import { formatDate, formatFollowers, formatViews, instagramIso } from "@/components/home/home-text";
import { reelCaption } from "@/components/home/reviews/reel-meta";
import { fmtTime } from "@/components/creators/creator-content/video-utils";
import { CC_COPY, pick } from "./media-creators-data";
import { CcBookmark, CcHeart, CcShare } from "./cc-icons";
import type { CreatorStatLabels } from "./CreatorSpotlight";
import CreatorReelCaption, { type ReelFigure } from "./CreatorReelCaption";
import CreatorReelEmpty from "./CreatorReelEmpty";

/* The picked creator's featured collaboration reel, in the home page's reel
   card ("آراؤكم في المحتوى" — same `.review-reels .reel-item` markup and
   classes, so style.css + home-reels.css dress it identically). The legacy
   scripts that drive the home column don't run on /media, so play, seek,
   save · like · share are React here. The caption shows everything the
   payload has: the caption's first line, @account, post date, likes,
   comments, views and the Instagram link. With no reel, <CreatorReelEmpty />
   tells the visitor this creator has no videos yet. The parent remounts it
   per creator. */
export default function CreatorReelCard({
  creator,
  labels,
  lang,
}: {
  creator: MediaCreatorItem;
  labels: CreatorStatLabels;
  lang: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState({ at: 0, total: 0 });
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [failed, setFailed] = useState(false);

  const reel = creator.reel;
  const video = reel?.video_url || reel?.media_url || "";
  const poster = reel?.thumbnail || reel?.thumbnail_url || "";
  const rawCaption = typeof reel?.caption === "string" ? reel.caption : localized(reel?.caption, lang);
  const { title: captionTitle, full } = reelCaption(rawCaption);
  const handle = cleanHandle(reel?.username) || cleanHandle(creator.instagram_username);
  const posted = reel?.posted_at ? formatDate(instagramIso(reel.posted_at), lang) : "";
  const num = (n: number | null | undefined): n is number => typeof n === "number" && Number.isFinite(n);

  const figures = [
    num(reel?.likes) && { key: "likes", icon: "heart", value: formatFollowers(reel?.likes) },
    num(reel?.comments_count) && { key: "comments", icon: "comment", value: formatFollowers(reel?.comments_count) },
    num(reel?.views) && { key: "views", value: formatViews(reel?.views), label: labels.views },
  ].filter(Boolean) as ReelFigure[];

  const link = reel?.permalink || (handle ? `https://www.instagram.com/${encodeURIComponent(handle)}/` : "");

  if (!reel) {
    return <CreatorReelEmpty name={creator.name || ""} avatar={creator.avatar_url || ""} handle={handle} lang={lang} />;
  }

  const toggle = () => {
    const el = videoRef.current;
    if (!el || !video) return;
    if (el.paused) void el.play().catch(() => undefined);
    else el.pause();
  };
  const seek = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = videoRef.current;
    if (!el || !el.duration) return;
    const box = e.currentTarget.getBoundingClientRect();
    el.currentTime = Math.min(Math.max((e.clientX - box.left) / box.width, 0), 1) * el.duration;
  };
  const share = () => {
    const url = link || window.location.href;
    if (navigator.share) void navigator.share({ title: captionTitle || creator.name || "", url }).catch(() => undefined);
    else void navigator.clipboard?.writeText(url);
  };

  return (
    <div className="review-reels sm-cc-reel">
      <div className={"reel-item" + (playing ? " playing" : "")}>
        <div className="reel-media">
          {video && !failed ? (
            <video
              ref={videoRef}
              src={video}
              poster={poster || undefined}
              preload="metadata"
              loop
              playsInline
              onClick={toggle}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onError={() => setFailed(true)}
              onLoadedMetadata={(e) => setTime({ at: 0, total: e.currentTarget.duration })}
              onTimeUpdate={(e) => setTime({ at: e.currentTarget.currentTime, total: e.currentTarget.duration })}
            />
          ) : poster || creator.avatar_url ? (
            <img className="sm-cc-reel-still" src={poster || creator.avatar_url || ""} alt={creator.name || ""} />
          ) : null}
          <div className="reel-overlay"></div>

          <div className="reel-actions">
            <span role="button" aria-label={pick(CC_COPY.save, lang)} aria-pressed={saved} onClick={() => setSaved((v) => !v)}>
              <CcBookmark filled={saved} />
            </span>
            <span role="button" aria-label={pick(CC_COPY.like, lang)} aria-pressed={liked} className={liked ? "is-liked" : ""} onClick={() => setLiked((v) => !v)}>
              <CcHeart filled={liked} />
            </span>
            <span role="button" aria-label={pick(CC_COPY.share, lang)} onClick={share}>
              <CcShare />
            </span>
          </div>

          {video && !failed ? (
            <>
              <div className="reel-seekbar">
                <span className="reel-time">{fmtTime(time.at)}</span>
                <div className="reel-progress" onPointerDown={seek}>
                  <div className="reel-progress-fill" style={{ width: `${time.total ? (time.at / time.total) * 100 : 0}%` }}></div>
                </div>
              </div>
              <div className="play-overlay" aria-label={pick(CC_COPY.play, lang)} onClick={toggle}>
                <i className="fa-solid fa-play"></i>
              </div>
            </>
          ) : null}
        </div>

        <CreatorReelCaption
          title={captionTitle || creator.name || ""}
          tooltip={full}
          handle={handle}
          posted={posted}
          postedIso={reel.posted_at ? instagramIso(reel.posted_at) : ""}
          figures={figures}
          link={link}
          linkLabel={pick(reel.permalink ? CC_COPY.watch : CC_COPY.profile, lang)}
        />
      </div>
    </div>
  );
}

/** An Instagram handle as the admin typed it — a URL or junk is dropped. */
function cleanHandle(raw: string | null | undefined): string {
  const value = (raw || "").trim().replace(/^@/, "");
  return /^[A-Za-z0-9._]{1,30}$/.test(value) ? value : "";
}
