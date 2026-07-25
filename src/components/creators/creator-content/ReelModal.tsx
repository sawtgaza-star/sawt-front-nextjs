"use client";
// @ts-nocheck
/* eslint-disable */
import { useEffect, useState } from "react";
import { SKIP, REEL_META } from "./data";
import { fmtTime } from "./video-utils";
import { useReelVideo } from "./useReelVideo";

/* Full-screen reel viewer opened when a card's play button is pressed. */
export default function ReelModal({ cards, index, onNavigate, onClose }) {
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
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(false);
  const [liked, setLiked] = useState(true);

  const card = cards[index];
  const hasPrev = index > 0;
  const hasNext = index < cards.length - 1;

  const go = (delta) => {
    const next = index + delta;
    if (next >= 0 && next < cards.length) onNavigate(next);
  };

  // close on Escape, arrow keys navigate, lock page scroll while open
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
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

      <div className="cr-reel" onClick={(e) => e.stopPropagation()}>
        <video
          ref={videoRef}
          src={card.video}
          loop
          playsInline
          preload="auto"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onDurationChange={(e) => {
            if (isFinite(e.currentTarget.duration)) setDuration(e.currentTarget.duration);
          }}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />

        <button
          type="button"
          className="cr-reel-close"
          onClick={onClose}
          aria-label="close"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
        <button
          type="button"
          className="cr-reel-mute"
          onClick={toggleMute}
          aria-label={muted ? "unmute" : "mute"}
        >
          <i className={muted ? "fa-solid fa-volume-xmark" : "fa-solid fa-volume-high"}></i>
        </button>

        {/* centered rewind · play/pause · forward */}
        <div className="cr-reel-center">
          <button
            type="button"
            className="cr-reel-ctrl"
            onClick={() => skip(SKIP)}
            aria-label="forward 10 seconds"
          >
            <span className="cr-reel-skip">
              <i className="fa-solid fa-rotate-right"></i>
              <b>{SKIP}</b>
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
              <i className="fa-solid fa-rotate-left"></i>
              <b>{SKIP}</b>
            </span>
          </button>
        </div>

        {/* action rail */}
        <div className="cr-reel-actions">
          <button
            type="button"
            className="cr-reel-action"
            onClick={() => setLiked((l) => !l)}
            aria-label="like"
          >
            <i
              className={liked ? "fa-solid fa-heart" : "fa-regular fa-heart"}
              style={liked ? { color: "#e74c3c" } : undefined}
            ></i>
            <span>{REEL_META.likes}</span>
          </button>
          <button type="button" className="cr-reel-action" aria-label="comments">
            <i className="fa-regular fa-comment"></i>
            <span>{REEL_META.comments}</span>
          </button>
          <button type="button" className="cr-reel-action" aria-label="save">
            <i className="fa-regular fa-bookmark"></i>
          </button>
          <button type="button" className="cr-reel-action" aria-label="share">
            <i className="fa-solid fa-share"></i>
          </button>
        </div>

        {/* bottom info + scrub bar */}
        <div className="cr-reel-info">
          <div className="cr-reel-user">
            <img src={REEL_META.avatar} alt={REEL_META.user} />
            <span>{REEL_META.user}</span>
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
      </div>
    </div>
  );
}
