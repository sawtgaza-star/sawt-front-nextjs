// @ts-nocheck
/* eslint-disable */
export default function JoinUs() {
  return (
    <section className="join-us-section">
      {" "}
      <div className="join-us-banner-about">
        {" "}
        <img
          src="/assets/images/Yamal.png"
          alt=""
          className="join-us-bg-about"
        />{" "}
        <div className="join-us-content text-center">
          {" "}
          <h2 className="join-us-title" data-i18n="join_us_title">
            لأن بعض الأصوات لا يجب أن تُنسى
          </h2>{" "}
          <p className="join-us-desc" data-i18n="join_us_desc">
            مساهمتك ليست دعماً لمنصة إعلامية فحسب، بل دعماً لأصوات وقصص تنتظر
            من ينقلها
          </p>{" "}
          <a href="#" className="btn btn-dark-green join-us-btn">
            {" "}
            <span data-i18n="join_us_support">مساهمة بإيصال صوت</span>{" "}
            <i className="fa-solid fa-angle-left arrow"></i>{" "}
          </a>{" "}
        </div>{" "}
      </div>{" "}
    </section>
  );
}
