/* "ماذا يقول عنّا عملاؤنا" — the client quotes, first card rightmost in RTL.
   The design reuses one stock portrait on every card and that asset isn't
   exported from the design file yet, so the site's placeholder stands in
   (same name/format swap when the real photos land). */
export type MediaTestimonial = {
  key: string;
  photo: string;
  /* filled stars out of 5 — every card in the design shows 4 */
  rating: number;
  quote: string;
  quoteKey: string;
  name: string;
  nameKey: string;
  /* "المهنة — المجال" */
  meta: string;
  metaKey: string;
};

const PLACEHOLDER_PHOTO = "/assets/images/Image (أحمد المنصور).png";

const QUOTE =
  "التوجيه الذي تلقيته من المرشدين كان له تأثير كبير على مسيرتي. نصائحهم القيّمة ساعدتني في اتخاذ قرارات مدروسة في مشاريعي.";

export const MEDIA_TESTIMONIALS: MediaTestimonial[] = [
  {
    key: "sara",
    photo: PLACEHOLDER_PHOTO,
    rating: 4,
    quote: QUOTE,
    quoteKey: "sm_testi_quote",
    name: "سارة القحطاني",
    nameKey: "sm_testi_sara_name",
    meta: "مخرجة — تقنية",
    metaKey: "sm_testi_sara_meta",
  },
  {
    key: "khaled",
    photo: PLACEHOLDER_PHOTO,
    rating: 4,
    quote: QUOTE,
    quoteKey: "sm_testi_quote",
    name: "خالد الحسيني",
    nameKey: "sm_testi_khaled_name",
    meta: "مدير تسويق — تجارة",
    metaKey: "sm_testi_khaled_meta",
  },
  {
    key: "rana",
    photo: PLACEHOLDER_PHOTO,
    rating: 4,
    quote: QUOTE,
    quoteKey: "sm_testi_quote",
    name: "رنا العمري",
    nameKey: "sm_testi_rana_name",
    meta: "مؤسِّسة — مشروع ناشئ",
    metaKey: "sm_testi_rana_meta",
  },
  {
    key: "yousef",
    photo: PLACEHOLDER_PHOTO,
    rating: 4,
    quote: QUOTE,
    quoteKey: "sm_testi_quote",
    name: "يوسف الدوس",
    nameKey: "sm_testi_yousef_name",
    meta: "مدير اتصال — مؤسسة",
    metaKey: "sm_testi_yousef_meta",
  },
];
