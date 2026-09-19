// @ts-nocheck
"use client";
/* eslint-disable */

/* Single content-creator card — the exact home-page flip/hover card design
   (.main-container/.the-card/.front-face-img/.hover-overlay from style.css).
   Shared by CreatorsGrid (filled from GET /pages/creators) and the
   /creators/all listing page (still its own placeholder roster).

   Every text field has two sources: the payload, when CreatorsGrid passes it
   (`translated`) — rendered plain, because it arrives in both languages and
   the caller has already picked one — and the built-in Arabic copy with its
   `data-i18n` key, which is what /creators/all and a failed request still
   show. A key is only ever attached to copy the API did NOT supply, so the DOM
   translator never overwrites payload text. */
export type Creator = {
  /** Absent on a row the API sent without one — such a card is not linkable. */
  id?: number;
  photo: string;
  name: string;
  role: string;
  followers: string;
  /** From the payload: the hover panel's heading and body, and the profile. */
  experienceTitle?: string;
  excerpt?: string;
  href?: string;
};

export default function CreatorCard({
  item,
  translated = false,
}: {
  item: Creator;
  /** The card's text came from the payload — keep the translator off it. */
  translated?: boolean;
}) {
  return (
    <div className="item">
      <div className="text-decoration-none">
        <div className="main-container">
          <div className="the-card">
            <div className="face front-face-img w-100 h-100 overflow-hidden text-white">
              <div className="arrowDiv">
                <span
                  className="followers"
                  data-i18n={translated ? undefined : "creator_followers"}
                >
                  {item.followers}
                </span>
              </div>
              <div className="d-flex flex-column align-items-center pt-2">
                <div className="img-circle rounded-circle p-2 mb-3 d-flex justify-content-center align-items-center">
                  <img
                    className="rounded-circle object-fit-cover"
                    style={{ width: "95px", height: "95px" }}
                    src={item.photo}
                    alt={item.name}
                  />
                </div>
                <div
                  className="name-tag text-center mb-1"
                  data-i18n={translated ? undefined : "creator_name"}
                >
                  {item.name}
                </div>
                <div
                  className="job-tag p-2 text-center"
                  data-i18n={translated ? undefined : "creator_role"}
                >
                  {item.role}
                </div>
              </div>
              <div className="hover-overlay">
                <h4
                  className="hover-title"
                  data-i18n={translated ? undefined : "creator_overlay_title"}
                >
                  {item.experienceTitle || "تجربتي مع صوت"}
                </h4>
                <p
                  className="hover-desc"
                  data-i18n={translated ? undefined : "creator_quote"}
                >
                  {item.excerpt ||
                    "تجربتي مع صوت كانت مختلفة، أخيراً لقيت مكان بيفهمني كمبدع ...."}
                </p>
                <a href={item.href || `/creators/${item.id}`} className="hover-arrow">
                  <i className="fa-solid fa-arrow-up"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
