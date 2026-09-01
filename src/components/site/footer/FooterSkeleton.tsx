import "@/styles/footer-skeleton.css";

/* The footer as grey bars, until GET /layout/footer lands.

   It renders the real wrappers — .footer-shell, .footer-custom-bg, the four
   Bootstrap columns, .footer-links-mobile, .custom-newsletter-input — and only
   swaps the text and links for bars, so the responsive rules in style.css still
   decide what shows on which screen and the footer doesn't resize when the
   content arrives.

   Server-rendered as well as client-rendered: `loading` starts true on both
   sides (lib/api/use-footer), so this is what ships in the exported HTML and
   what hydration expects. */

function Line({ width, className = "fsk-line" }: { width?: string; className?: string }) {
  return <span className={className} style={width ? { width } : undefined} />;
}

/** A list of link placeholders inside the real <ul>/<li> spacing. */
function LinkList({
  widths,
  className = "list-unstyled footer-links",
  itemClassName,
}: {
  widths: string[];
  className?: string;
  itemClassName?: string;
}) {
  return (
    <ul className={className}>
      {widths.map((width, index) => (
        <li className={itemClassName} key={index}>
          <Line width={width} className="fsk-line fsk-link" />
        </li>
      ))}
    </ul>
  );
}

/** The newsletter's input + send button, at the size the real ones occupy. */
function NewsletterInput() {
  return (
    <div className="custom-newsletter-input mb-4">
      <span className="fsk-block fsk-input" />
      <span className="fsk-block fsk-send" />
    </div>
  );
}

export default function FooterSkeleton() {
  return (
    <footer className="footer-shell pb-4" aria-busy="true" aria-hidden="true">
      {/* mobile-only newsletter card — light ground, so darker bars */}
      <div className="footer-newsletter-mobile fsk-on-light">
        <Line width="45%" className="fsk-line fsk-title" />
        <Line width="70%" />
        <NewsletterInput />
      </div>
      <div className="footer-custom-bg pt-5">
        <div className="footer-custom-width" style={{ width: "95%", margin: "0 auto" }}>
          <div className="row g-4 text-end align-items-start">
            {/* brand: logo + about blurb */}
            <div className="col-lg-3 col-md-6" style={{ textAlign: "start" }}>
              <div className="footer-logo mb-3">
                <span className="fsk-block fsk-logo" />
              </div>
              <Line width="100%" />
              <Line width="100%" />
              <Line width="75%" />
            </div>

            {/* the two mobile link sections */}
            <div className="col-12 footer-links-mobile">
              <div className="footer-links-section footer-links-section-main">
                <Line width="60%" className="fsk-line fsk-title" />
                <div className="footer-links-mobile-grid footer-links-mobile-two">
                  <LinkList widths={["70px", "60px", "50px"]} />
                  <LinkList widths={["80px", "60px"]} />
                </div>
              </div>
              <div className="footer-links-section footer-links-section-quick">
                <Line width="50%" className="fsk-line fsk-title" />
                <LinkList
                  widths={["70px", "80px", "70px"]}
                  className="list-unstyled footer-links footer-links-mobile-single"
                />
              </div>
            </div>

            {/* desktop: main sections, two lists */}
            <div className="col col-lg-3 col-md-6 text-white" style={{ textAlign: "start" }}>
              <Line width="60%" className="fsk-line fsk-title" />
              <div className="row">
                <div className="col col-lg-6">
                  <LinkList widths={["70px", "60px", "50px"]} itemClassName="mb-4" />
                </div>
                <div className="col-lg-6 main-links">
                  <LinkList
                    widths={["80px", "60px"]}
                    className="list-unstyled p-0 footer-links"
                    itemClassName="mb-4"
                  />
                </div>
              </div>
            </div>

            {/* desktop: اقسام صوت */}
            <div className="col col-lg-3 col-md-6 text-white" style={{ textAlign: "start" }}>
              <Line width="50%" className="fsk-line fsk-title" />
              <LinkList
                widths={["70px", "80px", "70px"]}
                className="list-unstyled p-0 footer-links"
                itemClassName="mb-4"
              />
            </div>

            {/* desktop: newsletter + contact */}
            <div className="col-lg-3 col-md-6 text-white" style={{ textAlign: "start" }}>
              <div className="footer-newsletter-desktop">
                <Line width="55%" className="fsk-line fsk-title" />
                <Line width="80%" />
                <NewsletterInput />
              </div>
              <div className="contact-info-footer">
                <Line width="60%" />
                <Line width="70%" />
              </div>
            </div>
          </div>
        </div>

        <hr
          className="opacity-25"
          style={{ width: "95%", margin: "20px auto", color: "#B6B6B6" }}
        />
        <div className="mb-2" style={{ width: "95%", margin: "0 auto" }}>
          <div className="row align-items-center gy-4">
            <div className="col-12 col-md-6 order-md-2 text-center">
              <div className="d-flex gap-3 justify-content-md-end justify-content-center">
                {[0, 1, 2, 3, 4].map((index) => (
                  <span className="fsk-circle" key={index} />
                ))}
              </div>
            </div>
            <div className="col-12 col-md-6 order-md-1">
              <Line className="fsk-line fsk-copyright" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
