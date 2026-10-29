"use client";
import { useEffect } from "react";
import { PERSON_ICON } from "./person-icon";

/* One site-wide rule for images the server can't deliver (404s, deleted
   uploads), instead of an onError on every <img>:

   - an avatar (the image or one of its two nearest boxes has "avatar" in its
     class) swaps to the person icon, keeping its size and rounding;
   - any other image is hidden, and so is its box when the image was all that
     box held (a gallery frame, a card's photo slot) — no empty grey tiles.

   Components that already handle the failure themselves (NavAccountAvatar,
   ReelThumbCard, … → setFailed) swap the <img> out on re-render, so the guard
   waits a beat and leaves alone any image that is no longer in the document.
   Avatar boxes with no <img> at all are given the same icon by
   image-fallback.css. */
const AVATAR = /avatar/i;
const BOX_TAGS = new Set(["FIGURE", "PICTURE", "SPAN", "DIV", "A"]);

function isAvatar(img: HTMLImageElement) {
  let el: Element | null = img;
  for (let depth = 0; el && depth < 3; depth++, el = el.parentElement) {
    if (AVATAR.test(el.getAttribute("class") || "")) return true;
  }
  return false;
}

function handle(img: HTMLImageElement) {
  if (!img.isConnected || img.dataset.imgFallback) return;
  // A team mic starts on the build's cutout, which is missing for a mic
  // uploaded after the deploy; MicCutouts then swaps in its own cutout (or
  // the raw upload). Hiding it here kept that swapped-in mic invisible.
  if (img.dataset.micSrc) return;

  if (isAvatar(img)) {
    img.dataset.imgFallback = "avatar";
    img.removeAttribute("srcset");
    img.src = PERSON_ICON;
    return;
  }

  img.dataset.imgFallback = "hidden";
  let box = img.parentElement;
  if (box?.tagName === "PICTURE") box = box.parentElement;
  if (
    box &&
    BOX_TAGS.has(box.tagName) &&
    box.children.length === 1 &&
    !box.textContent?.trim()
  ) {
    box.dataset.imgFallback = "hidden";
  }
}

export default function BrokenImageGuard() {
  useEffect(() => {
    const onError = (event: Event) => {
      const img = event.target;
      if (!(img instanceof HTMLImageElement)) return;
      if (img.src === PERSON_ICON) return;
      window.setTimeout(() => handle(img), 60);
    };
    // `error` doesn't bubble — catch it on the way down instead
    document.addEventListener("error", onError, true);

    // images that failed before this listener existed (server-rendered HTML).
    // SVGs are skipped: one without its own size can report a 0 width while fine.
    for (const img of Array.from(document.images)) {
      const src = img.currentSrc || img.src;
      if (src && img.complete && img.naturalWidth === 0 && !/\.svg(\?|$)/i.test(src)) {
        handle(img);
      }
    }

    return () => document.removeEventListener("error", onError, true);
  }, []);

  return null;
}
