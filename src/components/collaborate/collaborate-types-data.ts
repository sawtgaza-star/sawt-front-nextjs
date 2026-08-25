/* The four options of "اختر نوع التعاون" on /collaborate, in the mock's
   right-to-left order. `icon` keys into COLLAB_ICON in CollaborateTypeCard —
   the glyphs are JSX so they can't live in this plain .ts file. */

export type CollaborateType = {
  value: string;
  icon: "creator" | "funding" | "partnership" | "other";
  title: string;
  titleKey: string;
  desc: string;
  descKey: string;
};

export const COLLABORATE_TYPES: CollaborateType[] = [
  {
    value: "creator",
    icon: "creator",
    title: "صانع محتوى",
    titleKey: "collab_type_creator_title",
    desc: "إذا كنت Content Creator أو إعلامي وتريد التعاون مع منصة صوت.",
    descKey: "collab_type_creator_desc",
  },
  {
    value: "funding",
    icon: "funding",
    title: "رعاية أو تمويل",
    titleKey: "collab_type_funding_title",
    desc: "لدعم مشاريع صوت وحاضنة صوت لصناع المحتوى بشكل مباشر أو غير مباشر.",
    descKey: "collab_type_funding_desc",
  },
  {
    value: "partnership",
    icon: "partnership",
    title: "شراكة استراتيجية",
    titleKey: "collab_type_partnership_title",
    desc: "يتم التعاون عم بمنصة خارجية آمنة وسهلة الاستخدام، بحيث يقدر المتجر إتمام العملية بسرعة وبطريقة موثوقة.",
    descKey: "collab_type_partnership_desc",
  },
  {
    value: "other",
    icon: "other",
    title: "تعاون آخر",
    titleKey: "collab_type_other_title",
    desc: "يتم التعاون عم بمنصة خارجية آمنة وسهلة الاستخدام، بحيث يقدر المتجر إتمام العملية بسرعة وبطريقة موثوقة.",
    descKey: "collab_type_other_desc",
  },
];
