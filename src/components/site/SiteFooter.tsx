// @ts-nocheck
/* eslint-disable */
import FooterNewsletterMobile from "./footer/FooterNewsletterMobile";
import FooterBrand from "./footer/FooterBrand";
import FooterLinksMobile from "./footer/FooterLinksMobile";
import FooterMainSections from "./footer/FooterMainSections";
import FooterQuickLinks from "./footer/FooterQuickLinks";
import FooterNewsletterContact from "./footer/FooterNewsletterContact";
import FooterBottomBar from "./footer/FooterBottomBar";

/* Shared footer, the same on every page of the (main) group. The newsletter
   card rides at the top of it so it lands directly above the dark footer on
   every screen; it is mobile-only, hidden above 767.98px by style.css. */
export default function SiteFooter() {
  return (
    <footer className="footer-shell pb-4">
      <FooterNewsletterMobile />
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
            <FooterBrand />{" "}
            {/*  روابط الفوتر للجوال — قسمان بعنوانين منفصلين جنبًا إلى جنب  */}{" "}
            <FooterLinksMobile />{" "}
            <FooterMainSections />{" "}
            <FooterQuickLinks />{" "}
            <FooterNewsletterContact />{" "}
          </div>{" "}
        </div>{" "}
        <FooterBottomBar />
      </div>
    </footer>
  );
}
