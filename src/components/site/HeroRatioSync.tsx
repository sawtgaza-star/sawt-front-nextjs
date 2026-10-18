"use client";

import { useEffect } from "react";

/* Gives every inner-page hero (the families listed in hero-size.css) the
   shape of the image it actually shows: the backdrop the API returns is read
   off the hero's computed background, loaded, and its natural ratio written
   to `--hero-ratio` on the box. hero-size.css uses that as the box's
   aspect-ratio, so `cover` fits the image edge to edge instead of cropping it
   to a fixed 1783×592. Until the image is measured (or with no image) the
   design's 1783/592 fallback holds the height.

   A MutationObserver re-measures when a hero's style/class changes (payload
   landing, loading → loaded) or a new hero mounts on client navigation. */

const HERO_SELECTOR =
  ".cr-header:not(.ct-header):not(.cr-detail-header), .about-header, header.sm-wp-hero";

const measured = new Map<string, string>();

function backgroundUrl(el: HTMLElement): string | null {
  const bg = getComputedStyle(el).backgroundImage;
  const match = bg && bg.match(/url\(["']?(.*?)["']?\)/);
  return match ? match[1] : null;
}

function sync(el: HTMLElement) {
  const url = backgroundUrl(el);
  if (!url) {
    if (el.style.getPropertyValue("--hero-ratio")) el.style.removeProperty("--hero-ratio");
    delete el.dataset.heroRatioSrc;
    return;
  }
  if (el.dataset.heroRatioSrc === url) return;
  el.dataset.heroRatioSrc = url;

  const known = measured.get(url);
  if (known) {
    el.style.setProperty("--hero-ratio", known);
    return;
  }
  const img = new Image();
  img.onload = () => {
    if (!img.naturalWidth || !img.naturalHeight) return;
    const ratio = `${img.naturalWidth} / ${img.naturalHeight}`;
    measured.set(url, ratio);
    if (el.dataset.heroRatioSrc === url) el.style.setProperty("--hero-ratio", ratio);
  };
  img.src = url;
}

function syncAll() {
  document.querySelectorAll<HTMLElement>(HERO_SELECTOR).forEach(sync);
}

export default function HeroRatioSync() {
  useEffect(() => {
    syncAll();
    let queued = false;
    const observer = new MutationObserver(() => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        syncAll();
      });
    });
    observer.observe(document.body, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["style", "class"],
    });
    return () => observer.disconnect();
  }, []);

  return null;
}
