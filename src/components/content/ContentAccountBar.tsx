"use client";
import { useEffect, useState } from "react";
import { useLang } from "@/lib/use-lang";
import { formatCount } from "@/components/creators/creator-content/reel-data";
import type { ContentAccount } from "@/lib/api/content";

const SAWT_MARK = encodeURI("/assets/images/شعار صوت اخضر.svg");

/* The Instagram account the page's reels are mirrored from (`reels.account`),
   above the filter bar: its picture in an Instagram-style ring, its name and
   @handle, how many reels it has here, and a "follow" link to the profile.
   Drawn only when the payload names the account. Strings come from tr() —
   it mounts after applyTranslations() has walked the page. */
export default function ContentAccountBar({
  account,
  total,
}: {
  account?: ContentAccount | null;
  /** the account's `media_count`, else how many reels the page lists ("all" pill's count) */
  total?: number | null;
}) {
  const { tr, lang } = useLang();
  const [failed, setFailed] = useState(false);
  const picture = (account?.profile_picture || "").trim();
  useEffect(() => setFailed(false), [picture]);

  const username = (account?.username || "").trim();
  if (!account || !username) return null;

  const name = (account.name || "").trim() || username;
  const profile =
    (account.profile_url || "").trim() ||
    `https://www.instagram.com/${encodeURIComponent(username)}/`;
  const brand = !picture || failed;

  return (
    <div className="ct-account" aria-label={tr("content_account_label")}>
      <a
        className="ct-account-avatar"
        href={profile}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={-1}
        aria-hidden="true"
      >
        <img
          src={brand ? SAWT_MARK : picture}
          alt=""
          className={brand ? "is-brand" : undefined}
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
        />
      </a>

      <div className="ct-account-text">
        <a
          className="ct-account-name"
          href={profile}
          target="_blank"
          rel="noopener noreferrer"
        >
          {name}
        </a>
        <span className="ct-account-meta">
          <span dir="ltr">@{username}</span>
          {typeof total === "number" && total > 0 ? (
            <>
              <span className="ct-account-dot" aria-hidden="true">
                ·
              </span>
              <span>
                {formatCount(total, lang)} {tr("content_account_reels")}
              </span>
            </>
          ) : null}
        </span>
      </div>

      <a
        className="ct-account-follow"
        href={profile}
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fa-brands fa-instagram" aria-hidden="true"></i>
        <span>{tr("content_account_follow")}</span>
      </a>
    </div>
  );
}
