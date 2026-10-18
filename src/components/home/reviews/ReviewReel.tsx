// @ts-nocheck
"use client";
/* eslint-disable */
import { useCallback, useState } from "react";
import type { HomeReviewReel } from "@/lib/api/home";
import { formatDate, formatFollowers, formatViews, instagramIso } from "../home-text";
import { reelCaption, reelCollaborators } from "./reel-meta";
import ReelCollabsPanel from "./ReelCollabsPanel";

/* One reel of the "آراؤكم في المحتوى" column. The media half (video, the
   save · like · share row, seek bar, play overlay) is the legacy markup
   lib/legacy-main drives — keep its classes and the order of .reel-actions'
   three children. The caption under it renders every field the API sends
   for the reel: the account and post date, the caption's first line, likes,
   comments, views / reach (null until Instagram reports them), the accepted
   collaborators and a link to the post on Instagram. */
export default function ReviewReel({
  reel,
  index,
  near,
  lang,
}: {
  reel: HomeReviewReel;
  index: number;
  near: boolean;
  lang: string;
}) {
  const username = (reel.username || "").trim();
  const profileUrl = username
    ? `https://www.instagram.com/${encodeURIComponent(username)}/`
    : "";
  const posted = reel.posted_at ? formatDate(instagramIso(reel.posted_at), lang) : "";
  const { title, full } = reelCaption(reel.caption);
  const collabs = reelCollaborators(reel.collaborators, username);
  const [collabsOpen, setCollabsOpen] = useState(false);
  /* Instagram CDN links expire: a reel whose file no longer loads gets a
     note (and the post link) instead of a black frame that won't play. */
  const [failed, setFailed] = useState(false);
  const closeCollabs = useCallback(() => setCollabsOpen(false), []);
  const hasNumber = (n) => typeof n === "number" && Number.isFinite(n);

  return (
    <div className="reel-item" data-index={index}>
      <div className="reel-media">
        <video
          src={reel.video_url}
          poster={(near && reel.thumbnail) || undefined}
          /* the poster stands in until a tap: no Instagram bytes
             are spent on reels nobody plays */
          preload="none"
          loop
          playsInline
          onClick={(e) => {
            (window as any).toggleVideoPlay(e.currentTarget);
          }}
          onError={() => setFailed(true)}
        ></video>
        <div className="reel-overlay"></div>
        <div className="reel-actions">
          <span
            onClick={(e) => {
              (window as any).toggleSave(e.currentTarget);
            }}
          >
            <i>
              <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.2em" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 17.98V9.709c0-3.634 0-5.45 1.172-6.58S8.229 2 12 2s5.657 0 6.828 1.129C20 4.257 20 6.074 20 9.708v8.273c0 2.306 0 3.459-.773 3.871c-1.497.8-4.304-1.867-5.637-2.67c-.773-.465-1.16-.698-1.59-.698s-.817.233-1.59.698c-1.333.803-4.14 3.47-5.637 2.67C4 21.44 4 20.287 4 17.981"></path>
              </svg>
            </i>
          </span>
          <span
            onClick={(e) => {
              (window as any).toggleLike(e.currentTarget);
            }}
          >
            <i>
              <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.2em" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.41 19.968C7.59 17.858 2 13.035 2 8.694C2 5.826 4.105 3.5 7 3.5c1.5 0 3 .5 5 2.5c2-2 3.5-2.5 5-2.5c2.895 0 5 2.326 5 5.194c0 4.34-5.59 9.164-8.41 11.274c-.95.71-2.23.71-3.18 0"></path>
              </svg>
            </i>
          </span>
          <span
            onClick={(e) => {
              (window as any).shareVideo(e.currentTarget);
            }}
          >
            <i>
              <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path fill="currentColor" d="M6.616 21q-.691 0-1.153-.462T5 19.385v-8.77q0-.69.463-1.152T6.616 9H8.23q.213 0 .357.143t.143.357t-.143.357T8.23 10H6.616q-.231 0-.424.192T6 10.616v8.769q0 .23.192.423t.423.192h10.77q.23 0 .423-.192t.192-.423v-8.77q0-.23-.192-.423T17.384 10H15.77q-.213 0-.357-.143T15.27 9.5t.143-.357T15.77 9h1.615q.691 0 1.153.463T19 10.616v8.769q0 .69-.463 1.153T17.385 21zm5.027-5.643Q11.5 15.214 11.5 15V4.614L9.754 6.36q-.146.146-.344.153q-.199.006-.364-.16q-.16-.164-.162-.353t.162-.354l2.388-2.388q.132-.131.268-.184q.137-.053.298-.053t.298.053t.268.184l2.388 2.388q.14.14.15.342q.01.2-.15.366q-.166.165-.357.165t-.357-.165l-1.74-1.74V15q0 .214-.143.357T12 15.5t-.357-.143"></path>
              </svg>
            </i>
          </span>
        </div>
        <div className="reel-seekbar">
          <span className="reel-time">0:00</span>
          <div className="reel-progress">
            <div className="reel-progress-fill"></div>
          </div>
        </div>
        <div
          className="play-overlay"
          onClick={(e) => {
            (window as any).togglePlay(e.currentTarget);
          }}
        >
          <i className="fa-solid fa-play"></i>
        </div>
        {failed ? (
          <div className="reel-error" role="status">
            <span className="reel-error-icon" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M12 8v5m0 3.5h.01M10.24 3.96L2.4 17.5A2 2 0 0 0 4.13 20.5h15.74a2 2 0 0 0 1.73-3L13.76 3.96a2 2 0 0 0-3.52 0"></path>
              </svg>
            </span>
            <p data-i18n="reel_play_error">تعذّر تشغيل هذا المقطع</p>
            {reel.permalink ? (
              <a href={reel.permalink} target="_blank" rel="noopener noreferrer">
                <span data-i18n="reel_watch_instagram">شاهد على إنستغرام</span>
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
      <div className="reel-caption">
        {title ? (
          <p className="reel-title" dir="auto" title={full || undefined}>
            {title}
          </p>
        ) : null}{" "}

        {username || posted ? (
          <div className="reel-byline">
            {username ? (
              <a
                className="reel-user"
                href={profileUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-instagram" aria-hidden="true"></i>
                <bdi>@{username}</bdi>
              </a>
            ) : null}
            {username && collabs.length ? (
              <button
                type="button"
                className={"reel-collab-count" + (collabsOpen ? " active" : "")}
                onClick={() => setCollabsOpen((v) => !v)}
                aria-expanded={collabsOpen}
                title={collabs.map((name) => "@" + name).join("  ")}
              >
                <span className="reel-collab-dots" aria-hidden="true">
                  {collabs.slice(0, 3).map((name) => (
                    <span key={name}>{name.replace(/[^a-z0-9]/gi, "").charAt(0).toUpperCase() || "@"}</span>
                  ))}
                </span>
                <bdi>+{collabs.length}</bdi>
              </button>
            ) : null}
            {username && posted ? <span className="reel-dot" aria-hidden="true">•</span> : null}
            {posted ? (
              <time className="reel-date" dateTime={instagramIso(reel.posted_at)}>
                <bdi>{posted}</bdi>
              </time>
            ) : null}
          </div>
        ) : null}

        <div className="reel-stats">
          {hasNumber(reel.likes) ? (
            <span className="reel-stat">
              <svg xmlns="http://www.w3.org/2000/svg" width="1.15em" height="1.15em" viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M10.41 19.968C7.59 17.858 2 13.035 2 8.694C2 5.826 4.105 3.5 7 3.5c1.5 0 3 .5 5 2.5c2-2 3.5-2.5 5-2.5c2.895 0 5 2.326 5 5.194c0 4.34-5.59 9.164-8.41 11.274c-.95.71-2.23.71-3.18 0"></path></svg>
              <bdi>{formatFollowers(reel.likes)}</bdi>
            </span>
          ) : null}
          {hasNumber(reel.comments_count) ? (
            <span className="reel-stat">
              <svg xmlns="http://www.w3.org/2000/svg" width="1.15em" height="1.15em" viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M6.099 19q-1.949-.192-2.927-1.172C2 16.657 2 14.771 2 11v-.5c0-3.771 0-5.657 1.172-6.828S6.229 2.5 10 2.5h4c3.771 0 5.657 0 6.828 1.172S22 6.729 22 10.5v.5c0 3.771 0 5.657-1.172 6.828S17.771 19 14 19c-.56.012-1.007.055-1.445.155c-1.199.276-2.309.89-3.405 1.424c-1.563.762-2.344 1.143-2.834.786c-.938-.698-.021-2.863.184-3.865"></path></svg>
              <bdi>{formatFollowers(reel.comments_count)}</bdi>
            </span>
          ) : null}
          {hasNumber(reel.views) ? (
            <span className="reel-views reel-stat">
              <bdi>{formatViews(reel.views)}</bdi>{" "}
              <span data-i18n="reel_views_word">مشاهدة</span>
            </span>
          ) : null}
          {hasNumber(reel.reach) ? (
            <span className="reel-stat">
              <bdi>{formatFollowers(reel.reach)}</bdi>{" "}
              <span data-i18n="reel_reach_word">وصول</span>
            </span>
          ) : null}
          {reel.permalink ? (
            <a
              className="reel-ig-link"
              href={reel.permalink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <span data-i18n="reel_watch_instagram">شاهد على إنستغرام</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 4h6v6m0-6L11 13m-2-7H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3"></path></svg>
            </a>
          ) : null}
        </div>
      </div>

      {collabs.length ? (
        <ReelCollabsPanel names={collabs} open={collabsOpen} onClose={closeCollabs} />
      ) : null}
    </div>
  );
}
