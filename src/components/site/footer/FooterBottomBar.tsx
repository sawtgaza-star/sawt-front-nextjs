// @ts-nocheck
/* eslint-disable */
/* Divider + social icons + copyright row at the bottom of the dark footer. */
export default function FooterBottomBar() {
  return (
    <>
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
      </div>
    </>
  );
}
