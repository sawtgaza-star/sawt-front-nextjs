import { localized } from "@/lib/api/pages";
import type { TeamDetailLabels, TeamMemberDetail } from "@/lib/api/team";
import { PLACEHOLDER_PHOTO, toSocialLinks } from "./team-data";
import TeamDetailPhoto from "./TeamDetailPhoto";

/* Member detail hero: the mic-framed portrait (left in RTL) beside the member's
   name, role, experience, bio ("نبذة عنه") and social links ("تابعنا على :").
   Matches the /team/[uuid] mock.

   Everything here is the API's `member` block and the `labels` beside it, so
   nothing carries a `data-i18n` key any more: the payload holds ar and en at
   once and `lang` picks one, which leaves the DOM translator nothing of
   React's to overwrite.

   Fields the member left empty simply don't draw — the star badge without a
   years figure, the bio heading without a bio, the follow row without a single
   link. The ONE exception is the "شاهد اعمالي في صوت ميديا" button: it has no
   field in the payload, so it keeps its key and its built-in wording. */
export default function TeamMemberProfile({
  member,
  labels,
  lang = "ar",
}: {
  member: TeamMemberDetail;
  labels?: TeamDetailLabels;
  lang?: string;
}) {
  const name = localized(member.name, lang);
  const role = localized(member.role, lang);
  const bio = localized(member.bio, lang);
  const bioTitle = localized(labels?.bio, lang);
  const followLabel = localized(labels?.follow, lang);
  const experienceSuffix = localized(labels?.experience_suffix, lang);
  const years = member.years_of_experience;
  const socials = toSocialLinks(member.socials);

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
            {/* Name/role on the start side, the experience badge pushed to the
                opposite end of the same row (top-left in RTL) — per the mock. */}
            <div className="team-detail-head">
              <div className="team-detail-identity">
                <h1 className="team-detail-name">{name}</h1>
                <p className="team-detail-role">{role}</p>
              </div>
              {typeof years === "number" ? (
                <p className="team-detail-experience">
                  <i className="fa-solid fa-star" aria-hidden="true"></i>
                  <span>
                    {years} {experienceSuffix}
                  </span>
                </p>
              ) : null}
            </div>

            {bio ? (
              <>
                {bioTitle ? (
                  <h2 className="team-detail-about-title">{bioTitle}</h2>
                ) : null}
                <p className="team-detail-bio">{bio}</p>
              </>
            ) : null}

            {/* i18n key sits on the inner <span>: applyTranslations() replaces
                textContent, which would drop the chevron if it were on the <a>. */}
            <a className="team-detail-work-btn" href="/media/works">
              <span data-i18n="team_detail_work_btn">شاهد اعمالي في صوت ميديا</span>
              <i className="fa-solid fa-chevron-left" aria-hidden="true"></i>
            </a>

            {socials.length > 0 && (
              <div className="team-detail-follow">
                {followLabel ? (
                  <span className="team-detail-follow-label">{followLabel}</span>
                ) : null}
                <div className="team-detail-social">
                  {socials.map((social) => (
                    <a
                      href={social.href}
                      key={social.icon}
                      aria-label={social.label}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className={`fab ${social.icon}`}></i>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          <TeamDetailPhoto src={member.photo_url || PLACEHOLDER_PHOTO} alt={name} />
        </div>
      </div>
    </section>
  );
}
