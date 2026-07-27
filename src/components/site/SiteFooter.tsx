// @ts-nocheck
/* eslint-disable */
import FooterNewsletterMobile from "./footer/FooterNewsletterMobile";
import FooterBrand from "./footer/FooterBrand";
import FooterLinksMobile from "./footer/FooterLinksMobile";
import FooterMainSections from "./footer/FooterMainSections";
import FooterQuickLinks from "./footer/FooterQuickLinks";
import FooterNewsletterContact from "./footer/FooterNewsletterContact";
import FooterBottomBar from "./footer/FooterBottomBar";

/* Shared footer (identical on home & about). `mobileNewsletter` shows the mobile card (home only). */
export default function SiteFooter({
  mobileNewsletter = false,
}: {
  mobileNewsletter?: boolean;
}) {
  return (
    <footer className="footer-shell pb-4">
      {mobileNewsletter && <FooterNewsletterMobile />}
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
            <FooterNewsletterMobile/>
            <FooterNewsletterContact />{" "}
          </div>{" "}
        </div>{" "}
        <FooterBottomBar />
      </div>
    </footer>
  );
}
