// @ts-nocheck
"use client";
/* eslint-disable */
import { useEffect, useRef, useState } from "react";
import { localized } from "@/lib/api/pages";
import { bySortOrder, captionTitle } from "./creators-text";

/* The dots behind each company's logo, in the mock's order, cycling. */
const DOT_COLORS = ["#E1723B", "#6F7A4E", "#8BA86A", "#C9A45C", "#4C5C37"];

/* A string, a { ar, en } pair or a number — whichever the payload sent. */
const text = (value, lang) =>
  value === null || value === undefined
    ? ""
    : typeof value === "object"
      ? localized(value, lang)
      : String(value);

/* "ابرز التعاونات" — intro + a selectable list of partner companies, a central
   reel card (reuses the home-page Reels markup + styling and its window.* reel
   handlers), and a testimonial card for the selected company — all from the
   profile payload's `collaborations` block. The reel is the block's single
   `reel` — an Instagram reel: its thumbnail is the poster, the caption's
   first line the title, and the view count (with `labels.views_suffix`)
   shows when Instagram reports one. Without a reel the card is left out. The quote
   card shows what the editor filled for that company: its name and rating
   always, the caption and the author when present. */

export default function CreatorCollaborations({ data, labels, lang = "ar" }) {
  const [active, setActive] = useState(0);
  const reelRef = useRef(null);
  const companies = bySortOrder(data?.items);
  const c = companies[Math.min(active, companies.length - 1)];
  const reel = data?.reel?.video_url ? data.reel : null;

  // On company change: reset the reel back to its poster / start.
  useEffect(() => {
    const item = reelRef.current?.querySelector(".reel-item");
    if (item) {
      item.classList.remove("playing");
      const video = item.querySelector("video");
      if (video) {
        try {
          video.pause();
          video.currentTime = 0;
        } catch {}
      }
      const fill = item.querySelector(".reel-progress-fill");
      if (fill) fill.style.width = "0%";
      const time = item.querySelector(".reel-time");
      if (time) time.textContent = "0:00";
      const overlay = item.querySelector(".play-overlay");
      if (overlay) {
        overlay.style.opacity = "1";
        overlay.style.pointerEvents = "all";
      }
      // الإعجاب/الحفظ محفوظان لكل فيديو على حدة، والفيديو تغيّر مع الشركة
      try {
        (window as any).initReelActions?.();
      } catch {}
    }
  }, [active]);

  if (!c) return null;

  const title = localized(data?.title, lang);
  const words = title.trim().split(/\s+/).filter(Boolean);
  const titleHead = words.slice(0, -1).join(" ");
  const titleTail = words[words.length - 1] || "";
  const description = localized(data?.description, lang);
  const quote = localized(c.caption, lang);
  const authorName = (c.author?.name || "").trim();
  const authorRole = localized(c.author?.role, lang);
  const stars = Math.max(0, Math.min(5, Math.round(Number(c.rating) || 0)));
  const reelTitle = reel ? text(reel.title, lang) || captionTitle(text(reel.caption, lang)) : "";
  const reelViews =
    reel && typeof reel.views === "number"
      ? `${reel.views.toLocaleString("en-US")} ${
          localized(labels?.views_suffix, lang) || (lang === "en" ? "views" : "مشاهدة")
        }`
      : reel
        ? text(reel.views, lang)
        : "";

  return (
    <section className="cr-collabs-section">
      <div className="container">
        <div className="cr-collabs-grid">
          {/* Intro (RTL start / right) */}
          <div className="cr-collabs-intro">
            <h2 className="cr-collabs-title">
              {titleHead ? <span>{titleHead}</span> : null}{" "}
              <span className="cr-highlight">{titleTail}</span>
            </h2>
            {description ? <p className="cr-collabs-desc">{description}</p> : null}
          </div>

          {/* Company list */}
          {/* --m-order drives the MOBILE stacking only (the list is
              display:contents there): every item up to the selected one keeps
              its place, the reel takes the slot right after it, and the rest
              of the companies follow. Desktop ignores the variable. */}
          <ul className="cr-collabs-list">
            {companies.map((item, i) => {
              const company = item.company || {};
              const category = text((company.category || [])[0], lang);
              return (
              <li key={item.uuid || i} style={{ "--m-order": reel && i > active ? i + 2 : i + 1 }}>
                <button
                  type="button"
                  className={"cr-collab-item" + (i === active ? " active" : "")}
                  onClick={() => setActive(i)}
                >
                  <span
                    className="cr-collab-item-dot"
                    style={{ background: DOT_COLORS[i % DOT_COLORS.length] }}
                  >
                    <img
                      className="cr-collab-item-logo"
                      src={company.logo_url || "/assets/images/صوت ابيض.png"}
                      alt={localized(company.name, lang)}
                    />
                  </span>
                  <span className="cr-collab-item-text">
                    <span className="cr-collab-item-name">
                      {localized(company.name, lang)}
                    </span>
                    {category ? <span className="cr-collab-item-sub">{category}</span> : null}
                  </span>
                  <span className="cr-collab-item-status"></span>
                </button>
              </li>
              );
            })}
          </ul>

          {/* Central reel card — reuses the home-page Reels markup + styling */}
          {reel ? (
          <div className="cr-collabs-media" style={{ "--m-order": active + 2 }}>
            <div className="review-reels cr-collabs-reel" ref={reelRef}>
              <div className="reel-item" data-index="0">
                <div className="reel-media">
                  <video
                    src={reel.video_url}
                    poster={reel.thumbnail || undefined}
                    loop
                    playsInline
                    onClick={(e) => {
                      (window as any).toggleVideoPlay(e.currentTarget);
                    }}
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
                </div>
                <div className="reel-caption">
                  <p className="reel-title">{reelTitle}</p>
                  {reelViews ? <span className="reel-views">{reelViews}</span> : null}
                </div>
              </div>
            </div>
          </div>

          ) : null}

          {/* Testimonial */}
          <div className="cr-collabs-quote">
            <div className="cr-collab-quote-card">
              <div className="cr-collab-quote-head">
                <h4 className="cr-collab-quote-company">
                  {localized(c.company?.name, lang)}
                </h4>
                <div className="cr-collab-quote-stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <i
                      key={i}
                      className={
                        (i < stars ? "fa-solid" : "fa-regular") + " fa-star"
                      }
                    ></i>
                  ))}
                </div>
              </div>
              {quote ? <p className="cr-collab-quote-text">{quote}</p> : null}
              {authorName ? (
                <div className="cr-collab-quote-author">
                  <span className="cr-collab-quote-author-text">
                    <span className="cr-collab-quote-author-name">{authorName}</span>
                    {authorRole ? (
                      <span className="cr-collab-quote-author-role">{authorRole}</span>
                    ) : null}
                  </span>
                  {c.author?.photo_url ? <img src={c.author.photo_url} alt="" /> : null}
                </div>
              ) : null}
              <span className="cr-collab-quote-mark">
                <svg xmlns="http://www.w3.org/2000/svg" width="120" height="90" viewBox="0 0 120 90" fill="none">
                  <path d="M0 90V56.25C0 43.75 3.75 32.5 11.25 22.5C18.75 12.5 30 5 45 0L52.5 11.25C40 13.75 30.625 18.75 24.375 26.25C18.125 33.75 15 42.5 15 52.5H37.5V90H0ZM67.5 90V56.25C67.5 43.75 71.25 32.5 78.75 22.5C86.25 12.5 97.5 5 112.5 0L120 11.25C107.5 13.75 98.125 18.75 91.875 26.25C85.625 33.75 82.5 42.5 82.5 52.5H105V90H67.5Z" fill="#FFF3EB"/>
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
