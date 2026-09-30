"use client";
import { useRef, useState } from "react";
import { useLang } from "@/lib/use-lang";
import { useReelSocial } from "./reel-social";
import { timeAgo, type ReelDetails } from "./reel-data";
import { useSheetDismiss } from "./useSheetDismiss";
import { IconClose } from "./reel-icons";

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
  const listRef = useRef<HTMLUListElement | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;
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
        <p className="cr-reel-comments-empty">{tr("reel_comments_empty")}</p>
      ) : (
        <ul className="cr-reel-comment-list" ref={listRef}>
          {comments.map((c) => (
            <li className="cr-reel-comment" key={c.id}>
              <img src={c.avatar} alt="" className="cr-reel-comment-avatar" />
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
                <span>{c.likes}</span>
              </button>
            </li>
          ))}
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
