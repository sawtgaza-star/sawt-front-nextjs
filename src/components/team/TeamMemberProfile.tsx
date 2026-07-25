import type { TeamMember } from "./team-data";
import { TEAM_SOCIALS } from "./team-data";

/* Member detail hero: the mic-framed portrait (left in RTL) beside the member's
   name, role, experience, bio ("نبذه عنه") and social links ("تابعنا على :").
   Matches the /team/[id] mock. */
export default function TeamMemberProfile({ member }: { member: TeamMember }) {
  return (
    <section className="team-detail-section">
      <img
        src="/assets/images/leaf_cutout.png"
        className="team-detail-branch"
        alt=""
        aria-hidden="true"
      />
      <div className="container">
        <div className="team-detail-grid">
          <div className="team-detail-info">
            <h1 className="team-detail-name" data-i18n={member.nameKey}>
              {member.name}
            </h1>
            <p className="team-detail-role" data-i18n={member.roleKey}>
              {member.role}
            </p>
            <p className="team-detail-experience">
              <i className="fa-solid fa-star" aria-hidden="true"></i>
              <span data-i18n="team_detail_experience">5 سنوات من الخبرة</span>
            </p>

            <h2 className="team-detail-about-title" data-i18n="team_detail_about_title">
              نبذه عنه
            </h2>
            <p className="team-detail-bio" data-i18n="team_detail_bio">
              متخصص في تحويل الأفكار والرؤى المعقدة إلى تجارب (UI/UX) مصمم واجهات
              وتجربة مستخدم رقمية بخبرة تمتد لأكثر من 5 سنوات في فهم سلوك
              المستخدمين وتحليل احتياجاتهم، أركز في عملي على تحقيق التوازن المثالي
              بين جمالية الواجهات وأعلى معايير سهولة الاستخدام والوصول. الشغف
              المهني لفريق «صوت» غزة يترجم إيماني بأهمية تكنولوجيا الإعلام؛ حيث
              أعمل على تطوير وتصميم واجهات المنصة لتكون الجسر البصري والرقمي الذي
              يضمن تدفق المحتوى الإبداعي والقصص الإنسانية بسلاسة تامة وبأعلى جودة
              ممكنة.
            </p>

            <div className="team-detail-follow">
              <span
                className="team-detail-follow-label"
                data-i18n="team_detail_follow"
              >
                تابعنا على :
              </span>
              <div className="team-detail-social">
                {TEAM_SOCIALS.map((s) => (
                  <a href={s.href} key={s.icon} aria-label={s.label}>
                    <i className={`fab ${s.icon}`}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="team-detail-photo">
            <img src={member.micPhoto} alt={member.name} />
          </div>
        </div>
      </div>
    </section>
  );
}
