import { useEffect, useRef, useState, type Ref } from "react";
import type { HomeReviewReel } from "@/lib/api/home";
import { formatDuration } from "./hero-copy";

/* One reel of the hero stack. The stack poses it (hero-pose → the card's CSS
   variables, every frame); `hh-slot-{index}` is only the pose it is
   server-rendered in, before that script runs. Display only — a card has
   no hover state and clicking it does nothing; the stack is turned by
   dragging, by its pager, or on its own.

   `preview` (the stack decides: desktop, motion allowed, page loaded) loads
   the file's metadata for the duration badge and lets the front card play
   muted, on a loop, while it stays in front. Instagram CDN links expire —
   a file that fails simply leaves the poster up. */
export default function HeroReelCard({
  reel,
  index,
  front,
  cardRef,
  preview,
  priority,
}: {
  reel: HomeReviewReel;
  index: number;
  /** the reel nearest the front — the one that plays */
  front: boolean;
  cardRef: Ref<HTMLDivElement>;
  preview: boolean;
  priority: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = useState("");
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const live = preview && front && !failed && !!reel.video_url;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (live) {
      video.play().catch(() => setPlaying(false));
    } else {
      video.pause();
      setPlaying(false);
    }
  }, [live]);

  return (
    <div
      ref={cardRef}
      className={`hh-card hh-slot-${index}` + (front ? " is-front" : "")}
      style={{ ["--hh-i" as string]: index }}
    >
      <span className="hh-card-media">
        {reel.thumbnail ? (
          <img
            className="hh-card-poster"
            src={reel.thumbnail}
            alt=""
            draggable={false}
            fetchPriority={priority ? "high" : "low"}
            decoding={priority ? undefined : "async"}
          />
        ) : null}
        {preview && reel.video_url && !failed ? (
          <video
            ref={videoRef}
            className={"hh-card-video" + (playing ? " is-playing" : "")}
            src={reel.video_url}
            muted
            loop
            playsInline
            preload="metadata"
            onLoadedMetadata={(e) => setDuration(formatDuration(e.currentTarget.duration))}
            onPlaying={() => setPlaying(true)}
            onError={() => setFailed(true)}
          ></video>
        ) : null}
        <span className="hh-card-badge">
          {duration ? (
            <bdi>{duration}</bdi>
          ) : (
            <i className="fa-brands fa-instagram" aria-hidden="true"></i>
          )}
        </span>
      </span>
    </div>
  );
}
