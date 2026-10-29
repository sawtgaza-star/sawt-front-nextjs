"use client";
import { useEffect, useState } from "react";
import MediaProjectHead from "./MediaProjectHead";
import { galleryLayout } from "./media-page-view";

/* "صور من المشروع" — the frames of the project. The payload can list files
   the server no longer has (404s), so each one is tried in the browser first
   and only the frames that actually load are laid out; when none does, the
   heading and the grid are left out altogether, as if the API sent nothing. */
type Status = "ok" | "bad";

export default function MediaProjectGallery({
  title,
  shots,
}: {
  title: string;
  shots: string[];
}) {
  const [status, setStatus] = useState<Record<string, Status>>({});
  const key = shots.join("\n");

  useEffect(() => {
    let alive = true;
    setStatus({});
    const probes = shots.map((src) => {
      const probe = new Image();
      const settle = (result: Status) => {
        if (alive) setStatus((prev) => ({ ...prev, [src]: result }));
      };
      probe.onload = () => settle("ok");
      probe.onerror = () => settle("bad");
      probe.src = src;
      return probe;
    });
    return () => {
      alive = false;
      probes.forEach((probe) => {
        probe.onload = probe.onerror = null;
      });
    };
    // `key` stands for `shots` — a new array each render, same files
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const loaded = shots.filter((src) => status[src] === "ok");
  if (!loaded.length) return null;

  /* the artboard's block of five, repeated to cover however many frames
     loaded — see galleryLayout */
  const frames = galleryLayout(loaded.length);

  return (
    <>
      <MediaProjectHead title={title} />
      <div className="sm-pj-gallery">
        {loaded.map((src, i) => (
          <figure
            className={
              "sm-pj-frame " +
              (frames[i] === "full" ? "sm-pj-frame-wide" : "sm-pj-frame-" + frames[i])
            }
            key={src}
          >
            <img src={src} alt="" />
          </figure>
        ))}
      </div>
    </>
  );
}
