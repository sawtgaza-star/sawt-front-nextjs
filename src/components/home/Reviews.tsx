// @ts-nocheck
"use client";
/* eslint-disable */
import "@/styles/home-reels.css";
import { useEffect } from "react";
import { localized, localizedHtml } from "@/lib/api/pages";
import type { HomeReviews, HomeReviewReel } from "@/lib/api/home";
import { bySortOrder, splitHeading } from "./home-text";
import ReviewReel from "./reviews/ReviewReel";
import ReelsEmpty from "./reviews/ReelsEmpty";
import { reviewComments } from "./reviews-data";
import { useNearViewport } from "./use-near-viewport";
import { useReelAutoplay } from "./reviews/use-reel-autoplay";
import RichText from "@/components/ui/RichText";

/* "آراؤكم في المحتوى" — the whole section is the API's `reviews` block now:
   the heading and the lead, the reel column beside them, and the comment
   thread. The bundled demo reel (one file repeated three times, titled
   "قصة أمل من غزة" with a hard-coded "200k مشاهدة") and the invented comments
   in lib/legacy-main are gone.

   WHAT STILL BELONGS TO THE LEGACY SCRIPT
   ---------------------------------------
   The player, the like / save / share buttons, the comment list and its
   counter are one DOM machine in lib/legacy-main (roadmap item 5 is porting it
   to React state). Only its DATA moved: the reels are rendered here from the
   payload — the script finds them by the same `.reel-item` / `data-index`
   markup it always did — and the thread is handed over by the effect below.

   ONE THREAD PER REEL. Each reel carries its latest Instagram comments
   (`comment_items`), so the list swaps as you scroll from reel to reel and
   the counter is that reel's count. The section's own `reviews.comments` is
   the thread only when the column has no reels.

   The lead loses one flourish in the move: the legacy copy painted its second
   word in the accent colour through an inline <span class="hl"> carried in the
   translation string. The API sends one flat string, and which word should be
   accented cannot be guessed from it, so the paragraph renders plain. */
