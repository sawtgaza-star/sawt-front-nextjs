"use client";
// @ts-nocheck
/* eslint-disable */
import { useEffect, useState } from "react";
import { SKIP } from "./data";
import { DEFAULT_AVATAR, timeAgo } from "./reel-data";
import { useLang } from "@/lib/use-lang";
import { useReelVideo } from "./useReelVideo";
import ReelActions from "./ReelActions";
import ReelComments from "./ReelComments";
import ReelShare from "./ReelShare";
import ReelInfo from "./ReelInfo";
import {
  IconRewind10,
  IconForward10,
  IconClose,
  IconVolumeOff,
  IconVolumeOn,
} from "./reel-icons";

/* how long the centre controls and the info bar stay up before the playing
   video gets the screen to itself — any tap/move brings them back */
const IDLE_MS = 2000;

/* Full-screen reel viewer opened when a card's play button is pressed.
   Everything it shows about the reel — who posted it, caption, time, likes,
   comments — is the card's `details` (the API's reel, see reel-data.ts); a
   creator's profile passes `meta` to name the creator instead of the account.
   `scope` namespaces the visitor's own like / save / comments — ids can repeat
   across lists, so the store keys on `scope:id`.
   While the video is fetching or buffering a spinner covers the centre. */
export default function ReelModal({
  cards,
  index,
  onNavigate,
  onClose,
  scope = "reel",
  meta = undefined,
}) {
  const {
    videoRef,
    progressRef,
    current,
    setCurrent,
    duration,
    setDuration,
    pct,
    skip,
    onProgressPointerDown,
    handleTimeUpdate,
    handleLoadedMetadata,
  } = useReelVideo();
  const { lang } = useLang();
  const [playing, setPlaying] = useState(true);
  // the video has no frame to play yet (first load, or stalled mid-way)
  const [buffering, setBuffering] = useState(true);
  const [muted, setMuted] = useState(false);
  const [idle, setIdle] = useState(false);
  // "comments" | "share" | null — the sheet drawn over the bottom of the reel
  const [panel, setPanel] = useState(null);
  // bumped by every interaction, purely to restart the idle countdown below
  const [wakeTick, setWakeTick] = useState(0);

  const wake = () => {
    setIdle(false);
    setWakeTick((t) => t + 1);
  };
  // a mouse only has to wake the chrome once it is actually hidden — otherwise
  // every mousemove would re-render the viewer
  const onReelPointerMove = () => {
    if (idle) wake();
  };
  // the cursor leaving the reel hides them at once instead of letting the
  // countdown run out (mouse only — a lifted finger must not count)
  const onReelMouseLeave = () => {
    if (playing && !panel) setIdle(true);
  };

  // the controls fade out IDLE_MS after playback starts and stay up whenever
  // the video is paused or a sheet is open
  useEffect(() => {
    if (!playing || panel) {
      setIdle(false);
      return;
    }
    const t = window.setTimeout(() => setIdle(true), IDLE_MS);
    return () => window.clearTimeout(t);
  }, [playing, panel, wakeTick, index]);

  // a sheet belongs to the reel it was opened on
  useEffect(() => setPanel(null), [index]);

  const card = cards[index];
  const reelKey = `${scope}:${card.id ?? index}`;
  const details = card.details;
  const username = details?.username || "";
  const info = {
    user: meta?.user || username,
    avatar: meta?.avatar || DEFAULT_AVATAR,
    profile:
      meta?.profile ||
      (username ? `https://www.instagram.com/${encodeURIComponent(username)}/` : ""),
    caption: details?.caption || card.caption || "",
    posted: timeAgo(details?.postedAt || "", lang),
  };
  const hasPrev = index > 0;
  const hasNext = index < cards.length - 1;

  const go = (delta) => {
    const next = index + delta;
    if (next >= 0 && next < cards.length) onNavigate(next);
  };

  // close on Escape, arrow keys navigate, lock page scroll while open
  useEffect(() => {
    const onKey = (e) => {
      // Escape closes the open sheet first, the viewer only once none is up
      if (e.key === "Escape") panel ? setPanel(null) : onClose();
      else if (e.key === "ArrowRight") go(-1); // RTL: right = previous
      else if (e.key === "ArrowLeft") go(1);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  });

  // (re)load and autoplay whenever the active reel changes
  useEffect(() => {
    setCurrent(0);
    setDuration(0);
    setBuffering(true);
    const v = videoRef.current;
    if (v) {
      v.load();
      v.play().catch(() => {});
    }
  }, [index]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play();
    else v.pause();
  };
  /* tapping the video: with a sheet up the tap only dismisses it, otherwise it
     plays/pauses like the centre button */
  const onSurfaceClick = () => {
    if (panel) setPanel(null);
    else togglePlay();
  };
  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <div className="cr-reel-overlay" onClick={onClose}>
      {/* navigate between reels — outside the video (RTL: right = previous,
          left = next). Kept visible at the ends, just greyed out. */}
      <button
        type="button"
        className="cr-reel-nav cr-reel-nav-prev"
        onClick={(e) => {
          e.stopPropagation();
          go(-1);
        }}
        disabled={!hasPrev}
        aria-label="previous video"
      >
        <i className="fa-solid fa-angle-right"></i>
      </button>
      <button
        type="button"
        className="cr-reel-nav cr-reel-nav-next"
        onClick={(e) => {
          e.stopPropagation();
          go(1);
        }}
        disabled={!hasNext}
        aria-label="next video"
      >
        <i className="fa-solid fa-angle-left"></i>
      </button>

      <div
        className={
          "cr-reel" +
          (idle ? " is-idle" : "") +
          (panel ? ` has-panel has-panel-${panel}` : "")
        }
        onClick={(e) => e.stopPropagation()}
        onPointerDown={wake}
        onPointerMove={onReelPointerMove}
        onMouseLeave={onReelMouseLeave}
      >
        {/* the frame itself is the play/pause surface, the way every reels
            player behaves — the centre button is only the visible affordance.
            A tap that ends a swipe is swallowed by useReelSwipe's click guard,
            and an open sheet consumes its own clicks. */}
        <video
          ref={videoRef}
          src={card.video}
          loop
          playsInline
          preload="auto"
          onClick={onSurfaceClick}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onDurationChange={(e) => {
            if (isFinite(e.currentTarget.duration)) setDuration(e.currentTarget.duration);
          }}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onWaiting={() => setBuffering(true)}
          onCanPlay={() => setBuffering(false)}
          onPlaying={() => setBuffering(false)}
          onError={() => setBuffering(false)}
        />

        {buffering && (
          <div className="cr-reel-loading" role="status" aria-label="loading">
            <span className="cr-reel-spinner" aria-hidden="true" />
          </div>
        )}

        <button
          type="button"
          className="cr-reel-close"
          onClick={onClose}
          aria-label="close"
        >
          <IconClose />
        </button>
        <button
          type="button"
          className="cr-reel-mute"
          onClick={toggleMute}
          aria-label={muted ? "unmute" : "mute"}
        >
          {muted ? <IconVolumeOff /> : <IconVolumeOn />}
        </button>

        {/* centered rewind · play/pause · forward */}
        <div className={"cr-reel-center" + (buffering ? " is-hidden" : "")}>
          <button
            type="button"
            className="cr-reel-ctrl"
            onClick={() => skip(SKIP)}
            aria-label="forward 10 seconds"
          >
            <span className="cr-reel-skip">
              <IconForward10 />
            </span>
          </button>
          <button
            type="button"
            className="cr-reel-play"
            onClick={togglePlay}
            aria-label={playing ? "pause" : "play"}
          >
            <i className={playing ? "fa-solid fa-pause" : "fa-solid fa-play"}></i>
          </button>
          <button
            type="button"
            className="cr-reel-ctrl"
            onClick={() => skip(-SKIP)}
            aria-label="rewind 10 seconds"
          >
            <span className="cr-reel-skip">
              <IconRewind10 />
            </span>
          </button>
        </div>

        {/* action rail — like / comments / save / share */}
        <ReelActions
          reelKey={reelKey}
          details={details}
          panel={panel}
          onPanel={setPanel}
        />

        {/* bottom info + scrub bar */}
        <ReelInfo
          current={current}
          duration={duration}
          pct={pct}
          progressRef={progressRef}
          onProgressPointerDown={onProgressPointerDown}
          meta={info}
        />

        {/* the sheet the rail opens, over the info bar */}
        {panel === "comments" && (
          <ReelComments
            reelKey={reelKey}
            details={details}
            onClose={() => setPanel(null)}
          />
        )}
        {panel === "share" && (
          <ReelShare reelId={card.id ?? index} onClose={() => setPanel(null)} />
        )}
      </div>
    </div>
  );
}
