// @ts-nocheck
/* eslint-disable */
import NewsletterForm from "./NewsletterForm";
/* Mobile-only newsletter card shown above the dark footer. Rendered by
   SiteFooter, so it opens the footer on every page of the (main) group;
   style.css keeps it `display: none` above 767.98px. Same copy as the desktop
   column — one `newsletter` block from GET /layout/footer feeds both. */
export default function FooterNewsletterMobile({ newsletter }) {
  return (
    <div className="footer-newsletter-mobile">
      {" "}
      <h5 className="footer-nl-title">{newsletter.title}</h5>{" "}
      <p className="footer-nl-sub">{newsletter.description}</p>{" "}
      <NewsletterForm
        placeholder={newsletter.placeholder}
        className="custom-newsletter-input"
      />{" "}
    </div>
  );
}
