// @ts-nocheck
"use client";
/* eslint-disable */
import { useEffect, useRef, useState } from "react";
import { applyTranslations, getCurrentLang } from "@/lib/translations";
import { COMPANIES, VIDEO } from "./collaborations-data";

/* "ابرز التعاونات" — intro + a selectable list of partner companies, a central
   reel card (reuses the home-page Reels markup + styling and its window.* reel
   handlers), and a testimonial card. Clicking a company swaps the reel poster,
   caption and testimonial to that company's content. */

export default function CreatorCollaborations() {
  const [active, setActive] = useState(0);
  const reelRef = useRef(null);
  const c = COMPANIES[active];

  // On company change: re-apply the current language to the freshly-rendered
  // keys, and reset the reel back to its (new) poster / start.
  useEffect(() => {
    try {
      applyTranslations(getCurrentLang());
    } catch {}
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

  return (
    <section className="cr-collabs-section">
      <div className="container">
        <div className="cr-collabs-grid">
          {/* Intro (RTL start / right) */}
          <div className="cr-collabs-intro">
            <h2 className="cr-collabs-title">
              <span data-i18n="creator_collab_title_1">ابرز</span>{" "}
              <span className="cr-highlight" data-i18n="creator_collab_title_2">
                التعاونات
              </span>
            </h2>
            <p className="cr-collabs-desc" data-i18n="creator_collab_desc">
              صناع محتوى صوت جزء لهم بصمتهم مع الشركات المحلية والعالمية ,
            </p>
          </div>

          {/* Company list */}
          {/* --m-order drives the MOBILE stacking only (the list is
              display:contents there): every item up to the selected one keeps
              its place, the reel takes the slot right after it, and the rest
              of the companies follow. Desktop ignores the variable. */}
          <ul className="cr-collabs-list">
            {COMPANIES.map((company, i) => (
              <li key={company.key} style={{ "--m-order": i <= active ? i + 1 : i + 2 }}>
                <button
                  type="button"
                  className={"cr-collab-item" + (i === active ? " active" : "")}
                  onClick={() => setActive(i)}
                >
                  <span
                    className="cr-collab-item-dot"
                    style={{ background: company.color }}
                  >
                    <img
                      className="cr-collab-item-logo"
                      src="/assets/images/صوت ابيض.png"
                      alt="صوت"
                    />
                  </span>
                  <span className="cr-collab-item-text">
                    <span className="cr-collab-item-name" data-i18n={company.key}>
                      {company.name}
                    </span>
                    <span className="cr-collab-item-sub" data-i18n={company.subKey}>
                      {company.sub}
                    </span>
                  </span>
                  <span className="cr-collab-item-status"></span>
                </button>
              </li>
            ))}
          </ul>

          {/* Central reel card — reuses the home-page Reels markup + styling */}
          <div className="cr-collabs-media" style={{ "--m-order": active + 2 }}>
            <div className="review-reels cr-collabs-reel" ref={reelRef}>
              <div className="reel-item" data-index="0">
                <div className="reel-media">
                  <video
                    src={VIDEO}
                    
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
                  <p className="reel-title" data-i18n={c.titleKey}>
                    {c.title}
                  </p>
                  <span className="reel-views" data-i18n={c.viewsKey}>
                    {c.views}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial */}
          <div className="cr-collabs-quote">
            <div className="cr-collab-quote-card">
              <div className="cr-collab-quote-head">
                <h4 className="cr-collab-quote-company" data-i18n={c.key}>
                  {c.name}
                </h4>
                <div className="cr-collab-quote-stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <i
                      key={i}
                      className={
                        (i < c.stars ? "fa-solid" : "fa-regular") + " fa-star"
                      }
                    ></i>
                  ))}
                </div>
              </div>
              <p className="cr-collab-quote-text" data-i18n={c.quoteKey}>
                {c.quote}
              </p>
              <div className="cr-collab-quote-author">


               



                <span className="cr-collab-quote-author-text">
                  <span className="cr-collab-quote-author-name" data-i18n={c.authorKey}>
                    {c.author}
                  </span>
                  <span className="cr-collab-quote-author-role" data-i18n={c.roleKey}>
                    {c.role}
                  </span>
                </span>
                <img src={c.authorImg} alt="" />
                
              </div>
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
