// @ts-nocheck
/* eslint-disable */

export const fmtTime = (s) => {
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
export function resolveDuration(url) {
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
