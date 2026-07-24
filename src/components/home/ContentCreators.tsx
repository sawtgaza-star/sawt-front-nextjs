// @ts-nocheck
/* eslint-disable */
import CreatorCard from "./CreatorCard";
import { CREATOR_CARDS } from "./content-creators-data";

export default function ContentCreators() {
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
            <h1
              className="creators-title"
              style={{ fontSize: "42px", fontWeight: "bolder" }}
            >
              {" "}
              <span data-i18n="creators_title_main">صُناع المحتوى</span>{" "}
              <span className="who-us" data-i18n="at_sawt">
                في صوت
              </span>{" "}
            </h1>{" "}
            <h4
              className="font-24 creators-subtitle"
              style={{ color: "rgba(72, 72, 72, 1)", marginTop: "20px" }}
              data-i18n="creators_desc_main"
            >
              مجموعة من صُنّاع المحتوى المبدعين الذين يوظفون مهاراتهم لإنتاج
              محتوى هادف ومؤثر.
            </h4>{" "}
          </div>{" "}
          <div className="owl-carousel creators-carousel2">
            {" "}
            {CREATOR_CARDS.map((card, i) => (
              <CreatorCard key={i} cardClass={card.cardClass} />
            ))}
          </div>{" "}
          <div className="text-center" style={{ marginTop: "50px " }}>
            {" "}
            <a href="/creators" className="px-4 py-2 fw-bold show-more-news">
              {" "}
              <span data-i18n="view_all">عرض الكل</span>{" "}
              <i className="fa-solid fa-angle-left me-2 arrow"></i>{" "}
            </a>{" "}
          </div>{" "}
        </div>{" "}
      </section>
    </>
  );
}
