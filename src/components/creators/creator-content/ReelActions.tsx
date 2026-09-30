"use client";
import { useLang } from "@/lib/use-lang";
import { useReelSocial } from "./reel-social";
import type { ReelDetails } from "./reel-data";
import { IconHeart, IconComment, IconBookmark, IconShare } from "./reel-icons";

export type ReelPanel = "comments" | "share" | null;

type Props = {
  reelKey: string;
  /** the reel's own counts from the API */
  details?: ReelDetails;
  panel: ReelPanel;
  onPanel: (panel: ReelPanel) => void;
};

/* The vertical rail on the reel: like · comments · save · share. The counts
   are the reel's own (API); like and save flip the visitor's state in the
   shared store on top of them (so it survives closing the viewer); the other
   two toggle the panel the viewer renders over the video. */
export default function ReelActions({ reelKey, details, panel, onPanel }: Props) {
  const { tr } = useLang();
  const { liked, likes, saved, commentsCount, toggleLike, toggleSave } =
    useReelSocial(reelKey, details);

  const toggle = (which: Exclude<ReelPanel, null>) =>
    onPanel(panel === which ? null : which);

  return (
    <div className="cr-reel-actions">
      <button
        type="button"
        className={"cr-reel-action" + (liked ? " is-liked" : "")}
        onClick={toggleLike}
        aria-pressed={liked}
        aria-label={tr(liked ? "reel_action_unlike" : "reel_action_like")}
        title={tr(liked ? "reel_action_unlike" : "reel_action_like")}
      >
        <IconHeart liked={liked} />
        <span>{likes}</span>
      </button>
      <button
        type="button"
        className={"cr-reel-action" + (panel === "comments" ? " is-active" : "")}
        onClick={() => toggle("comments")}
        aria-expanded={panel === "comments"}
        aria-label={tr("reel_action_comment")}
        title={tr("reel_action_comment")}
      >
        <IconComment />
        <span>{commentsCount}</span>
      </button>
      <button
        type="button"
        className={"cr-reel-action" + (saved ? " is-saved" : "")}
        onClick={toggleSave}
        aria-pressed={saved}
        aria-label={tr(saved ? "reel_action_unsave" : "reel_action_save")}
        title={tr(saved ? "reel_action_unsave" : "reel_action_save")}
      >
        <IconBookmark saved={saved} />
      </button>
      <button
        type="button"
        className={"cr-reel-action" + (panel === "share" ? " is-active" : "")}
        onClick={() => toggle("share")}
        aria-expanded={panel === "share"}
        aria-label={tr("reel_action_share")}
        title={tr("reel_action_share")}
      >
        <IconShare />
      </button>
    </div>
  );
}
