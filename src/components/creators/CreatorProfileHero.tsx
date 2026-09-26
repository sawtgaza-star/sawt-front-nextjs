"use client";
import SiteNav from "@/components/site/SiteNav";
import BreadcrumbHome from "@/components/site/BreadcrumbHome";
import { localized } from "@/lib/api/pages";
import type { CreatorsHeroContent } from "@/lib/api/creators-page";
import type { CreatorProfile, CreatorProfileLabels } from "@/lib/api/creator-profile";
import { CreatorsHeroSkeleton, Line } from "./CreatorsSkeleton";
import { compact } from "./creators-text";

const HERO_IMAGE = "/assets/images/heroSectionImg.jpeg";
const AVATAR_FALLBACK = "/assets/images/Image (أحمد المنصور).png";

/* Font Awesome glyph per `socials[].platform`; anything unknown gets a link. */
const SOCIAL_ICONS: Record<string, string> = {
  instagram: "fab fa-instagram",
  tiktok: "fab fa-tiktok",
  facebook: "fab fa-facebook-f",
  twitter: "fab fa-twitter",
  x: "fab fa-x-twitter",
  linkedin: "fab fa-linkedin-in",
  youtube: "fab fa-youtube",
  snapchat: "fab fa-snapchat",
  telegram: "fab fa-telegram",
  whatsapp: "fab fa-whatsapp",
};

/* Breadcrumb hero + overlapping profile card for a single content creator
   (/creators/[id]), from GET /pages/creators/{id}: the hero's backdrop and
   copy, then the creator's avatar (with the verified tick when
   `is_verified`), name, bio, stats and social links; the fixed words ("متابعة",
   "تابعنا على:", the stat suffixes) are the payload's `labels`.

   The <header> shell is NOT conditional — <SiteNav /> lives in it and
   initHeaderPin() wraps its bar right after mount (see CreatorsHero). While
   the profile is in flight the copy and the card are drawn as bars. "متابعة"
   opens the creator's first social profile — the site has no follow system. */
