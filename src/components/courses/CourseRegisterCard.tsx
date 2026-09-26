import { localized } from "@/lib/api/pages";
import { t } from "@/lib/translations";
import { isWaitlistCta, waitlistPath, type CourseDetail } from "@/lib/api/courses";
import CourseCountdown from "./CourseCountdown";
import CourseSubscribeButton from "./course-register/CourseSubscribeButton";
import WaitlistButton from "./course-register/WaitlistButton";
import { courseMeta } from "./course-view";

/* The white floating registration card — countdown, course facts and the
   subscribe CTA, all from the course payload: the countdown runs to
   `schedule.registration_ends_at`, the rows are the schedule's, and the
   button is the payload's `cta` (label + the endpoint it posts to) — the
   enrollment form, or for a coming-soon course the waiting list. An orange
   rounded tab (::before on .crs-reg) peeks out behind the card's top edge, as
   in the mock. */
export default function CourseRegisterCard({
  course,
  slug,
  lang,
}: {
  course: CourseDetail;
  slug: string;
  lang: string;
}) {
  const title = localized(course.title, lang);
  const deadline = course.schedule?.registration_ends_at;
  const cta = course.cta;
  const waitlist = isWaitlistCta(cta, course.is_coming_soon);

  return (
    <div className="crs-reg">
      <div className="crs-reg-card">
        {deadline && <p className="crs-reg-kicker">{t("crs_reg_ends_in")}</p>}
        <p className="crs-reg-title">{title}</p>

        {deadline && <CourseCountdown deadline={deadline} />}

        <ul className="crs-reg-meta">
          {courseMeta(course, lang).map((row) => (
            <li key={row.key}>
              <span>{row.label}</span>
              <b>{row.value}</b>
            </li>
          ))}
        </ul>

        {cta && waitlist ? (
          <WaitlistButton
            className="crs-btn-green"
            path={waitlistPath(course.uuid || slug, cta.path)}
            label={localized(cta.label, lang) || t("inc_course_waitlist_cta")}
          />
        ) : cta ? (
          <CourseSubscribeButton
            slug={slug}
            cta={cta}
            label={localized(cta.label, lang) || t("crs_subscribe")}
          />
        ) : null}
      </div>
    </div>
  );
}
