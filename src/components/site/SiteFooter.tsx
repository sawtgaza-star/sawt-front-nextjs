// @ts-nocheck
/* eslint-disable */
"use client";
import { useFooter } from "@/lib/api/use-footer";
import { useLang } from "@/lib/use-lang";
import { resolveFooter } from "./footer/footer-data";
import FooterNewsletterMobile from "./footer/FooterNewsletterMobile";
import FooterBrand from "./footer/FooterBrand";
import FooterLinksMobile from "./footer/FooterLinksMobile";
import FooterMainSections from "./footer/FooterMainSections";
import FooterQuickLinks from "./footer/FooterQuickLinks";
import FooterNewsletterContact from "./footer/FooterNewsletterContact";
import FooterBottomBar from "./footer/FooterBottomBar";
import FooterSkeleton from "./footer/FooterSkeleton";

/* Shared footer, the same on every page of the (main) group. The newsletter
   card rides at the top of it so it lands directly above the dark footer on
   every screen; it is mobile-only, hidden above 767.98px by style.css.

   The only client boundary down here: one request for the whole footer
   (GET /layout/footer) and one `lang` subscription, both resolved into a plain
   view model by resolveFooter() and handed down as props, so the columns
   themselves stay plain functions.

   <FooterSkeleton /> holds the shape while that request is in flight. The
   endpoint is the only source of the copy — nothing here shadows it, so a
   field the editor leaves empty renders empty. See ./footer/footer-data. */
export default function SiteFooter() {
  const { lang } = useLang();
  const { data, loading } = useFooter();

  if (loading) return <FooterSkeleton />;

  const footer = resolveFooter(data, lang);

  return (
    <footer className="footer-shell pb-4">
      <FooterNewsletterMobile newsletter={footer.newsletter} />
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
            <FooterBrand logoUrl={footer.logoUrl} about={footer.about} />{" "}
            {/*  روابط الفوتر للجوال — قسمان بعنوانين منفصلين جنبًا إلى جنب  */}{" "}
            <FooterLinksMobile main={footer.main} quick={footer.quick} />{" "}
            <FooterMainSections main={footer.main} />{" "}
            <FooterQuickLinks quick={footer.quick} />{" "}
            <FooterNewsletterContact
              newsletter={footer.newsletter}
              contact={footer.contact}
            />{" "}
          </div>{" "}
        </div>{" "}
        <FooterBottomBar
          socials={footer.socials}
          copyright={footer.copyright}
          brand={footer.brand}
        />
      </div>
    </footer>
  );
}
