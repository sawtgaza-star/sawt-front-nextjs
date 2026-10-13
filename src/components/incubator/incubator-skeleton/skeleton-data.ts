/* How long each piece of /incubator copy currently is (GET /pages/incubator,
   Arabic), so the skeleton's filler wraps to the lines the real text will.
   Counts are characters; arrays are one entry per item, in the API's order.
   Where filler and copy wrap differently a count is raised until the line
   counts match at 1440 / 1024 / 768 / 390. Keep in step with the payload. */

export const HERO = {
  /* "حوّل قصتك إلى محتوى" + (line break) "يصنع أثرًا" */
  title: 19,
  titleOrange: 10,
  desc: 106,
  cta: 20,
  badges: [
    [5, 9],
    [4, 8],
  ],
  stats: [10, 10, 16, 10],
  statValue: 4,
  /* foreground_url, a finished composite (791×459) */
  image: [791, 459] as [number, number],
};

export const WHY = {
  title: 16,
  desc: 95,
  features: [
    [10, 30],
    [11, 35],
    [13, 30],
    [10, 39],
  ],
  /* image_url (563×469) */
  image: [563, 469] as [number, number],
};

export const COURSES = {
  head: [19, 95] as const,
  cards: [{ category: 5, title: 14, chips: [7, 7, 5], desc: 181, tutorLabel: 7, tutor: 10, cta: 13 }],
};

export const SPONSOR = {
  head: [29, 83] as const,
  packages: [
    { title: 13, desc: 50, cta: 41 },
    { title: 12, desc: 46, cta: 40 },
    { title: 10, desc: 46, cta: 38 },
    { title: 13, desc: 43, cta: 41 },
  ],
  duration: 8,
  seats: 7,
  waitingTitle: 19,
  students: [
    [6, 19],
    [7, 17],
    [7, 18],
  ],
  more: 16,
  impactTitle: 12,
  impact: [
    [4, 10],
    [2, 15],
    [2, 13],
  ],
};

export const EVENTS = {
  head: [21, 29] as const,
  /* "الكل", then "label (count)" */
  filters: [4, 12, 13, 18, 11],
  cards: [
    { date: 19, time: 7, title: 73, desc: 91, tags: 11 },
    { date: 19, time: 7, title: 54, desc: 65, tags: 12 },
    { date: 18, time: 7, title: 72, desc: 62, tags: 15 },
  ],
};

/* the gallery's slots in the API's order, as album-data maps them */
export const ALBUM = {
  head: [35, 83] as const,
  areas: ["mentor", "community", "featured", "workshop", "video"],
};

export const EXPERTS = {
  head: [16, 29] as const,
  cards: [{ name: 10, badge: 7, desc: 120 }],
};

export const FAQ = {
  head: [24, 29] as const,
  questions: [33, 28, 25, 31],
  /* the third item is open by default */
  open: 2,
  answer: 73,
  moreTitle: 14,
  moreDesc: 43,
  contact: 10,
  /* the placeholder visual, "Frame 1984080629.png" (549×679) */
  image: [549, 679] as [number, number],
};

export const GRADS = {
  head: [28, 58] as const,
  names: [5, 9, 3, 8, 8, 7],
};

export const JOIN = { title: 23, desc: 81, button: 16 };

export const TESTI = {
  /* "شهادات وتجارب" + (line break) "خريجينا" */
  title: [13, 7] as const,
  sub: 119,
  viewAll: 8,
  readMore: 11,
  cards: [
    { quote: 119, name: 13, role: 12 },
    { quote: 128, name: 11, role: 17 },
    { quote: 122, name: 11, role: 18 },
  ],
};
