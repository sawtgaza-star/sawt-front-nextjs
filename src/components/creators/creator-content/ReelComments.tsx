"use client";
import { useRef, useState } from "react";
import { useLang } from "@/lib/use-lang";
import { useReelSocial } from "./reel-social";
import { DEFAULT_AVATAR, timeAgo, type ReelDetails } from "./reel-data";
import { useSheetDismiss } from "./useSheetDismiss";
import { IconClose } from "./reel-icons";

/* Soft tints for the letter avatars — picked from the name, so one account
   keeps its colour across reels. */
const AVATAR_TINTS = ["#4c5c37", "#7a5c2e", "#2f5d62", "#6b4a6e", "#8a4b2f", "#3d5a80", "#5b6b2f"];

function tint(name: string): string {
  let h = 0;
  for (const ch of name) h = (h * 31 + ch.codePointAt(0)!) | 0;
  return AVATAR_TINTS[Math.abs(h) % AVATAR_TINTS.length];
}

/** The account's own picture when the API sends one; else its first letter
    on a tinted circle — never the stock silhouette. */
function CommentAvatar({ name, src }: { name: string; src: string }) {
  if (src && src !== DEFAULT_AVATAR) {
    return <img src={src} alt="" className="cr-reel-comment-avatar" />;
  }
  const letter = Array.from(name.replace(/^[^\p{L}\p{N}]+/u, ""))[0] || "?";
  return (
    <span
      className="cr-reel-comment-avatar is-letter"
      style={{ background: tint(name) }}
      aria-hidden="true"
    >
      {letter.toUpperCase()}
    </span>
  );
}

/* Comments sheet for one reel — slides up over the bottom of the video, the
   way the rest of the reel chrome sits on top of it. The thread is the reel's
   `comment_items` from the API; what the visitor writes is added in the shared
   store (reel-social.ts), so it is still there when the viewer is re-opened. */
export default function ReelComments({
  reelKey,
  details,
  onClose,
}: {
  reelKey: string;
  details?: ReelDetails;
  onClose: () => void;
}) {
  const { tr, lang } = useLang();
  const { comments, commentsCount, addComment, toggleCommentLike } =
    useReelSocial(reelKey, details);
  const { sheetRef, dismissHandlers } = useSheetDismiss(onClose);
  const [draft, setDraft] = useState("");
  // Instagram's own total vs. the few the API mirrors (the visitor's own
  // comments count in neither)
  const shownFromApi = comments.filter((c) => !c.mine).length;
  const moreOnInstagram =
    Boolean(details?.permalink) && (details?.commentsCount ?? 0) > shownFromApi;
  const listRef = useRef<HTMLUListElement | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;
    // The real thread lives on Instagram: open the reel there (in the same
    // gesture, or the popup blocker eats it) with the text on the clipboard,
    // ready to paste into its comments.
    if (details?.permalink) {
      window.open(details.permalink, "_blank", "noopener,noreferrer");
      navigator.clipboard?.writeText(draft.trim()).catch(() => {});
      setDraft("");
      return;
    }
    addComment(draft);
    setDraft("");
    // the new comment lands at the end of the thread — ride down to it once
    // React has painted the extra row
    requestAnimationFrame(() => {
      const list = listRef.current;
      if (list) list.scrollTo({ top: list.scrollHeight, behavior: "smooth" });
    });
  };

  return (
    <div
      className="cr-reel-panel cr-reel-comments"
      ref={sheetRef}
      onClick={(e) => e.stopPropagation()}
      {...dismissHandlers}
    >
      <span className="cr-reel-panel-grip" aria-hidden="true" />
      <div className="cr-reel-panel-head">
        <span className="cr-reel-panel-title">
          {tr("reel_comments_title")} ({commentsCount})
        </span>
        <button
          type="button"
          className="cr-reel-panel-close"
          onClick={onClose}
          aria-label={tr("reel_close")}
        >
          <IconClose />
        </button>
      </div>

      {comments.length === 0 ? (
        <p className="cr-reel-comments-empty">
          {moreOnInstagram ? (
            <a href={details!.permalink} target="_blank" rel="noopener noreferrer">
              {tr("reel_comments_more")} ({details!.commentsCount})
            </a>
          ) : (
            tr("reel_comments_empty")
          )}
        </p>
      ) : (
        <ul className="cr-reel-comment-list" ref={listRef}>
          {comments.map((c) => (
            <li className="cr-reel-comment" key={c.id}>
              <CommentAvatar
                name={c.mine ? tr("reel_comment_you") : c.user}
                src={c.avatar}
              />
              <div className="cr-reel-comment-body">
                <div className="cr-reel-comment-meta">
                  <span className="cr-reel-comment-user">
                    {c.mine ? tr("reel_comment_you") : c.user}
                  </span>
                  <span className="cr-reel-comment-time">
                    {timeAgo(c.time, lang)}
                  </span>
                </div>
                <p className="cr-reel-comment-text">{c.text}</p>
              </div>
              <button
                type="button"
                className={
                  "cr-reel-comment-like" + (c.liked ? " is-liked" : "")
                }
                onClick={() => toggleCommentLike(c.id)}
                aria-pressed={c.liked}
                aria-label={tr(c.liked ? "reel_action_unlike" : "reel_action_like")}
              >
                <i className={c.liked ? "fa-solid fa-heart" : "fa-regular fa-heart"} />
                {/* a zero is noise — the count shows once there is one */}
                {c.likes > 0 ? <span>{c.likes}</span> : null}
              </button>
            </li>
          ))}
          {/* the API mirrors only the latest few — the rest live on Instagram */}
          {moreOnInstagram && (
            <li className="cr-reel-comments-more">
              <a href={details!.permalink} target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-instagram" aria-hidden="true"></i>
                {tr("reel_comments_more")} ({details!.commentsCount})
              </a>
            </li>
          )}
        </ul>
      )}

      <form className="cr-reel-comment-form" onSubmit={submit}>
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={tr("reel_comment_placeholder")}
          aria-label={tr("reel_comment_placeholder")}
          maxLength={300}
        />
        <button
          type="submit"
          disabled={!draft.trim()}
          aria-label={tr("reel_comment_send")}
          title={tr("reel_comment_send")}
        >
          <i className="fa-solid fa-paper-plane" />
        </button>
      </form>
    </div>
  );
}
