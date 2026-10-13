/* Pure geometry for <AvatarCropper />: the photo sits behind a square frame
   (the round mask is drawn over it) and can be zoomed, moved and turned in
   quarter steps. Zoom 1 is the scale at which it just covers the frame; below
   that it can be shrunk inside it, and it moves freely in every direction —
   but never out of sight (see clampCrop). Uncovered area is filled with a
   blurred copy of the same photo, stretched to cover the frame. The same
   numbers draw the preview (CSS) and the export (canvas). */

export const MIN_ZOOM = 0.5;
export const MAX_ZOOM = 4;
/** Side of the exported square, in pixels. */
export const OUTPUT_SIZE = 512;

export type Crop = {
  zoom: number;
  /** Offset of the photo's centre from the frame's centre, in frame pixels. */
  x: number;
  y: number;
  /** Quarter turns clockwise, 0–3. */
  turns: number;
};

export const INITIAL_CROP: Crop = { zoom: 1, x: 0, y: 0, turns: 0 };

export type Size = { width: number; height: number };

export function clampZoom(zoom: number): number {
  return Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, zoom));
}

/** Frame pixels per photo pixel: zoom 1 is the smallest scale that covers. */
export function scaleOf(image: Size, frame: number, crop: Crop): number {
  const sideways = crop.turns % 2 === 1;
  const w = sideways ? image.height : image.width;
  const h = sideways ? image.width : image.height;
  return Math.max(frame / w, frame / h) * crop.zoom;
}

/** Keeps the photo within reach, in any direction: a photo larger than the
    frame can move until its edge reaches the frame's centre; a smaller one
    until its centre reaches the frame's edge. */
export function clampCrop(image: Size, frame: number, crop: Crop): Crop {
  const zoom = clampZoom(crop.zoom);
  const next = { ...crop, zoom };
  const scale = scaleOf(image, frame, next);
  const sideways = crop.turns % 2 === 1;
  const w = (sideways ? image.height : image.width) * scale;
  const h = (sideways ? image.width : image.height) * scale;
  const maxX = Math.abs(w - frame) / 2 + Math.min(w, frame) / 2;
  const maxY = Math.abs(h - frame) / 2 + Math.min(h, frame) / 2;
  return {
    ...next,
    x: Math.min(maxX, Math.max(-maxX, crop.x)),
    y: Math.min(maxY, Math.max(-maxY, crop.y)),
  };
}

/** Blur radius of the backdrop, in frame pixels (scaled for the export). */
export const BACKDROP_BLUR = 18;

/** The preview's transform; the <img> is centred in the frame at its photo size. */
export function previewStyle(image: Size, frame: number, crop: Crop) {
  const scale = scaleOf(image, frame, crop);
  return {
    width: image.width * scale,
    height: image.height * scale,
    transform: `translate(-50%, -50%) translate(${crop.x}px, ${crop.y}px) rotate(${crop.turns * 90}deg)`,
  };
}

/** The blurred backdrop: the photo at cover scale, centred, same turn. A
    canvas without `filter` support (older Safari) gets the same look by
    drawing it tiny and stretching it back up. */
function drawBackdrop(ctx: CanvasRenderingContext2D, img: HTMLImageElement, turns: number, blur: number) {
  const image = { width: img.naturalWidth, height: img.naturalHeight };
  const draw = (target: CanvasRenderingContext2D, size: number) => {
    const scale = scaleOf(image, size, { ...INITIAL_CROP, turns }) * 1.1; // hides soft edges
    target.save();
    target.translate(size / 2, size / 2);
    target.rotate((turns * Math.PI) / 2);
    target.drawImage(img, (-image.width * scale) / 2, (-image.height * scale) / 2,
      image.width * scale, image.height * scale);
    target.restore();
  };

  ctx.filter = `blur(${blur}px)`;
  if (ctx.filter === `blur(${blur}px)`) {
    draw(ctx, OUTPUT_SIZE);
    ctx.filter = "none";
    return;
  }
  const tiny = document.createElement("canvas");
  tiny.width = tiny.height = 24;
  const tctx = tiny.getContext("2d");
  if (!tctx) return;
  draw(tctx, 24);
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(tiny, 0, 0, OUTPUT_SIZE, OUTPUT_SIZE);
}

/** The preview's blurred fill behind the photo — what drawBackdrop paints. */
export function backdropStyle(image: Size, frame: number, turns: number) {
  const base = previewStyle(image, frame, { ...INITIAL_CROP, turns });
  return {
    ...base,
    transform: `${base.transform} scale(1.1)`,
    filter: `blur(${BACKDROP_BLUR}px)`,
  };
}

/** Draws what the frame shows onto an OUTPUT_SIZE square and encodes it,
    keeping PNG for a PNG and JPEG otherwise. */
export function exportCrop(
  img: HTMLImageElement,
  frame: number,
  crop: Crop,
  type: string,
  name: string,
): Promise<File> {
  const image = { width: img.naturalWidth, height: img.naturalHeight };
  const k = OUTPUT_SIZE / frame;
  const scale = scaleOf(image, frame, crop) * k;
  const canvas = document.createElement("canvas");
  canvas.width = OUTPUT_SIZE;
  canvas.height = OUTPUT_SIZE;
  const ctx = canvas.getContext("2d");
  if (!ctx) return Promise.reject(new Error("canvas unavailable"));

  const png = type === "image/png";
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, OUTPUT_SIZE, OUTPUT_SIZE);
  drawBackdrop(ctx, img, crop.turns, BACKDROP_BLUR * k);
  ctx.imageSmoothingQuality = "high";
  ctx.translate(OUTPUT_SIZE / 2 + crop.x * k, OUTPUT_SIZE / 2 + crop.y * k);
  ctx.rotate((crop.turns * Math.PI) / 2);
  const w = image.width * scale;
  const h = image.height * scale;
  ctx.drawImage(img, -w / 2, -h / 2, w, h);

  const outType = png ? "image/png" : "image/jpeg";
  const base = name.replace(/\.[^.]+$/, "") || "avatar";
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) =>
        blob
          ? resolve(new File([blob], `${base}.${png ? "png" : "jpg"}`, { type: outType }))
          : reject(new Error("encode failed")),
      outType,
      0.92,
    );
  });
}
