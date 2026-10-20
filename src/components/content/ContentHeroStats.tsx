"use client";
/* The two stat "orbits" in the hero's top corners. Each is a thin glowing arc that
   draws itself in from beyond the screen edge and ends on a glowing dot; the
   number above the dot counts up as the line arrives (CountUp).

   THE ARC IS THE RIM'S: a circle around the same centre as the glowing planet
   rim the posters sit on (ARC_IMAGE in ./hero-fan), orbitLift() larger, so it
   leans exactly as the slider does. The rim lives in the backdrop, so its
   place is worked out from the header's size — on mount and whenever the
   header resizes.

   Views: the account's `views_count`; without it, the sum of the reels'
   `views` (Instagram only returns those when the backend's token may read
   insights); without either, the orbit counts likes instead, and says so,
   rather than showing a made-up view count.
   Videos: the account's `media_count` (everything on Instagram), else how many
   reels the payload listed. */

import { useLayoutEffect, useRef, useState } from "react";
import type { ContentReels } from "@/lib/api/content";
import CountUp from "./CountUp";
import { ARC_IMAGE, ARC_MEDIA, backdropPlacement } from "./hero-fan";

/** how far above the rim the orbits run, in backdrop pixels — higher on
    phones and tablets, so the counts clear the posters' tops */
const orbitLift = () => (window.matchMedia(ARC_MEDIA).matches ? 340 : 480);
/** the dots sit this far in from the screen edges */
const dotInset = (width: number) =>
  window.matchMedia(ARC_MEDIA).matches
    ? Math.min(220, Math.max(120, width * 0.11))
    : Math.max(52, width * 0.15);
/** the line starts this far beyond the screen edge, so it enters from outside */
const OFFSCREEN = 40;

type Stat = {
  value: number;
  i18n: string;
  label: { ar: string; en: string };
};

function statsFrom(reels?: ContentReels | null): Stat[] {
  const items = reels?.items ?? [];
  const sum = (pick: (n: (typeof items)[number]) => number | null | undefined) =>
    items.reduce((total, item) => total + (pick(item) ?? 0), 0);

  const accountViews = reels?.account?.views_count;
  const hasViews =
    typeof accountViews === "number" ||
    items.some((item) => typeof item.views === "number");
  const videos = reels?.account?.media_count ?? items.length;

  const stats: Stat[] = [];
  const reach =
    typeof accountViews === "number"
      ? accountViews
      : hasViews
        ? sum((item) => item.views)
        : sum((item) => item.likes);
  if (reach > 0) {
    stats.push(
      hasViews
        ? { value: reach, i18n: "content_stat_views", label: { ar: "مشاهدة", en: "Views" } }
        : { value: reach, i18n: "content_stat_likes", label: { ar: "إعجاب", en: "Likes" } },
    );
  }
  if (videos > 0) {
    stats.push({
      value: videos,
      i18n: "content_stat_videos",
      label: { ar: "فيديو", en: "Videos" },
    });
  }
  return stats;
}

type Orbit = {
  /** the arc, from beyond the screen edge to the dot */
  path: string;
  x: number;
  y: number;
};

type Layout = { width: number; height: number; right: Orbit; left: Orbit };

/** The orbit circle on screen, and each side's arc and dot. */
function measure(box: HTMLElement): Layout | undefined {
  const width = box.clientWidth;
  const height = box.clientHeight;
  if (!width || !height) return undefined;
  const { scale, offsetX, offsetY } = backdropPlacement(width, height);
  const cx = offsetX + ARC_IMAGE.topX * scale;
  const cy = offsetY + (ARC_IMAGE.topY + ARC_IMAGE.radius) * scale;
  const r = (ARC_IMAGE.radius + orbitLift()) * scale;
  const yAt = (x: number) => cy - Math.sqrt(Math.max(0, r * r - (x - cx) ** 2));
  const r1 = r.toFixed(1);

  const inset = dotInset(width);
  const lx = inset;
  const rx = width - inset;
  const lx0 = -OFFSCREEN;
  const rx0 = width + OFFSCREEN;
  return {
    width,
    height,
    // left: drawn rightward over the top of the circle (clockwise on screen)
    left: {
      path: `M ${lx0} ${yAt(lx0).toFixed(1)} A ${r1} ${r1} 0 0 1 ${lx} ${yAt(lx).toFixed(1)}`,
      x: lx,
      y: yAt(lx),
    },
    // right: drawn leftward, the mirror image
    right: {
      path: `M ${rx0} ${yAt(rx0).toFixed(1)} A ${r1} ${r1} 0 0 0 ${rx} ${yAt(rx).toFixed(1)}`,
      x: rx,
      y: yAt(rx),
    },
  };
}

export default function ContentHeroStats({
  reels,
  lang = "ar",
}: {
  reels?: ContentReels | null;
  lang?: string;
}) {
  const stats = statsFrom(reels);
  const box = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState<Layout>();

  useLayoutEffect(() => {
    const update = () => {
      const el = box.current;
      setLayout(el ? measure(el) : undefined);
    };
    update();
    window.addEventListener("resize", update);
    /* the header grows once the poster strip mounts (on a phone it has no
       min-height to hold it), so follow the box itself, not just the window */
    const observer = new ResizeObserver(update);
    if (box.current) observer.observe(box.current);
    return () => {
      window.removeEventListener("resize", update);
      observer.disconnect();
    };
  }, []);

  if (!stats.length) return null;

  return (
    <div className="ct-orbits" ref={box}>
      {layout && (
        <>
          <svg
            className="ct-orbit-lines"
            width={layout.width}
            height={layout.height}
            viewBox={`0 0 ${layout.width} ${layout.height}`}
            aria-hidden="true"
          >
            {stats.map((stat, i) => (
              <path
                key={stat.i18n}
                d={(i === 0 ? layout.right : layout.left).path}
                pathLength={1}
              />
            ))}
          </svg>
          {stats.map((stat, i) => {
            const orbit = i === 0 ? layout.right : layout.left;
            return (
              <div
                key={stat.i18n}
                className="ct-orbit"
                style={{ left: orbit.x, top: orbit.y }}
              >
                <span className="ct-orbit-dot" aria-hidden="true"></span>
                <span className="ct-orbit-text">
                  <span className="ct-orbit-value" dir="ltr">
                    <CountUp value={stat.value} delay={1000} />
                  </span>
                  <span className="ct-orbit-label" data-i18n={stat.i18n}>
                    {lang === "en" ? stat.label.en : stat.label.ar}
                  </span>
                </span>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
