import MediaSectionHead from "./MediaSectionHead";
import MediaSatisfactionChip from "./MediaSatisfactionChip";
import { MEDIA_PHOTOS } from "./media-photos";

/* "شريكك الإعلامي المتكامل" — the about block. Copy column on the right (RTL
   first child), staggered four-photo collage on the left with the rating chip
   floating over its seam, and the vision/mission pair under the paragraph. */
export default function MediaAbout() {
  return (
    <section className="sm-about" id="sm-about">
      <div className="container">
        <div className="sm-about-row">
          <div className="sm-about-copy">
            <MediaSectionHead
              align="start"
              pill="من نحن"
              pillKey="sm_about_pill"
              title="شريكك الإعلامي المتكامل"
              titleKey="sm_about_title"
            />
            <p className="sm-about-desc" data-i18n="sm_about_desc">
              صوت ميديا وكالة إعلامية إبداعية متكاملة، تقدم حلولاً إعلامية شاملة
              من الاستراتيجية إلى الإنتاج والنشر. لسنا مجرد مزود خدمات — نحن
              شريكك الإبداعي الذي يفهم أهدافك ويعمل على تحقيقها.
            </p>

            <div className="sm-about-cards">
              <article className="sm-about-card sm-about-vision">
                <h3>
                  <i className="sm-about-card-dot" aria-hidden="true"></i>
                  <span data-i18n="sm_about_vision_title">رؤيتنا</span>
                </h3>
                <p data-i18n="sm_about_vision_desc">
                  أن تصبح منصة التقنية الأولى لإدارة معارض الكتب في العالم
                  العربي.
                </p>
              </article>

              <article className="sm-about-card sm-about-mission">
                <h3>
                  <i className="sm-about-card-dot" aria-hidden="true"></i>
                  <span data-i18n="sm_about_mission_title">رسالتنا</span>
                </h3>
                <p data-i18n="sm_about_mission_desc">
                  تمكين منظمي معارض الكتب من إدارة فعالياتهم بكفاءة أعلى وتجربة
                  أكثر.
                </p>
              </article>
            </div>
          </div>

          {/* two stacks inside one 422px row: RTL puts column A on the right,
              where the design has the tall photo on top; the columns are
              staggered by exactly one gap (A sits at the bottom of the row,
              B at the top) */}
          <div className="sm-about-collage">
            <MediaSatisfactionChip className="sm-chip-about" tilt={0} />
            <span className="sm-about-col sm-about-col-a">
              <span className="sm-about-img sm-about-img-1">
                <img src={MEDIA_PHOTOS.crew} alt="" />
              </span>
              <span className="sm-about-img sm-about-img-2">
                <img src={MEDIA_PHOTOS.hall} alt="" />
              </span>
            </span>
            <span className="sm-about-col sm-about-col-b">
              <span className="sm-about-img sm-about-img-3">
                <img src={MEDIA_PHOTOS.desk} alt="" />
              </span>
              <span className="sm-about-img sm-about-img-4">
                <img src={MEDIA_PHOTOS.studio} alt="" />
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
