"use client";
import { useEffect } from "react";
import { cutoutMic } from "@/lib/mic-cutout";

/* Swaps every team card's `<img data-mic-src>` for its cut-out mic (see
   lib/mic-cutout). Done on the DOM rather than through React state because
   Owl clones the cards when it boots: the clones are copies React does not
   know about, so the swap queries the document and reaches them too. The
   `src` is never set in JSX, so a React re-render cannot put the raw upload
   back. If the cutout fails (e.g. the canvas can't read the image), the
   original upload is shown as it came. */
export default function MicCutouts({ urls }: { urls: string[] }) {
  const key = urls.join("|");

  useEffect(() => {
    let cancelled = false;
    for (const url of new Set(urls)) {
      cutoutMic(url)
        .then((src) => ({ src, raw: false }))
        .catch(() => ({ src: url, raw: true }))
        .then(({ src, raw }) => {
          if (cancelled) return;
          document
            .querySelectorAll<HTMLImageElement>("img[data-mic-src]")
            .forEach((img) => {
              if (img.dataset.micSrc === url && img.src !== src) {
                img.src = src;
                // the raw upload is not cropped to the mic, so it must not be
                // stretched into the mic's rectangle (see .is-raw in style.css)
                img.classList.toggle("is-raw", raw);
                img.classList.add("is-ready");
              }
            });
        });
    }
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return null;
}
