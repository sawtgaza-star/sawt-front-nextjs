"use client";
import { useEffect } from "react";
import { cutoutMic } from "@/lib/mic-cutout";

/* Swaps every team card's `<img data-mic-src>` for its cut-out mic (see
   lib/mic-cutout). Cards already carry the build's cutout, so this only
   changes anything for a mic uploaded after the deploy. Done on the DOM
   rather than through React state because Owl clones the cards when it
   boots: the clones are copies React does not know about, so the swap
   queries the document and reaches them too. The raw upload is never in
   JSX, so a React re-render cannot put it back. If the cutout fails (e.g.
   the canvas can't read the image), the original upload is shown as it
   came. Waits until the section is near the screen: even the build's cutouts
   are downloaded here, and they used to compete with the hero. */
export default function MicCutouts({ urls }: { urls: string[] }) {
  const key = urls.join("|");

  useEffect(() => {
    let cancelled = false;
    const run = () => {
      for (const url of new Set(urls)) {
        cutoutMic(url)
          .then((src) => ({ src, raw: false }))
          .catch(() => ({ src: url, raw: true }))
          .then(({ src, raw }) => {
            if (cancelled) return;
            document
              .querySelectorAll<HTMLImageElement>("img[data-mic-src]")
              .forEach((img) => {
                if (img.dataset.micSrc === url && img.getAttribute("src") !== src) {
                  img.src = src;
                  // the raw upload is not cropped to the mic, so it must not be
                  // stretched into the mic's rectangle (see .is-raw in style.css)
                  img.classList.toggle("is-raw", raw);
                  img.classList.add("is-ready");
                }
              });
          });
      }
    };

    const section = document.querySelector(".team-section");
    if (!section || typeof IntersectionObserver === "undefined") {
      run();
      return () => {
        cancelled = true;
      };
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          run();
        }
      },
      { rootMargin: "800px 0px" },
    );
    observer.observe(section);
    return () => {
      cancelled = true;
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return null;
}
