// @ts-nocheck
/* eslint-disable */
/* Mobile footer links — two titled sections side by side. */
export default function FooterLinksMobile() {
  return (
    <div className="col-12 footer-links-mobile">
      {" "}
      {/*  القسم الأول: روابط سريعة (عمود واحد)  */}{" "}
      <div className="footer-links-section footer-links-section-quick">
        {" "}
        <h5
          className="footer-links-mobile-title"
          data-i18n="footer_quick_links"
        >
          روابط سريعة
        </h5>{" "}
        <ul className="list-unstyled footer-links footer-links-mobile-single">
          {" "}
          <li>
            {" "}
            <a href="#" className="text-white text-decoration-none">
              {" "}
              <span data-i18n="footer_backstage">الكواليس</span>
            </a>{" "}
          </li>{" "}
          <li>
            {" "}
            <a href="#" className="text-white text-decoration-none">
              {" "}
              <span data-i18n="footer_media_kit">MEDIA KIT</span>
            </a>{" "}
          </li>{" "}
          <li>
            {" "}
            <a href="#" className="text-white text-decoration-none">
              {" "}
              <span data-i18n="footer_impact_stories">Impact Stories</span>
            </a>{" "}
          </li>{" "}
          <li>
            {" "}
            <a href="#" className="text-white text-decoration-none">
              {" "}
              <span data-i18n="footer_blog">المدونة</span>
            </a>{" "}
          </li>{" "}
          <li>
            {" "}
            <a href="#" className="text-white text-decoration-none">
              {" "}
              <span data-i18n="footer_faq">الأسئلة الشائعة</span>
            </a>{" "}
          </li>{" "}
        </ul>{" "}
      </div>{" "}
      {/*  القسم الثاني: الأقسام الرئيسية (عمودان)  */}{" "}
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
              <a href="#" className="text-white text-decoration-none">
                {" "}
                <span data-i18n="nav_home">الرئيسية</span>
              </a>{" "}
            </li>{" "}
            <li>
              {" "}
              <a href="#" className="text-white text-decoration-none">
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
              <a href="#" className="text-white text-decoration-none">
                {" "}
                <span data-i18n="nav_creators">صناع المحتوى</span>
              </a>{" "}
            </li>{" "}
            <li>
              {" "}
              <a href="#" className="text-white text-decoration-none">
                {" "}
                <span data-i18n="nav_incubator">حاضنة صوت</span>
              </a>{" "}
            </li>{" "}
            <li>
              {" "}
              <a href="#" className="text-white text-decoration-none">
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
