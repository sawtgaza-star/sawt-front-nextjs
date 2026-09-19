// @ts-nocheck
/* eslint-disable */
import { socialMark } from "../social-icons";

/* Divider + social icons + copyright row at the bottom of the dark footer.
   The icon row, the copyright line and the brand all come from
   GET /layout/footer and nothing else — no built-in icons stand behind them
   (see ./footer-data). A link the editor points off-site opens in a new tab.

   WHICH accounts appear is the editor's; how each one is DRAWN is not — the
   mark comes from the platform slug the payload sends (../social-icons, the
   same marks the navbar's top bar uses). They paint in currentColor, so
   `.footer-social-icon`'s white carries them against its olive circle. */
export default function FooterBottomBar({ socials, copyright, brand }) {
  return (
    <>
      <hr
        className="opacity-25"
        style={{ width: "95%", margin: "20px auto", color: "#B6B6B6" }}
      />{" "}
      <div className="mb-2" style={{ width: "95%", margin: "0 auto" }}>
        {" "}
        <div className="row align-items-center gy-4">
          {" "}
          <div className="col-12 col-md-6 order-md-2 text-center">
            {" "}
            <div className="d-flex gap-3 justify-content-md-end justify-content-center">
              {" "}
              {socials.map((social, index) => {
                const Icon = socialMark(social.platform);
                return (
                  <a
                    href={social.url}
                    className="text-white footer-social-icon"
                    key={index}
                    target={social.external ? "_blank" : undefined}
                    rel={social.external ? "noopener noreferrer" : undefined}
                  >
                    {Icon ? <Icon /> : <i className={social.icon}></i>}
                  </a>
                );
              })}{" "}
            </div>{" "}
          </div>{" "}
          <div className="col-12 col-md-6 order-md-1 text-center text-md-end">
            {" "}
            <p className="mb-4 small footer-opyright">
              {" "}
              <span>{copyright}</span>{" "}
              <span className="text-white footer-brand-highlight">
                {brand}
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
      </div>
    </>
  );
}
