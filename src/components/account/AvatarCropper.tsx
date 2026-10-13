"use client";
/* "تعديل الصورة" — opens on the photo picked under "تغيير الصورة", before it
   becomes the form's photo. The photo is shown behind a round mask and can be
   dragged (mouse / one finger / arrow keys), zoomed (slider, −/+ buttons,
   wheel, pinch, -/+ keys) and turned a quarter at a time. "اعتماد الصورة"
   hands back a square OUTPUT_SIZE file of exactly what the circle shows;
   "إلغاء", the backdrop or Escape keep the previous photo. "تغيير الصورة"
   reopens the form's file picker (`onPickAnother`); the form remounts this
   dialog with the new file. Geometry lives in ./avatar-crop. */

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useLang } from "@/lib/use-lang";
import {
  clampCrop,
  exportCrop,
  INITIAL_CROP,
  previewStyle,
  backdropStyle,
  type Crop,
  type Size,
} from "./avatar-crop";
import AvatarCropControls, { ZOOM_STEP } from "./AvatarCropControls";

const KEY_STEP = 10;


export default function AvatarCropper({
  file,
  onCancel,
  onDone,
  onPickAnother,
}: {
  file: File;
  onCancel: () => void;
  onDone: (cropped: File) => void;
  onPickAnother: () => void;
}) {
  const { tr } = useLang();
  const [src, setSrc] = useState<string | null>(null);
  const [image, setImage] = useState<Size | null>(null);
  const [frame, setFrame] = useState(0);
  const [crop, setCrop] = useState<Crop>(INITIAL_CROP);
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const pointers = useRef(new Map<number, { x: number; y: number }>());

  // every change goes through the clamp, so the photo always covers the circle
  const update = (fn: (c: Crop) => Crop) =>
    setCrop((c) => (image && frame ? clampCrop(image, frame, fn(c)) : fn(c)));

  // created and revoked in the same effect: StrictMode's mount → cleanup →
  // mount would otherwise revoke the URL the <img> still points at
  useEffect(() => {
    const url = URL.createObjectURL(file);
    setSrc(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  // the frame is responsive — measure it, and re-clamp when it changes
  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const measure = () => setFrame(el.clientWidth);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (image && frame) setCrop((c) => clampCrop(image, frame, c));
  }, [image, frame]);

  // page scroll stays put behind the dialog; Escape closes it
  useEffect(() => {
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onCancel();
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [onCancel]);

  // wheel zoom needs a non-passive listener to keep the page from scrolling
  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      update((c) => ({ ...c, zoom: c.zoom * (e.deltaY < 0 ? 1.08 : 1 / 1.08) }));
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  });

  function onPointerDown(e: React.PointerEvent) {
    e.currentTarget.setPointerCapture(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
  }

  function onPointerMove(e: React.PointerEvent) {
    const map = pointers.current;
    const prev = map.get(e.pointerId);
    if (!prev) return;
    const next = { x: e.clientX, y: e.clientY };
    if (map.size === 1) {
      update((c) => ({ ...c, x: c.x + next.x - prev.x, y: c.y + next.y - prev.y }));
    } else if (map.size === 2) {
      const other = [...map.entries()].find(([id]) => id !== e.pointerId)?.[1];
      if (other) {
        const before = Math.hypot(prev.x - other.x, prev.y - other.y);
        const after = Math.hypot(next.x - other.x, next.y - other.y);
        if (before > 0) update((c) => ({ ...c, zoom: (c.zoom * after) / before }));
      }
    }
    map.set(e.pointerId, next);
  }

  function onPointerUp(e: React.PointerEvent) {
    pointers.current.delete(e.pointerId);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    const moves: Record<string, [number, number]> = {
      ArrowLeft: [-KEY_STEP, 0],
      ArrowRight: [KEY_STEP, 0],
      ArrowUp: [0, -KEY_STEP],
      ArrowDown: [0, KEY_STEP],
    };
    if (moves[e.key]) {
      const [dx, dy] = moves[e.key];
      update((c) => ({ ...c, x: c.x + dx, y: c.y + dy }));
    } else if (e.key === "+" || e.key === "=") {
      update((c) => ({ ...c, zoom: c.zoom + ZOOM_STEP }));
    } else if (e.key === "-") {
      update((c) => ({ ...c, zoom: c.zoom - ZOOM_STEP }));
    } else return;
    e.preventDefault();
  }

  async function apply() {
    const img = imgRef.current;
    if (!img || !frame || busy) return;
    setBusy(true);
    setFailed(false);
    try {
      onDone(await exportCrop(img, frame, crop, file.type, file.name));
    } catch {
      setFailed(true);
      setBusy(false);
    }
  }

  const imgStyle: CSSProperties | undefined =
    image && frame ? previewStyle(image, frame, crop) : { visibility: "hidden" };
  const fillStyle: CSSProperties | undefined =
    image && frame ? backdropStyle(image, frame, crop.turns) : { visibility: "hidden" };

  return (
    <div className="acc-crop-backdrop" onClick={(e) => e.target === e.currentTarget && onCancel()}>
      <div className="acc-crop" role="dialog" aria-modal="true" aria-labelledby="acc-crop-title">
        <h3 id="acc-crop-title" className="acc-crop-title">{tr("acc_crop_title")}</h3>
        <p className="acc-hint">{tr("acc_crop_hint")}</p>

        <div
          ref={frameRef}
          className="acc-crop-frame"
          tabIndex={0}
          aria-label={tr("acc_crop_hint")}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onKeyDown={onKeyDown}
        >
          {src ? (
            <img src={src} alt="" aria-hidden="true" draggable={false}
              className="acc-crop-backdrop-img" style={fillStyle} />
          ) : null}
          {src ? <img
            ref={imgRef}
            src={src}
            alt=""
            draggable={false}
            style={imgStyle}
            onLoad={(e) =>
              setImage({ width: e.currentTarget.naturalWidth, height: e.currentTarget.naturalHeight })
            }
            onError={() => setFailed(true)}
          /> : null}
          <span className="acc-crop-mask" aria-hidden="true" />
        </div>

        <AvatarCropControls
          zoom={crop.zoom}
          onZoom={(zoom) => update((c) => ({ ...c, zoom }))}
          onTurn={(by) => update((c) => ({ ...c, turns: (c.turns + by + 4) % 4 }))}
          onReset={() => setCrop(INITIAL_CROP)}
          onPickAnother={onPickAnother}
        />

        {failed ? <p className="acc-crop-error">{tr("acc_crop_failed")}</p> : null}

        <div className="acc-actions">
          <button type="button" className="acc-btn-primary" onClick={apply}
            disabled={busy || !image} aria-busy={busy}>
            {tr("acc_crop_apply")}
          </button>
          <button type="button" className="acc-btn-text" onClick={onCancel}>
            {tr("acc_cancel")}
          </button>
        </div>
      </div>
    </div>
  );
}
