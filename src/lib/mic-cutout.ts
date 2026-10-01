/* Cuts a team member's `mic_image` out of whatever background it was uploaded
   with, and crops it to the mic itself.

   The uploads are not consistent: one is a real transparent PNG, one a JPEG
   with a flat light-gray backdrop, one a JPEG with a transparency checkerboard
   painted INTO it. Each also places the mic at its own size inside its canvas.
   So every image goes through the same two steps in the browser:

   1. Background removal. The backdrop's colours are learned from the image's
      own border: the neutral (gray/white) tones that dominate it — one for a
      flat backdrop, two for a checkerboard, whatever their shade. A pixel
      counts as backdrop when it is transparent, or neutral and no darker than
      the darkest of those tones (minus a margin). Every such pixel connected
      to the border is cleared (flood fill), so the mic — coloured — stops the
      fill and the photo inside its window is never reached. A second pass
      clears large enclosed blobs (the gaps between the stand's arm and the
      body), but only when most of their pixels sit on the learned tones, so a
      gray coat inside the photo is not mistaken for backdrop.
   2. Crop to the bounding box of what is left, so the caller can lay every
      mic out at the same size no matter how the upload was framed.

   The result is a blob: URL of a transparent PNG. The API serves /media with
   `Access-Control-Allow-Origin: *`, which is what lets the canvas be read.
   Results are cached per URL — the home carousel shows each mic in Owl's
   clones too. */

const MAX_HEIGHT = 800; // enough for a ~500px card on a 1.5x screen
const NEUTRAL_SPREAD = 22; // max channel spread for a "gray/white" pixel
const PEAK_SHARE = 0.15; // a border tone needs this share of the border to count
const DARK_MARGIN = 16; // how much darker than the darkest tone still counts
const PALETTE_TOLERANCE = 16; // "on a learned tone" = within this lightness
const ENCLOSED_MIN_SHARE = 0.002; // enclosed blobs at least this share of the image…
const ENCLOSED_ON_PALETTE = 0.6; // …and mostly on the learned tones are cleared

const cache = new Map<string, Promise<string>>();

export function cutoutMic(url: string): Promise<string> {
  let job = cache.get(url);
  if (!job) {
    job = run(url);
    cache.set(url, job);
  }
  return job;
}

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`mic image failed: ${url}`));
    img.src = url;
  });
}

async function run(url: string): Promise<string> {
  const img = await loadImage(url);
  const scale = Math.min(1, MAX_HEIGHT / img.naturalHeight);
  const w = Math.max(1, Math.round(img.naturalWidth * scale));
  const h = Math.max(1, Math.round(img.naturalHeight * scale));

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("2d canvas unavailable");
  ctx.drawImage(img, 0, 0, w, h);
  const data = ctx.getImageData(0, 0, w, h);

  const box = cutoutPixels(data.data, w, h);
  if (!box) throw new Error("nothing left after cutout");
  ctx.putImageData(data, 0, 0);

  const out = document.createElement("canvas");
  out.width = box.width;
  out.height = box.height;
  out
    .getContext("2d")!
    .drawImage(canvas, box.x, box.y, box.width, box.height, 0, 0, box.width, box.height);

  const blob = await new Promise<Blob | null>((resolve) => out.toBlob(resolve, "image/png"));
  if (!blob) throw new Error("toBlob failed");
  return URL.createObjectURL(blob);
}

/** The pixel work, DOM-free: clears the backdrop in `px` (RGBA, in place) and
    returns the mic's bounding box, or null when nothing is left. */
