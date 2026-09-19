// @ts-nocheck
/* eslint-disable */
import { localized } from "@/lib/api/pages";
import type { HomeJoinCta } from "@/lib/api/home";

/* The "انضم إلينا كصانع محتوى" banner. On the home page every word and the
   background come from the API's `join_cta` block; /creators renders the same
   banner with no payload behind it, so the built-in copy and image are kept as
   the fallback for that page — and with them their `data-i18n` keys, which are
   only ever attached when the API did NOT supply the text.

   `#openJoinModal` is what legacy-home's stepper binds to — the id stays. */
export default function JoinUs({
  creator,
  data,
  lang = "ar",
}: {
  creator?: string;
  data?: HomeJoinCta;
  lang?: string;
}) {
  const title = localized(data?.title, lang);
  const description = localized(data?.description, lang);
  const button = localized(data?.button?.label, lang);
  const image = data?.image_url || "/assets/images/join-img.jpg";

  return (
    <>
      <section className="join-us-section position-relative">
        {creator && (
          <img
            src="/assets/images/leaf_cutout.png"
            className="olive-branch branch-right-top-joinUs-section"
            alt="Olive Branch"
          />
        )}
        <div className="join-us-banner ">
          <img src={image} alt="" className="join-us-bg" />
          <div className="join-us-content text-center ">
            <h2 className="join-us-title" data-i18n={title ? undefined : "join_creator_title"}>
              {title || "انضم إلينا كصانع محتوى"}
            </h2>
            <p className="join-us-desc" data-i18n={description ? undefined : "join_creator_desc"}>
              {description || "صوت تجمع صناع المحتوى , كن صوت من لاصوت له"}
            </p>
            <a className="btn btn-dark-green join-us-btn" id="openJoinModal">
              <span data-i18n={button ? undefined : "join_creator_btn"}>
                {button || "طلب الانضمام"}
              </span>
              <i className="fa-solid fa-angle-left arrow"></i>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
