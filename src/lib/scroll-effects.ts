/* Client-side scroll effects driven by PageAnimations: a subtle parallax on
   hero captions / large in-flow images, and one-shot count-up animations for
   stat numbers that the legacy runCounters() does not cover (.counter is
   handled by legacy-main.ts). Both initializers return a cleanup function.

   Movement is applied through the standalone `translate` CSS property so it
   composes with any legacy `transform` on the same element instead of
   overriding it. */

type ParallaxMode = "top" | "center";

type ParallaxTarget = {
  selector: string;
  mode: ParallaxMode;
  factor: number;
  max: number;
};

const PARALLAX_TARGETS: ParallaxTarget[] = [
  // Hero caption drifts down slightly while scrolling past the hero.
  { selector: ".carousel-caption-custom", mode: "top", factor: 0.12, max: 60 },
  // Large section image lags gently around the viewport center.
  { selector: ".image-swat", mode: "center", factor: 0.06, max: 20 },
];

type ParallaxItem = ParallaxTarget & { el: HTMLElement; applied: number };

export function initParallax(): () => void {
  const items: ParallaxItem[] = [];
  for (const target of PARALLAX_TARGETS) {
    document.querySelectorAll<HTMLElement>(target.selector).forEach((el) => {
      items.push({ ...target, el, applied: 0 });
    });
  }
  if (!items.length) return () => {};

  let raf = 0;

  const update = () => {
    raf = 0;
    const vh = window.innerHeight;
    for (const item of items) {
      const rect = item.el.getBoundingClientRect();
      // rect already includes the currently applied translate — remove it to
      // measure the element's natural position (avoids feedback drift).
      const top = rect.top - item.applied;
      const bottom = rect.bottom - item.applied;
      if (top > vh * 2 || bottom < -vh) continue;
      let y: number;
      if (item.mode === "top") {
        y = Math.min(window.scrollY * item.factor, item.max);
      } else {
        const mid = top + rect.height / 2;
        y = (mid - vh / 2) * item.factor;
      }
      y = Math.max(-item.max, Math.min(item.max, y));
      if (y === item.applied) continue;
      item.applied = y;
      item.el.style.translate = `0 ${y.toFixed(1)}px`;
    }
  };

  const schedule = () => {
    if (!raf) raf = requestAnimationFrame(update);
  };

  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  schedule();

  return () => {
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", schedule);
    if (raf) cancelAnimationFrame(raf);
    for (const item of items) item.el.style.removeProperty("translate");
  };
}

/* ------------------------------ counters ------------------------------ */

const COUNTER_SELECTOR = ".cr-stat-num, .cr-profile-stat-num, .sp-stat-value";
const COUNT_DURATION = 1600;

function findDigitTextNode(root: Node): Text | null {
  if (root.nodeType === Node.TEXT_NODE) {
    return /\d/.test(root.nodeValue ?? "") ? (root as Text) : null;
  }
  for (const child of Array.from(root.childNodes)) {
    const found = findDigitTextNode(child);
    if (found) return found;
  }
  return null;
}

function animateCount(el: HTMLElement, rafs: Set<number>) {
  const node = findDigitTextNode(el);
  if (!node) return;
  const original = node.nodeValue ?? "";
  const match = original.match(/[\d,]*\d/);
  if (!match || match.index === undefined) return;
  const numStr = match[0];
  const start = match.index;
  const target = parseInt(numStr.replace(/,/g, ""), 10);
  if (!Number.isFinite(target) || target <= 0) return;
  const useCommas = numStr.includes(",");
  const t0 = performance.now();

  const frame = (now: number) => {
    const progress = Math.min((now - t0) / COUNT_DURATION, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(target * eased);
    const text = useCommas ? value.toLocaleString("en-US") : String(value);
    node.nodeValue =
      original.slice(0, start) + text + original.slice(start + numStr.length);
    if (progress < 1) rafs.add(requestAnimationFrame(frame));
  };
  rafs.add(requestAnimationFrame(frame));
}

export function initCounters(): () => void {
  const els = Array.from(
    document.querySelectorAll<HTMLElement>(COUNTER_SELECTOR)
  ).filter((el) => !el.dataset.sawtCounted);
  if (!els.length || typeof IntersectionObserver === "undefined") return () => {};

  const rafs = new Set<number>();
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        io.unobserve(entry.target);
        animateCount(entry.target as HTMLElement, rafs);
      }
    },
    { threshold: 0.4 }
  );

  for (const el of els) {
    el.dataset.sawtCounted = "1";
    io.observe(el);
  }

  return () => {
    io.disconnect();
    rafs.forEach(cancelAnimationFrame);
  };
}
