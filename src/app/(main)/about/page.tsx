// @ts-nocheck
"use client";
/* eslint-disable */
import LegacyInit from "@/components/LegacyInit";
import SiteNav from "@/components/site/SiteNav";
import SiteFooter from "@/components/site/SiteFooter";

export default function Page() {
  return (
    <>
      <LegacyInit page="about" />
      <header>
        {" "}
        <div
          className="about-header py-1"
          style={{ background: 'url("/assets/images/WhoUs.jpg")' }}
        >
          {" "}
          <SiteNav />{" "}
          {/*  Mobile search panel (revealed by the mobile search icon)  */}{" "}
          <div className="container about-hero text-center text-white">
            {" "}
            <nav className="about-breadcrumb" aria-label="breadcrumb">
              {" "}
              <a href="/" data-i18n="nav_home">
                الرئيسية
              </a>{" "}
              <i className="fa-solid fa-angle-left mx-2 about-breadcrumb-sep arrow"></i>{" "}
              <span className="about-breadcrumb-active" data-i18n="nav_about">
                من نحن
              </span>{" "}
            </nav>{" "}
            <h1 className="about-hero-title" data-i18n="about_hero_title">
              صناع الأثر.. الفريق خلف منصة صوت
            </h1>{" "}
            <p className="about-hero-desc" data-i18n="about_hero_desc">
              صوت منصة إعلامية مستقلة تُوثّق الواقع وتحكي قصص الناس، لتكون صوتاً
              لمن لا صوت له.
            </p>{" "}
          </div>{" "}
        </div>{" "}
      </header>{" "}
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
      </section>{" "}
      <section className="core-values-section">
        {" "}
        <img
          src="/assets/images/leaf_cutout.png"
          className="olive-branch branch-right-bottom-about"
          alt="Olive Branch"
        />{" "}
        <img
          src="/assets/images/leaf_cutout.png"
          className="olive-branch branch-left-bottom-about"
          alt="Olive Branch"
        />{" "}
        <div className="container" dir="rtl">
          {" "}
          <div className="text-center core-values-head">
            {" "}
            <h2
              className="core-values-title"
              data-i18n-html="core_values_title"
            >
              أهم القيم التي
              <span className="core-values-highlight">نركز عليها</span>{" "}
            </h2>{" "}
            <p
              className="core-values-subtitle"
              data-i18n="core_values_subtitle"
            >
              قيمنا هي الأساس الذي نبني عليه صوت، وهي ما يقود طريقة عملنا
              وتطويرنا المستمر
            </p>{" "}
          </div>{" "}
          <div className="row g-4 justify-content-center core-values-grid">
            {" "}
            <div className="col-12 col-sm-6 col-lg-3">
              {" "}
              <div className="value-card">
                {" "}
                <div className="value-card-icon">
                  {" "}
                  <i>
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.5em"
                      height="1.5em"
                      viewBox="0 0 24 24"
                    >
                      {" "}
                      <path d="M0 0h24v24H0z" fill="none"></path>{" "}
                      <g
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                      >
                        {" "}
                        <path d="M18.709 3.495C16.817 2.554 14.5 2 12 2s-4.816.554-6.709 1.495c-.928.462-1.392.693-1.841 1.419S3 6.342 3 7.748v3.49c0 5.683 4.542 8.842 7.173 10.196c.734.377 1.1.566 1.827.566s1.093-.189 1.827-.566C16.457 20.08 21 16.92 21 11.237V7.748c0-1.406 0-2.108-.45-2.834s-.913-.957-1.841-1.419"></path>{" "}
                        <path d="M9 11.5s1.408.252 2 2c0 0 1.5-3 4-4"></path>{" "}
                      </g>{" "}
                    </svg>{" "}
                  </i>{" "}
                </div>{" "}
                <h3 className="value-card-title" data-i18n="core_value_1_title">
                  المصداقية
                </h3>{" "}
                <p className="value-card-desc" data-i18n="core_value_1_desc">
                  ننقل القصص والحقائق بدقة وموضوعية، ملتزمين بالتحقق من
                  المعلومات واحترام ثقة جمهورنا.
                </p>{" "}
              </div>{" "}
            </div>{" "}
            <div className="col-12 col-sm-6 col-lg-3">
              {" "}
              <div className="value-card">
                {" "}
                <div className="value-card-icon">
                  {" "}
                  <i>
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.5em"
                      height="1.5em"
                      viewBox="0 0 24 24"
                    >
                      {" "}
                      <path d="M0 0h24v24H0z" fill="none"></path>{" "}
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M15 8a3 3 0 1 1-6 0a3 3 0 0 1 6 0m1-4a3 3 0 0 1 1.218 5.742M13.714 14h-3.428A4.286 4.286 0 0 0 6 18.286C6 19.233 6.767 20 7.714 20h8.572c.947 0 1.714-.767 1.714-1.714A4.286 4.286 0 0 0 13.714 14m4-1A4.286 4.286 0 0 1 22 17.286c0 .947-.767 1.714-1.714 1.714M8 4a3 3 0 0 0-1.218 5.742M3.714 19A1.714 1.714 0 0 1 2 17.286A4.286 4.286 0 0 1 6.286 13"
                      ></path>{" "}
                    </svg>{" "}
                  </i>{" "}
                </div>{" "}
                <h3 className="value-card-title" data-i18n="core_value_2_title">
                  الإنسانية
                </h3>{" "}
                <p className="value-card-desc" data-i18n="core_value_2_desc">
                  نضع الإنسان في قلب كل قصة، ونؤمن بأن لكل فرد حقاً في أن يُسمع
                  ويُمثَّل بكرامة واحترام.
                </p>{" "}
              </div>{" "}
            </div>{" "}
            <div className="col-12 col-sm-6 col-lg-3">
              {" "}
              <div className="value-card">
                {" "}
                <div className="value-card-icon">
                  {" "}
                  <i>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.5em"
                      height="1.5em"
                      viewBox="0 0 14 14"
                    >
                      {" "}
                      <path d="M0 0h14v14H0z" fill="none"></path>{" "}
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.568 1.255a.466.466 0 0 1 .864 0l.587 1.433l1.593.14c.416.036.578.56.255.824l-.947.778a.47.47 0 0 0-.16.46l.314 1.452a.466.466 0 0 1-.715.486L10 5.92l-1.359.91a.466.466 0 0 1-.715-.487L8.24 4.89a.47.47 0 0 0-.16-.459l-.947-.778a.466.466 0 0 1 .255-.825l1.593-.14zM.983 6.37l.692-.043a8 8 0 0 1 2.448.227l1.16.292a1.32 1.32 0 0 1 .99 1.416v0c-.078.765-.79 1.3-1.546 1.166L3.622 9.23l3.897.699l4.037-.958a1.24 1.24 0 0 1 1.482.887v0c.16.603-.153 1.23-.73 1.465l-3.23 1.311a6.93 6.93 0 0 1-4.918.113L.813 11.562"
                      ></path>{" "}
                    </svg>{" "}
                  </i>{" "}
                </div>{" "}
                <h3 className="value-card-title" data-i18n="core_value_3_title">
                  التأثير
                </h3>{" "}
                <p className="value-card-desc" data-i18n="core_value_3_desc">
                  نسعى لصناعة محتوى يرفع الوعي، ويُحدث أثراً إيجابياً في
                  المجتمع، ويُحفّز التغيير نحو الأفضل.
                </p>{" "}
              </div>{" "}
            </div>{" "}
            <div className="col-12 col-sm-6 col-lg-3">
              {" "}
              <div className="value-card">
                {" "}
                <div className="value-card-icon">
                  {" "}
                  <i></i>{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.5em"
                    height="1.5em"
                    viewBox="0 0 24 24"
                  >
                    {" "}
                    <path d="M0 0h24v24H0z" fill="none"></path>{" "}
                    <g fill="none" stroke="currentColor" strokeWidth="1.5">
                      {" "}
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 21.5l4-4m2 0l4 4m-5-4v5"
                      ></path>{" "}
                      <path d="M2 11.875c0-2.062 0-3.094 1.025-3.734S5.7 7.5 9 7.5h1c3.3 0 4.95 0 5.975.64C17 8.782 17 9.814 17 11.876v1.25c0 2.062 0 3.094-1.025 3.734S13.3 17.5 10 17.5H9c-3.3 0-4.95 0-5.975-.64C2 16.218 2 15.186 2 13.124z"></path>{" "}
                      <path
                        strokeLinecap="round"
                        d="m17 10.25l.126-.076c2.116-1.27 3.174-1.904 4.024-1.598c.85.307.85 1.323.85 3.355v1.138c0 2.032 0 3.048-.85 3.355s-1.908-.329-4.024-1.598L17 14.75"
                      ></path>{" "}
                      <circle cx="12.5" cy="5" r="2.5"></circle>{" "}
                      <circle cx="7" cy="4.5" r="3"></circle>{" "}
                    </g>{" "}
                  </svg>{" "}
                </div>{" "}
                <h3 className="value-card-title" data-i18n="core_value_4_title">
                  الاستقلالية
                </h3>{" "}
                <p className="value-card-desc" data-i18n="core_value_4_desc">
                  نلتزم بإعلام مستقل يعكس الواقع بصدق، بعيداً عن أي تحيزات أو
                  أجندات تؤثر على رسالتنا
                </p>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      <section className="about-the-platform">
        {" "}
        <div className="about-the-platform-card">
          {" "}
          <div
            style={{
              borderRadius: "20px !important",
              backgroundColor: "#EDEFEB !important",
              padding: '20px !important',
            }}
          >
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
                  بصدق. نساعدك على إيصال صوتك إلى الآخرين، ونمنح المحتوى
                  الإنساني مساحة حقيقية ليُرى، ويُسمع، ويترك أثرًا.
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
      </section>{" "}
      <section className="sawt-story-section">
        {" "}
        <img
          src="/assets/images/leaf_cutout.png"
          className="olive-branch branch-right-bottom-sawt-story"
          alt="Olive Branch"
        />{" "}
        <div className="container" dir="rtl">
          {" "}
          <div className="text-center sawt-story-head">
            {" "}
            <h2
              className="sawt-story-title"
              data-i18n-html="sawt_story_title_html"
            >
              {" "}
              <span>قصة </span>{" "}
              <span className="sawt-story-highlight">صوت</span>{" "}
            </h2>{" "}
            <p className="sawt-story-subtitle" data-i18n="sawt_story_subtitle">
              من فكرة بسيطة إلى منصة تحمل قصص الناس وتنقل أصواتهم.
            </p>{" "}
          </div>{" "}
          <div className="row g-4 justify-content-center sawt-story-grid">
            {" "}
            <div className="col-12 col-md-6 col-lg-4 sawt-story-grid-col">
              {" "}
              <div className="sawt-story-card">
                {" "}
                <div className="sawt-story-icon">
                  {" "}
                  <i>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.3em"
                      height="1.3em"
                      viewBox="0 0 24 24"
                    >
                      {" "}
                      <path d="M0 0h24v24H0z" fill="none"></path>{" "}
                      <g fill="none" stroke="currentColor" strokeWidth="1.5">
                        {" "}
                        <path d="M18.719 10.715a1.044 1.044 0 0 1-1.437 0c-1.765-1.683-4.13-3.564-2.977-6.294C14.929 2.945 16.425 2 18 2s3.072.945 3.695 2.42c1.152 2.728-1.207 4.617-2.977 6.295Z"></path>{" "}
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M18.135 6h-.125m.25 0a.25.25 0 1 1-.5 0a.25.25 0 0 1 .5 0"
                        ></path>{" "}
                        <circle
                          cx="5"
                          cy="19"
                          r="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></circle>{" "}
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11 7H9.5C7.567 7 6 8.343 6 10s1.567 3 3.5 3h3c1.933 0 3.5 1.343 3.5 3s-1.567 3-3.5 3H11m7.135-13h-.125m.25 0a.25.25 0 1 1-.5 0a.25.25 0 0 1 .5 0"
                        ></path>{" "}
                      </g>{" "}
                    </svg>{" "}
                  </i>{" "}
                </div>{" "}
                <h3
                  className="sawt-story-card-title"
                  data-i18n="sawt_story_3_title"
                >
                  رحلتنا
                </h3>{" "}
                <p
                  className="sawt-story-card-desc"
                  data-i18n="sawt_story_3_desc"
                >
                  بدأت رحلة "صوت" في ظل ظروف صعبة، حيث كانت الكثير من القصص
                  الحقيقية مخفية والأصوات الصادقة مكتومة تحت ضغوط الإعلام
                  التقليدي والسرديات الرسمية. آمنّا بأن الحقيقة تستحق أن تُروى،
                  وكل إنسان يستحق أن يُسمع صوته.
                </p>{" "}
              </div>{" "}
            </div>{" "}
            <div className="col-12 col-md-6 col-lg-4 sawt-story-grid-col">
              {" "}
              <div className="sawt-story-card">
                {" "}
                <div className="sawt-story-icon">
                  {" "}
                  <i>
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.3em"
                      height="1.3em"
                      viewBox="0 0 24 24"
                    >
                      {" "}
                      <path d="M0 0h24v24H0z" fill="none"></path>{" "}
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M5.333 3c2.46-.003 4.836.887 6.667 2.5V21a10.07 10.07 0 0 0-6.667-2.5c-1.562 0-2.343 0-2.688-.22a1.16 1.16 0 0 1-.424-.425C2 17.51 2 16.895 2 15.663v-9.26c0-1.428 0-2.141.549-2.72c.548-.579 1.11-.609 2.234-.668Q5.056 3 5.333 3m13.334 0A10.07 10.07 0 0 0 12 5.5V21a10.07 10.07 0 0 1 6.667-2.5c1.562 0 2.343 0 2.688-.22c.207-.133.291-.218.424-.425c.221-.345.221-.96.221-2.192v-9.26c0-1.428 0-2.141-.549-2.72s-1.11-.609-2.234-.668Q18.944 3 18.667 3"
                      ></path>{" "}
                    </svg>{" "}
                  </i>{" "}
                </div>{" "}
                <h3
                  className="sawt-story-card-title"
                  data-i18n="sawt_story_2_title"
                >
                  ما نقدم
                </h3>{" "}
                <p
                  className="sawt-story-card-desc"
                  data-i18n="sawt_story_2_desc"
                >
                  نحن نقدم إعلامًا حقيقيًا يعتمد على القصص الحقيقية والأصوات
                  الصادقة، بعيدًا عن ضغوط الإعلام التقليدي والسرديات الرسمية.
                  منصاتنا تتيح لأي إنسان أن يُسمع صوته ويُسرد قصته بحرية
                  ومصداقية، حيث نوثّق القصص الحقيقية من المناطق المتضررة.
                </p>{" "}
              </div>{" "}
            </div>{" "}
            <div className="col-12 col-md-6 col-lg-4 sawt-story-grid-col">
              {" "}
              <div className="sawt-story-card">
                {" "}
                <div className="sawt-story-icon">
                  {" "}
                  <i>
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.3em"
                      height="1.3em"
                      viewBox="0 0 14 14"
                    >
                      {" "}
                      <path d="M0 0h14v14H0z" fill="none"></path>{" "}
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.568 1.255a.466.466 0 0 1 .864 0l.587 1.433l1.593.14c.416.036.578.56.255.824l-.947.778a.47.47 0 0 0-.16.46l.314 1.452a.466.466 0 0 1-.715.486L10 5.92l-1.359.91a.466.466 0 0 1-.715-.487L8.24 4.89a.47.47 0 0 0-.16-.459l-.947-.778a.466.466 0 0 1 .255-.825l1.593-.14zM.983 6.37l.692-.043a8 8 0 0 1 2.448.227l1.16.292a1.32 1.32 0 0 1 .99 1.416v0c-.078.765-.79 1.3-1.546 1.166L3.622 9.23l3.897.699l4.037-.958a1.24 1.24 0 0 1 1.482.887v0c.16.603-.153 1.23-.73 1.465l-3.23 1.311a6.93 6.93 0 0 1-4.918.113L.813 11.562"
                      ></path>{" "}
                    </svg>{" "}
                  </i>{" "}
                </div>{" "}
                <h3
                  className="sawt-story-card-title"
                  data-i18n="sawt_story_1_title"
                >
                  التأثير
                </h3>{" "}
                <p
                  className="sawt-story-card-desc"
                  data-i18n="sawt_story_1_desc"
                >
                  منذ انطلاقنا، استطعنا إيصال أصوات الآلاف من الأشخاص الذين
                  كانوا صامتين، وكشفنا حقائق عديدة تم إخفاؤها عن الرأي العام.
                  قصصنا وصلت لملايين المتابعين، وساهمت في لفت انتباه العالم إلى
                  قضايا مهمشة.
                </p>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
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
      </section>{" "}
      <SiteFooter /> {/*  Modal  */} {/*  .....................  */}
    </>
  );
}
