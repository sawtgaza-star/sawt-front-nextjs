// @ts-nocheck
"use client";
/* eslint-disable */

/* Single content-creator card — the exact home-page flip/hover card design
   (.main-container/.the-card/.front-face-img/.hover-overlay from style.css).
   Shared by CreatorsGrid (preview) and the /creators/all listing page. */
export type Creator = {
  id: number;
  photo: string;
  name: string;
  role: string;
  followers: string;
};

export default function CreatorCard({ item }: { item: Creator }) {
  return (
    <div className="item">
      <a href={`/creators/${item.id}`} className="text-decoration-none">
        <div className="main-container">
          <div className="the-card">
            <div className="face front-face-img w-100 h-100 overflow-hidden text-white">
              <div className="arrowDiv">
                <span className="followers" data-i18n="creator_followers">
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
                  data-i18n="creator_name"
                >
                  {item.name}
                </div>
                <div
                  className="job-tag p-2 text-center"
                  data-i18n="creator_role"
                >
                  {item.role}
                </div>
              </div>
              <div className="hover-overlay">
                <h4 className="hover-title" data-i18n="creator_overlay_title">
                  تجربتي مع صوت
                </h4>
                <p className="hover-desc" data-i18n="creator_quote">
                  تجربتي مع صوت كانت مختلفة، أخيراً لقيت مكان بيفهمني كمبدع ....
                </p>
                <span className="hover-arrow">
                  <i className="fa-solid fa-arrow-up"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
