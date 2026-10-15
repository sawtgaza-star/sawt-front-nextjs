/* Cuts a team portrait's flat studio backdrop away, for the card's hover
   "head pops out of the frame" layer (team/TeamMemberPop).

   The uploads are opaque photos on a plain gray backdrop (a different shade
   per photo). Only the part of the cutout that rises ABOVE the card is ever
   shown — inside the card the original photo stays — so the cut only has to
   be clean around the head and hair, where the backdrop is flat and wide:

   1. the backdrop tone is the median lightness of the top row;
   2. every neutral (gray) pixel within TONE_TOLERANCE of it that is connected
      to the top edge or the sides is cleared (flood fill);
   3. the mask is softened by one pixel so the hair edge is not jagged.

   The image keeps its full frame (no crop), so it lines up 1:1 with the
   original under the same object-fit. Returns a blob: URL of a PNG; results
   are cached per URL. The API serves /media with
   `Access-Control-Allow-Origin: *`, which is what lets the canvas be read. */

const MAX_HEIGHT = 900;
const NEUTRAL_SPREAD = 24; // max channel spread for a "gray" pixel
const TONE_TOLERANCE = 22; // how far from the backdrop tone still counts
const EDGE_BAND = 3; // px cleared along the top/sides (JPEG edge lines)
const ERODE = 2; // px the subject is shrunk by, so no backdrop fringe rings the hair

const cache = new Map<string, Promise<string>>();

export function cutoutPortrait(url: string): Promise<string> {
  let job = cache.get(url);
  if (!job) {
    job = run(url);
    job.catch(() => cache.delete(url));
    cache.set(url, job);
  }
  return job;
}

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`portrait failed: ${url}`));
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
  clearBackdrop(data.data, w, h);
  ctx.putImageData(data, 0, 0);

  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
  if (!blob) throw new Error("toBlob failed");
  return URL.createObjectURL(blob);
}

/** The pixel work, DOM-free: clears the backdrop in `px` (RGBA, in place). */
export function clearBackdrop(px: Uint8ClampedArray, w: number, h: number): void {
  const total = w * h;
  const lightness = (i: number) => ((px[i * 4] + px[i * 4 + 1] + px[i * 4 + 2]) / 3) | 0;
  const neutral = (i: number) => {
    const o = i * 4;
    return Math.max(px[o], px[o + 1], px[o + 2]) - Math.min(px[o], px[o + 1], px[o + 2]) <= NEUTRAL_SPREAD;
  };

  // sample a few rows down: the very first row is often an edge artifact
  const row = Math.min(h - 1, EDGE_BAND + 1) * w;
  const top: number[] = [];
  for (let x = 0; x < w; x++) top.push(lightness(row + x));
  top.sort((a, b) => a - b);
  const tone = top[top.length >> 1];
  const isBackdrop = (i: number) => neutral(i) && Math.abs(lightness(i) - tone) <= TONE_TOLERANCE;

  // 1 = backdrop (cleared)
  const mark = new Uint8Array(total);
  const stack: number[] = [];
  for (let x = 0; x < w; x++) stack.push(x);
  for (let y = 0; y < h; y++) stack.push(y * w, y * w + w - 1);
  while (stack.length) {
    const i = stack.pop()!;
    if (mark[i] || !isBackdrop(i)) continue;
    mark[i] = 1;
    const x = i % w;
    if (x > 0) stack.push(i - 1);
    if (x < w - 1) stack.push(i + 1);
    if (i >= w) stack.push(i - w);
    if (i < total - w) stack.push(i + w);
  }

  // a thin frame along the top and sides is always backdrop — a stray edge
  // line there would otherwise show as a border above the head
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (y < EDGE_BAND || x < EDGE_BAND || x >= w - EDGE_BAND) mark[y * w + x] = 1;
    }
  }

  // erode the subject: the hair's anti-aliased edge still carries backdrop
  // gray (outside TONE_TOLERANCE), which read as an outline above the frame
  for (let pass = 0; pass < ERODE; pass++) {
    const grow: number[] = [];
    for (let i = 0; i < total; i++) {
      if (mark[i]) continue;
      const x = i % w;
      if ((x > 0 && mark[i - 1]) || (x < w - 1 && mark[i + 1]) || (i >= w && mark[i - w]) || (i < total - w && mark[i + w])) {
        grow.push(i);
      }
    }
    for (const i of grow) mark[i] = 1;
  }

  // alpha = share of the 3×3 neighbourhood that is NOT backdrop: a 1px feather
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = y * w + x;
      let kept = 0;
      let n = 0;
      for (let dy = -1; dy <= 1; dy++) {
        const yy = y + dy;
        if (yy < 0 || yy >= h) continue;
        for (let dx = -1; dx <= 1; dx++) {
          const xx = x + dx;
          if (xx < 0 || xx >= w) continue;
          n++;
          if (!mark[yy * w + xx]) kept++;
        }
      }
      px[i * 4 + 3] = Math.round((px[i * 4 + 3] * kept) / n);
    }
  }
}
