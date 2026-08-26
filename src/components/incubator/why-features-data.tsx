import type { ReactNode } from "react";
import {
  IconVideoPlay,
  IconHandStar,
  IconPeoplePair,
  IconMicStand,
} from "@/components/ui/icons";

/* "لماذا حاضنة صوت؟" — 2×2 feature grid. Order is the mock's reading order:
   row 1 right→left, then row 2 right→left. */

export type WhyFeature = {
  key: string;
  title: string;
  titleKey: string;
  desc: string;
  descKey: string;
  icon: ReactNode;
};

export const WHY_FEATURES: WhyFeature[] = [
  {
    key: "practical",
    title: "تدريب عملي",
    titleKey: "inc_why_practical_title",
    desc: "تعلم من خلال التطبيق والممارسة",
    descKey: "inc_why_practical_desc",
    icon: <IconVideoPlay />,
  },
  {
    key: "mentorship",
    title: "إرشاد متخصص",
    titleKey: "inc_why_mentorship_title",
    desc: "أنجز مشاريع حقيقية تبني معرض أعمالك",
    descKey: "inc_why_mentorship_desc",
    icon: <IconHandStar />,
  },
  {
    key: "projects",
    title: "مشاريع واقعية",
    titleKey: "inc_why_projects_title",
    desc: "توجيه مستمر من خبراء في المجال",
    descKey: "inc_why_projects_desc",
    icon: <IconPeoplePair />,
  },
  {
    key: "reach",
    title: "إيصال صوتك",
    titleKey: "inc_why_reach_title",
    desc: "فرصة لنشر أعمالك والوصول إلى جمهور أوسع",
    descKey: "inc_why_reach_desc",
    icon: <IconMicStand />,
  },
];
