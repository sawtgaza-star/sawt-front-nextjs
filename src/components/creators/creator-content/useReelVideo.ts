"use client";
// @ts-nocheck
/* eslint-disable */
import { useRef, useState } from "react";

/* Shared video scrub/seek/duration logic. Both the reel card and the
   full-screen reel viewer used an identical copy of these handlers; this hook
   is that exact logic, extracted verbatim so the two stay in sync. */
export function useReelVideo() {
  const videoRef = useRef(null);
  const progressRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  const pct = duration ? Math.min((current / duration) * 100, 100) : 0;

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

  const handleTimeUpdate = (e) => {
    const v = e.currentTarget;
    if (isFinite(v.currentTime)) setCurrent(v.currentTime);
    // resolve the duration the moment it's known (belt-and-suspenders for
    // files whose loadedmetadata reported Infinity)
    if (isFinite(v.duration) && v.duration > 0) {
      setDuration((d) => (d === v.duration ? d : v.duration));
    }
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

  return {
    videoRef,
    progressRef,
    current,
    setCurrent,
    duration,
    setDuration,
    pct,
    skip,
    seekToClientX,
    onProgressPointerDown,
    handleTimeUpdate,
    handleLoadedMetadata,
  };
}