export default function CreatorProfileHero({
  hero,
  creator,
  labels,
  lang,
  loading,
}: {
  hero?: CreatorsHeroContent;
  creator?: CreatorProfile;
  labels?: CreatorProfileLabels;
  lang: string;
  loading: boolean;
}) {
  const label = (key: keyof CreatorProfileLabels) => localized(labels?.[key], lang);
  const title = localized(hero?.title, lang);
  const description = localized(hero?.description, lang);
  const name = (creator?.name || "").trim();
  const bio = localized(creator?.bio, lang);
  const socials = (creator?.socials || []).filter((social) => social.url);
  const followUrl = socials[0]?.url;

  const stats = [
    { key: "views", value: creator?.stats?.views, suffix: label("views_suffix") },
    { key: "followers", value: creator?.stats?.followers, suffix: label("followers_suffix") },
    { key: "videos", value: creator?.stats?.videos, suffix: label("videos_suffix") },
  ].filter((stat) => compact(stat.value));

  return (
    <header>
      <div
        className="cr-header cr-detail-header py-1"
        style={{ background: `url("${hero?.image_url || HERO_IMAGE}")` }}
      >
        <SiteNav />
        <div className="container cr-hero cr-detail-hero">
          <nav className="cr-breadcrumb" aria-label="breadcrumb">
            <BreadcrumbHome />
            <i className="fa-solid fa-angle-left mx-2 cr-breadcrumb-sep arrow"></i>
            <a className="Cr" href="/creators" data-i18n="nav_creators">
              صناع المحتوى
            </a>
          </nav>
          {loading ? (
            <CreatorsHeroSkeleton />
          ) : (
            <>
              {title ? <h1 className="cr-hero-title">{title}</h1> : null}
              {description ? <p className="cr-hero-desc">{description}</p> : null}
            </>
          )}
        </div>

        {/* Overlapping profile card */}
        {loading ? (
          <div className="container" aria-busy="true" aria-hidden="true">
            <div className="cr-profile-card">
              <Line width="40%" className="sk-line-title" />
              <Line width="70%" />
              <Line width="55%" />
            </div>
          </div>
        ) : creator && name ? (
          <div className="container">
            <div className="cr-profile-card">
              {socials.length > 0 && (
                <div className="cr-profile-social">
                  <span className="cr-profile-social-label">{label("socials")}</span>
                  <div className="cr-profile-social-icons">
                    {socials.map((social, i) => {
                      const platform = (social.platform || "").toLowerCase();
                      return (
                        <a
                          href={social.url!}
                          key={platform + i}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={social.platform || "social"}
                        >
                          <i className={SOCIAL_ICONS[platform] || "fa-solid fa-link"}></i>
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="cr-profile-avatar">
                <img src={creator.avatar_url || AVATAR_FALLBACK} alt={name} />
                {creator.is_verified && (
                  <span className="cr-profile-avatar-badge">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M5.9999 7.9999L7.33323 9.33323L9.9999 6.66657M5.22323 3.13123C5.70144 3.09307 6.15542 2.90503 6.52057 2.5939C6.93317 2.24208 7.45766 2.04883 7.9999 2.04883C8.54214 2.04883 9.06663 2.24208 9.47923 2.5939C9.84438 2.90503 10.2984 3.09307 10.7766 3.13123C11.3171 3.17423 11.8246 3.40845 12.208 3.79185C12.5914 4.17525 12.8256 4.68273 12.8686 5.22323C12.9067 5.70144 13.0948 6.15542 13.4059 6.52057C13.7577 6.93317 13.951 7.45766 13.951 7.9999C13.951 8.54214 13.7577 9.06663 13.4059 9.47923C13.0948 9.84438 12.9067 10.2984 12.8686 10.7766C12.8256 11.3171 12.5914 11.8246 12.208 12.208C11.8246 12.5914 11.3171 12.8256 10.7766 12.8686C10.2984 12.9067 9.84438 13.0948 9.47923 13.4059C9.06663 13.7577 8.54214 13.951 7.9999 13.951C7.45766 13.951 6.93317 13.7577 6.52057 13.4059C6.15542 13.0948 5.70144 12.9067 5.22323 12.8686C4.68273 12.8256 4.17525 12.5914 3.79185 12.208C3.40845 11.8246 3.17423 11.3171 3.13123 10.7766C3.09307 10.2984 2.90503 9.84438 2.5939 9.47923C2.24208 9.06663 2.04883 8.54214 2.04883 7.9999C2.04883 7.45766 2.24208 6.93317 2.5939 6.52057C2.90503 6.15542 3.09307 5.70144 3.13123 5.22323C3.17423 4.68273 3.40845 4.17525 3.79185 3.79185C4.17525 3.40845 4.68273 3.17423 5.22323 3.13123Z" stroke="white" strokeWidth="1.33333" strokeLinecap="round"/>
                    </svg>
                  </span>
                )}
              </div>

              <div className="cr-profile-name-row">
                <h2 className="cr-profile-name">{name}</h2>
                {followUrl && (
                  <button
                    type="button"
                    className="cr-profile-follow"
                    onClick={() => window.open(followUrl, "_blank", "noopener,noreferrer")}
                  >
                    {/* label first so the icon sits on the left in RTL, as in the mock */}
                    <span>{label("follow")}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M7.33301 8.83301C7.98221 8.83301 8.60498 8.95342 9.17871 9.17285C9.43655 9.27154 9.56543 9.56048 9.4668 9.81836C9.36813 10.0762 9.07919 10.2051 8.82129 10.1064C8.35987 9.92999 7.85813 9.83301 7.33301 9.83301H6C3.86804 9.83301 2.11031 11.4346 1.86328 13.5H7.66699C7.94298 13.5002 8.16699 13.724 8.16699 14C8.16699 14.276 7.94298 14.4998 7.66699 14.5H1.33301C1.05702 14.4998 0.833008 14.276 0.833008 14C0.833008 11.1465 3.14653 8.83301 6 8.83301H7.33301ZM12.333 8.83301C12.609 8.83301 12.8328 9.05702 12.833 9.33301V11.167H14.667C14.943 11.1672 15.167 11.391 15.167 11.667C15.1668 11.9429 14.9429 12.1668 14.667 12.167H12.833V14C12.833 14.2761 12.6092 14.5 12.333 14.5C12.057 14.4998 11.833 14.276 11.833 14V12.167H10C9.72397 12.167 9.50018 11.943 9.5 11.667C9.5 11.3908 9.72386 11.167 10 11.167H11.833V9.33301C11.8332 9.05712 12.0571 8.83318 12.333 8.83301ZM6.66699 1.5C8.41574 1.50018 9.83301 2.9182 9.83301 4.66699C9.83283 6.41564 8.41564 7.83283 6.66699 7.83301C4.9182 7.83301 3.50018 6.41574 3.5 4.66699C3.5 2.91809 4.91809 1.5 6.66699 1.5ZM6.66699 2.5C5.47038 2.5 4.5 3.47038 4.5 4.66699C4.50018 5.86346 5.47048 6.83301 6.66699 6.83301C7.86335 6.83283 8.83283 5.86335 8.83301 4.66699C8.83301 3.47048 7.86346 2.50018 6.66699 2.5Z" fill="#4C5C37"/>
                    </svg>
                  </button>
                )}
              </div>

              {bio && <p className="cr-profile-role">{bio}</p>}

              {stats.length > 0 && (
                <div className="cr-profile-stats">
                  {stats.map((stat) => (
                    <div className="cr-profile-stat" key={stat.key}>
                      <span className="cr-profile-stat-num">{compact(stat.value)}</span>
                      <span className="cr-profile-stat-label">{stat.suffix}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
