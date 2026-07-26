// @ts-nocheck
/* eslint-disable */
/* Desktop "الأقسام الرئيسية" column (two link lists). */
export default function FooterMainSections() {
  return (
    <div
      className="col col-lg-3 col-md-6 text-white   "
      style={{ textAlign: "right", marginRight: "70px" }}
      // style={{ textAlign: "start" }}
    >
      {" "}
      <h5
        className="fw-bold mb-4 text-white"
        data-i18n="footer_main_sections"
      >
        الأقسام الرئيسية
      </h5>{" "}
      <div className="row  ">
        {" "}
        <div className="col col-lg-6">
          {" "}
          <ul className="list-unstyled footer-links">
            {" "}
            <li className="mb-4">
              {" "}
              <a
                href="#"
                className="text-white text-decoration-none small "
                style={{ fontSize: "14px" }}
              >
                {" "}
                <span data-i18n="nav_home">الرئيسية</span>
              </a>{" "}
            </li>{" "}
            <li className="mb-4">
              {" "}
              <a
                href="#"
                className="text-white text-decoration-none small "
                style={{ fontSize: "14px" }}
              >
                {" "}
                <span data-i18n="nav_about">من نحن</span>
              </a>{" "}
            </li>{" "}
            <li className="mb-4">
              {" "}
              <a
                href="/team"
                className="text-white text-decoration-none small"
                style={{ fontSize: "14px" }}
              >
                {" "}
                <span data-i18n="nav_team">الفريق</span>
              </a>{" "}
            </li>{" "}
          </ul>{" "}
        </div>{" "}
        <div className="col-lg-6 main-links ">
          {" "}
          <ul className="list-unstyled p-0 footer-links">
            {" "}
            <li className="mb-4">
              {" "}
              <a
                href="#"
                className="text-white text-decoration-none small"
                style={{ fontSize: "14px" }}
              >
                {" "}
                <span data-i18n="nav_creators">صناع المحتوى</span>
              </a>{" "}
            </li>{" "}
            <li className="mb-4">
              {" "}
              <a
                href="#"
                className="text-white text-decoration-none small"
                style={{ fontSize: "14px" }}
              >
                {" "}
                <span data-i18n="nav_incubator">حاضنة صوت</span>
              </a>{" "}
            </li>{" "}
            <li className="mb-4">
              {" "}
              <a
                href="#"
                className="text-white text-decoration-none small"
                style={{ fontSize: "14px" }}
              >
                {" "}
                <span data-i18n="nav_media">صوت ميديا</span>
              </a>{" "}
            </li>{" "}
          </ul>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
