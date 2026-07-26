// @ts-nocheck
/* eslint-disable */
/* Desktop "روابط سريعة" column. */
export default function FooterQuickLinks() {
  return (
    <div
      className="col col-lg-3 col-md-6 text-white"
      style={{ textAlign: "right" , marginLeft: "30px" , width : "150px"}}
    >
      {" "}
      <h5 className="fw-bold mb-4 text-white" data-i18n="footer_quick_links">
        روابط سريعة
      </h5>{" "}
      <ul className="list-unstyled p-0 footer-links ">
        {" "}
        <li className="mb-4">
          {" "}
          <a href="#" className="text-white text-decoration-none small"
          style={{ fontSize: "14px" }}>
            {" "}
            <span data-i18n="footer_backstage">الكواليس</span>
          </a>{" "}
        </li>{" "}
        <li className="mb-4">
          {" "}
          <a href="#" className="text-white text-decoration-none small"
          style={{ fontSize: "14px" }}>
            {" "}
            <span data-i18n="footer_media_kit">MEDIA KIT</span>
          </a>{" "}
        </li>{" "}
        <li className="mb-4">
          {" "}
          <a href="#" className="text-white text-decoration-none small"
          style={{ fontSize: "14px" }}>
            {" "}
            <span data-i18n="footer_impact_stories">Impact Stories</span>
          </a>{" "}
        </li>{" "}
        <li className="mb-4">
          {" "}
          <a href="#" className="text-white text-decoration-none small"
          style={{ fontSize: "14px" }}>
            {" "}
            <span data-i18n="footer_blog">المدونة</span>
          </a>{" "}
        </li>{" "}
        <li className="mb-4">
          {" "}
          <a href="#" className="text-white text-decoration-none small"
          style={{ fontSize: "14px" }}>
            {" "}
            <span data-i18n="footer_faq">الأسئلة الشائعة</span>
          </a>{" "}
        </li>{" "}
      </ul>{" "}
    </div>
  );
}
