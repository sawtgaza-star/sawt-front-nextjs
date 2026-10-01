"use client";
import { useEffect, useRef, useState, type RefObject } from "react";

/** True once the element has come within `margin` of the viewport — and stays
    true. For media the browser would otherwise fetch on page load whatever
    its position: a <video poster> has no `loading="lazy"`, and the reels'
    Instagram posters (~1MB together, at the very bottom of the home page)
    were competing with the hero image for a phone's bandwidth.
    Browsers without IntersectionObserver get `true` straight away. */
export function useNearViewport<T extends Element>(
  margin = "800px",
): [RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (near || !element) return;
    if (typeof IntersectionObserver === "undefined") {
      setNear(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: `${margin} 0px` },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [near, margin]);

  return [ref, near];
}
