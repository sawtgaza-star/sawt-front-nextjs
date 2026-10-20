// @ts-nocheck
/* eslint-disable */
import CreatorCard from "./CreatorCard";
import CreatorFollowWiring from "./CreatorFollowWiring";
import CreatorPopWiring from "./CreatorPopWiring";
import "@/styles/home-creator-card.css";
import { localized } from "@/lib/api/pages";
import { creatorHref } from "@/lib/api/creator-profile";
import type { HomeCreators } from "@/lib/api/home";
import { splitHeading, formatFollowers } from "./home-text";
import { htmlToLines } from "@/lib/html-text";

/* The API's `creators` block. The heading's accent falls on its last two
   words ("… في صوت" / "… in Sawt") — see splitHeading in ./home-text.

   Each card is the photo card from the mock (see ./CreatorCard): its line of
   bio is the creator's `experience_excerpt`, or their role when there is
   none; the "متابعة +" pill is made to work by CreatorFollowWiring.

   The olive branches stay — they are the section's background art, positioned
   by style.css, not content the API knows about.

   "عرض الكل" opens /creators/all, the full paginated roster (GET
   /pages/creators/all), rather than the /creators landing page. */
export default function ContentCreators({
  data,
  lang = "ar",
}: {
  data?: HomeCreators;
  lang?: string;
}) {
  const title = localized(data?.title, lang);
  const [titleHead, titleTail] = splitHeading(title, 2);
  const description = localized(data?.description, lang);
  const viewAll = localized(data?.view_all?.label, lang);
  const followLabel = lang === "en" ? "Follow" : "متابعة";
  const unfollowLabel = lang === "en" ? "Unfollow" : "إلغاء المتابعة";

  const creators = (Array.isArray(data?.items) ? data.items : []).map((item) => ({
    key: item.uuid || item.id,
    uuid: item.uuid || (item.id != null ? String(item.id) : ""),
    name: item.name || "",
    // the excerpt may arrive as CMS HTML ('<p dir="rtl">…</p>') — words only,
    // on one run so the card's two-line clamp applies
    bio:
      htmlToLines(localized(item.experience_excerpt, lang)).replace(/\n/g, " ") ||
      localized(item.role, lang),
    avatar: item.avatar_url,
    followers: formatFollowers(item.followers_count),
    followersCount: item.followers_count,
    href: creatorHref(item),
    verified: item.is_verified === true,
  }));

  if (!title && !description && !creators.length) return null;

  return (
    <>
      {/* id: sign-in from a card's "متابعة" comes back to /#creators */}
      <section id="creators" className="content-section my-5">
        {" "}
        <div className="container position-relative">
          {" "}
          <img loading="lazy" decoding="async"
            src="/assets/images/leaf_cutout.png"
            className="olive-branch branch-right-top-home-section"
            alt="Olive Branch"
          />{" "}
          <img loading="lazy" decoding="async"
            src="/assets/images/leaf_cutout.png"
            className="olive-branch branch-left-bottom-home-section"
            alt="Olive Branch"
          />{" "}
          <div className="text-center mb-5">
            {" "}
            {title ? (
              <h1
                className="creators-title"
                style={{ fontSize: "40px", fontWeight: "bolder" }}
              >
                {" "}
                <span>{titleHead}</span>{" "}
                <span className="who-us">{titleTail}</span>{" "}
              </h1>
            ) : null}{" "}
            {description ? (
              <h4
                className="font-24 creators-subtitle"
                style={{ color: "rgba(72, 72, 72, 1)", marginTop: "20px" }}
              >
                {description}
              </h4>
            ) : null}{" "}
          </div>{" "}
          <div className="owl-carousel creators-carousel2">
            {" "}
            {creators.map((creator, i) => (
              <CreatorCard
                key={creator.key ?? i}
                creator={creator}
                dir={lang === "en" ? "ltr" : "rtl"}
                followLabel={followLabel}
                unfollowLabel={unfollowLabel}
              />
            ))}
          </div>{" "}
          <CreatorFollowWiring />
          <CreatorPopWiring />
          {viewAll ? (
            <div className="text-center creators-viewall" style={{ marginTop: "50px " }}>
              {" "}
              <a href="/creators/all" className="px-4 py-2 fw-bold show-more-news">
                {" "}
                <span>{viewAll}</span>{" "}
                <i className="fa-solid fa-angle-left me-2 arrow"></i>{" "}
              </a>{" "}
            </div>
          ) : null}{" "}
        </div>{" "}
      </section>
    </>
  );
}
