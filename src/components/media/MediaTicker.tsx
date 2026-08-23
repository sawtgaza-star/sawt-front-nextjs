/* The olive-tinted strip that rides the bottom edge of the hero: the service
   list scrolling right-to-left, each item followed by an orange dot. Two
   identical groups so the CSS translate loops seamlessly (same trick as the
   site-wide .marquee, but with text instead of logos). */
const TICKER = [
  { key: "sm_tick_graphic", text: "التصميم الجرافيكي" },
  { key: "sm_tick_coverage", text: "التغطية والاستشارات" },
  { key: "sm_tick_video", text: "إنتاج الفيديوهات" },
  { key: "sm_tick_ux", text: "تصميم تجربة مستخدم" },
  { key: "sm_tick_ui", text: "تصميم واجهه المستخدم" },
  { key: "sm_tick_content", text: "صناعة المحتوى" },
];

function Group({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="sm-ticker-group" aria-hidden={hidden || undefined}>
      {TICKER.map((t) => (
        <span className="sm-ticker-item" key={t.key}>
          <span data-i18n={t.key}>{t.text}</span>
          <i className="sm-ticker-dot" aria-hidden="true"></i>
        </span>
      ))}
    </div>
  );
}

export default function MediaTicker() {
  return (
    <div className="sm-ticker">
      <Group />
      <Group hidden />
    </div>
  );
}
