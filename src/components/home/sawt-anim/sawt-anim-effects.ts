/* The scripted half of <SawtAboutAnim /> (from sawt-hero-replica.html): gives
   each sound-wave bar its own rhythm, scatters the light motes over the main
   circle, and only plays while the figure is on screen (the licence badge
   enters, then stays still). Returns a cleanup for the effect. */

const NS = "http://www.w3.org/2000/svg";

function randomiseBars(root: HTMLElement) {
  root.querySelectorAll<SVGElement>(".sh-bar").forEach((bar) => {
    bar.style.setProperty("--lo", (0.25 + Math.random() * 0.35).toFixed(2));
    bar.style.setProperty("--hi", (0.95 + Math.random() * 0.3).toFixed(2));
    bar.style.animationDuration = (0.6 + Math.random() * 1.1).toFixed(2) + "s";
    bar.style.animationDelay = (-Math.random() * 2).toFixed(2) + "s";
  });
}

function buildMotes(motes: Element) {
  motes.replaceChildren();
  for (let i = 0; i < 22; i++) {
    const a = Math.random() * Math.PI * 2;
    const d = Math.sqrt(Math.random()) * 250;
    const c = document.createElementNS(NS, "circle");
    c.setAttribute("cx", (571 + Math.cos(a) * d).toFixed(1));
    c.setAttribute("cy", (351 + Math.sin(a) * d).toFixed(1));
    c.setAttribute("r", (0.6 + Math.random() * 1.1).toFixed(2));
    c.setAttribute("class", "sh-mote");
    c.style.setProperty("--o", (0.25 + Math.random() * 0.5).toFixed(2));
    c.style.animationDuration = (5 + Math.random() * 6).toFixed(1) + "s";
    c.style.animationDelay = (-Math.random() * 10).toFixed(1) + "s";
    motes.appendChild(c);
  }
}

export function initSawtAnim(root: HTMLElement): () => void {
  const svg = root.querySelector("svg");
  const motes = root.querySelector(".sh-motes");
  if (!svg || !motes) return () => {};

  randomiseBars(root);
  buildMotes(motes);

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  svg.pauseAnimations?.();
  const play = () => {
    root.classList.add("is-live");
    svg.unpauseAnimations?.();
  };
  if (reduce) {
    root.classList.add("is-live");
    return () => {};
  }
  if (typeof IntersectionObserver === "undefined") {
    play();
    return () => {};
  }

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) play();
      else {
        root.classList.remove("is-live");
        svg.pauseAnimations?.();
      }
    },
    { threshold: 0.15 },
  );
  observer.observe(root);
  return () => observer.disconnect();
}
