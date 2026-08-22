"use client";
import { useState } from "react";
import type { NewsArticleImage } from "./news-article-data";

/* Article gallery: one large frame with an "n / total" counter in its bottom
   (end) corner, and a centred thumbnail strip under it. The active thumbnail
   carries the mock's double ring (white then olive) — see .is-active in
   news.css. */
export default function NewsGallery({ images }: { images: NewsArticleImage[] }) {
  const [active, setActive] = useState(0);

  if (!images.length) return null;

  return (
    <div className="nws-gallery">
      <div className="nws-gallery-stage">
        <img src={images[active].src} alt={images[active].alt} />
        {/* the counter is authored LTR so it reads "1 / 4", not "4 / 1" */}
        <span className="nws-gallery-count" dir="ltr">
          {active + 1} / {images.length}
        </span>
      </div>

      <div className="nws-gallery-thumbs">
        {images.map((img, i) => (
          <button
            key={img.src + i}
            type="button"
            className={"nws-gallery-thumb" + (i === active ? " is-active" : "")}
            onClick={() => setActive(i)}
            aria-label={img.alt}
            aria-current={i === active}
          >
            <img src={img.src} alt={img.alt} />
          </button>
        ))}
      </div>
    </div>
  );
}
