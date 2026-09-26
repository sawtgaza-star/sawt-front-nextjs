import type { ReactNode } from "react";
import { t } from "@/lib/translations";
import {
  IconClockCheck,
  IconHourglass,
  IconLayers,
  IconRatingStar,
} from "@/components/ui/icons";
import WaitlistButton from "@/components/courses/course-register/WaitlistButton";
import type { CourseBlock, PopularCourse } from "./popular-courses-data";

const CHIP_ICONS = {
  duration: IconClockCheck,
  hours: IconHourglass,
  level: IconLayers,
} as const;

const STARS_TOTAL = 5;

/* One "دوراتنا الأكثر شهرة" card. Every block is optional so the same component
   covers the mock's states (see popular-courses-data.ts). Its copy is the
   API's; the two fixed labels ("قريبًا", "المدرب:") aren't in the payload and
   are read through t(), since this card mounts after initTranslate()'s pass. */
export default function CourseCard({ course }: { course: PopularCourse }) {
  const hidden = new Set<CourseBlock>(course.reveal ?? []);
  /* Blocks listed in `reveal` are wrapped in the collapsing grid that opens on
     hover; the rest are rendered bare. The wrapper — rather than a class on the
     block itself — is what lets the block keep its own margins and lets the
     open height be interpolated exactly (see .inc-course-reveal). */
  const rv = (block: CourseBlock, node: ReactNode) =>
    hidden.has(block) ? (
      <div className={`inc-course-reveal inc-course-reveal--${block}`}>
        {node}
      </div>
    ) : (
      node
    );

  return (
    <article
      className={`inc-course-card${course.featured ? " is-featured" : ""}`}
    >
      {/* full-card overlay link to the course detail page; the CTA sits above
          it (z-index) so it stays independently clickable */}
      <a
        className="inc-course-link"
        href={course.href}
        aria-label={course.title}
      ></a>

      {/* photo + body wrapper — on the three-up row it is what gets taken out
          of flow, so a hovered card can never resize its neighbours */}
      <div className="inc-course-inner">
        {course.image && (
          <div className="inc-course-media">
            <img src={course.image} alt="" />
            {course.category && (
              <span className="inc-course-cat">
                {course.category}
              </span>
            )}
            {course.soon && (
              <span className="inc-course-soon">{t("inc_course_soon")}</span>
            )}
          </div>
        )}

        <div className="inc-course-body">
          {course.meta &&
            rv(
              "meta",
              <div className="inc-course-meta">
                {course.meta.map((m) => {
                  const Icon = CHIP_ICONS[m.icon];
                  return (
                    <span className="inc-course-chip" key={m.icon}>
                      <Icon />
                      <span>{m.value}</span>
                    </span>
                  );
                })}
              </div>,
            )}

          {/* `display: contents` at rest, so the pair lays out exactly as the
              two loose blocks always did; the phone mock puts them on ONE row
              (title start, stars end) and only there does the wrapper become a
              flex box — see .inc-course-titlerow in incubator.css */}
          <div className="inc-course-titlerow">
            <h3 className="inc-course-title">
              {course.title}
            </h3>

            {course.rating !== undefined &&
              rv(
                "rating",
                <div
                  className="inc-course-rating"
                  aria-label={`${course.rating} من ${STARS_TOTAL}`}
                >
                  {Array.from({ length: STARS_TOTAL }, (_, i) => (
                    <IconRatingStar key={i} filled={i < course.rating!} />
                  ))}
                </div>,
              )}
          </div>

          {course.desc &&
            rv(
              "desc",
              <p className="inc-course-desc">
                {course.desc}
              </p>,
            )}

          {course.tutor &&
            rv(
              "tutor",
              <div className="inc-course-tutor">
                <span className="inc-course-tutor-label">
                  {t("inc_course_tutor")}
                </span>
                <img
                  className="inc-course-tutor-avatar"
                  src={course.tutor.avatar}
                  alt=""
                />
                <b>{course.tutor.name}</b>
              </div>,
            )}

          {course.waitlist &&
            rv(
              "cta",
              <WaitlistButton
                className="inc-course-cta"
                path={course.waitlist.path}
                label={course.waitlist.label}
              />,
            )}

          {course.cta &&
            rv(
              "cta",
              <a className="inc-course-cta" href={course.cta.href}>
                <span>{course.cta.label}</span>
                <i className="fa-solid fa-angle-left"></i>
              </a>,
            )}
        </div>
      </div>
    </article>
  );
}
