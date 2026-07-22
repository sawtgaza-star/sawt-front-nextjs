// @ts-nocheck
"use client";
/* eslint-disable */
import { useEffect, useRef, useState } from "react";
import { applyTranslations, getCurrentLang } from "@/lib/translations";

/* "ابرز التعاونات" — intro + a selectable list of partner companies, a central
   reel card (reuses the home-page Reels markup + styling and its window.* reel
   handlers), and a testimonial card. Clicking a company swaps the reel poster,
   caption and testimonial to that company's content. */

const VIDEO = "/assets/videos/WhatsApp Video 2026-03-23 at 11.59.11 AM.mp4";

const COMPANIES = [
  {
    key: "creator_collab_c1",
    name: "شركة الإبداع للإنتاج",
    subKey: "creator_collab_c1_sub",
    sub: "إنتاج إعلامي",
    color: "#E1723B",
    poster: "/assets/images/1.png",
    titleKey: "creator_collab_c1_title",
    title: "أعلان لشركة الابداع",
    viewsKey: "creator_collab_c1_views",
    views: "200k مشاهدة",
    quoteKey: "creator_collab_c1_quote",
    quote:
      '"محمود يمتلك قدرة نادرة على تحويل الفكرة إلى تجربة بصرية مؤثرة. تعاوننا معه كان من أنجح تجاربنا الإنتاجية"',
    authorKey: "creator_collab_c1_author",
    author: "رنا الصالح",
    roleKey: "creator_collab_c1_role",
    role: "مدير الإنتاج",
    authorImg: "/assets/images/محمود زعيتر 2.png",
    stars: 4,
  },
  {
    key: "creator_collab_c2",
    name: "مؤسسة الفن العربي",
    subKey: "creator_collab_c2_sub",
    sub: "فنون وثقافة",
    color: "#6F7A4E",
    poster: "/assets/images/2.png",
    titleKey: "creator_collab_c2_title",
    title: "حملة الفن العربي",
    viewsKey: "creator_collab_c2_views",
    views: "150k مشاهدة",
    quoteKey: "creator_collab_c2_quote",
    quote:
      '"تعاملنا مع محمود كان تجربة فنية راقية، فهو يترجم رؤيتنا الثقافية إلى محتوى بصري يلامس الجمهور"',
    authorKey: "creator_collab_c2_author",
    author: "سامي العلي",
    roleKey: "creator_collab_c2_role",
    role: "مدير الإبداع",
    authorImg: "/assets/images/يوسف الدوس.png",
    stars: 5,
  },
  {
    key: "creator_collab_c3",
    name: "قناة الأفق الفضائية",
    subKey: "creator_collab_c3_sub",
    sub: "بث تلفزيوني",
    color: "#8BA86A",
    poster: "/assets/images/3.png",
    titleKey: "creator_collab_c3_title",
    title: "برومو قناة الأفق",
    viewsKey: "creator_collab_c3_views",
    views: "320k مشاهدة",
    quoteKey: "creator_collab_c3_quote",
    quote:
      '"احترافية عالية في التنفيذ والالتزام بالمواعيد. محمود أضاف لمسة مميزة على هويتنا الإعلامية"',
    authorKey: "creator_collab_c3_author",
    author: "هبة كمال",
    roleKey: "creator_collab_c3_role",
    role: "مديرة البرامج",
    authorImg: "/assets/images/مايك عوض 6.png",
    stars: 4,
  },
  {
    key: "creator_collab_c4",
    name: "دار النشر الحديثة",
    subKey: "creator_collab_c4_sub",
    sub: "نشر ومحتوى",
    color: "#4C5C37",
    poster: "/assets/images/4.png",
    titleKey: "creator_collab_c4_title",
    title: "حملة دار النشر",
    viewsKey: "creator_collab_c4_views",
    views: "90k مشاهدة",
    quoteKey: "creator_collab_c4_quote",
    quote:
      '"قدرته على صياغة المحتوى وربطه بالصورة جعلت مشاريعنا أكثر تأثيرًا ووصولًا لجمهور أوسع"',
    authorKey: "creator_collab_c4_author",
    author: "خالد منصور",
    roleKey: "creator_collab_c4_role",
    role: "مدير التحرير",
    authorImg: "/assets/images/yousef.png",
    stars: 5,
  },
  {
    key: "creator_collab_c5",
    name: "شركة تك ميديا",
    subKey: "creator_collab_c5_sub",
    sub: "تقنية إعلامية",
    color: "#5E7342",
    poster: "/assets/images/2.png",
    titleKey: "creator_collab_c5_title",
    title: "إعلان تك ميديا",
    viewsKey: "creator_collab_c5_views",
    views: "500k مشاهدة",
    quoteKey: "creator_collab_c5_quote",
    quote:
      '"دمج التقنية بالإبداع هو ما يميز عمل محمود، تعاوننا حقق أرقام مشاهدات تجاوزت توقعاتنا"',
    authorKey: "creator_collab_c5_author",
    author: "لينا فؤاد",
    roleKey: "creator_collab_c5_role",
    role: "مديرة التسويق",
    authorImg: "/assets/images/person.png",
    stars: 5,
  },
];

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
          <ul className="cr-collabs-list">
            {COMPANIES.map((company, i) => (
              <li key={company.key}>
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
          <div className="cr-collabs-media">
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
                      onClick={() => {
                        (window as any).shareVideo();
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
              <span className="cr-collab-quote-mark">&rdquo;</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
