"use client";
import { useEffect, useState, type KeyboardEvent } from "react";
import { useLang } from "@/lib/use-lang";
import { formatCount, timeAgo } from "@/components/creators/creator-content/reel-data";
import type { Reel } from "./content-data";

const SAWT_MARK = encodeURI("/assets/images/شعار صوت اخضر.svg");

/* A grid card of the محتوانا page: the reel's cover (`thumbnail`) only — no
   <video> is mounted in the grid, so a page of reels costs a page of JPEGs,
   not a page of video requests. Clicking anywhere on the card (or Enter /
   Space on it) opens the full-screen viewer at this reel, where the video
   plays. Same look as the creator page's ContentCard (.cr-content-card styles
   its <img> exactly like its <video>).

   The grid lists every reel the API returns for the slug, including ones
   whose Instagram links have expired (the cover fails to load). Such a card
   shows the Sawt mark in place of the cover, and a click takes it to the
   reel on Instagram (`permalink`) — its video link has expired with the
   cover, so the viewer would have nothing to play. `onBroken` tells the grid,
   which keeps that reel out of the viewer. */
export default function ReelThumbCard({
  reel,
  index,
  onOpen,
  onBroken,
}: {
  reel: Reel;
  index: number;
  onOpen: (index: number) => void;
  onBroken?: (id: string) => void;
}) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [reel.poster]);
  const broken = !reel.poster || failed;
  useEffect(() => {
    if (broken) onBroken?.(String(reel.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [broken, reel.id]);

  const { lang } = useLang();
  const d = reel.details;
  const caption = d?.caption || "";
  const posted = d ? timeAgo(d.postedAt, lang) : "";
  const permalink = d?.permalink || "";
  const open = () => {
    if (broken && permalink) {
      window.open(permalink, "_blank", "noopener,noreferrer");
    } else {
      onOpen(index);
    }
  };
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      open();
    }
  };

  return (
    <div
      className="cr-content-card ct-thumb-card"
      data-reel-id={String(reel.id)}
      role="button"
      tabIndex={0}
      aria-label={caption || "play"}
      onClick={open}
      onKeyDown={onKeyDown}
    >
      {broken ? (
        <img
          className="ct-thumb-fallback"
          src={SAWT_MARK}
          alt={caption}
          draggable={false}
        />
      ) : (
        <img
          src={reel.poster}
          alt={caption}
          loading="lazy"
          decoding="async"
          draggable={false}
          onError={() => setFailed(true)}
        />
      )}

      {/* how long ago it was posted, top corner */}
      {posted ? <span className="ct-thumb-age">{posted}</span> : null}

      {/* the reel's numbers along the bottom: views (only when the API has
          them), likes, comments */}
      {d ? (
        <div className="ct-thumb-stats" aria-hidden="true">
          {d.views !== null ? (
            <span>
              <i className="fa-solid fa-play"></i>
              {formatCount(d.views, lang)}
            </span>
          ) : null}
          <span>
            <i className="fa-solid fa-heart"></i>
            {formatCount(d.likes, lang)}
          </span>
          <span>
            <i className="fa-solid fa-comment"></i>
            {formatCount(d.commentsCount, lang)}
          </span>
        </div>
      ) : null}

      {/* centred play — only the visual cue; the card itself is the control */}
      <button
        type="button"
        className="cr-content-play"
        tabIndex={-1}
        aria-hidden="true"
      >
        <i className={broken && permalink ? "fa-brands fa-instagram" : "fa-solid fa-play"}></i>
      </button>
    </div>
  );
}
