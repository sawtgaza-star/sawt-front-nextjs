// @ts-nocheck
/* eslint-disable */
/* Desktop "اقسام صوت" column. */
export default function FooterQuickLinks() {
  return (
    <div
      className="col col-lg-3 col-md-6 text-white"
      style={{ textAlign: "start" }}
    >
      {" "}
      <h5
        className="fw-bold mb-4 text-white"
        data-i18n="footer_sawt_sections"
      >
        اقسام صوت
      </h5>{" "}
      <ul className="list-unstyled p-0 footer-links">
        {" "}
        <li className="mb-4">
          {" "}
          <a href="/" className="text-white text-decoration-none small">
            {" "}
            <span data-i18n="footer_sawt_platform">منصة صوت</span>
          </a>{" "}
        </li>{" "}
        <li className="mb-4">
          {" "}
          <a href="/incubator" className="text-white text-decoration-none small">
            {" "}
            <span data-i18n="nav_incubator">حاضنة صوت</span>
          </a>{" "}
        </li>{" "}
        <li className="mb-4">
          {" "}
          <a href="/media" className="text-white text-decoration-none small">
            {" "}
            <span data-i18n="nav_media">صوت ميديا</span>
          </a>{" "}
        </li>{" "}
      </ul>{" "}
    </div>
  );
}
