/* "دوراتنا الأكثر شهرة" — each course declares which blocks it renders rather
   than every card looking alike:
   - graphic-design: photo + meta chips + rating
   - data-analysis:  same shape as graphic-design
   - digital-marketing: photo + "قريبًا" flag + copy + waitlist CTA
   Order is the mock's reading order, i.e. first card = rightmost in RTL.

   `reveal` lists the blocks a card keeps hidden until it is hovered — at rest
   it looks exactly as above, on hover it fills out to the full detail set
   while the photo slides up to make room.

   `featured` (the mock's outlined, photo-less middle card) is unused now that
   every card carries a photo; the type and its CSS are kept for when it's
   wanted again. */

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
  /* blocks that stay collapsed until the card is hovered */
  reveal?: CourseBlock[];
};

export type CourseBlock = "meta" | "rating" | "desc" | "tutor" | "cta";

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
    desc: "استراتيجيات فعالة لكتابة المحتوى الجذاب وزيادة التفاعل",
    descKey: "inc_course_graphic_desc",
    tutor: {
      name: "أحمد الرفاعي",
      nameKey: "inc_course_data_tutor",
      avatar: "/assets/images/محمود زعيتر 2.png",
    },
    cta: {
      label: "تفاصيل الكورس",
      labelKey: "inc_course_details_cta",
      href: "/courses/graphic-design",
    },
    reveal: ["desc", "tutor", "cta"],
  },
  {
    key: "data-analysis",
    href: "/courses/data-analysis",
    image: "/assets/images/Rectangle 596.png",
    category: "البيانات",
    categoryKey: "inc_course_cat_data",
    title: "تحليل البيانات",
    titleKey: "inc_course_data_title",
    meta: [
      { icon: "duration", value: "25 ساعة", valueKey: "inc_course_data_duration" },
      { icon: "hours", value: "8 ساعات", valueKey: "inc_course_data_hours" },
      { icon: "level", value: "مرتفع", valueKey: "inc_course_level_high" },
    ],
    rating: 4,
    /* one sentence, like the other two cards: the mock's doubled copy wrapped
       to twice the lines and pushed the open panel past the card's bottom */
    desc: "استراتيجيات فعالة لكتابة المحتوى الجذاب وزيادة التفاعل",
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
    reveal: ["desc", "tutor", "cta"],
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
    meta: [
      { icon: "duration", value: "18 ساعة", valueKey: "inc_course_marketing_duration" },
      { icon: "hours", value: "6 ساعات", valueKey: "inc_course_marketing_hours" },
      { icon: "level", value: "مرتفع", valueKey: "inc_course_level_high" },
    ],
    rating: 4,
    desc: "استراتيجيات فعالة لكتابة المحتوى الجذاب وزيادة التفاعل",
    descKey: "inc_course_marketing_desc",
    tutor: {
      name: "أحمد الرفاعي",
      nameKey: "inc_course_data_tutor",
      avatar: "/assets/images/محمود زعيتر 2.png",
    },
    cta: {
      label: "انضم لقائمة الانتظار",
      labelKey: "inc_course_waitlist_cta",
      href: "#",
    },
    reveal: ["meta", "rating", "tutor"],
  },
];
