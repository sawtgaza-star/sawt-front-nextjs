/* "دوراتنا الأكثر شهرة" — the mock shows three card states side by side, so each
   course declares which blocks it renders rather than every card looking alike:
   - graphic-design: photo + meta chips + rating (no copy, no CTA)
   - data-analysis:  the featured card — no photo, green outline, full detail
   - digital-marketing: photo + "قريبًا" flag + copy + waitlist CTA
   Order is the mock's reading order, i.e. first card = rightmost in RTL. */

export type CourseMeta = {
  /* which chip icon to draw: total duration / weekly hours / level */
  icon: "duration" | "hours" | "level";
  value: string;
  valueKey: string;
};

export type PopularCourse = {
  key: string;
  /* course detail page — the whole card is a link (overlay), /courses/[key] */
  href: string;
  /* photo card vs the bordered, image-less featured card */
  featured?: boolean;
  image?: string;
  category?: string;
  categoryKey?: string;
  /* renders the green "قريبًا" flag on the photo */
  soon?: boolean;
  title: string;
  titleKey: string;
  meta?: CourseMeta[];
  /* filled stars out of five */
  rating?: number;
  desc?: string;
  descKey?: string;
  tutor?: { name: string; nameKey: string; avatar: string };
  cta?: { label: string; labelKey: string; href: string };
};

export const POPULAR_COURSES: PopularCourse[] = [
  {
    key: "graphic-design",
    href: "/courses/graphic-design",
    image: "/assets/images/Rectangle 596.png",
    category: "التصميم",
    categoryKey: "inc_course_cat_design",
    title: "تصميم الجرافيك",
    titleKey: "inc_course_graphic_title",
    meta: [
      { icon: "duration", value: "15 ساعة", valueKey: "inc_course_graphic_duration" },
      { icon: "hours", value: "4 ساعات", valueKey: "inc_course_graphic_hours" },
      { icon: "level", value: "منخفض", valueKey: "inc_course_level_low" },
    ],
    rating: 4,
  },
  {
    key: "data-analysis",
    href: "/courses/data-analysis",
    featured: true,
    title: "تحليل البيانات",
    titleKey: "inc_course_data_title",
    meta: [
      { icon: "duration", value: "25 ساعة", valueKey: "inc_course_data_duration" },
      { icon: "hours", value: "8 ساعات", valueKey: "inc_course_data_hours" },
      { icon: "level", value: "مرتفع", valueKey: "inc_course_level_high" },
    ],
    rating: 4,
    desc: "استراتيجيات فعالة لكتابة المحتوى الجذاب وزيادة التفاعل.استراتيجيات فعالة لكتابة المحتوى الجذاب وزيادة التفاعل.",
    descKey: "inc_course_data_desc",
    tutor: {
      name: "أحمد الرفاعي",
      nameKey: "inc_course_data_tutor",
      avatar: "/assets/images/محمود زعيتر 2.png",
    },
    cta: {
      label: "تفاصيل الكورس",
      labelKey: "inc_course_details_cta",
      href: "/courses/data-analysis",
    },
  },
  {
    key: "digital-marketing",
    href: "/courses/digital-marketing",
    image: "/assets/images/Rectangle 596.png",
    category: "التسويق",
    categoryKey: "inc_course_cat_marketing",
    soon: true,
    title: "تسويق المحتوى الرقمي",
    titleKey: "inc_course_marketing_title",
    desc: "استراتيجيات فعالة لكتابة المحتوى الجذاب وزيادة التفاعل",
    descKey: "inc_course_marketing_desc",
    cta: {
      label: "انضم لقائمة الانتظار",
      labelKey: "inc_course_waitlist_cta",
      href: "#",
    },
  },
];
