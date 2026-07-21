// @ts-nocheck
"use client";
/* eslint-disable */

/* Shared footer (identical on home & about). `mobileNewsletter` shows the mobile card (home only). */
export default function SiteFooter({
  mobileNewsletter = false,
}: {
  mobileNewsletter?: boolean;
}) {
  return (
    <footer className="footer-shell pb-4">
      {mobileNewsletter && (
        <>
          <div className="footer-newsletter-mobile">
            {" "}
            <h5 className="footer-nl-title" data-i18n="footer_stay_updated">
              ابقَ على اطلاع
            </h5>{" "}
            <p className="footer-nl-sub" data-i18n="footer_subscribe">
              اشترك في نشرتنا الإخبارية ..
            </p>{" "}
            <div className="custom-newsletter-input">
              {" "}
              <div className="newsletter-input-wrapper">
                {" "}
                <i className="fa-solid fa-magnifying-glass"> </i>{" "}
                <input
                  type="email"
                  placeholder="ادخل بريدك الالكتروني"
                  className="font-18 fw-bold"
                  data-i18n-placeholder="footer_email_placeholder"
                />{" "} 
                
                       
              </div> {" "} 

                
              <button className="rs-send">
                {" "}
                <i>
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.4em"
                    height="1.2em"
                    viewBox="0 0 24 24"
                  >
                    {" "}
                    <path d="M0 0h24v24H0z" fill="none"></path>{" "}
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="m9.498 15l7.5-7.5m-8.992.179l7.321-3.46c3.042-1.438 4.563-2.157 5.533-1.436s.693 2.365.138 5.652l-.954 5.662c-.363 2.149-.544 3.223-1.345 3.692s-1.842.109-3.923-.611l-6.365-2.202c-3.892-1.346-5.838-2.019-5.91-3.34c-.074-1.32 1.786-2.2 5.505-3.957M9.498 15.5v2.227c0 2.374 0 3.56.71 3.75s1.458-.798 2.954-2.773l.836-1.204"
                    ></path>
                  </svg>
                </i>{" "}
              </button>{" "}
            </div>{" "}
          </div>
        </>
      )}
      {/*  بطاقة النشرة البريدية — تظهر فقط على الجوال أعلى الفوتر الداكن  */}{" "}
      <div className="footer-custom-bg pt-5">
        {" "}
        <div
          className="footer-custom-width"
          style={{ width: "95%", margin: "0 auto" }}
        >
          {" "}
          <div className="row g-4 text-end align-items-start">
            {" "}
            <div className="col-lg-3 col-md-6" style={{ textAlign: "start" }}>
              {" "}
              <div className="footer-logo mb-3">
                {" "}
                <img
                  src="/assets/images/صوت ابيض.png"
                  alt="صوت"
                  width="100"
                />{" "}
              </div>{" "}
              <p className="lh-lg text-white font-16" data-i18n="footer_about">
                منصة صوت، تأسست لتكون مساحة للمبدعين، تجمع الحاضنة، صوت ميديا،
                والصوت نفسه، لتقديم محتوى ملهم وتجارب فريدة لكل من يسعى لصوته أن
                يُسمع.
              </p>{" "}
            </div>{" "}
            {/*  روابط الفوتر للجوال — قسمان بعنوانين منفصلين جنبًا إلى جنب  */}{" "}
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
                      <a href="#" className="text-white text-decoration-none">
                        {" "}
                        <span data-i18n="nav_content">محتوانا</span>
                      </a>{" "}
                    </li>{" "}
                    <li>
                      {" "}
                      <a href="#" className="text-white text-decoration-none">
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
            </div>{" "}
            <div
              className="col col-lg-3 col-md-6 text-white"
              style={{ textAlign: "start" }}
            >
              {" "}
              <h5
                className="fw-bold mb-4 text-white"
                data-i18n="footer_main_sections"
              >
                الأقسام الرئيسية
              </h5>{" "}
              <div className="row">
                {" "}
                <div className="col col-lg-6">
                  {" "}
                  <ul className="list-unstyled footer-links">
                    {" "}
                    <li className="mb-4">
                      {" "}
                      <a
                        href="#"
                        className="text-white text-decoration-none small"
                      >
                        {" "}
                        <span data-i18n="nav_home">الرئيسية</span>
                      </a>{" "}
                    </li>{" "}
                    <li className="mb-4">
                      {" "}
                      <a
                        href="#"
                        className="text-white text-decoration-none small"
                      >
                        {" "}
                        <span data-i18n="nav_about">من نحن</span>
                      </a>{" "}
                    </li>{" "}
                    <li className="mb-4">
                      {" "}
                      <a
                        href="#"
                        className="text-white text-decoration-none small"
                      >
                        {" "}
                        <span data-i18n="nav_content">محتوانا</span>
                      </a>{" "}
                    </li>{" "}
                    <li className="mb-4">
                      {" "}
                      <a
                        href="#"
                        className="text-white text-decoration-none small"
                      >
                        {" "}
                        <span data-i18n="nav_team">الفريق</span>
                      </a>{" "}
                    </li>{" "}
                  </ul>{" "}
                </div>{" "}
                <div className="col-lg-6 main-links">
                  {" "}
                  <ul className="list-unstyled p-0 footer-links">
                    {" "}
                    <li className="mb-4">
                      {" "}
                      <a
                        href="#"
                        className="text-white text-decoration-none small"
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
                      >
                        {" "}
                        <span data-i18n="nav_media">صوت ميديا</span>
                      </a>{" "}
                    </li>{" "}
                  </ul>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
            <div
              className="col col-lg-3 col-md-6 text-white"
              style={{ textAlign: "start" }}
            >
              {" "}
              <h5
                className="fw-bold mb-4 text-white"
                data-i18n="footer_quick_links"
              >
                روابط سريعة
              </h5>{" "}
              <ul className="list-unstyled p-0 footer-links">
                {" "}
                <li className="mb-4">
                  {" "}
                  <a href="#" className="text-white text-decoration-none small">
                    {" "}
                    <span data-i18n="footer_backstage">الكواليس</span>
                  </a>{" "}
                </li>{" "}
                <li className="mb-4">
                  {" "}
                  <a href="#" className="text-white text-decoration-none small">
                    {" "}
                    <span data-i18n="footer_media_kit">MEDIA KIT</span>
                  </a>{" "}
                </li>{" "}
                <li className="mb-4">
                  {" "}
                  <a href="#" className="text-white text-decoration-none small">
                    {" "}
                    <span data-i18n="footer_blog">المدونة</span>
                  </a>{" "}
                </li>{" "}
                <li className="mb-4">
                  {" "}
                  <a href="#" className="text-white text-decoration-none small">
                    {" "}
                    <span data-i18n="footer_faq">الأسئلة الشائعة</span>
                  </a>{" "}
                </li>{" "}
              </ul>{" "}
            </div>{" "}
            <div
              className="col-lg-3 col-md-6 text-white"
              style={{ textAlign: "start !important" }}
            >
              {" "}
              <div className="footer-newsletter-desktop">
                {" "}
                <h5
                  className="fw-bold mb-4 text-white footer-stay-updated"
                  data-i18n="footer_stay_updated"
                >
                  ابقَ على اطلاع
                </h5>{" "}
                <p
                  className="mb-3 text-white font-16 footer-subscribe"
                  data-i18n="footer_subscribe"
                >
                  اشترك في نشرتنا الإخبارية ..
                </p>{" "}
                <div className="custom-newsletter-input mb-4">
                  {" "}
                  <div className="newsletter-input-wrapper">
                    {" "}
                    <i className="fa-solid fa-magnifying-glass"> </i>{" "}
                    <input
                      type="email"
                      placeholder="ادخل بريدك الالكتروني"
                      className="font-18 fw-bold"
                      data-i18n-placeholder="footer_email_placeholder"
                    />{" "}
                  </div>{" "}
                  <button className="rs-send">
                    {" "}
                    <i>
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1.4em"
                        height="1.2em"
                        viewBox="0 0 24 24"
                      >
                        {" "}
                        <path d="M0 0h24v24H0z" fill="none"></path>{" "}
                        <path
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="m9.498 15l7.5-7.5m-8.992.179l7.321-3.46c3.042-1.438 4.563-2.157 5.533-1.436s.693 2.365.138 5.652l-.954 5.662c-.363 2.149-.544 3.223-1.345 3.692s-1.842.109-3.923-.611l-6.365-2.202c-3.892-1.346-5.838-2.019-5.91-3.34c-.074-1.32 1.786-2.2 5.505-3.957M9.498 15.5v2.227c0 2.374 0 3.56.71 3.75s1.458-.798 2.954-2.773l.836-1.204"
                        ></path>
                      </svg>
                    </i>{" "}
                  </button>{" "}
                </div>{" "}
              </div>{" "}
              <div className="contact-info-footer text-white">
                {" "}
                <p className="mb-2 d-flex align-items-center justify-content-start font-16">
                  {" "}
                  <i style={{ color: "rgba(225, 114, 59, 1)" }}>
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.5em"
                      height="1.5em"
                      viewBox="0 0 24 24"
                    >
                      {" "}
                      <path d="M0 0h24v24H0z" fill="none"></path>{" "}
                      <path
                        fill="currentColor"
                        d="M19.2 20q-2.702 0-5.418-1.244t-5.005-3.533q-2.27-2.289-3.523-5.021Q4 7.469 4 4.8V4h4.439l.848 4.083l-2.696 2.51q.684 1.186 1.417 2.167t1.527 1.769q.802.84 1.808 1.57t2.296 1.44l2.611-2.708l3.75.756V20zM6.121 9.654l2.092-1.92L7.635 5h-2.63q.03 1.144.309 2.305q.278 1.16.807 2.349m8.45 8.335q.923.463 2.09.723t2.339.277v-2.605l-2.388-.475zm0 0"
                      ></path>{" "}
                    </svg>{" "}
                  </i>
                  +972567247177
                </p>{" "}
                <p className="mb-0 font-16 d-flex align-items-center justify-content-start">
                  {" "}
                  <i style={{ color: "rgba(225, 114, 59, 1)" }}>
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.5em"
                      height="1.5em"
                      viewBox="0 0 24 24"
                    >
                      {" "}
                      <path d="M0 0h24v24H0z" fill="none"></path>{" "}
                      <g
                        fill="none"
                        stroke="currentColor"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                      >
                        {" "}
                        <path
                          strokeLinecap="round"
                          d="m7 8.5l2.942 1.74c1.715 1.014 2.4 1.014 4.116 0L17 8.5"
                        ></path>{" "}
                        <path d="M2.016 13.476c.065 3.065.098 4.598 1.229 5.733c1.131 1.136 2.705 1.175 5.854 1.254c1.94.05 3.862.05 5.802 0c3.149-.079 4.723-.118 5.854-1.254c1.131-1.135 1.164-2.668 1.23-5.733c.02-.986.02-1.966 0-2.952c-.066-3.065-.099-4.598-1.23-5.733c-1.131-1.136-2.705-1.175-5.854-1.254a115 115 0 0 0-5.802 0c-3.149.079-4.723.118-5.854 1.254c-1.131 1.135-1.164 2.668-1.23 5.733a69 69 0 0 0 0 2.952Z"></path>{" "}
                      </g>{" "}
                    </svg>{" "}
                  </i>
                  info@sawtgaza.com
                </p>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        <hr
          className="text-white opacity-25"
          style={{ width: "95%", margin: "20px auto" }}
        />{" "}
        <div className="mb-2" style={{ width: "95%", margin: "0 auto" }}>
          {" "}
          <div className="row align-items-center gy-4">
            {" "}
            <div className="col-12 col-md-6 order-md-2 text-center">
              {" "}
              <div className="d-flex gap-3 justify-content-md-end justify-content-center">
                {" "}
                <a href="#" className="text-white footer-social-icon">
                  <i className="fab fa-instagram"></i>
                </a>{" "}
                <a href="#" className="text-white footer-social-icon">
                  <i className="fab fa-twitter"></i>
                </a>{" "}
                <a href="#" className="text-white footer-social-icon">
                  <i className="fab fa-telegram-plane"></i>
                </a>{" "}
                <a href="#" className="text-white footer-social-icon">
                  <i className="fab fa-facebook-f"></i>
                </a>{" "}
                <a href="#" className="text-white footer-social-icon">
                  <i className="fab fa-linkedin-in"></i>
                </a>{" "}
              </div>{" "}
            </div>{" "}
            <div className="col-12 col-md-6 order-md-1 text-center text-md-end">
              {" "}
              <p className="mb-4 small footer-opyright">
                {" "}
                <span data-i18n="footer_copyright">
                  © جميع الحقوق محفوظة. 2026
                </span>{" "}
                <span
                  className="text-white"
                  style={{ backgroundColor: "#e1723b" }}
                  data-i18n="footer_rights_brand"
                >
                  SAWTGAZA
                </span>{" "}
              </p>{" "}
            </div>{" "}
            {/*  <div class="col-12 col-md-4 order-md-3">
            <div
              class="d-flex align-items-center justify-content-center justify-content-md-start gap-3 flex-wrap"
            >
              <a
                href="#"
                class="text-white ps-3"
                style="text-decoration: underline !important"
                data-i18n="footer_privacy"
                >سياسة الخصوصية</a
              >
              <a
                href="#"
                class="text-white"
                style="text-decoration: underline !important"
                data-i18n="footer_terms"
                >شروط الاستخدام</a
              >

              <div
                class="d-flex flex-column align-items-center control-wrapper theme-toggle-and-up"
              >
                <button
                  class="btn-control-custom rounded-circle"
                  id="theme-toggle"
                >
                  <i class="fas fa-moon"></i>
                </button>
                <button
                  class="btn-control-custom rounded-circle"
                  onclick="scrollToTop()"
                >
                  <i class="fas fa-angles-up"></i>
                </button>
              </div>
            </div>
          </div>  */}{" "}
          </div>{" "}
        </div>{" "}
      </div>
    </footer>
  );
}
