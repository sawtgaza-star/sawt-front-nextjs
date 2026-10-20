"use client";
import SiteNav from "@/components/site/SiteNav";
import BreadcrumbHome from "@/components/site/BreadcrumbHome";
import { localized } from "@/lib/api/pages";
import type { CreatorsHeroContent } from "@/lib/api/creators-page";
import type { CreatorProfile, CreatorProfileLabels } from "@/lib/api/creator-profile";
import { CreatorsHeroSkeleton } from "./CreatorsSkeleton";
import { ProfileCardSkeleton } from "./CreatorProfileSkeleton";
import { compact } from "./creators-text";
import { useCallback, useState } from "react";
import { follow, unfollow, useFollows } from "@/lib/follows";
import { isLoggedIn } from "@/lib/auth-state";
import { type NewsletterNotice } from "@/components/site/NewsletterToast";
import LoginRequiredDialog from "@/components/site/LoginRequiredDialog";
import { pushNotification } from "@/lib/notifications";
import { t } from "@/lib/translations";

const HERO_IMAGE = "/assets/images/heroSectionImg.jpeg";
const AVATAR_FALLBACK = encodeURI("/assets/images/Image (أحمد المنصور).png");

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
   the profile is in flight the copy and the card are skeletons. "متابعة"
   follows the creator (POST /pages/creators/{uuid}/follow) — they then appear
   in /account's "صناع المحتوى" tab — and flips to "إلغاء المتابعة" (DELETE);
   a guest stays on the page and gets a "sign in first" toast instead. Whether they are already followed comes
   from the user's profile (GET /auth/profile, lib/follows). */
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
  const uuid = creator?.uuid || (creator?.id != null ? String(creator.id) : "");
  const following = useFollows().creators.some((c) => c.uuid === uuid);
  const [busy, setBusy] = useState(false);
  const [guestNotice, setGuestNotice] = useState<NewsletterNotice | null>(null);
  const closeGuestNotice = useCallback(() => setGuestNotice(null), []);

  async function toggleFollow() {
    if (!isLoggedIn()) {
      setGuestNotice({ kind: "error", message: t("follow_login_required") });
      return;
    }
    if (busy) return;
    setBusy(true);
    try {
      if (following) {
        await unfollow(uuid);
      } else {
        await follow({
          uuid,
          name,
          avatar: creator?.avatar_url || null,
          role: creator?.role,
          followers: creator?.stats?.followers ?? null,
          videos: creator?.stats?.videos ?? null,
        });
        pushNotification({ kind: "follow", params: { name }, href: "/account#creators" });
      }
    } catch (error) {
      console.warn("[follow] request failed:", error);
    } finally {
      setBusy(false);
    }
  }

  const stats = [
    { key: "views", value: creator?.stats?.views, suffix: label("views_suffix") },
    { key: "followers", value: creator?.stats?.followers, suffix: label("followers_suffix") },
    { key: "videos", value: creator?.stats?.videos, suffix: label("videos_suffix") },
  ].filter((stat) => compact(stat.value));

  return (
    <header>
      <div
        className={`cr-header cr-detail-header py-1${loading ? " hero-bg-loading" : ""}`}
        style={loading ? undefined : { background: `url("${hero?.image_url || HERO_IMAGE}")` }}
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
          <ProfileCardSkeleton />
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
                  <span className="cr-profile-avatar-badge" title="حساب موثّق" aria-label="حساب موثّق">
                    {/* official "verified" seal: blue scalloped rosette, white tick */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 2.6A3 3 0 0 1 16.7 3.86A3 3 0 0 1 20.14 7.3A3 3 0 0 1 21.4 12A3 3 0 0 1 20.14 16.7A3 3 0 0 1 16.7 20.14A3 3 0 0 1 12 21.4A3 3 0 0 1 7.3 20.14A3 3 0 0 1 3.86 16.7A3 3 0 0 1 2.6 12A3 3 0 0 1 3.86 7.3A3 3 0 0 1 7.3 3.86A3 3 0 0 1 12 2.6Z" fill="#1877F2" />
                      <path d="M8 12.3l2.7 2.7L16.2 9.5" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                )}
              </div>

              <div className="cr-profile-name-row">
                <h2 className="cr-profile-name">{name}</h2>
                {uuid && (
                  <button
                    type="button"
                    className={"cr-profile-follow" + (following ? " is-following" : "")}
                    onClick={toggleFollow}
                    aria-pressed={following}
                    aria-busy={busy}
                  >
                    {/* label first so the icon sits on the left in RTL, as in the mock */}
                    <span>
                      {following ? t("acc_unfollow") : label("follow") || t("acc_follow")}
                    </span>
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
      {/* guest pressed "متابعة" — a portal, so where it sits doesn't matter */}
      {guestNotice ? (
        <LoginRequiredDialog onClose={closeGuestNotice} />
      ) : null}
    </header>
  );
}
