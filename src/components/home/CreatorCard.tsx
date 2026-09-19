// @ts-nocheck
/* eslint-disable */

/* A single home creators-carousel flip card, filled from the API's
   `creators.items`. `cardClass` still carries the per-card wrapper class so
   the first card (which the legacy markup left without `position-relative`)
   stays pixel-identical.

   No `data-i18n` here: the payload arrives in both languages and the caller
   picks one, so the DOM translator has nothing to do — and nothing of React's
   to overwrite. The arrow opens /creators/{id}; those numeric ids fall inside
   the range creators/[id] pre-renders for `output: 'export'`. */
export default function CreatorCard({
  cardClass,
  creator,
  experienceTitle,
  followersLabel,
}: {
  cardClass: string;
  creator: any;
  experienceTitle: string;
  followersLabel: string;
}) {
  return (
    <div className="item">
      {" "}
      <div className="text-decoration-none">
        {" "}
        <div className="main-container">
          {" "}
          <div className={cardClass}>
            {" "}
            <div className="face front-face-img w-100 h-100 overflow-hidden text-white">
              {" "}
              <div className="arrowDiv">
                {" "}
                {followersLabel ? (
                  <span className="followers">{followersLabel}</span>
                ) : null}{" "}
              </div>{" "}
              <div className="d-flex flex-column align-items-center pt-2">
                {" "}
                <div className="img-circle rounded-circle p-2 mb-3 d-flex justify-content-center align-items-center">
                  {" "}
                  {creator.avatar ? (
                    <img
                      className="rounded-circle object-fit-cover"
                      style={{ width: "95px", height: "95px" }}
                      src={creator.avatar}
                      alt={creator.name}
                    />
                  ) : null}{" "}
                </div>{" "}
                <div className="name-tag text-center mb-1">{creator.name}</div>{" "}
                <div className="job-tag p-2 text-center">{creator.role}</div>{" "}
              </div>{" "}
              <div className="hover-overlay">
                {" "}
                {experienceTitle ? (
                  <h4 className="hover-title">{experienceTitle}</h4>
                ) : null}{" "}
                {creator.excerpt ? (
                  <p className="hover-desc">{creator.excerpt}</p>
                ) : null}{" "}
                <a href={creator.href} className="hover-arrow">
                  {" "}
                  <i className="fa-solid fa-arrow-up"></i>{" "}
                </a>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
