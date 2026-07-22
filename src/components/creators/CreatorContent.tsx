// @ts-nocheck
"use client";
/* eslint-disable */
import { useEffect, useRef, useState } from "react";

/* "المحتوى" — category filter pills + a horizontal slider of vertical
   reel-poster cards, with circular prev/next nav arrows. Self-contained
   (no legacy JS): pills are visual filters, arrows scroll the track. */
const CATEGORIES = [
  { key: "creator_content_cat_all", label: "الكل" },
  { key: "creator_content_cat_economy", label: "الاقتصاد (13)" },
  { key: "creator_content_cat_business", label: "المال والأعمال (13)" },
  { key: "creator_content_cat_war", label: "قصص الحرب (45)" },
  { key: "creator_content_cat_news", label: "الاخبار (13)" },
];

const VIDEO = "/assets/videos/WhatsApp Video 2026-03-23 at 11.59.11 AM.mp4";
const CARDS = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  video: VIDEO,
}));

const SKIP = 10; // seconds each rewind/forward jumps

const fmtTime = (s) => {
  if (s == null || isNaN(s) || !isFinite(s)) return "--:--";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${String(sec).padStart(2, "0")}`;
};

/* Resolve a video's duration up-front (before it's played) with a hidden
   element, so the badge can show it as soon as the cards appear. Cached per
   URL — the 10 cards share one file, so this loads it only once. MP4s that
   report Infinity are probed by seeking to the end. */
const durationCache = new Map();
function resolveDuration(url) {
  if (durationCache.has(url)) return durationCache.get(url);
  const p = new Promise((resolve) => {
    if (typeof document === "undefined") return resolve(0);
    const v = document.createElement("video");
    v.preload = "auto";
    v.muted = true;
    let settled = false;
    const finish = (d) => {
      if (settled) return;
      settled = true;
      resolve(isFinite(d) && d > 0 ? d : 0);
      v.removeAttribute("src");
      v.load();
    };
    v.addEventListener("durationchange", () => {
      if (isFinite(v.duration) && v.duration > 0) finish(v.duration);
    });
    v.addEventListener("loadedmetadata", () => {
      if (isFinite(v.duration) && v.duration > 0) {
        finish(v.duration);
        return;
      }
      const onTime = () => {
        if (isFinite(v.duration)) {
          v.removeEventListener("timeupdate", onTime);
          finish(v.duration);
        }
      };
      v.addEventListener("timeupdate", onTime);
      v.currentTime = 1e7; // force the browser to compute the real duration
    });
    v.addEventListener("error", () => finish(0));
    v.src = url;
  });
  durationCache.set(url, p);
  return p;
}

/* metadata shown in the reel viewer (static — no backend yet) */
const REEL_META = {
  user: "رنا الصالح",
  avatar: "/assets/images/محمود زعيتر 2.png",
  caption:
    "لم نبدأ من فكرة خارقة أو خطة محكمة، بل من قرار بسيط: أن نكون حاضرين، نستمع، ونُعلن صوت غزة للعالم",
  posted: "منذ 22 ساعة",
  likes: 13,
  comments: 12,
};

/* A single reel card: video paused on its first frame. Its play button opens
   the full-screen reel viewer. Elapsed time at the top and a bottom control
   bar (rewind · scrub · forward). */
function ContentCard({ card, index, onOpen }) {
  const videoRef = useRef(null);
  const progressRef = useRef(null);
  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);

  const pct = duration ? Math.min((current / duration) * 100, 100) : 0;

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

  const skip = (delta) => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = Math.min(Math.max(0, v.currentTime + delta), v.duration || 0);
  };

  // seek to wherever the pointer is along the progress track
  const seekToClientX = (clientX) => {
    const el = progressRef.current;
    const v = videoRef.current;
    if (!el || !v) return;
    const dur = v.duration;
    if (!isFinite(dur) || dur <= 0) return;
    // make sure the green indicator (which reads the duration state) has the
    // real duration, else pct stays 0 and the fill/thumb never move
    setDuration((d) => (d === dur ? d : dur));
    const rect = el.getBoundingClientRect();
    let frac = (clientX - rect.left) / rect.width;
    frac = Math.min(Math.max(frac, 0), 1);
    v.currentTime = frac * dur;
    setCurrent(v.currentTime);
  };

  const onProgressPointerDown = (e) => {
    e.preventDefault();
    seekToClientX(e.clientX);
    const move = (ev) => seekToClientX(ev.clientX);
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  // Some MP4s (e.g. WhatsApp exports) report duration === Infinity until the
  // video is seeked to the end. Probe once to get the real duration.
  const handleLoadedMetadata = (e) => {
    const v = e.currentTarget;
    if (isFinite(v.duration)) {
      setDuration(v.duration);
      return;
    }
    const onProbe = () => {
      if (isFinite(v.duration)) {
        v.removeEventListener("timeupdate", onProbe);
        v.currentTime = 0;
        setDuration(v.duration);
      }
    };
    v.addEventListener("timeupdate", onProbe);
    v.currentTime = 1e7; // force the browser to resolve the real duration
  };

  const handleTimeUpdate = (e) => {
    const v = e.currentTarget;
    if (isFinite(v.currentTime)) setCurrent(v.currentTime);
    // resolve the duration the moment it's known (belt-and-suspenders for
    // files whose loadedmetadata reported Infinity)
    if (isFinite(v.duration) && v.duration > 0) {
      setDuration((d) => (d === v.duration ? d : v.duration));
    }
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

      {/* bottom control bar */}
      <div className="cr-content-bar">
        <button
          type="button"
          className="cr-content-ctrl"
          onClick={() => skip(-SKIP)}
          aria-label="rewind"
        >
          <i className="fa-solid fa-backward"></i>
        </button>
        <div
          className="cr-content-progress"
          ref={progressRef}
          onPointerDown={onProgressPointerDown}
          role="slider"
          aria-label="seek"
          aria-valuemin={0}
          aria-valuemax={Math.round(duration)}
          aria-valuenow={Math.round(current)}
        >
          <div className="cr-content-progress-fill" style={{ width: pct + "%" }} />
          <div className="cr-content-progress-thumb" style={{ left: pct + "%" }} />
        </div>
        <button
          type="button"
          className="cr-content-ctrl"
          onClick={() => skip(SKIP)}
          aria-label="forward"
        >
          <i className="fa-solid fa-forward"></i>
        </button>
      </div>
    </div>
  );
}

/* Full-screen reel viewer opened when a card's play button is pressed. */
function ReelModal({ cards, index, onNavigate, onClose }) {
  const videoRef = useRef(null);
  const progressRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(false);
  const [liked, setLiked] = useState(true);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  const card = cards[index];
  const pct = duration ? Math.min((current / duration) * 100, 100) : 0;
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
  const skip = (delta) => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = Math.min(Math.max(0, v.currentTime + delta), v.duration || 0);
  };
  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const seekToClientX = (clientX) => {
    const el = progressRef.current;
    const v = videoRef.current;
    if (!el || !v) return;
    const dur = v.duration;
    if (!isFinite(dur) || dur <= 0) return;
    setDuration((d) => (d === dur ? d : dur));
    const rect = el.getBoundingClientRect();
    let frac = (clientX - rect.left) / rect.width;
    frac = Math.min(Math.max(frac, 0), 1);
    v.currentTime = frac * dur;
    setCurrent(v.currentTime);
  };
  const onProgressPointerDown = (e) => {
    e.preventDefault();
    seekToClientX(e.clientX);
    const move = (ev) => seekToClientX(ev.clientX);
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };
  const handleTimeUpdate = (e) => {
    const v = e.currentTarget;
    if (isFinite(v.currentTime)) setCurrent(v.currentTime);
    if (isFinite(v.duration) && v.duration > 0)
      setDuration((d) => (d === v.duration ? d : v.duration));
  };
  // resolve the real duration for MP4s that report Infinity until seeked,
  // otherwise the scrub bar can't map positions
  const handleLoadedMetadata = (e) => {
    const v = e.currentTarget;
    if (isFinite(v.duration)) {
      setDuration(v.duration);
      return;
    }
    const onProbe = () => {
      if (isFinite(v.duration)) {
        v.removeEventListener("timeupdate", onProbe);
        v.currentTime = 0;
        setDuration(v.duration);
      }
    };
    v.addEventListener("timeupdate", onProbe);
    v.currentTime = 1e7;
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

export default function CreatorContent() {
  const [active, setActive] = useState(0);
  const [openIndex, setOpenIndex] = useState(null);
  const trackRef = useRef(null);
  // disable a nav arrow once the track can't scroll any further that way
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const scroll = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 330, behavior: "smooth" });
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const updateEdges = () => {
      const max = el.scrollWidth - el.clientWidth;
      if (max <= 1) {
        setAtStart(true);
        setAtEnd(true);
        return;
      }
      // RTL scrollLeft can be negative; Math.abs normalizes to 0..max
      const pos = Math.abs(el.scrollLeft);
      setAtEnd(pos <= 1); // scroll(+1) direction exhausted
      setAtStart(pos >= max - 1); // scroll(-1) direction exhausted
    };
    updateEdges();
    el.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      el.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, []);

  return (
    <section className="cr-content-detail-section ">


      <div className="container position-relative">
          <img
            src="/assets/images/leaf_cutout.png"
            className="olive-branch branch-left-top-creator-section"
            alt="Olive Branch"
          />


        <div className="cr-content-head">
          <ul className="cr-content-tabs">
            {CATEGORIES.map((c, i) => (
              <li key={c.key}>
                <button
                  type="button"
                  className={"cr-content-tab" + (i === active ? " active" : "")}
                  onClick={() => setActive(i)}
                  data-i18n={c.key}
                >
                  {c.label}
                </button>
              </li>
            ))}
          </ul>
          <h2 className="cr-content-title">
            <span className="cr-highlight">
              المحتوى
            </span>
          </h2>
        </div>

        <div className="cr-content-slider">
          <button
            type="button"
            className="cr-content-nav cr-content-prev"
            onClick={() => scroll(-1)}
            disabled={atStart}
            aria-label="previous"
          >
            <i className="fa-solid fa-angle-right"></i>
          </button>
          <button
            type="button"
            className="cr-content-nav cr-content-next"
            onClick={() => scroll(1)}
            disabled={atEnd}
            aria-label="next"
          >
            <i className="fa-solid fa-angle-left"></i>
          </button>

          <div className="cr-content-track" ref={trackRef} dir="rtl">
            {CARDS.map((card, i) => (
              <ContentCard card={card} index={i} key={card.id} onOpen={setOpenIndex} />
            ))}
          </div>
        </div>
      </div>

      {openIndex !== null && (
        <ReelModal
          cards={CARDS}
          index={openIndex}
          onNavigate={setOpenIndex}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </section>
  );
}
