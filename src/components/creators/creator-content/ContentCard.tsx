"use client";
// @ts-nocheck
/* eslint-disable */
import { useEffect, useState } from "react";
import { SKIP } from "./data";
import { fmtTime, resolveDuration } from "./video-utils";
import { useReelVideo } from "./useReelVideo";

/* A single reel card: video paused on its first frame. Its play button opens
   the full-screen reel viewer. Elapsed time at the top and a bottom control
   bar (rewind · scrub · forward). */
export default function ContentCard({ card, index, onOpen }) {
  const {
    videoRef,
    progressRef,
    current,
    duration,
    setDuration,
    pct,
    skip,
    onProgressPointerDown,
    handleTimeUpdate,
    handleLoadedMetadata,
  } = useReelVideo();
  const [playing, setPlaying] = useState(false);

  // show the duration as soon as the card renders (resolved off-screen)
  useEffect(() => {
    let alive = true;
    resolveDuration(card.video).then((d) => {
      if (alive && d) setDuration((prev) => prev || d);
    });
    return () => {
      alive = false;
    };
  }, [card.video]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play();
    else v.pause();
  };

  return (
    <div className="cr-content-card">
      <video
        ref={videoRef}
        src={card.video}
        loop
        playsInline
        preload="auto"
        onLoadedMetadata={handleLoadedMetadata}
        onDurationChange={(e) => {
          if (isFinite(e.currentTarget.duration)) setDuration(e.currentTarget.duration);
        }}
        onTimeUpdate={handleTimeUpdate}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />

      {/* remaining time — counts down as the video plays */}
      <span className="cr-content-time">
        {duration > 0 ? fmtTime(Math.max(0, duration - current)) : "--:--"}
      </span>

      {/* centered play — opens the full reel viewer */}
      <button
        type="button"
        className="cr-content-play"
        onClick={() => onOpen(index)}
        aria-label="play"
      >
        <i className="fa-solid fa-play"></i>
      </button>
    </div>
  );
}
