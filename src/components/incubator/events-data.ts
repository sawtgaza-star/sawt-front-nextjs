/* "استكشف أحدث فعالياتنا" — filter chips + the three event cards. Array order is
   the mock's reading order, i.e. first item = rightmost in RTL. Clicking a chip
   filters the cards by category (EventsExplorer); "الكل" shows everything. */

export type EventFilter = {
  key: string;
  label: string;
  labelKey: string;
};

export type IncEvent = {
  key: string;
  /* EventFilter keys this event belongs to (placeholder data until events come
     from a backend — spread so no chip ends up empty) */
  categories: string[];
  image: string;
  /* orange circular badge straddling the photo's bottom edge */
  day: string;
  month: string;
  monthKey: string;
  date: string;
  dateKey: string;
  time: string;
  timeKey: string;
  title: string;
  titleKey: string;
  desc: string;
  descKey: string;
  /* footer row next to the pin icon: "وجاهي,ندوة" */
  type: string;
  typeKey: string;
};

export const EVENT_FILTERS: EventFilter[] = [
  { key: "all", label: "الكل", labelKey: "inc_events_filter_all" },
  {
    key: "economy",
    label: "الاقتصاد (13)",
    labelKey: "inc_events_filter_economy",
  },
  {
    key: "war-stories",
    label: "قصص الحرب (45)",
    labelKey: "inc_events_filter_war",
  },
  {
    key: "business",
    label: "المال والأعمال(13)",
    labelKey: "inc_events_filter_business",
  },
  { key: "news", label: "الاخبار (13)", labelKey: "inc_events_filter_news" },
];

export const INC_EVENTS: IncEvent[] = [
  {
    key: "innovation",
    categories: ["economy", "business"],
    image: "/assets/images/Rectangle 596.png",
    day: "5",
    month: "يوليو",
    monthKey: "inc_events_month_july",
    date: "الثلاثاء 27/5/2026",
    dateKey: "inc_event_innovation_date",
    time: "11.00 مساء",
    timeKey: "inc_event_innovation_time",
    title: "ابتكار الحلول الإبداعية في تصميم واجهات المستخدم، الدليل النهائي للابتكار",
    titleKey: "inc_event_innovation_title",
    desc: "اكتشف كيفية تحويل الأفكار إلى تصميمات فعالة. تعلم استراتيجيات جديدة لتعزيز الإبداع في عملك.",
    descKey: "inc_event_innovation_desc",
    type: "وجاهي,ندوة",
    typeKey: "inc_event_innovation_type",
  },
  {
    key: "tools",
    categories: ["war-stories", "news"],
    image: "/assets/images/Rectangle 596.png",
    day: "4",
    month: "يوليو",
    monthKey: "inc_events_month_july",
    date: "الاثنين 26/5/2026",
    dateKey: "inc_event_tools_date",
    time: "10.00 مساء",
    timeKey: "inc_event_tools_time",
    title: "كيفية استخدام أدوات التصميم الحديثة لتحقيق نتائج مذهلة",
    titleKey: "inc_event_tools_title",
    desc: "استفد من أحدث التطورات في أدوات التصميم لتحسين سرعة وكفاءة العمل. تعرف على كيفية استخدام أدوات التعاونية......",
    descKey: "inc_event_tools_desc",
    type: "أونلاين,ندوة",
    typeKey: "inc_event_tools_type",
  },
  {
    key: "ux",
    categories: ["news", "business"],
    image: "/assets/images/Rectangle 596.png",
    day: "3",
    month: "يوليو",
    monthKey: "inc_events_month_july",
    date: "الأحد 25/5/2026",
    dateKey: "inc_event_ux_date",
    time: "09.30 مساء",
    timeKey: "inc_event_ux_time",
    title: "الاستراتيجيات الفعالة لتحسين تجربة المستخدم، دالدليل الشامل لتحسين الأداء",
    titleKey: "inc_event_ux_title",
    desc: "تعلم كيفية استخدام البيانات لتحسين تصاميمك وجعلها أكثر جاذبية. اكتشف كيفية دمج التعليقات في تحسين الجودة.",
    descKey: "inc_event_ux_desc",
    type: "وجاهي ,ورشة عمل",
    typeKey: "inc_event_ux_type",
  },
];
