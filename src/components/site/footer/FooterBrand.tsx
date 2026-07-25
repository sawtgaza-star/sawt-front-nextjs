// @ts-nocheck
/* eslint-disable */
/* Logo + about-blurb column. */
export default function FooterBrand() {
  return (
    <div className="col-lg-3 col-md-6" style={{ textAlign: "start" }}>
      {" "}
      <div className="footer-logo mb-3">
        {" "}
        <img
          src="/assets/images/صوت ابيض.png"
          alt="صوت"
          width="100"
        />{" "}
      </div>{" "}
      <p className="lh-lg text-white font-16" data-i18n="footer_about">
        منصة صوت، تأسست لتكون مساحة للمبدعين، تجمع الحاضنة، صوت ميديا،
        والصوت نفسه، لتقديم محتوى ملهم وتجارب فريدة لكل من يسعى لصوته أن
        يُسمع.
      </p>{" "}
    </div>
  );
}
