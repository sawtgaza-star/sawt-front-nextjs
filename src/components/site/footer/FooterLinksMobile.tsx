// @ts-nocheck
/* eslint-disable */
/* Mobile footer links — two titled sections side by side. */
export default function FooterLinksMobile() {
  return (
    <div className="col-12 footer-links-mobile">
      {" "}
      {/*  القسم الأول: الأقسام الرئيسية (عمودان)  */}{" "}
      <div className="footer-links-section footer-links-section-main">
        {" "}
        <h5
          className="footer-links-mobile-title"
          data-i18n="footer_main_sections"
        >
          الأقسام الرئيسية
        </h5>{" "}
        <div className="footer-links-mobile-grid footer-links-mobile-two">
          {" "}
          <ul className="list-unstyled footer-links">
            {" "}
            <li>
              {" "}
              <a href="/" className="text-white text-decoration-none">
                {" "}
                <span data-i18n="nav_home">الرئيسية</span>
              </a>{" "}
            </li>{" "}
            <li>
              {" "}
              <a href="/about" className="text-white text-decoration-none">
                {" "}
                <span data-i18n="nav_about">من نحن</span>
              </a>{" "}
            </li>{" "}
            <li>
              {" "}
              <a href="/team" className="text-white text-decoration-none">
                {" "}
                <span data-i18n="nav_team">الفريق</span>
              </a>{" "}
            </li>{" "}
          </ul>{" "}
          <ul className="list-unstyled footer-links">
            {" "}
            <li>
              {" "}
              <a href="/creators" className="text-white text-decoration-none">
                {" "}
                <span data-i18n="nav_creators">صناع المحتوى</span>
              </a>{" "}
            </li>{" "}
            <li>
              {" "}
              <a href="/content" className="text-white text-decoration-none">
                {" "}
                <span data-i18n="nav_content">محتوانا</span>
              </a>{" "}
            </li>{" "}
          </ul>{" "}
        </div>{" "}
      </div>{" "}
      {/*  القسم الثاني: اقسام صوت (عمود واحد)  */}{" "}
      <div className="footer-links-section footer-links-section-quick">
        {" "}
        <h5
          className="footer-links-mobile-title"
          data-i18n="footer_sawt_sections"
        >
          اقسام صوت
        </h5>{" "}
        <ul className="list-unstyled footer-links footer-links-mobile-single">
          {" "}
          <li>
            {" "}
            <a href="/" className="text-white text-decoration-none">
              {" "}
              <span data-i18n="footer_sawt_platform">منصة صوت</span>
            </a>{" "}
          </li>{" "}
          <li>
            {" "}
            <a href="/incubator" className="text-white text-decoration-none">
              {" "}
              <span data-i18n="nav_incubator">حاضنة صوت</span>
            </a>{" "}
          </li>{" "}
          <li>
            {" "}
            <a href="/media" className="text-white text-decoration-none">
              {" "}
              <span data-i18n="nav_media">صوت ميديا</span>
            </a>{" "}
          </li>{" "}
        </ul>{" "}
      </div>{" "}
    </div>
  );
}
