// @ts-nocheck
"use client";
/* eslint-disable */
import { useRef, useState } from "react";
import { localized } from "@/lib/api/pages";
import { creatorHref } from "@/lib/api/creator-profile";
import { useLang } from "@/lib/use-lang";
import ContentCard from "./creator-content/ContentCard";
import { reelDetails } from "./creator-content/reel-data";
/* same full-screen viewer the محتوانا page uses: portalled above the navbar
   and carrying the Reels-style swipe gesture */
import ReelViewer from "@/components/content/ReelViewer";
import { useDragScroll } from "@/components/content/use-drag-scroll";

/* "المحتوى" — a horizontal row of the creator's reels (vertical poster
   cards), built like محتوانا's "الأكثر مشاهدة": it starts under the heading,
   runs off the far edge of the screen and scrolls by press-and-drag (no
   arrows) — see .cr-content-slider in creators.css. From the profile payload's
   `content` block. The reels come from the creator's Instagram; while that is
   switched off in the admin (`status: "disabled"`) or nothing is synced, the
   list is empty and the whole section is left out (heading included). A
   reel without a
   playable URL is skipped. The payload has no categories, so the mock's
   filter pills are gone. "رؤية المزيد" opens the creator's Instagram.

   The viewer's info bar names the creator (`meta`); the caption, time, likes
   and comments are each reel's own (`details`). */
function reelVideo(item) {
  return item?.video_url || item?.media_url || "";
}

export default function CreatorContent({ content, creator, lang }) {
  const { tr } = useLang();
  const [openIndex, setOpenIndex] = useState(null);
  const trackRef = useRef(null);

  const cards = (Array.isArray(content?.items) ? content.items : [])
    .map((item, i) => ({
      id: item.id ?? i,
      video: reelVideo(item),
      poster: item.thumbnail || item.thumbnail_url || undefined,
      caption:
        typeof item.caption === "string" ? item.caption : localized(item.caption, lang),
      details: reelDetails(item, lang),
    }))
    .filter((card) => card.video);
  const isEmpty = !cards.length;
  // the track only mounts once there are reels — bind the drag to it then
  useDragScroll(trackRef, [isEmpty]);

  const title = localized(content?.title, lang) || tr("cr_content_title");
  const viewMore = localized(content?.view_more, lang);
  const instagram = (content?.instagram_username || creator?.instagram_username || "").trim();
  const moreHref = instagram ? `https://instagram.com/${encodeURIComponent(instagram)}` : "";
  const meta = creator && {
    user: localized(creator.name, lang),
    avatar: creator.avatar_url || undefined,
    profile: creatorHref(creator) !== "#" ? creatorHref(creator) : undefined,
  };

  // no reels (Instagram off in the admin, or nothing synced): no section at
  // all — after every hook above, so the hook order never changes
  if (isEmpty) return null;

  return (
    <section className="cr-content-detail-section ">


      <div className="container position-relative">
          <img
            src="/assets/images/leaf_cutout.png"
            className="olive-branch branch-left-top-creator-section"
            alt="Olive Branch"
          />


        <div className="cr-content-head">
          {/* the wrapper is the scroll container on mobile, so the pill list
              itself never needs an overflow of its own */}
          <h2 className="cr-content-title">
            <span className="cr-highlight">{title}</span>
          </h2>
          {/* mobile mock only — sits opposite the title (hidden on desktop) */}
          {!isEmpty && moreHref && viewMore ? (
            <a className="cr-content-more" href={moreHref} target="_blank" rel="noopener noreferrer">
              {viewMore}
            </a>
          ) : null}
        </div>

        {isEmpty ? (
          <p className="cr-content-empty">{tr("cr_content_empty")}</p>
        ) : (
        <div className="cr-content-slider">
          <div className="cr-content-track" ref={trackRef} dir="rtl">
            {cards.map((card, i) => (
              <ContentCard card={card} index={i} key={card.id} onOpen={setOpenIndex} />
            ))}
          </div>
        </div>
        )}
      </div>

      {openIndex !== null && (
        <ReelViewer
          reels={cards}
          index={openIndex}
          onNavigate={setOpenIndex}
          onClose={() => setOpenIndex(null)}
          scope={`creator-${creator?.id ?? ""}`}
          meta={meta}
        />
      )}
    </section>
  );
}
