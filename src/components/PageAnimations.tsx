"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { initCounters, initParallax } from "@/lib/scroll-effects";

/**
 * Site-wide scroll-reveal + page-entrance driver (styles in styles/animations.css).
 * Marks below-the-fold sections with data-sawt-reveal, staggers their top-level
 * blocks and reveals each section once when it enters the viewport. Above-fold
 * content is covered by the body entrance animation started by the inline
 * script in the root layout. All marks are removed after the reveal finishes,
 * so no permanent style state is left on legacy markup.
 */

const DURATION = 600;
const STAGGER = 80;
const MAX_DELAY = 480;

const CONTAINER_SELECTOR =
  ":scope > .container, :scope > .container-fluid, :scope > .container-sm, :scope > .container-md, :scope > .container-lg, :scope > .container-xl, :scope > .container-xxl";

/* Never transform a block that holds a position:fixed element (it would be
   re-anchored to the transformed ancestor mid-animation). */
const FIXED_SELECTOR = ".theme-toggle-and-up, .header-bar";

function collectItems(section: HTMLElement): HTMLElement[] {
  const host = section.querySelector(CONTAINER_SELECTOR) ?? section;
  const items: HTMLElement[] = [];
  for (const child of Array.from(host.children)) {
    if (!(child instanceof HTMLElement)) continue;
    // Olive branches keep their own positioning transforms + drift keyframes.
    if (child.matches("script, style, .modal, .olive-branch")) continue;
    if (child.matches(FIXED_SELECTOR) || child.querySelector(FIXED_SELECTOR)) continue;
    const kids = Array.from(child.children).filter(
      (kid): kid is HTMLElement => kid instanceof HTMLElement
    );
    if (
      child.classList.contains("row") &&
      kids.length >= 2 &&
      kids.length <= 8 &&
      !kids.some((kid) => kid.matches(FIXED_SELECTOR) || !!kid.querySelector(FIXED_SELECTOR))
    ) {
      items.push(...kids);
    } else {
      items.push(child);
    }
  }
  return items;
}

function unmark(item: HTMLElement) {
  item.removeAttribute("data-sawt-reveal");
  item.classList.remove("sawt-in");
  item.style.removeProperty("--sawt-delay");
}

export default function PageAnimations() {
  const pathname = usePathname();
  const firstRun = useRef(true);

  useEffect(() => {
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    document.documentElement.classList.add("sawt-anim");

    // Replay the page entrance on client-side navigations (full loads get it
    // from the inline script in the root layout, before hydration).
    if (firstRun.current) {
      firstRun.current = false;
    } else {
      document.body.classList.remove("sawt-page-in");
      void document.body.offsetWidth;
      document.body.classList.add("sawt-page-in");
    }

    const pending = new Map<HTMLElement, HTMLElement[]>();
    const timeouts: number[] = [];

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const section = entry.target as HTMLElement;
          const items = pending.get(section);
          if (!items) continue;
          pending.delete(section);
          observer.unobserve(section);
          let maxDelay = 0;
          for (const item of items) {
            maxDelay = Math.max(
              maxDelay,
              parseInt(item.style.getPropertyValue("--sawt-delay"), 10) || 0
            );
            item.classList.add("sawt-in");
          }
          // Once revealed, strip every mark so the element is byte-identical
          // to its pre-animation state (hover transitions, legacy JS, etc.).
          timeouts.push(
            window.setTimeout(() => items.forEach(unmark), DURATION + maxDelay + 100)
          );
        }
      },
      { rootMargin: "0px 0px -10% 0px" }
    );

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("section, footer")
    ).filter(
      (el) =>
        !el.closest(".modal") &&
        !el.parentElement?.closest("section") &&
        !el.hasAttribute("data-sawt-seen")
    );

    const viewportBottom = window.innerHeight * 0.85;
    for (const section of sections) {
      // Persistent flag: each section animates at most once, even across
      // client-side navigations that keep it mounted (e.g. the footer).
      section.setAttribute("data-sawt-seen", "");
      if (section.getBoundingClientRect().top < viewportBottom) continue;
      const items = collectItems(section);
      if (!items.length) continue;
      items.forEach((item, i) => {
        item.setAttribute("data-sawt-reveal", "");
        item.style.setProperty("--sawt-delay", `${Math.min(i * STAGGER, MAX_DELAY)}ms`);
      });
      pending.set(section, items);
      observer.observe(section);
    }

    const stopParallax = initParallax();
    const stopCounters = initCounters();

    return () => {
      observer.disconnect();
      timeouts.forEach(clearTimeout);
      stopParallax();
      stopCounters();
      // Never leave anything hidden behind.
      for (const items of pending.values()) items.forEach(unmark);
    };
  }, [pathname]);

  return null;
}
