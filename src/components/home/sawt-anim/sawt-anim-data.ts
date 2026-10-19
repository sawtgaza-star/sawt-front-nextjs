/* Static data of <SawtAboutAnim /> (from sawt-hero-replica.html). The
   illustration's raster layers were base64 in the source file; they now live
   in public/assets/images/about-anim/. */

const DIR = "/assets/images/about-anim";

export const IMG = {
  main: `${DIR}/main-circle.webp`,
  glow: `${DIR}/map-glow.webp`,
  bubble1: `${DIR}/bubble-1.webp`,
  bubble2: `${DIR}/bubble-2.webp`,
  bubble3: `${DIR}/bubble-3.webp`,
  production: `${DIR}/production.webp`,
  branch: `${DIR}/olive-branch.webp`,
};

/** The sound-wave bars either side of the mic: [x, y, width, height, rx, fill]. */
export const BARS: [number, number, number, number, number, string][] = [
  [338, 323, 4, 15, 2, "#707c4c"], [346, 306, 4, 33, 2, "#828c53"], [354, 323, 4, 18, 2, "#5e6b3c"],
  [361, 335, 3, 8, 1.5, "#606c3d"], [382, 337, 3, 15, 1.5, "#8a975a"], [389, 319, 3, 37, 1.5, "#929d61"],
  [395, 290, 4, 70, 2, "#8f975b"], [403, 315, 4, 51, 2, "#939d60"], [411, 331, 3, 40, 1.5, "#7b874f"],
  [418, 345, 3, 25, 1.5, "#889558"], [424, 354, 3, 13, 1.5, "#7c8652"], [431, 347, 3, 25, 1.5, "#7a884c"],
  [438, 333, 3, 52, 1.5, "#879257"], [445, 314, 3, 90, 1.5, "#8a9656"], [452, 338, 3, 46, 1.5, "#979f60"],
  [459, 345, 3, 25, 1.5, "#8c9858"], [466, 349, 3, 26, 1.5, "#869252"], [473, 354, 3, 14, 1.5, "#8a9454"],
  [481, 354, 2, 17, 1, "#919c55"], [666, 353, 3, 14, 1.5, "#899250"], [675, 353, 2, 17, 1, "#848e4d"],
  [681, 344, 3, 31, 1.5, "#778142"], [688, 326, 4, 64, 2, "#7e894e"], [696, 314, 4, 92, 2, "#7f8850"],
  [703, 339, 4, 46, 2, "#77844b"], [711, 349, 2, 26, 1, "#73804b"], [717, 354, 4, 14, 2, "#707d46"],
  [724, 349, 3, 30, 1.5, "#636f3e"], [731, 346, 3, 25, 1.5, "#63713f"], [738, 342, 2, 35, 1, "#677543"],
  [744, 327, 4, 64, 2, "#687440"], [752, 322, 3, 79, 1.5, "#657241"], [759, 302, 3, 117, 1.5, "#657242"],
  [766, 323, 4, 74, 2, "#647041"], [774, 339, 3, 42, 1.5, "#616c41"], [781, 350, 3, 21, 1.5, "#58633b"],
  [789, 345, 2, 34, 1, "#5d693c"], [795, 333, 3, 35, 1.5, "#657143"], [802, 355, 3, 23, 1.5, "#ccd270"],
  [808, 349, 1, 14, 0.5, "#c5c86b"], [810, 353, 3, 16, 1.5, "#c5ca70"], [817, 342, 2, 23, 1, "#4f5c37"],
  [825, 352, 4, 26, 2, "#95a14b"], [835, 353, 3, 15, 1.5, "#a4ad55"],
];

/** The orange arcs round the circles: path, dash length, entry delay (s). */
export const ARCS: [string, number, number][] = [
  ["M292.5 256.7A294 294 0 0 1 858.6 289.9", 770, 0.4],
  ["M666.7 629A294 294 0 0 1 439.4 613.9", 240, 0.9],
  ["M285.9 263.9A98 98 0 0 0 151.8 400.4", 270, 1.1],
];

/** The dots at the arcs' ends: cx, cy, entry delay (s). */
export const DOTS: [number, number, number][] = [
  [292.5, 256.7, 0.5], [285.9, 263.9, 1.1], [858.6, 289.9, 1.9],
  [151.8, 400.4, 2.4], [666.7, 629, 1.1], [439.4, 613.9, 2.2],
];

export const TEXT = {
  ar: {
    label: "ميكروفون صوت أمام خريطة فلسطين، حوله موجات صوت وفقاعات حكايات، مع دائرة أدوات الإنتاج وشارة المنصة المرخصة برقم 60533 وغصن زيتون",
    licensed: "المنصة مرخصة",
    licenseNo: "برقم:",
  },
  en: {
    label: "A Sawt microphone before the map of Palestine, with sound waves and story bubbles, a production-tools circle, a licensed-platform badge (no. 60533) and an olive branch",
    licensed: "Licensed platform",
    licenseNo: "No.:",
  },
};
