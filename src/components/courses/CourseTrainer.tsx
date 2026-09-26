import type { ReactNode } from "react";
import { localized } from "@/lib/api/pages";
import { t } from "@/lib/translations";
import type { CourseTrainer as CourseTrainerData } from "@/lib/api/courses";
import {
  IconTrainerFacebook,
  IconTrainerTwitter,
  IconTrainerLinkedIn,
  IconTrainerInstagram,
} from "@/components/ui/icons";
import { PLACEHOLDER } from "@/components/incubator/incubator-page-view";

/* The four platforms the design draws a chip for. DOM order facebook →
   twitter → linkedin → instagram so facebook lands rightmost in RTL, as in
   the mock; a platform the design has no glyph for is left out. */
const SOCIAL_ICONS: { match: string[]; label: string; icon: () => ReactNode }[] = [
  { match: ["facebook"], label: "Facebook", icon: () => <IconTrainerFacebook /> },
  { match: ["twitter", "x"], label: "Twitter", icon: () => <IconTrainerTwitter /> },
  { match: ["linkedin"], label: "LinkedIn", icon: () => <IconTrainerLinkedIn /> },
  { match: ["instagram"], label: "Instagram", icon: () => <IconTrainerInstagram /> },
];

/* "المدرب" — orange-bar section head + one olive-50 card: rounded photo on
   the inline-start side, then name / olive role line / bio, a bold "تابعني
   على" label and the social chips (olive glyphs on 40px bordered squares),
   all from the course's `trainer`. The follow row only shows when the trainer
   has socials. */
export default function CourseTrainer({
  trainer,
  lang,
}: {
  trainer?: CourseTrainerData | null;
  lang: string;
}) {
  const name = (trainer?.name || "").trim();
  if (!trainer || !name) return null;

  const role = localized(trainer.title, lang);
  const bio = localized(trainer.bio, lang);
  const socials = SOCIAL_ICONS.map((entry) => ({
    ...entry,
    url: (trainer.socials || []).find((s) =>
      entry.match.includes((s.platform || "").trim().toLowerCase()),
    )?.url,
  })).filter((entry) => entry.url);

  return (
    <section className="crs-section crs-trainer-section" id="crs-trainer">
      <div className="crs-sec-head">
        <span className="crs-sec-bar" aria-hidden="true"></span>
        <h2 className="crs-sec-title">{t("crs_trainer_title")}</h2>
      </div>

      <div className="crs-trainer-card">
        <img
          className="crs-trainer-photo"
          src={trainer.avatar_url || PLACEHOLDER.person}
          alt={name}
        />
        <div className="crs-trainer-info">
          <h3 className="crs-trainer-name">{name}</h3>
          {role && <p className="crs-trainer-role">{role}</p>}
          {bio && <p className="crs-trainer-bio">{bio}</p>}
          {socials.length > 0 && (
            <>
              <p className="crs-trainer-follow">{t("crs_trainer_follow")}</p>
              <div className="crs-trainer-socials">
                {socials.map((social) => (
                  <a
                    className="crs-trainer-social"
                    href={social.url!}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    key={social.label}
                  >
                    {social.icon()}
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
