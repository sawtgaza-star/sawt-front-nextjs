import {
  IconTrainerFacebook,
  IconTrainerTwitter,
  IconTrainerLinkedIn,
  IconTrainerInstagram,
} from "@/components/ui/icons";

/* "المدرب" — orange-bar section head + one olive-50 card: rounded photo on
   the inline-start side, then name / olive role line / bio, a bold "تابعني
   على" label and the social chips (olive glyphs on 40px bordered squares).
   DOM order facebook → twitter → linkedin → instagram so facebook lands
   rightmost in RTL, as in the mock. Same trainer for every course, and the
   links are href="#" placeholders like the legacy socials. */
const SOCIALS = [
  { label: "Facebook", icon: <IconTrainerFacebook /> },
  { label: "Twitter", icon: <IconTrainerTwitter /> },
  { label: "LinkedIn", icon: <IconTrainerLinkedIn /> },
  { label: "Instagram", icon: <IconTrainerInstagram /> },
];

export default function CourseTrainer() {
  return (
    <section className="crs-section crs-trainer-section" id="crs-trainer">
      <div className="crs-sec-head">
        <span className="crs-sec-bar" aria-hidden="true"></span>
        <h2 className="crs-sec-title" data-i18n="crs_trainer_title">
          المدرب
        </h2>
      </div>

      <div className="crs-trainer-card">
        <img
          className="crs-trainer-photo"
          src="/assets/images/37c44d5d7b06d5c0cec62fd59db3fefe448049b9.png"
          alt="محمد العارف"
        />
        <div className="crs-trainer-info">
          <h3 className="crs-trainer-name" data-i18n="crs_trainer_name">
            محمد العارف
          </h3>
          <p className="crs-trainer-role" data-i18n="crs_trainer_role">
            متخصص في صناعة المحتوى الرقمي والإنتاج الإعلامي
          </p>
          <p className="crs-trainer-bio" data-i18n="crs_trainer_bio">
            مدرب ومتخصص في صناعة المحتوى الرقمي والإنتاج الإعلامي، يمتلك خبرة
            عملية في تطوير الأفكار، وكتابة السكربت، وإنتاج المحتوى الهادف. يركز
            في تدريبه على التطبيق العملي، وتمكين المشاركين من تحويل أفكارهم إلى
            محتوى احترافي قادر على صناعة أثر حقيقي
          </p>
          <p className="crs-trainer-follow" data-i18n="crs_trainer_follow">
            تابعني على
          </p>
          <div className="crs-trainer-socials">
            {SOCIALS.map((social) => (
              <a
                className="crs-trainer-social"
                href="#"
                aria-label={social.label}
                key={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