export function cutoutPixels(
  px: Uint8ClampedArray,
  w: number,
  h: number,
): { x: number; y: number; width: number; height: number } | null {
  const total = w * h;

  const transparent = (i: number) => px[i * 4 + 3] < 40;
  const neutral = (i: number) => {
    const o = i * 4;
    const r = px[o], g = px[o + 1], b = px[o + 2];
    return Math.max(r, g, b) - Math.min(r, g, b) <= NEUTRAL_SPREAD;
  };
  const lightness = (i: number) => {
    const o = i * 4;
    return ((px[o] + px[o + 1] + px[o + 2]) / 3) | 0;
  };

  const border: number[] = [];
  for (let x = 0; x < w; x++) border.push(x, total - w + x);
  for (let y = 0; y < h; y++) border.push(y * w, y * w + w - 1);

  // Learn the backdrop tones: 8-step lightness bins over the border's
  // neutral pixels; every bin holding a fair share of them is a tone.
  const bins = new Array<number>(32).fill(0);
  let counted = 0;
  for (const i of border) {
    if (transparent(i) || !neutral(i)) continue;
    bins[lightness(i) >> 3]++;
    counted++;
  }
  const peaks: number[] = [];
  bins.forEach((n, b) => {
    if (counted && n >= counted * PEAK_SHARE) peaks.push(b * 8 + 4);
  });
  if (!peaks.length) peaks.push(255); // no neutral border: only clear white
  const darkest = Math.min(...peaks) - DARK_MARGIN;

  const isBackdrop = (i: number) =>
    transparent(i) || (neutral(i) && lightness(i) >= darkest);
  const onPalette = (i: number) =>
    transparent(i) || peaks.some((p) => Math.abs(lightness(i) - p) <= PALETTE_TOLERANCE);

  // 0 = untouched, 1 = cleared, 2 = visited enclosed blob that is kept
  const mark = new Uint8Array(total);

  const flood = (
    seeds: number[],
    accept: (i: number) => boolean,
    value: number,
    collect?: number[],
  ) => {
    const stack = seeds;
    while (stack.length) {
      const i = stack.pop()!;
      if (mark[i] || !accept(i)) continue;
      mark[i] = value;
      collect?.push(i);
      const x = i % w;
      if (x > 0) stack.push(i - 1);
      if (x < w - 1) stack.push(i + 1);
      if (i >= w) stack.push(i - w);
      if (i < total - w) stack.push(i + w);
    }
  };

  // Pass 1: everything backdrop-coloured that touches the border.
  flood(border.slice(), isBackdrop, 1);

  // Pass 2: large enclosed backdrop blobs.
  const minBlob = Math.round(total * ENCLOSED_MIN_SHARE);
  for (let i = 0; i < total; i++) {
    if (mark[i] || !isBackdrop(i)) continue;
    const blob: number[] = [];
    flood([i], isBackdrop, 2, blob);
    if (blob.length < minBlob) continue;
    let hits = 0;
    for (const j of blob) if (onPalette(j)) hits++;
    if (hits >= blob.length * ENCLOSED_ON_PALETTE) for (const j of blob) mark[j] = 1;
  }

  // Pass 3: keep only the mic. Whatever survived is grouped into connected
  // shapes; the largest is the mic (with its photo inside), the rest are
  // specks — JPEG noise and checkerboard crumbs — that would otherwise
  // stretch the crop box and shrink the mic on the card.
  const label = new Int32Array(total); // 0 = none, else shape id
  const solid = (i: number) => mark[i] !== 1 && !transparent(i);
  let bestId = 0, bestSize = 0, id = 0;
  const stack: number[] = [];
  for (let i = 0; i < total; i++) {
    if (label[i] || !solid(i)) continue;
    id++;
    let size = 0;
    label[i] = id;
    stack.push(i);
    while (stack.length) {
      const j = stack.pop()!;
      size++;
      const x = j % w;
      if (x > 0 && !label[j - 1] && solid(j - 1)) { label[j - 1] = id; stack.push(j - 1); }
      if (x < w - 1 && !label[j + 1] && solid(j + 1)) { label[j + 1] = id; stack.push(j + 1); }
      if (j >= w && !label[j - w] && solid(j - w)) { label[j - w] = id; stack.push(j - w); }
      if (j < total - w && !label[j + w] && solid(j + w)) { label[j + w] = id; stack.push(j + w); }
    }
    if (size > bestSize) {
      bestSize = size;
      bestId = id;
    }
  }
  if (!bestSize) return null;

  // Clear everything but the mic, and measure it.
  let minX = w, minY = h, maxX = -1, maxY = -1;
  for (let i = 0; i < total; i++) {
    if (label[i] !== bestId) {
      px[i * 4 + 3] = 0;
      continue;
    }
    const x = i % w, y = (i / w) | 0;
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
  return { x: minX, y: minY, width: maxX - minX + 1, height: maxY - minY + 1 };
}
