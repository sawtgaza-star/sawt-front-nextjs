// @ts-nocheck
"use client";
/* eslint-disable */
import SiteNav from "@/components/site/SiteNav";

/* Breadcrumb hero + overlapping profile card for a single content creator
   (the /creators/[id] detail page). Mirrors CreatorsHero's header pattern,
   then floats a white profile card over the hero's bottom edge. */
const STATS = [
  { num: "+2m", label: "مشاهدة", key: "creator_detail_stat_views" },
  { num: "+500", label: "متابع", key: "creator_detail_stat_followers" },
  { num: "102", label: "فيديو", key: "creator_detail_stat_videos" },
];

const SOCIALS = [
  { icon: "fa-instagram", label: "Instagram" },
  { icon: "fa-linkedin-in", label: "LinkedIn" },
  { icon: "fa-twitter", label: "Twitter" },
  { icon: "fa-facebook-f", label: "Facebook" },
];

export default function CreatorProfileHero() {
  return (
    <header>
      <div
        className="cr-header cr-detail-header py-1"
        style={{ background: 'url("/assets/images/heroSectionImg.jpeg")' }}
      >
        <SiteNav />
        <div className="container cr-hero cr-detail-hero">
          <nav className="cr-breadcrumb" aria-label="breadcrumb">
            <a href="/" data-i18n="nav_home">
              الرئيسية
            </a>
            <i className="fa-solid fa-angle-left mx-2 cr-breadcrumb-sep arrow"></i>
            <a className='Cr' href="/creators" data-i18n="nav_creators">
              صناع المحتوى
            </a>
          </nav>
          <h1 className="cr-hero-title" data-i18n="creators_hero_title">
            صنّاع المحتوى في صوت
          </h1>
          <p className="cr-hero-desc" data-i18n="creators_hero_desc">
            تعرّف على صنّاع المحتوى في صوت، حيث كل فكرة إلها صوت، وكل مبدع إله
            حكاية.
          </p>
        </div>

        {/* Overlapping profile card */}
        <div className="container">
          <div className="cr-profile-card">
            <div className="cr-profile-social">
              <span className="cr-profile-social-label" data-i18n="creator_detail_follow_me">
                تابعني على :
              </span>
              <div className="cr-profile-social-icons">
                {SOCIALS.map((s) => (
                  <a href="#" key={s.icon} aria-label={s.label}>
                    <i className={`fab ${s.icon}`}></i>
                  </a>
                ))}
              </div>
            </div>

            <div className="cr-profile-avatar">
              <img src="/assets/images/محمود زعيتر 2.png" alt="محمود عبد الله زعيتر" />
              <span className="cr-profile-avatar-badge">
                <i className="fa-solid fa-check"></i>
              </span>
            </div>

            <div className="cr-profile-name-row">
              <h2 className="cr-profile-name" data-i18n="creator_detail_name">
                محمود عبد الله زعيتر
              </h2>
              <button type="button" className="cr-profile-follow">
                <i className="fa-solid fa-user-plus"></i>
                <span data-i18n="creator_detail_follow">متابعة</span>
              </button>
            </div>

            <p className="cr-profile-role" data-i18n="creator_detail_bio">
              صانع محتوى متخصص في المسرح والفنون الأدائية يسعى لتقديم محتوى ثقافي
              هادف وقيّم
            </p>

            <div className="cr-profile-stats">
              {STATS.map((s) => (
                <div className="cr-profile-stat" key={s.key}>
                  <span className="cr-profile-stat-num">{s.num}</span>
                  <span className="cr-profile-stat-label" data-i18n={s.key}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
