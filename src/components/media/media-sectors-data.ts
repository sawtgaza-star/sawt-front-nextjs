/* "من نخدم ؟" — the three audience cards, right-to-left as in the design.
   The middle one carries the orange top rule (`featured`). */
export type MediaSector = {
  key: string;
  title: string;
  titleKey: string;
  tagline: string;
  taglineKey: string;
  desc: string;
  descKey: string;
  featured?: boolean;
  points: { key: string; text: string }[];
};

export const MEDIA_SECTORS: MediaSector[] = [
  {
    key: "startups",
    title: "المشاريع الناشئة",
    titleKey: "sm_sector_startups_title",
    tagline: "نبني معك من الصفر",
    taglineKey: "sm_sector_startups_tagline",
    desc: "نفهم أن كل مشروع ناشئ يحتاج هوية قوية وحضورًا يُثبت وجوده من اليوم الأول. نرافقك من الفكرة إلى التنفيذ بخطة واضحة.",
    descKey: "sm_sector_startups_desc",
    points: [
      { key: "sm_sector_startups_p1", text: "هوية بصرية من الصفر" },
      { key: "sm_sector_startups_p2", text: "محتوى لبناء الجمهور" },
      { key: "sm_sector_startups_p3", text: "فيديو تعريفي احترافي" },
      { key: "sm_sector_startups_p4", text: "حضور رقمي متكامل" },
    ],
  },
  {
    key: "institutions",
    title: "المؤسسات",
    titleKey: "sm_sector_inst_title",
    tagline: "حضور يليق بثقلكم",
    taglineKey: "sm_sector_inst_tagline",
    desc: "المؤسسات الحكومية والمدنية والأهلية تحتاج إعلامًا يعكس مصداقيتها وقيمها. نُنتج محتوى يعبّر عن هذا الثقل باحتراف.",
    descKey: "sm_sector_inst_desc",
    featured: true,
    points: [
      { key: "sm_sector_inst_p1", text: "تغطية وتوثيق الفعاليات" },
      { key: "sm_sector_inst_p2", text: "تقارير مرئية احترافية" },
      { key: "sm_sector_inst_p3", text: "هوية بصرية مؤسسية" },
      { key: "sm_sector_inst_p4", text: "إعلام داخلي وخارجي" },
    ],
  },
  {
    key: "companies",
    title: "الشركات",
    titleKey: "sm_sector_comp_title",
    tagline: "محتوى يحقق نتائج",
    taglineKey: "sm_sector_comp_tagline",
    desc: "نعمل مع الشركات لتحويل أهدافها التجارية إلى محتوى مؤثر يصل للعملاء المناسبين ويحقق عائدًا ملموسًا وقابلًا للقياس.",
    descKey: "sm_sector_comp_desc",
    points: [
      { key: "sm_sector_comp_p1", text: "حملات تسويق رقمي" },
      { key: "sm_sector_comp_p2", text: "إعلانات تجارية مؤثرة" },
      { key: "sm_sector_comp_p3", text: "إدارة هوية العلامة" },
      { key: "sm_sector_comp_p4", text: "تصوير منتجات احترافي" },
    ],
  },
];
