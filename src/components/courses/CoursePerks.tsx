import { IconPerkCheck } from "@/components/ui/icons";

/* "ماذا ستحصل عند انضمامك" — orange-bar section head + a two-column grid of
   perk chips (olive-50 pill, orange circled check, start-aligned so the RTL
   rows read right column then left, as in the mock). Same copy for every
   course, so no per-course lookup. DOM order is the mock's reading order:
   row by row, right chip then left chip. */
const PERKS = [
  "تدريب عملي بإشراف مدربين متخصصين.",
  "مراجعات وتغذية راجعة لتطوير مستواك.",
  "شهادة إتمام بعد اجتياز البرنامج.",
  "مشروع احترافي يضاف إلى معرض أعمالك.",
  "مشروع احترافي يضاف إلى معرض أعمالك.",
  "فرصة لنشر أفضل الأعمال عبر منصة صوت.",
  "الانضمام إلى مجتمع حاضنة صوت وفرص مستقبلية للتطوير.",
];

export default function CoursePerks() {
  return (
    <section className="crs-section" id="crs-perks">
      <div className="crs-sec-head">
        <span className="crs-sec-bar" aria-hidden="true"></span>
        <h2 className="crs-sec-title" data-i18n="crs_perks_title">
          ماذا ستحصل عند انضمامك
        </h2>
      </div>

      <ul className="crs-perks-grid">
        {PERKS.map((perk, i) => (
          <li className="crs-perk" key={i}>
            <span className="crs-perk-icon" aria-hidden="true">
              <IconPerkCheck />
            </span>
            <span data-i18n={`crs_perk_i${i + 1}`}>{perk}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
