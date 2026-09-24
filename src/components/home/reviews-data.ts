/* The "آراؤكم في المحتوى" thread, translated from the API's shape into the one
   lib/legacy-main's comment machinery renders.

   That machinery is still the legacy DOM one (roadmap item 5); what changed is
   where its data comes from. It used to carry three reels' worth of invented
   comments — those are gone, and `reviewComments` below is the only thing that
   fills the list now.

   TWO THINGS THE API DOESN'T SEND, AND WHERE THEY COME FROM
   --------------------------------------------------------
   The avatar is a coloured circle with the commenter's first letter, and the
   colour is one of four legacy/style.css defines. No field carries it, so it is
   picked from the commenter's name — the same name always gets the same colour,
   which is what makes the thread look stable across a re-render.

   FIELD NAMES ARE PROVISIONAL. `comments.items` has always come back empty, so
   the reader below accepts either spelling of the two fields that matter
   (`body`/`text`, `name`/`author`) rather than betting on one. See the caveat
   on HomeReviewComment in lib/api/home. */

import type { HomeReviewComment, HomeReviewReply } from "@/lib/api/home";
import { formatDate } from "./home-text";

/** The avatar classes legacy/style.css defines for the comment circles. */
const AVATARS = ["av-green", "av-orange", "av-blue", "av-gray"];

/** Same name → same colour, every render. */
function avatarFor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i += 1) hash = (hash * 31 + name.charCodeAt(i)) | 0;
  return AVATARS[Math.abs(hash) % AVATARS.length];
}

/** The shape lib/legacy-main's `commentMarkup` / `replyMarkup` read. */
export type LegacyReply = {
  av: string;
  letter: string;
  name: string;
  text: string;
};

export type LegacyComment = LegacyReply & {
  id: number | string;
  time: string;
  likes: number;
  liked: boolean;
  replies: LegacyReply[];
};

function bodyOf(item: { body?: string | null; text?: string | null }): string {
  return (item.body || item.text || "").trim();
}

function nameOf(item: { name?: string | null; author?: string | null }): string {
  return (item.name || item.author || "").trim();
}

function reply(item: HomeReviewReply): LegacyReply {
  const name = nameOf(item);
  return {
    av: avatarFor(name),
    letter: name.charAt(0),
    name,
    text: bodyOf(item),
  };
}

/** The API's thread as the comment list can draw it. A comment with no text is
    dropped — it would render as a name over an empty paragraph. */
export function reviewComments(
  items: HomeReviewComment[] | undefined,
  lang: string,
): LegacyComment[] {
  if (!Array.isArray(items)) return [];
  return items
    .map((item, index) => {
      const name = nameOf(item);
      return {
        id: item.id ?? index,
        av: avatarFor(name),
        letter: name.charAt(0),
        name,
        text: bodyOf(item),
        time: formatDate(item.created_at, lang),
        likes: typeof item.likes === "number" ? item.likes : 0,
        liked: !!item.liked,
        replies: Array.isArray(item.replies) ? item.replies.map(reply) : [],
      };
    })
    .filter((comment) => comment.text);
}
