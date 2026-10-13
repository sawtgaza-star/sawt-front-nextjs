/* How much copy /courses/[id] currently carries (GET /pages/courses/{slug},
   Arabic — graphic-design as of writing), so the skeleton's filler takes about
   the room the real text will. Counts are characters; arrays are one entry
   per item. Approximate on purpose: other courses vary, the aim is a page
   that doesn't visibly jump, not a line-for-line copy. */

export const HERO = { category: 5, title: 14, desc: 195 };

/* the fixed section headings (t() labels) */
export const HEADS = {
  goals: 14,
  modules: 14,
  outcomes: 15,
  perks: 23,
  reqs: 12,
  selection: 21,
  trainer: 6,
};

export const GOALS = [
  [15, 50],
  [19, 54],
  [25, 45],
  [19, 44],
  [26, 44],
  [18, 33],
];

/* the first module is open with its lessons; the last three are locked */
export const MODULES = { titles: [30, 31, 33, 28, 30, 28, 31], lessons: [23, 24, 11], locked: 3 };

export const OUTCOMES = {
  title: 10,
  before: [36, 27, 33, 31],
  after: [28, 25, 30, 24, 28],
};

export const PERKS = [33, 35, 32, 35, 36, 51];

export const REQS = [42, 42, 29, 36, 25];

export const SELECTION = [
  [20, 30],
  [14, 44],
  [15, 38],
  [8, 30],
  [18, 45],
];

export const TRAINER = { name: 10, role: 4, bio: 120 };

export const REGISTER = {
  kicker: 16,
  title: 14,
  unit: 5,
  meta: [
    [6, 8],
    [21, 9],
    [12, 8],
    [12, 1],
    [12, 2],
  ],
  cta: 10,
  shareTitle: 8,
  shareDesc: 32,
  shareButtons: 5,
};
