/* "فريق خبراء متخصص" — five expert cards. Order is the mock's reading order,
   i.e. first card = rightmost in RTL. The mock uses one stock portrait for all
   five cards; that asset isn't exported from the design file yet, so the
   course-tutor placeholder photo stands in until it is (same name/format swap). */

export type Expert = {
  key: string;
  image: string;
  name: string;
  nameKey: string;
  /* the "X سنوات" experience chip */
  badge: string;
  badgeKey: string;
  desc: string;
  descKey: string;
  /* chain-link action (always visible) */
  profileHref: string;
  /* LinkedIn action (revealed on hover) */
  linkedinHref: string;
};

const PLACEHOLDER_PHOTO = "/assets/images/Image (أحمد المنصور).png";

export const EXPERTS: Expert[] = [
  {
    key: "tareq",
    image: PLACEHOLDER_PHOTO,
    name: "طارق الجبالي",
    nameKey: "inc_expert_tareq_name",
    badge: "7 سنوات",
    badgeKey: "inc_expert_tareq_badge",
    desc: "خبرة 7 سنوات في تطوير تطبيقات الهاتف المحمول. عمل على مشاريع مبتكرة في مجال التجارة الإلكترونية.",
    descKey: "inc_expert_tareq_desc",
    profileHref: "#",
    linkedinHref: "#",
  },
  {
    key: "sumaya",
    image: PLACEHOLDER_PHOTO,
    name: "سمية الخطيب",
    nameKey: "inc_expert_sumaya_name",
    badge: "3 سنوات",
    badgeKey: "inc_expert_sumaya_badge",
    desc: "خبرة 3 سنوات في التسويق الرقمي وتحليل البيانات. ساهمت في زيادة نسبة المبيعات بنسبة 30%.",
    descKey: "inc_expert_sumaya_desc",
    profileHref: "#",
    linkedinHref: "#",
  },
  {
    key: "yousef",
    image: PLACEHOLDER_PHOTO,
    name: "يوسف العتيبي",
    nameKey: "inc_expert_yousef_name",
    badge: "10 سنوات",
    badgeKey: "inc_expert_yousef_badge",
    desc: "خبرة 10 سنوات في إدارة المشاريع وتطوير البرمجيات. قاد فريقًا في مشروع ضخم للذكاء الاصطناعي.",
    descKey: "inc_expert_yousef_desc",
    profileHref: "#",
    linkedinHref: "#",
  },
  {
    key: "laila",
    image: PLACEHOLDER_PHOTO,
    name: "ليلى العبدالله",
    nameKey: "inc_expert_laila_name",
    badge: "5 سنوات",
    badgeKey: "inc_expert_laila_badge",
    desc: "خبرة 5 سنوات في تصميم الجرافيك وتطوير العلامات التجارية. عملت مع عدة شركات ناشئة.",
    descKey: "inc_expert_laila_desc",
    profileHref: "#",
    linkedinHref: "#",
  },
  {
    key: "ahmad",
    image: PLACEHOLDER_PHOTO,
    name: "أحمد المنصور",
    nameKey: "inc_expert_ahmad_name",
    badge: "+8 سنة",
    badgeKey: "inc_expert_ahmad_badge",
    desc: "خبرة +8 سنوات في إنتاج المحتوى الرقمي والإعلام الاجتماعي. أطلق أكثر من 200 قناة ناجحة.",
    descKey: "inc_expert_ahmad_desc",
    profileHref: "#",
    linkedinHref: "#",
  },
];
