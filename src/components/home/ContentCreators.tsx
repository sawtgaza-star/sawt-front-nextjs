// @ts-nocheck
/* eslint-disable */
import CreatorCard from "./CreatorCard";
import { localized } from "@/lib/api/pages";
import type { HomeCreators } from "@/lib/api/home";
import { splitHeading, formatFollowers } from "./home-text";

/* The API's `creators` block. The heading's accent falls on its last two
   words ("… في صوت" / "… in Sawt") — see splitHeading in ./home-text.

   `content-creators-data.ts` used to list five identical cards just to carry
   one class each; the roster is the API's now, and the only thing left of that
   file is the quirk it existed for: card 1 has no `position-relative` on its
   inner wrapper in the legacy markup, so index 0 doesn't get it here either.

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
  const experienceTitle = localized(data?.experience_title, lang);
  const followersSuffix = localized(data?.followers_suffix, lang);

  const creators = (Array.isArray(data?.items) ? data.items : []).map((item) => {
    const count = formatFollowers(item.followers_count);
    return {
      key: item.uuid || item.id,
      name: item.name || "",
      role: localized(item.role, lang),
      avatar: item.avatar_url,
      excerpt: localized(item.experience_excerpt, lang),
      href: item.id != null ? `/creators/${item.id}` : "#",
      followersLabel: count
        ? [count, followersSuffix].filter(Boolean).join(" ")
        : "",
    };
  });

  if (!title && !description && !creators.length) return null;

  return (
    <>
      <section className="content-section my-5">
        {" "}
        <div className="container position-relative">
          {" "}
          <img
            src="/assets/images/leaf_cutout.png"
            className="olive-branch branch-right-top-home-section"
            alt="Olive Branch"
          />{" "}
          <img
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
                cardClass={i === 0 ? "the-card" : "the-card position-relative"}
                creator={creator}
                experienceTitle={experienceTitle}
                followersLabel={creator.followersLabel}
              />
            ))}
          </div>{" "}
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
