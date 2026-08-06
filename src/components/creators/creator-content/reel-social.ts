"use client";
import { useSyncExternalStore } from "react";
import { REEL_META } from "./data";

/* Per-reel social state (like · save · comments) for the full-screen viewer.

   There is no backend yet, so this is an in-memory store that lives for the
   life of the page: the same reel keeps its likes and comments when the viewer
   is closed and re-opened, and a reel that appears in two rows (the grid and
   "الأكثر مشاهدة") shares one state. Reel ids restart at 0 in every list, so
   callers pass a `scope` and the store keys on `scope:id`. */

export type ReelComment = {
  id: number;
  /* translation keys for the seeded demo comments; a comment the visitor just
     wrote has `raw: true` and carries its own text instead (see addComment) */
  userKey: string;
  textKey: string;
  timeKey: string;
  raw: boolean;
  avatar: string;
  likes: number;
  liked: boolean;
};

export type ReelSocial = {
  liked: boolean;
  likes: number;
  saved: boolean;
  comments: ReelComment[];
};

const YOU_AVATAR = "/assets/images/person.png";

const AVATARS = [
  "/assets/images/محمود زعيتر 2.png",
  "/assets/images/يوسف الدوس.png",
  "/assets/images/مايك عوض 6.png",
  "/assets/images/Image (أحمد المنصور).png",
];

/* the demo comment pool — entry i is translated by the reel_cm{i+1}_* keys in
   lib/translations.ts. Every reel gets all twelve (so the rail's count matches
   the design's 12), rotated by the reel key so no two reels read the same. */
const POOL_SIZE = 12;
const POOL_LIKES = [4, 7, 2, 11, 1, 6, 15, 3, 9, 5, 8, 2];

function hash(key: string) {
  let h = 0;
  for (let i = 0; i < key.length; i += 1) h = (h * 31 + key.charCodeAt(i)) >>> 0;
  return h;
}

function seed(key: string): ReelSocial {
  const h = hash(key);
  const comments = Array.from({ length: POOL_SIZE }, (_, i) => {
    const p = (h + i) % POOL_SIZE;
    return {
      id: p + 1,
      userKey: `reel_cm${p + 1}_user`,
      textKey: `reel_cm${p + 1}_text`,
      timeKey: `reel_cm${p + 1}_time`,
      raw: false,
      avatar: AVATARS[p % AVATARS.length],
      likes: POOL_LIKES[p],
      liked: false,
    };
  });
  // the design ships the reel already liked, with REEL_META's counts
  return { liked: true, likes: REEL_META.likes, saved: false, comments };
}

const store = new Map<string, ReelSocial>();
const listeners = new Set<() => void>();
let nextCommentId = 1000; // ids for comments the visitor adds

function read(key: string): ReelSocial {
  let state = store.get(key);
  if (!state) {
    state = seed(key);
    store.set(key, state);
  }
  return state;
}

function write(key: string, next: ReelSocial) {
  store.set(key, next);
  listeners.forEach((notify) => notify());
}

function subscribe(notify: () => void) {
  listeners.add(notify);
  return () => {
    listeners.delete(notify);
  };
}

export function useReelSocial(key: string) {
  const snapshot = () => read(key);
  const state = useSyncExternalStore(subscribe, snapshot, snapshot);

  return {
    ...state,
    toggleLike() {
      write(key, {
        ...state,
        liked: !state.liked,
        likes: state.likes + (state.liked ? -1 : 1),
      });
    },
    toggleSave() {
      write(key, { ...state, saved: !state.saved });
    },
    /* appended at the end of the thread, the way a chat reads — the panel
       scrolls down to it (see ReelComments) */
    addComment(text: string) {
      const body = text.trim();
      if (!body) return;
      nextCommentId += 1;
      const comment: ReelComment = {
        id: nextCommentId,
        userKey: "reel_comment_you",
        textKey: body,
        timeKey: "reel_time_now",
        raw: true,
        avatar: YOU_AVATAR,
        likes: 0,
        liked: false,
      };
      write(key, { ...state, comments: [...state.comments, comment] });
    },
    toggleCommentLike(id: number) {
      write(key, {
        ...state,
        comments: state.comments.map((c) =>
          c.id === id
            ? { ...c, liked: !c.liked, likes: c.likes + (c.liked ? -1 : 1) }
            : c,
        ),
      });
    },
  };
}
