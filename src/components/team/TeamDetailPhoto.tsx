"use client";
import { useEffect, useState } from "react";
import { cutoutMic } from "@/lib/mic-cutout";

/* The profile's mic portrait over its backdrop.

   The box itself is fixed (aspect-ratio in team.css). Its waveform backdrop
   only shows when the API sends no `mic_background_url` — otherwise that image
   backs the whole profile card and this box is transparent. The
   API's `mic_photo_url` arrives with whatever background it was uploaded on
   (transparent, flat gray, even a painted checkerboard), so it goes through
   lib/mic-cutout first: backdrop removed, cropped to the mic. Until that is
   ready the image stays transparent (`.is-loading`), then fades in centered.
   If the cutout fails, the upload is shown as it came. */
export default function TeamDetailPhoto({
  src,
  alt,
}: {
  src?: string | null;
  alt: string;
}) {
  const [cut, setCut] = useState<string | null>(null);

  useEffect(() => {
    if (!src) return;
    let cancelled = false;
    setCut(null);
    cutoutMic(src)
      .catch(() => src)
      .then((url) => {
        if (!cancelled) setCut(url);
      });
    return () => {
      cancelled = true;
    };
  }, [src]);

  return (
    <div className={"team-detail-photo" + (src && !cut ? " is-loading" : "")}>
      {/* No mic portrait yet: the waveform backdrop stands on its own. */}
      {cut ? <img src={cut} alt={alt} /> : null}
    </div>
  );
}
