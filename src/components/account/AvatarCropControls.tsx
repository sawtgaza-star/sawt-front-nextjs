"use client";
/* <AvatarCropper />'s controls: the zoom row (−, slider, +) and the tools row
   (turn left/right, "إعادة الضبط", "تغيير الصورة"). Stateless — the dialog
   owns the crop and clamps every value it is handed. */

import { useLang } from "@/lib/use-lang";
import { MAX_ZOOM, MIN_ZOOM } from "./avatar-crop";
import { ICON_MINUS, ICON_PLUS, ICON_ROTATE_LEFT, ICON_ROTATE_RIGHT } from "./avatar-crop-icons";

export const ZOOM_STEP = 0.2;

export default function AvatarCropControls({
  zoom,
  onZoom,
  onTurn,
  onReset,
  onPickAnother,
}: {
  zoom: number;
  onZoom: (zoom: number) => void;
  onTurn: (by: number) => void;
  onReset: () => void;
  onPickAnother: () => void;
}) {
  const { tr } = useLang();

  return (
    <>
      {/* ltr: "−" by the slider's low end and "+" by its high end, in Arabic too */}
      <div className="acc-crop-zoom" dir="ltr">
        <button type="button" className="acc-crop-icon" title={tr("acc_crop_zoom_out")}
          aria-label={tr("acc_crop_zoom_out")}
          onClick={() => onZoom(zoom - ZOOM_STEP)}>
          {ICON_MINUS}
        </button>
        <input
          type="range"
          min={MIN_ZOOM}
          max={MAX_ZOOM}
          step={0.01}
          value={zoom}
          aria-label={tr("acc_crop_zoom")}
          onChange={(e) => onZoom(Number(e.target.value))}
        />
        <button type="button" className="acc-crop-icon" title={tr("acc_crop_zoom_in")}
          aria-label={tr("acc_crop_zoom_in")}
          onClick={() => onZoom(zoom + ZOOM_STEP)}>
          {ICON_PLUS}
        </button>
      </div>

      <div className="acc-crop-tools">
        <button type="button" className="acc-crop-icon" title={tr("acc_crop_rotate_left")}
          aria-label={tr("acc_crop_rotate_left")} onClick={() => onTurn(-1)}>
          {ICON_ROTATE_LEFT}
        </button>
        <button type="button" className="acc-crop-icon" title={tr("acc_crop_rotate_right")}
          aria-label={tr("acc_crop_rotate_right")} onClick={() => onTurn(1)}>
          {ICON_ROTATE_RIGHT}
        </button>
        <button type="button" className="acc-link-btn" onClick={onReset}>
          {tr("acc_crop_reset")}
        </button>
        <button type="button" className="acc-link-btn" onClick={onPickAnother}>
          {tr("acc_photo_change")}
        </button>
      </div>
    </>
  );
}
