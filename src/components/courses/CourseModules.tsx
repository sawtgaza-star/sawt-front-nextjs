"use client";
import { useState } from "react";
import {
  IconChevronWide,
  IconLessonDoc,
  IconLessonPlay,
} from "@/components/ui/icons";
import { COURSE_MODULES } from "./course-modules-data";

/* "محاور البرنامج" — numbered accordion looked up by the course's route id;
   one module open at a time, the first open by default (as in the mock).
   Modules without lessons still toggle so the chevron behaves consistently.
   A pale branch hugs the page's far-left edge beside the accordion — its
   paths run into negative x, so the SVG viewport pre-clips it and it sits
   flush against the viewport edge. */
export default function CourseModules({ courseId }: { courseId: string }) {
  const [open, setOpen] = useState(0);
  const courseModules = COURSE_MODULES[courseId];
  if (!courseModules) return null;

  return (
    <section className="crs-section crs-modules-section" id="crs-modules">
      <svg
        className="crs-modules-leaf"
        xmlns="http://www.w3.org/2000/svg"
        width="152"
        height="232"
        viewBox="0 0 152 232"
        fill="none"
        aria-hidden="true"
      >
        <path d="M-14.0306 166.881C-9.975 161.047 -8.90235 158.676 -6.81478 151.819C-2.09068 135.732 -1.20573 118.761 -4.23075 102.27C-6.04436 92.1642 -8.72597 81.9496 -13.6006 72.8574C-14.7393 70.8623 -16.1803 69.1312 -17.0945 67.0302C-19.9396 60.4899 -24.9918 77.5221 -25.6551 79.3722C-33.5913 101.512 -33.3587 126.737 -23.7046 148.303C-22.7062 150.534 -18.4069 160.325 -17.2383 161.468L-16.8238 161.386C-16.0659 160.243 -16.3082 156.694 -16.0964 155.185C-15.0249 147.549 -14.8382 139.897 -14.6638 132.204C-14.6115 129.733 -15.2428 126.25 -15.354 123.686C-15.5274 119.689 -15.5327 115.802 -15.959 111.805C-16.0632 110.828 -16.6143 104.27 -16.1433 103.891C-14.9345 105.036 -12.5526 126.977 -12.5096 130.101C-12.3838 139.259 -11.9919 148.714 -13.5258 157.78C-13.851 159.701 -13.5816 161.918 -13.7353 163.87C-13.791 164.83 -13.9813 165.76 -14.0306 166.881Z" fill="#EDEFEB" />
        <path d="M-4.64226 174.076C-3.30641 172.356 -0.217333 169.957 1.5269 168.503L10.0144 161.425C31.7358 143.63 53.1977 123.928 68.6388 100.307C72.7293 94.0499 76.0041 87.4653 79.2256 80.7513C85.7228 67.2294 90.4815 52.9392 93.3876 38.2215C93.7936 36.1138 95.0579 27.3114 93.9886 25.7304C91.7043 24.7333 85.7806 28.7692 83.6729 29.9424C65.8556 39.86 51.068 54.9249 38.9548 71.1656C37.9841 72.241 32.8007 79.5716 32.3184 80.6932C29.1517 85.1789 26.8025 89.425 24.3147 94.3165C22.0273 98.8141 19.5183 103.331 17.4271 107.926C15.1544 113.185 13.1066 118.492 10.5956 123.645C9.8093 125.259 9.20401 127.849 8.47675 129.614C3.26851 142.253 -1.27067 155.047 -9.12715 166.392C-11.0738 169.203 -13.0584 170.938 -14.2073 174.436C-14.7362 175.985 -18.1772 179.17 -19.2227 180.631C-22.4841 184.661 -25.407 188.627 -29.8241 191.549C-31.5369 192.682 -34.0126 193.015 -34.05 195.054L-34.0088 195.259C-33.1337 196.825 -32.8684 199.16 -32.5899 200.964C-29.6658 198.524 -27.1602 195.378 -24.6392 192.557C-23.2651 191.019 -21.0253 189.332 -19.4074 187.909C-18.418 187.039 -16.483 185.103 -15.5074 184.443C-12.8499 182.647 -9.11883 179.877 -6.07047 178.952C-4.3258 178.423 -2.45436 178.475 -0.58042 177.696C3.37971 176.05 7.24551 174.529 11.314 173.168C25.5489 168.431 40.4302 165.923 55.4314 165.731C58.9558 165.707 63.3228 165.57 66.7324 166.077L66.7835 166.269C65.754 167.132 33.8619 169.545 29.8864 170.698C26.1221 171.789 3.63159 176.224 2.45489 178.845L2.66265 179.077C10.0512 180.703 17.3573 182.455 24.8561 183.517C29.5168 184.177 33.5845 184.021 38.2117 184.063C58.8892 184.25 79.4978 179.087 98.3842 170.881C99.4644 170.437 104.384 168.356 104.536 167.104C104.953 163.666 94.8189 159.868 92.746 159.064C77.2307 153.046 62.4634 152.394 46.1836 155.159C39.6439 156.215 33.1999 157.795 26.9136 159.885C24.603 160.649 20.7984 161.585 18.7855 162.479C12.9366 165.077 6.92041 167.754 1.17943 170.559C-0.809536 171.531 -2.02494 172.863 -4.64226 174.076ZM66.1126 70.135C66.0654 70.7164 65.9324 72.0957 65.7212 72.595C63.6618 77.4643 60.4423 82.46 57.7448 86.9366C46.1171 106.676 32.8959 125.432 18.2129 143.017C15.438 146.318 11.0109 151.961 8.01358 154.773C7.45921 155.51 6.70149 156.204 6.01696 156.829L5.45993 156.545L5.89885 156.929L5.38418 156.674L5.33108 156.842C5.99148 155.969 6.6572 155.101 7.32828 154.236C9.91926 151.157 13.2534 146.37 15.5798 143.087L28.1434 125.374C34.6871 116.453 41.1223 107.453 47.4477 98.3765C48.2259 97.2523 48.9786 96.0724 49.7005 94.9094C54.8224 86.6583 61.4445 78.5758 66.1126 70.135Z" fill="#EDEFEB" />
        <path d="M7.3284 154.236C6.65732 155.101 5.99159 155.97 5.33119 156.843L5.3843 156.674L5.89897 156.929L5.46004 156.545L6.01707 156.829C6.7016 156.204 7.45933 155.511 8.01369 154.773L7.3284 154.236Z" fill="#223216" fillOpacity="0.0156863" />
      </svg>

      <div className="crs-sec-head">
        <span className="crs-sec-bar" aria-hidden="true"></span>
        <h2 className="crs-sec-title" data-i18n="crs_modules_title">
          محاور البرنامج
        </h2>
      </div>

      <div className="crs-modules">
        {courseModules.map((m, i) => {
          const isOpen = open === i;
          return (
            <div
              className={"crs-module" + (isOpen ? " crs-module-open" : "")}
              key={m.key}
            >
              <button
                type="button"
                className="crs-module-head"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                <span className="crs-module-title">
                  {i + 1}.{" "}
                  <span data-i18n={m.titleKey}>{m.title}</span>
                </span>
                <span className="crs-module-chevron" aria-hidden="true">
                  <IconChevronWide />
                </span>
              </button>

              {isOpen && m.lessons && (
                <ul className="crs-module-lessons">
                  {m.lessons.map((lesson, j) => (
                    <li className="crs-lesson" key={j}>
                      <span className="crs-lesson-icon" aria-hidden="true">
                        {lesson.kind === "quiz" ? (
                          <IconLessonDoc />
                        ) : (
                          <IconLessonPlay />
                        )}
                      </span>
                      <span data-i18n={lesson.textKey}>{lesson.text}</span>
                      <span className="crs-lesson-duration">
                        {lesson.duration}{" "}
                        <span data-i18n="crs_lesson_min">دقيقة</span>
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
