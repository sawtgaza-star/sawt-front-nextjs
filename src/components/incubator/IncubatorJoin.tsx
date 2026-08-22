/* "ابدأ رحلتك مع حاضنة صوت" — tenth section of /incubator. Reuses the home
   page's JoinUs banner (join-us-* classes + join-img.jpg collage from
   style.css, which the (main) layout loads) with the incubator copy; the
   mock's flat olive overlay is layered by .inc-join in incubator.css. */
export default function IncubatorJoin() {
  return (
    <section className="inc-join join-us-section position-relative" id="inc-join">
      <div className="join-us-banner">
        <img src="/assets/images/join-img.jpg" alt="" className="join-us-bg" />
        <div className="join-us-content text-center">
          <h2 className="join-us-title" data-i18n="inc_join_title">
            ابدأ رحلتك مع حاضنة صوت
          </h2>
          <p className="join-us-desc" data-i18n="inc_join_desc">
            حوّل فكرتك إلى محتوى مؤثر، وطوّر مهاراتك من خلال التدريب العملي
            والإرشاد المتخصص، واصنع مشروعًا يعكس صوتك ويصل إلى الآخرين.
          </p>
          <a className="btn btn-dark-green join-us-btn" href="#">
            <span data-i18n="inc_join_btn">انضم إلى الحاضنة</span>
            <i className="fa-solid fa-angle-left arrow"></i>
          </a>
        </div>
      </div>
    </section>
  );
}
