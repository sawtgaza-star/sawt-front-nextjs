// @ts-nocheck
/* eslint-disable */

/* A single home creators-carousel flip card (static). `cardClass` carries the
   per-card wrapper class so card 1 (no `position-relative`) stays pixel-identical
   to the legacy markup. */
export default function CreatorCard({ cardClass }: { cardClass: string }) {
  return (
    <div className="item">
      {" "}
      <a href="/creators/1" className="text-decoration-none">
        {" "}
        <div className="main-container">
          {" "}
          <div className={cardClass}>
            {" "}
            <div className="face front-face-img w-100 h-100 overflow-hidden text-white">
              {" "}
              <div className="arrowDiv">
                {" "}
                <span
                  className="followers"
                  data-i18n="creator_followers"
                >
                  31.4K متابع
                </span>{" "}
              </div>{" "}
              <div className="d-flex flex-column align-items-center pt-2">
                {" "}
                <div className="img-circle rounded-circle p-2 mb-3 d-flex justify-content-center align-items-center">
                  {" "}
                  <img
                    className="rounded-circle object-fit-cover"
                    style={{ width: "95px", height: "95px" }}
                    src="/assets/images/محمود زعيتر 2.png"
                    alt="محمود زعيتر"
                  />{" "}
                </div>{" "}
                <div
                  className="name-tag text-center mb-1"
                  data-i18n="creator_name"
                >
                  محمود عبدالله زعيتر
                </div>{" "}
                <div
                  className="job-tag p-2 text-center"
                  data-i18n="creator_role"
                >
                  ممثل مسرحية
                </div>{" "}
              </div>{" "}
              <div className="hover-overlay">
                {" "}
                <h4
                  className="hover-title"
                  data-i18n="creator_overlay_title"
                >
                  تجربتي مع صوت
                </h4>{" "}
                <p className="hover-desc" data-i18n="creator_quote">
                  تجربتي مع صوت كانت مختلفة، أخيراً لقيت مكان بيفهمني
                  كمبدع ....
                </p>{" "}
                <span className="hover-arrow">
                  {" "}
                  <i className="fa-solid fa-arrow-up"></i>{" "}
                </span>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </a>{" "}
    </div>
  );
}
