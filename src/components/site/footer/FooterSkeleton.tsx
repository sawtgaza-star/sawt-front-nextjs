import SkeletonText from "@/components/ui/SkeletonText";
import "@/styles/footer-skeleton.css";

/* The footer while GET /layout/footer is in flight.

   It is the real footer's markup — the same elements with the same classes as
   FooterBrand, FooterLinksMobile, FooterMainSections, FooterQuickLinks,
   FooterNewsletterContact, FooterNewsletterMobile and FooterBottomBar — with
   each text swapped for a <SkeletonText /> of the current copy's length. So
   every heading, paragraph, list item and margin is the one the content
   arrives into, at every breakpoint, and the footer doesn't change size when
   it lands. Only the logo, the inputs and the social icons are blocks, sized
   like the real ones.

   Keep it in step with those components when their markup changes.

   Server-rendered as well as client-rendered: `loading` starts true on both
   sides (lib/api/use-footer), so this is what ships in the exported HTML and
   what hydration expects. */

/** Character counts of the current footer copy (GET /layout/footer). `about`
    is 134 characters but the filler bars run narrower than its glyphs, so it
    is sized by rendered lines — a compromise across 1440/1024/768/390 (within
    ~25px at each). */
const LEN = {
  about: 215,
  mainTitle: 16,
  quickTitle: 9,
  nlTitle: 14,
  nlSub: 28,
  phone: 13,
  email: 17,
  copyright: 26,
  brand: 8,
};
const MAIN_LINKS = [[8, 6, 6], [12, 7]];
const QUICK_LINKS = [8, 9, 9];
const SOCIALS = 6;

/** The newsletter form's boxes (NewsletterForm), inert. */
function NewsletterInput({ className }: { className: string }) {
  return (
    <div className={className}>
      <div className="newsletter-input-wrapper">
        <i className="fa-solid fa-magnifying-glass"> </i>
        <input className="font-18 fw-bold" disabled tabIndex={-1} aria-hidden="true" />
      </div>
      <button type="button" className="rs-send" disabled tabIndex={-1} aria-hidden="true">
        <i>
          <svg width="1.4em" height="1.2em" viewBox="0 0 24 24" aria-hidden="true" />
        </i>
      </button>
    </div>
  );
}

function LinkItems({ lengths, itemClassName }: { lengths: number[]; itemClassName?: string }) {
  return (
    <>
      {lengths.map((chars, index) => (
        <li className={itemClassName} key={index}>
          <span className="text-white small">
            <SkeletonText chars={chars} />
          </span>
        </li>
      ))}
    </>
  );
}

/** The contact rows keep their 1.5em icon box; the icon itself is left out. */
function ContactRow({ className, chars }: { className: string; chars: number }) {
  return (
    <p className={className}>
      <i>
        <svg width="1.5em" height="1.5em" viewBox="0 0 24 24" aria-hidden="true" />
      </i>
      <SkeletonText chars={chars} />
    </p>
  );
}

export default function FooterSkeleton() {
  return (
    <footer className="footer-shell pb-4 fsk" aria-busy="true" aria-hidden="true">
      <div className="footer-newsletter-mobile">
        <h5 className="footer-nl-title"><SkeletonText chars={LEN.nlTitle} /></h5>
        <p className="footer-nl-sub"><SkeletonText chars={LEN.nlSub} /></p>
        <NewsletterInput className="custom-newsletter-input" />
      </div>
      <div className="footer-custom-bg pt-5">
        <div className="footer-custom-width" style={{ width: "95%", margin: "0 auto" }}>
          <div className="row g-4 text-end align-items-start">
            <div className="col-lg-3 col-md-6" style={{ textAlign: "start" }}>
              <div className="footer-logo mb-3">
                <span className="fsk-logo" />
              </div>
              <p className="lh-lg text-white font-16"><SkeletonText chars={LEN.about} /></p>
            </div>

            <div className="col-12 footer-links-mobile">
              <div className="footer-links-section footer-links-section-main">
                <h5 className="footer-links-mobile-title"><SkeletonText chars={LEN.mainTitle} /></h5>
                <div className="footer-links-mobile-grid footer-links-mobile-two">
                  {MAIN_LINKS.map((column, index) => (
                    <ul className="list-unstyled footer-links" key={index}>
                      <LinkItems lengths={column} />
                    </ul>
                  ))}
                </div>
              </div>
              <div className="footer-links-section footer-links-section-quick">
                <h5 className="footer-links-mobile-title"><SkeletonText chars={LEN.quickTitle} /></h5>
                <ul className="list-unstyled footer-links footer-links-mobile-single">
                  <LinkItems lengths={QUICK_LINKS} />
                </ul>
              </div>
            </div>

            <div className="col col-lg-3 col-md-6 text-white" style={{ textAlign: "start" }}>
              <h5 className="fw-bold mb-4 text-white"><SkeletonText chars={LEN.mainTitle} /></h5>
              <div className="row">
                <div className="col col-lg-6">
                  <ul className="list-unstyled footer-links">
                    <LinkItems lengths={MAIN_LINKS[0]} itemClassName="mb-4" />
                  </ul>
                </div>
                <div className="col-lg-6 main-links">
                  <ul className="list-unstyled p-0 footer-links">
                    <LinkItems lengths={MAIN_LINKS[1]} itemClassName="mb-4" />
                  </ul>
                </div>
              </div>
            </div>

            <div className="col col-lg-3 col-md-6 text-white" style={{ textAlign: "start" }}>
              <h5 className="fw-bold mb-4 text-white"><SkeletonText chars={LEN.quickTitle} /></h5>
              <ul className="list-unstyled p-0 footer-links">
                <LinkItems lengths={QUICK_LINKS} itemClassName="mb-4" />
              </ul>
            </div>

            <div className="col-lg-3 col-md-6 text-white" style={{ textAlign: "start" }}>
              <div className="footer-newsletter-desktop">
                <h5 className="fw-bold mb-4 text-white footer-stay-updated">
                  <SkeletonText chars={LEN.nlTitle} />
                </h5>
                <p className="mb-3 text-white font-16 footer-subscribe">
                  <SkeletonText chars={LEN.nlSub} />
                </p>
                <NewsletterInput className="custom-newsletter-input mb-4" />
              </div>
              <div className="contact-info-footer text-white">
                <ContactRow
                  className="mb-2 d-flex align-items-center justify-content-start font-16"
                  chars={LEN.phone}
                />
                <ContactRow
                  className="mb-0 font-16 d-flex align-items-center justify-content-start"
                  chars={LEN.email}
                />
              </div>
            </div>
          </div>
        </div>

        <hr className="opacity-25" style={{ width: "95%", margin: "20px auto", color: "#B6B6B6" }} />
        <div className="mb-2" style={{ width: "95%", margin: "0 auto" }}>
          <div className="row align-items-center gy-4">
            <div className="col-12 col-md-6 order-md-2 text-center">
              <div className="d-flex gap-3 justify-content-md-end justify-content-center">
                {Array.from({ length: SOCIALS }, (_, index) => (
                  <span className="text-white footer-social-icon fsk-social" key={index} />
                ))}
              </div>
            </div>
            <div className="col-12 col-md-6 order-md-1 text-center text-md-end">
              <p className="mb-4 small footer-opyright">
                <SkeletonText chars={LEN.copyright} />{" "}
                <span className="text-white footer-brand-highlight">
                  <SkeletonText chars={LEN.brand} />
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
