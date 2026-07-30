/* "شهادات وتجارب خريجينا" — the graduates' testimonial cards. Order is the
   mock's reading order, i.e. the first card is the rightmost in RTL. The mock
   reuses one stock portrait on every card; that asset isn't exported from the
   design file yet, so the experts' placeholder photo stands in until it is
   (same name/format swap). */

export type Testimonial = {
  key: string;
  photo: string;
  /* filled stars out of 5 (every card in the mock shows 4) */
  rating: number;
  quote: string;
  quoteKey: string;
  /* the small olive link under the quote ("انضم إلينا" / "استكشف الفرص") */
  cta: string;
  ctaKey: string;
  ctaHref: string;
  name: string;
  nameKey: string;
  /* "المهنة — المجال" */
  meta: string;
  metaKey: string;
};

const PLACEHOLDER_PHOTO = "/assets/images/Image (أحمد المنصور).png";

export const TESTIMONIALS: Testimonial[] = [
  {
    key: "sara",
    photo: PLACEHOLDER_PHOTO,
    rating: 4,
    quote:
      "التوجيه الذي تلقيته من المرشدين كان له تأثير كبير على مسيرتي. نصائحهم القيمة ساعدتني في اتخاذ قرارات مدروسة في مشاريعي.",
    quoteKey: "inc_testi_sara_quote",
    cta: "انضم إلينا",
    ctaKey: "inc_testi_sara_cta",
    ctaHref: "#",
    name: "سارة القحطاني",
    nameKey: "inc_testi_sara_name",
    meta: "مخترعة — تقنية",
    metaKey: "inc_testi_sara_meta",
  },
  {
    key: "fahd",
    photo: PLACEHOLDER_PHOTO,
    rating: 4,
    quote:
      "التحديات التي واجهتها أثناء العمل في الحاضنة كانت محفزة لتطوير مهاراتي. التفاعل مع فرق متعددة التخصصات أضاف بعدًا جديدًا لرؤيتي .",
    quoteKey: "inc_testi_fahd_quote",
    cta: "استكشف الفرص",
    ctaKey: "inc_testi_fahd_cta",
    ctaHref: "#",
    name: "فهد النعيمي",
    nameKey: "inc_testi_fahd_name",
    meta: "محلل بيانات — تقنية",
    metaKey: "inc_testi_fahd_meta",
  },
  {
    key: "reem",
    photo: PLACEHOLDER_PHOTO,
    rating: 4,
    quote:
      "بيئة الحاضنة الداعمة منحتني الثقة لعرض أعمالي أمام جمهور حقيقي. اليوم أدير مشروعي الخاص وأتعاون مع علامات تجارية أعتز بها.",
    quoteKey: "inc_testi_reem_quote",
    cta: "ابدأ رحلتك",
    ctaKey: "inc_testi_reem_cta",
    ctaHref: "#",
    name: "ريم العتيبي",
    nameKey: "inc_testi_reem_name",
    meta: "مصممة جرافيك — إبداع",
    metaKey: "inc_testi_reem_meta",
  },
  {
    key: "khaled",
    photo: PLACEHOLDER_PHOTO,
    rating: 4,
    quote:
      "ورش العمل التطبيقية علمتني كيف أحول الفكرة إلى محتوى حقيقي يصل للجمهور. خلال أشهر قليلة أطلقت قناتي الأولى بثقة كاملة.",
    quoteKey: "inc_testi_khaled_quote",
    cta: "انضم إلينا",
    ctaKey: "inc_testi_khaled_cta",
    ctaHref: "#",
    name: "خالد الشمري",
    nameKey: "inc_testi_khaled_name",
    meta: "صانع محتوى — إعلام",
    metaKey: "inc_testi_khaled_meta",
  },
  {
    key: "noura",
    photo: PLACEHOLDER_PHOTO,
    rating: 4,
    quote:
      "الحاضنة لم تمنحني المهارات فقط، بل شبكة علاقات فتحت لي أبواباً لم أكن أتخيلها. اليوم أقود مشروعاً ناشئاً بفريق متكامل.",
    quoteKey: "inc_testi_noura_quote",
    cta: "استكشف الفرص",
    ctaKey: "inc_testi_noura_cta",
    ctaHref: "#",
    name: "نورة السالم",
    nameKey: "inc_testi_noura_name",
    meta: "رائدة أعمال — ريادة",
    metaKey: "inc_testi_noura_meta",
  },
  {
    key: "yousef",
    photo: PLACEHOLDER_PHOTO,
    rating: 4,
    quote:
      "المتابعة المستمرة من فريق الحاضنة جعلتني ألتزم بأهدافي حتى النهاية. تخرجت ومعي مشروع جاهز أضفته مباشرة إلى معرض أعمالي.",
    quoteKey: "inc_testi_yousef_quote",
    cta: "ابدأ رحلتك",
    ctaKey: "inc_testi_yousef_cta",
    ctaHref: "#",
    name: "يوسف الحمد",
    nameKey: "inc_testi_yousef_name",
    meta: "مطور ويب — تقنية",
    metaKey: "inc_testi_yousef_meta",
  },
];
