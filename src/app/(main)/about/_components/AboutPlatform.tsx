// @ts-nocheck
/* eslint-disable */
export default function AboutPlatform() {
  return (
    <section className="about-the-platform">
      {" "}
      <div className="about-the-platform-card">
        {" "}
        <div className="about-the-platform-card-inner">
          {" "}
          <img
            className="birds-img"
            src="/assets/images/birds.png"
            alt=""
          />{" "}
          <div className="row align-items-center g-0" dir="ltr">
            {" "}
            <div className="col-12 col-lg-5 about-the-platform-content">
              {" "}
              <h2
                className="about-the-platform-question"
                data-i18n-html="about_platform_question_html"
              >
                ما الذي يدفعنا لنكون
                <span className="platform-highlight">صوتك؟</span>{" "}
              </h2>{" "}
              <p
                className="about-the-platform-desc"
                data-i18n="about_platform_desc"
              >
                نؤمن أن لكل إنسان قصة تستحق أن تُروى، لذلك جاءت صوت لتكون
                مساحة حرة للتعبير، حيث يلتقي الأفراد لمشاركة تجاربهم وأفكارهم
                بصدق.نساعدك على إيصال صوتك إلى الآخرين، ونمنح المحتوى الإنساني
                مساحة حقيقية ليُرى، ويُسمع، ويترك أثرًا.
              </p>{" "}
            </div>{" "}
            <div className="col-12 col-lg-7 about-the-platform-visual">
              {" "}
              <img
                src="/assets/images/backgrounf_sawt.jpg"
                alt="صوت"
                className="about-platform-img"
              />{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </section>
  );
}
