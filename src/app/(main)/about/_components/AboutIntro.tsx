// @ts-nocheck
/* eslint-disable */
export default function AboutIntro() {
  return (
    <section>
      {" "}
      <div
        className="about-sec container"
        style={{ marginTop: "50px", zIndex: "1" }}
      >
        {" "}
        <div className="row align-items-center">
          {" "}
          <div className="col-12 col-lg-6 about-sec-content" dir="rtl">
            {" "}
            <h2 className="about-sec-title" data-i18n="about_header">
              من نحن
            </h2>{" "}
            <p className="about-sec-desc" data-i18n="about_intro">
              منصة صوت انطلقت من غزة، تؤمن بأن لكل إنسان قصة تستحق أن تُروى
              وصوتاً يستحق أن يُسمع ، نعمل على إنتاج محتوى إنساني وإعلامي هادف
              يوثّق الواقع وينقل قصص الناس وقضايا المجتمع بمهنية ومسؤولية ،
              نسعى إلى تسليط الضوء على الأصوات المهمّشة والحكايات التي قد لا
              تجد مكاناً في الإعلام التقليدي، إيماناً منا بأن الإعلام رسالة
              وأثر قبل أن يكون خبراً ، نروي القصص بصدق، وننقل الواقع كما هو،
              لنكون جسراً بين الإنسان وقضيته.
            </p>{" "}
          </div>{" "}
          <div className="col-12 col-lg-6 mt-4 about-sec-img-col">
            {" "}
            <div className="about-sec-img-wrapper">
              {" "}
              <img
                src="/assets/images/tree.jpg"
                alt=""
                className="about-sec-img"
              />{" "}
              <div className="member-card about-sec-leaf" dir="rtl">
                {" "}
                <img
                  src="/assets/images/صوت 1.png"
                  alt=""
                  width="100"
                  height="100"
                />{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </section>
  );
}
