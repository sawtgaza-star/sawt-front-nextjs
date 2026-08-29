// @ts-nocheck
/* eslint-disable */
/* Mobile-only newsletter card shown above the dark footer. Rendered by
   SiteFooter, so it opens the footer on every page of the (main) group;
   style.css keeps it `display: none` above 767.98px. */
export default function FooterNewsletterMobile() {
  return (
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
    </div>
  );
}
