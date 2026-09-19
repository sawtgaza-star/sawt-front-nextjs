// @ts-nocheck
/* eslint-disable */
import CreatorCard from "@/components/creators/CreatorCard";
import { localized } from "@/lib/api/pages";
import type { CreatorsGridContent } from "@/lib/api/creators-page";
import { creatorCards } from "./creator-cards";
import { splitEnds } from "./creators-text";

/* "+47 صانع محتوى ناجح في صوت" — the API's `grid` block, in the same card
   design as the home page (ContentCreators flip/hover card).

   The heading's two accents are the legacy markup's: the count in orange at
   the front, the brand in green at the back ("+47 · صانع محتوى ناجح في ·
   صوت"), which is where the designer put them in Arabic and in English alike
   — see splitEnds in ./creators-text.

   The olive branches stay — they are the section's background art, positioned
   by creators.css, not content the API knows about. */
export default function CreatorsGrid({
  data,
  lang = "ar",
}: {
  data?: CreatorsGridContent;
  lang?: string;
}) {
  const title = localized(data?.title, lang);
  const [count, titleMid, brand] = splitEnds(title, 1, 1);
  const subtitle = localized(data?.subtitle, lang);
  const browse = localized(data?.browse_label, lang);
  const experienceTitle = localized(data?.experience_title, lang);
  const followersSuffix = localized(data?.followers_suffix, lang);

  const creators = creatorCards(data?.creators, lang, {
    experienceTitle,
    followersSuffix,
  });

  if (!title && !subtitle && !creators.length) return null;

  return (
    <section className="content-section cr-grid-section">
          <div className="container position-relative">

          <img
            src="/assets/images/leaf_cutout.png"
            className="olive-branch branch-right-top-creators-section"
            alt="Olive Branch"
          />
          <img
            src="/assets/images/leaf_cutout.png"
            className="olive-branch branch-left-bottom-creators-section"
            alt="Olive Branch"
          />{" "}
        <div className="cr-section-head">
          {title ? (
            <h2 className="cr-section-title">
              <span className="cr-title-orange">{count}</span>{" "}
              <span>{titleMid}</span>{" "}
              <span className="cr-highlight">{brand}</span>
            </h2>
          ) : null}
          {subtitle ? <p className="cr-section-sub">{subtitle}</p> : null}
        </div>
        <div className="cr-creators-grid">
          {creators.map((c) => (
            <CreatorCard key={c.key} item={c} translated />
          ))}
        </div>
        <div className="text-center" style={{ marginTop: "50px" }}>
          {" "}
          <a href="/creators/all" className="px-4 py-2 fw-bold show-more-news">
            {" "}
            <span data-i18n={browse ? undefined : "view_all"}>
              {browse || "عرض الكل"}
            </span>{" "}
            <i className="fa-solid fa-angle-left me-2 arrow"></i>{" "}
          </a>{" "}
        </div>{" "}
      </div>
    </section>
  );
}
