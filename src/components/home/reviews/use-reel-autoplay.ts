"use client";
import { useEffect, type RefObject } from "react";

/* Plays the reel on screen as soon as the reels column comes into view, and
   pauses it once the column leaves — the same overlay / `.playing` state
   lib/legacy-main's togglePlay sets, so a tap afterwards toggles as before.

   Browsers refuse to start a video with sound before the visitor has
   interacted with the page: it tries with sound, falls back to muted, and
   the visitor's first tap or key press anywhere turns the sound back on. */

function setPlaying(item: Element, playing: boolean) {
  const overlay = item.querySelector<HTMLElement>(".play-overlay");
  if (overlay) {
    overlay.style.opacity = playing ? "0" : "1";
    overlay.style.pointerEvents = playing ? "none" : "all";
  }
  item.classList.toggle("playing", playing);
}

/** The reel the column is scrolled to — the one whose middle is inside it. */
function currentReel(container: HTMLElement): HTMLElement | null {
  const box = container.getBoundingClientRect();
  const items = Array.from(container.querySelectorAll<HTMLElement>(".reel-item"));
  return (
    items.find((item) => {
      const r = item.getBoundingClientRect();
      const mid = r.top + r.height / 2;
      return mid >= box.top && mid <= box.bottom;
    }) ||
    items[0] ||
    null
  );
}

export function useReelAutoplay(ref: RefObject<HTMLElement | null>, enabled: boolean) {
  useEffect(() => {
    const container = ref.current;
    if (!enabled || !container || typeof IntersectionObserver === "undefined") return;

    let unmuteArmed = false;
    const unmute = () => {
      container.querySelectorAll("video").forEach((v) => {
        v.muted = false;
      });
      window.removeEventListener("pointerdown", unmute, true);
      window.removeEventListener("keydown", unmute, true);
    };

    const play = async () => {
      const item = currentReel(container);
      const video = item?.querySelector("video");
      if (!item || !video || !video.paused) return;
      setPlaying(item, true);
      try {
        await video.play();
      } catch {
        video.muted = true;
        try {
          await video.play();
          if (!unmuteArmed) {
            unmuteArmed = true;
            window.addEventListener("pointerdown", unmute, true);
            window.addEventListener("keydown", unmute, true);
          }
        } catch {
          setPlaying(item, false);
        }
      }
    };

    const pauseAll = () => {
      container.querySelectorAll(".reel-item").forEach((item) => {
        const video = item.querySelector("video");
        if (video && !video.paused) {
          video.pause();
          setPlaying(item, false);
        }
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void play();
        else pauseAll();
      },
      { threshold: 0.5 },
    );
    observer.observe(container);

    return () => {
      observer.disconnect();
      window.removeEventListener("pointerdown", unmute, true);
      window.removeEventListener("keydown", unmute, true);
    };
  }, [ref, enabled]);
}
