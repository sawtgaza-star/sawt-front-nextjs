import SkeletonText from "@/components/ui/SkeletonText";
import { FooterBackdrop } from "./footer-ornaments";
import "@/styles/footer-skeleton.css";
import "@/styles/site-footer.css";

/* The footer while GET /layout/footer is in flight.

   The real footer's frame — same ground, same newsletter row, columns and
   bottom strip, the same classes as SiteFooter's pieces — with each text
   swapped for a light <SkeletonText /> bar of roughly the current copy's
   length. It holds the place approximately; only the logo, the form and the
   social icons are blocks, sized like the real ones.

   Keep it in step with SiteFooter when its markup changes.

   Server-rendered as well as client-rendered: `loading` starts true on both
   sides (lib/api/use-footer), so this is what ships in the exported HTML and
   what hydration expects. */

/** Rough character counts of the current footer copy. */
const LEN = {
  about: 134,
  mainTitle: 16,
  quickTitle: 9,
  contactTitle: 9,
  nlTitle: 14,
  nlSub: 28,
  phone: 13,
  email: 17,
  copyright: 26,
  brand: 8,
};
const MAIN_LINKS = [8, 6, 6, 12, 7];
const QUICK_LINKS = [8, 9, 9];
const SOCIALS = 6;

function LinkColumn({ title, links }: { title: number; links: number[] }) {
  return (
    <div className="ft-col--links">
      <h3 className="ft-heading">
        <SkeletonText chars={title} />
      </h3>
      <ul className="ft-list">
        {links.map((chars, index) => (
          <li key={index}>
            <SkeletonText chars={chars} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function FooterSkeleton() {
  return (
    <footer className="sawt-footer fsk" aria-busy="true" aria-hidden="true">
      <FooterBackdrop />
      <div className="container ft-inner">
        <section className="ft-newsletter">
          <div className="ft-newsletter__text">
            <h2>
              <SkeletonText chars={LEN.nlTitle} />
            </h2>
            <p>
              <SkeletonText chars={LEN.nlSub} />
            </p>
          </div>
          {/* the newsletter form's boxes (NewsletterForm), inert */}
          <div className="custom-newsletter-input ft-form">
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
        </section>

        <div className="ft-cols">
          <div className="ft-col--brand">
            <span className="ft-logo">
              <span className="fsk-logo" />
            </span>
            <p className="ft-about">
              <SkeletonText chars={LEN.about} />
            </p>
            <div className="ft-social">
              {Array.from({ length: SOCIALS }, (_, index) => (
                <span className="fsk-social" key={index} />
              ))}
            </div>
          </div>
          <LinkColumn title={LEN.mainTitle} links={MAIN_LINKS} />
          <LinkColumn title={LEN.quickTitle} links={QUICK_LINKS} />
          <LinkColumn title={LEN.contactTitle} links={[LEN.phone, LEN.email]} />
        </div>
      </div>

      <div className="ft-bottom">
        <div className="container ft-bottom__inner">
          <p className="ft-copy">
            <SkeletonText chars={LEN.copyright + LEN.brand} />
          </p>
        </div>
      </div>
    </footer>
  );
}
