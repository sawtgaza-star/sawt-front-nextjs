"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { initCounters, initParallax } from "@/lib/scroll-effects";
import {
  DURATION,
  MAX_DELAY,
  STAGGER,
  collectItems,
  hide,
  splitAroundHeading,
  unmark,
} from "./page-animations-utils";

/**
 * Site-wide scroll-reveal + page-entrance driver (styles in styles/animations.css).
 * Marks below-the-fold sections with data-sawt-reveal, staggers their top-level
 * blocks and reveals each section once when it enters the viewport. The motion
 * is the hero copy's fade-up (styles/home-hero.css): a block holding the
 * section's heading is split so the title, its subtitle and what follows rise
 * one after another, like the hero's title → subtitle → buttons. Above-fold
 * content is covered by the body entrance animation started by the inline
 * script in the root layout. All marks are removed after the reveal finishes,
 * so no permanent style state is left on legacy markup.
 */

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
    const heroItems: HTMLElement[] = [];

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

    /* `initial` is the scan of the markup present when the page mounts: what is
       already on screen is covered by the body entrance, so it is left alone.
       Later scans pick up sections that arrive after a fetch (most pages paint
       a skeleton first) — those fade up even when they land on screen. */
    const scan = (initial: boolean) => {
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>("section, footer")
      ).filter(
        (el) =>
          !el.closest(".modal") &&
          // the home hero has its own entrance (home-hero.css) and stays put
          !el.classList.contains("home-hero") &&
          !el.parentElement?.closest("section") &&
          !el.hasAttribute("data-sawt-seen") &&
          // Skeleton placeholders: wait for the real content instead.
          !el.closest('[aria-busy="true"]') &&
          !el.querySelector('[aria-busy="true"][aria-hidden="true"]')
      );

      const viewportBottom = window.innerHeight * 0.85;
      for (const section of sections) {
        // Persistent flag: each section animates at most once, even across
        // client-side navigations that keep it mounted (e.g. the footer).
        section.setAttribute("data-sawt-seen", "");
        if (initial && section.getBoundingClientRect().top < viewportBottom) continue;
        const items = collectItems(section);
        if (!items.length) continue;
        hide(items);
        pending.set(section, items);
        observer.observe(section);
      }
    };

    /* Inner-page heroes (<header>s other than the home hero, which has its
       own entrance in home-hero.css) get the home hero's entrance on load: the
       title and what follows it rise in turn. Anything before the title — the
       breadcrumb, painted before the content loads — stays put. Skeleton
       titles are skipped; the real one arrives later through the mutation
       observer below. */
    const revealHeroes = () => {
      const titles = Array.from(document.querySelectorAll<HTMLElement>("header h1")).filter(
        (h1) =>
          !h1.hasAttribute("data-sawt-seen") &&
          !h1.closest(".home-hero, .modal, .navbar, .nav-face, [aria-busy='true']") &&
          h1.getAttribute("aria-hidden") !== "true" &&
          !h1.querySelector(".sk-text")
      );
      for (const h1 of titles) {
        h1.setAttribute("data-sawt-seen", "");
        const header = h1.closest("header")!;
        let block = h1;
        while (
          block.parentElement &&
          block.parentElement !== header &&
          !block.parentElement.querySelector(".navbar, .nav-face")
        ) {
          block = block.parentElement;
        }
        const all = splitAroundHeading(block);
        const start = all.findIndex((item) => item === h1 || item.contains(h1));
        const items = all.slice(Math.max(start, 0));
        heroItems.push(...items);
        hide(items);
        // Two frames: let the hidden state paint before the transition starts.
        requestAnimationFrame(() =>
          requestAnimationFrame(() => items.forEach((item) => item.classList.add("sawt-in")))
        );
        timeouts.push(
          window.setTimeout(
            () => items.forEach(unmark),
            DURATION + Math.min(items.length * STAGGER, MAX_DELAY) + 100
          )
        );
      }
    };

    revealHeroes();
    scan(true);
    // Runs before the next paint, so late content never flashes in unstyled.
    const mutations = new MutationObserver(() => {
      revealHeroes();
      scan(false);
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    const stopParallax = initParallax();
    const stopCounters = initCounters();

    return () => {
      mutations.disconnect();
      observer.disconnect();
      timeouts.forEach(clearTimeout);
      stopParallax();
      stopCounters();
      // Never leave anything hidden behind.
      for (const items of pending.values()) items.forEach(unmark);
      heroItems.forEach(unmark);
    };
  }, [pathname]);

  return null;
}
