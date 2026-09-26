// @ts-nocheck
"use client";
/* eslint-disable */
import { useEffect, useRef, useState } from "react";
import { localized } from "@/lib/api/pages";
import { creatorHref } from "@/lib/api/creator-profile";
import { useLang } from "@/lib/use-lang";
import ContentCard from "./creator-content/ContentCard";
/* same full-screen viewer the محتوانا page uses: portalled above the navbar
   and carrying the Reels-style swipe gesture */
import ReelViewer from "@/components/content/ReelViewer";

/* "المحتوى" — a horizontal slider of the creator's reels (vertical poster
   cards) with circular prev/next nav arrows, from the profile payload's
   `content` block. The reels come from the creator's Instagram; while that is
   switched off in the admin (`status: "disabled"`) or nothing is synced, the
   list is empty and the section keeps its heading with a "no content yet"
   panel in place of the slider. A reel without a
   playable URL is skipped. The payload has no categories, so the mock's
   filter pills are gone. "رؤية المزيد" opens the creator's Instagram.

   The viewer's info bar names the creator (`meta`), and each reel's own
   caption when it has one. */
function reelVideo(item) {
  return item?.video_url || item?.media_url || "";
}

export default function CreatorContent({ content, creator, lang }) {
  const { tr } = useLang();
  const [openIndex, setOpenIndex] = useState(null);
  const trackRef = useRef(null);
  // disable a nav arrow once the track can't scroll any further that way
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const scroll = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 330, behavior: "smooth" });
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const updateEdges = () => {
      const max = el.scrollWidth - el.clientWidth;
      if (max <= 1) {
        setAtStart(true);
        setAtEnd(true);
        return;
      }
      // RTL scrollLeft can be negative; Math.abs normalizes to 0..max
      const pos = Math.abs(el.scrollLeft);
      setAtEnd(pos <= 1); // scroll(+1) direction exhausted
      setAtStart(pos >= max - 1); // scroll(-1) direction exhausted
    };
    updateEdges();
    el.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      el.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, [content]);

  const cards = (Array.isArray(content?.items) ? content.items : [])
    .map((item, i) => ({
      id: item.id ?? i,
      video: reelVideo(item),
      poster: item.thumbnail || item.thumbnail_url || undefined,
      caption:
        typeof item.caption === "string" ? item.caption : localized(item.caption, lang),
    }))
    .filter((card) => card.video);
  const isEmpty = !cards.length;

  const title = localized(content?.title, lang) || tr("cr_content_title");
  const viewMore = localized(content?.view_more, lang);
  const instagram = (content?.instagram_username || creator?.instagram_username || "").trim();
  const moreHref = instagram ? `https://instagram.com/${encodeURIComponent(instagram)}` : "";
  const meta = creator && {
    user: creator.name || "",
    avatar: creator.avatar_url || undefined,
    profile: creatorHref(creator) !== "#" ? creatorHref(creator) : undefined,
    caption: "",
    posted: "",
  };

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
          <button
            type="button"
            className="cr-content-nav cr-content-prev"
            onClick={() => scroll(-1)}
            disabled={atStart}
            aria-label="previous"
          >
            <i className="fa-solid fa-angle-right"></i>
          </button>
          <button
            type="button"
            className="cr-content-nav cr-content-next"
            onClick={() => scroll(1)}
            disabled={atEnd}
            aria-label="next"
          >
            <i className="fa-solid fa-angle-left"></i>
          </button>

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
