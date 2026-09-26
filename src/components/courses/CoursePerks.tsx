import { localized } from "@/lib/api/pages";
import { t } from "@/lib/translations";
import type { CourseBenefit } from "@/lib/api/courses";
import { IconPerkCheck } from "@/components/ui/icons";

/* "ماذا ستحصل عند انضمامك" — orange-bar section head + a two-column grid of
   perk chips (olive-50 pill, orange circled check, start-aligned so the RTL
   rows read right column then left, as in the mock), from the course's
   `benefits`. DOM order is the mock's reading order: row by row, right chip
   then left chip. An uploaded `icon_url` replaces the check. */
export default function CoursePerks({
  items,
  lang,
}: {
  items?: CourseBenefit[];
  lang: string;
}) {
  const perks = (Array.isArray(items) ? items : [])
    .map((perk) => ({ icon: perk.icon_url, text: localized(perk, lang) }))
    .filter((perk) => perk.text);
  if (!perks.length) return null;

  return (
    <section className="crs-section" id="crs-perks">
      <div className="crs-sec-head">
        <span className="crs-sec-bar" aria-hidden="true"></span>
        <h2 className="crs-sec-title">{t("crs_perks_title")}</h2>
      </div>

      <ul className="crs-perks-grid">
        {perks.map((perk, i) => (
          <li className="crs-perk" key={i}>
            <span className="crs-perk-icon" aria-hidden="true">
              {perk.icon ? (
                <img src={perk.icon} alt="" width={24} height={24} />
              ) : (
                <IconPerkCheck />
              )}
            </span>
            <span>{perk.text}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