export default function Reviews({
  data,
  lang = "ar",
}: {
  data?: HomeReviews;
  lang?: string;
}) {
  const title = localized(data?.title, lang);
  const [titleHead, titleTail] = splitHeading(title, 1);
  const description = localizedHtml(data?.description, lang);

  /* `reels_enabled: false` is an editor switching the column off; an item with
     no playable file is one Instagram served nothing for, and would be a black
     rectangle with a play button that does nothing. */
  const reels: HomeReviewReel[] =
    data?.reels_enabled === false
      ? []
      : bySortOrder(data?.reels).filter((reel) => reel.video_url);

  /* Empty column: a feed failure (any `reels_status` but "ok", or no payload
     at all) gets the error note, an empty but healthy feed the "no reels"
     one — see ReelsEmpty. The API's raw `reels_message` is for developers. */
  const reelsError =
    !data || (data.reels_enabled !== false && !!data.reels_status && data.reels_status !== "ok");
  useEffect(() => {
    if (reelsError && data?.reels_message) {
      console.warn("[reviews] reels unavailable:", data.reels_status, data.reels_message);
    }
  }, [reelsError, data]);

  /* The posters are attached only once the column nears the viewport — see
     use-near-viewport for why. Until then each reel is its own dark frame,
     the same box it has with a poster, so nothing moves when they appear. */
  const [reelsRef, reelsNear] = useNearViewport<HTMLDivElement>();
  /* the reel on screen starts by itself once the column is in view */
  useReelAutoplay(reelsRef, reels.length > 0);

  /* Hand the thread to lib/legacy-main. The copy on `window` is for ordering:
     LegacyInit imports that module dynamically, so on the first paint the
     setter may not exist yet — its own boot (and replayComments, on a repeat
     visit) reads this back through __loadReviewComments. */
  useEffect(() => {
    const payload = {
      count: data?.comments?.count ?? 0,
      items: reviewComments(data?.comments?.items, lang),
      /* each reel's own Instagram comments, in the column's order (the same
         `reels` as the data-index below) — the list follows the reel on
         screen. The count is Instagram's total, which can exceed the latest
         ten that come with the reel. */
      reels: reels.map((reel) => {
        const items = reviewComments(reel.comment_items, lang);
        return {
          count: Math.max(reel.comments_count ?? 0, items.length),
          items,
          // a comment written here is sent to the reel on Instagram
          permalink: reel.permalink || "",
        };
      }),
    };
    (window as any).__sawtReviewComments = payload;
    (window as any).__setReviewsComments?.(payload);
  }, [data, lang]);

  return (
    <>
      <section className="stories-section reviews-section">
        <div className="reviews-inner">
          <div
            className="row g-4 align-items-center justify-content-center"
            style={{
              backgroundColor: "rgba(237, 239, 235, 1)",
              padding: "0px 30px 30px 30px",
              borderRadius: "20px",
              marginTop: "10px",
            }}
          >
            <div className="col-lg-3 col-md-12">
              <div className="reviews-intro">
                {title ? (
                  <h2 className="reviews-title fw-bold">
                    <span>{titleHead}</span>{" "}
                    <span className="reviews-highlight">{titleTail}</span>
                  </h2>
                ) : null}
                {description ? <RichText as="p" className="reviews-desc" html={description} /> : null}
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="review-reels reels-container" id="reelsContainer" ref={reelsRef}>
                {reels.map((reel, index) => (
                  <ReviewReel
                    key={reel.id ?? index}
                    reel={reel}
                    index={index}
                    near={reelsNear}
                    lang={lang}
                  />
                ))}
                {!reels.length ? <ReelsEmpty error={reelsError} /> : null}
              </div>
            </div>

            <div className="col-lg-6 col-md-6">
              <div className="comments-card reviews-comments">
                <div className="reviews-comments-head p-4">
                  <div className="comments-count-group">
                    <span className="comments-head-icon">
                      <i>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                          <path d="M0 0h24v24H0z" fill="none"></path>
                          <g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5">
                            <path strokeLinejoin="round" d="M8 13.5h8m-8-5h4"></path>
                            <path d="M6.099 19q-1.949-.192-2.927-1.172C2 16.657 2 14.771 2 11v-.5c0-3.771 0-5.657 1.172-6.828S6.229 2.5 10 2.5h4c3.771 0 5.657 0 6.828 1.172S22 6.729 22 10.5v.5c0 3.771 0 5.657-1.172 6.828S17.771 19 14 19c-.56.012-1.007.055-1.445.155c-1.199.276-2.309.89-3.405 1.424c-1.563.762-2.344 1.143-2.834.786c-.938-.698-.021-2.863.184-3.865"></path>
                          </g>
                        </svg>
                      </i>
                    </span>
                    {/* the legacy script rewrites this on mount and after every
                        language toggle — it carries no data-i18n for that reason */}
                    <span className="comments-count">
                      التعليقات ({data?.comments?.count ?? 0})
                    </span>
                  </div>
                  <div className="tab-row">
                    <button
                      className="tab"
                      onClick={(e) => {
                        (window as any).setTab(e.currentTarget, "الأقدم");
                      }}
                      data-i18n="tab_oldest"
                    >
                      الأقدم
                    </button>{" "}
                    <button
                      className="tab active"
                      onClick={(e) => {
                        (window as any).setTab(e.currentTarget, "الأحدث");
                      }}
                      data-i18n="tab_newest"
                    >
                      الأحدث
                    </button>
                  </div>
                </div>
                <div className="comments-list" id="commentsList"></div>
                <div className="comment-input-row p-4">
                  <textarea
                    className="comment-input"
                    id="newComment"
                    rows={1}
                    placeholder="اترك تعليقك هنا..."
                    data-i18n-placeholder="comment_placeholder"
                    style={{ textAlign: "start" }}
                  ></textarea>
                  <button
                    className="rs-send"
                    onClick={() => {
                      (window as any).addComment();
                    }}
                  >
                    <i>
                      <svg xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.2em" viewBox="0 0 24 24">
                        <path d="M0 0h24v24H0z" fill="none"></path>
                        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m9.498 15l7.5-7.5m-8.992.179l7.321-3.46c3.042-1.438 4.563-2.157 5.533-1.436s.693 2.365.138 5.652l-.954 5.662c-.363 2.149-.544 3.223-1.345 3.692s-1.842.109-3.923-.611l-6.365-2.202c-3.892-1.346-5.838-2.019-5.91-3.34c-.074-1.32 1.786-2.2 5.505-3.957M9.498 15.5v2.227c0 2.374 0 3.56.71 3.75s1.458-.798 2.954-2.773l.836-1.204"></path>
                      </svg>
                    </i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
