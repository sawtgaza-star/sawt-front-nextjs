// @ts-nocheck
/* eslint-disable */
/* Logo + about-blurb column. Both come from GET /layout/footer and nothing
   else: no built-in logo, no built-in blurb (see ./footer-data). When the
   payload carries no logo the <img> is skipped entirely rather than rendered
   with an empty src. */
export default function FooterBrand({ logoUrl, about }) {
  return (
    <div className="col-lg-3 col-md-6" style={{ textAlign: "start" }}>
      {" "}
      <div className="footer-logo mb-3">
        {" "}
        {logoUrl ? <img src={logoUrl} alt="صوت" width="100" /> : null}{" "}
      </div>{" "}
      <p className="lh-lg text-white font-16">{about}</p>{" "}
    </div>
  );
}
