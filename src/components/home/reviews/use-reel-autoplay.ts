"use client";
import { useEffect, type RefObject } from "react";

/* Plays the reel on screen as soon as the reels column comes into view, and
   pauses it once the column leaves — the same overlay / `.playing` state
   lib/legacy-main's togglePlay sets, so a tap afterwards toggles as before.

   Scrolling the column up or down (wheel, swipe, mouse drag) plays the reel
   it settles on by itself: once the scroll has stopped, every other reel is
   paused and the one now in view starts. lib/legacy-main's own scroll
   handler still pauses the reels that left and swaps the comment thread.

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

    /* the reel autoplay last handed playback to — a scroll that settles back
       on it leaves it alone, so a reel the visitor paused stays paused */
    let lastAuto: HTMLElement | null = null;

    const play = async () => {
      const item = currentReel(container);
      lastAuto = item;
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

    let inView = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) void play();
        else pauseAll();
      },
      { threshold: 0.5 },
    );
    observer.observe(container);

    /* the column scrolled to another reel: once it settles (snap included),
       hand playback to that one. `scrollend` where the browser has it, a
       short quiet period otherwise — the timer also covers a scroll that
       ends without the event. */
    let settleTimer = 0;
    const settle = () => {
      window.clearTimeout(settleTimer);
      if (!inView) return;
      const current = currentReel(container);
      if (current === lastAuto) return;
      container.querySelectorAll(".reel-item").forEach((item) => {
        const video = item.querySelector("video");
        if (item !== current && video && !video.paused) {
          video.pause();
          setPlaying(item, false);
        }
      });
      void play();
    };
    const onScroll = () => {
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(settle, 180);
    };
    container.addEventListener("scroll", onScroll, { passive: true });
    container.addEventListener("scrollend", settle);

    return () => {
      observer.disconnect();
      window.clearTimeout(settleTimer);
      container.removeEventListener("scroll", onScroll);
      container.removeEventListener("scrollend", settle);
      window.removeEventListener("pointerdown", unmute, true);
      window.removeEventListener("keydown", unmute, true);
    };
  }, [ref, enabled]);
}
