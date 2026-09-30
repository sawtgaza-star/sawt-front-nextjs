"use client";
import { useSyncExternalStore } from "react";
import { DEFAULT_AVATAR, type ReelComment, type ReelDetails } from "./reel-data";

/* Per-reel social state (like · save · comments) for the full-screen viewer.

   The counts and the thread are the API's (`ReelDetails`, from the reel
   itself). The API has no endpoint to like, save or comment, so what the
   visitor does is kept here, in memory, on top of those numbers: the same reel
   keeps it when the viewer is closed and re-opened, and a reel that appears in
   two rows (the grid and "الأكثر مشاهدة") shares it. Reel ids can repeat
   across lists, so callers pass a `scope` and the store keys on `scope:id`. */

export type ReelCommentView = ReelComment & { liked: boolean; mine: boolean };

type Local = {
  liked: boolean;
  saved: boolean;
  added: ReelComment[];
  likedComments: Record<string, boolean>;
};

const EMPTY: Local = { liked: false, saved: false, added: [], likedComments: {} };

const store = new Map<string, Local>();
const listeners = new Set<() => void>();
let nextCommentId = 0; // ids for comments the visitor adds

function read(key: string): Local {
  return store.get(key) ?? EMPTY;
}

function write(key: string, next: Local) {
  store.set(key, next);
  listeners.forEach((notify) => notify());
}

function subscribe(notify: () => void) {
  listeners.add(notify);
  return () => {
    listeners.delete(notify);
  };
}

const NO_DETAILS: Pick<ReelDetails, "likes" | "commentsCount" | "comments"> = {
  likes: 0,
  commentsCount: 0,
  comments: [],
};

export function useReelSocial(
  key: string,
  details: Pick<ReelDetails, "likes" | "commentsCount" | "comments"> = NO_DETAILS,
) {
  const snapshot = () => read(key);
  const local = useSyncExternalStore(subscribe, snapshot, snapshot);

  const mineIds = new Set(local.added.map((c) => c.id));
  const comments: ReelCommentView[] = [...details.comments, ...local.added].map((c) => {
    const liked = !!local.likedComments[c.id];
    return { ...c, liked, mine: mineIds.has(c.id), likes: c.likes + (liked ? 1 : 0) };
  });

  return {
    liked: local.liked,
    likes: details.likes + (local.liked ? 1 : 0),
    saved: local.saved,
    comments,
    commentsCount: details.commentsCount + local.added.length,
    toggleLike() {
      write(key, { ...local, liked: !local.liked });
    },
    toggleSave() {
      write(key, { ...local, saved: !local.saved });
    },
    /* appended at the end of the thread, the way a chat reads — the panel
       scrolls down to it (see ReelComments) */
    addComment(text: string) {
      const body = text.trim();
      if (!body) return;
      nextCommentId += 1;
      const comment: ReelComment = {
        id: `mine-${nextCommentId}`,
        user: "",
        text: body,
        time: new Date().toISOString(),
        avatar: DEFAULT_AVATAR,
        likes: 0,
      };
      write(key, { ...local, added: [...local.added, comment] });
    },
    toggleCommentLike(id: string) {
      write(key, {
        ...local,
        likedComments: { ...local.likedComments, [id]: !local.likedComments[id] },
      });
    },
  };
}
