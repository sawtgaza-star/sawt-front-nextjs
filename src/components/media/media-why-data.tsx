import {
  IconWhyDeadline,
  IconWhyQuality,
  IconWhyTeam,
  IconWhyFlash,
} from "./media-icons";

/* "لماذا صوت ميديا" cards — listed right-to-left as in the design, so the
   deadline card is the first one you see and the strip scrolls leftwards to
   the rest. `accent` is the design token that paints BOTH the card's icon and
   the small dot in its top corner; the design walks the palette card by card:
   oliveGreen-300 → Orange-200 → oliveGreen-500 → Orange-300 → oliveGreen-700. */
export type MediaWhy = {
  key: string;
  icon: React.ReactNode;
  accent: string;
  title: string;
  titleKey: string;
  desc: string;
  descKey: string;
};

export const MEDIA_WHY: MediaWhy[] = [
  {
    key: "deadline",
    icon: <IconWhyDeadline color="#879279" />,
    accent: "#879279",
    title: "الالتزام بالمواعيد",
    titleKey: "sm_why_deadline_title",
    desc: "نسلّم في الوقت المحدد دائمًا. الوقت أمرٌ ومنهج، ندعمه وتُعتمد خطة أعمالك.",
    descKey: "sm_why_deadline_desc",
  },
  {
    key: "quality",
    icon: <IconWhyQuality color="#FFB181" />,
    accent: "#FFB181",
    title: "جودة عالمية",
    titleKey: "sm_why_quality_title",
    desc: "معايير إنتاج احترافية في كل مشروع نُنجزه. جودة تُغني عن حديثنا عن مزاياها.",
    descKey: "sm_why_quality_desc",
  },
  {
    key: "team",
    icon: <IconWhyTeam color="#4C5C37" />,
    accent: "#4C5C37",
    title: "فريق متخصص",
    titleKey: "sm_why_team_title",
    desc: "خبراء في الإنتاج والإبداع والتسويق يعملون كفريق متكامل لتحويل رؤيتك إلى واقع.",
    descKey: "sm_why_team_desc",
  },
  {
    key: "integrated",
    icon: <IconWhyFlash color="#FF7420" />,
    accent: "#FF7420",
    title: "حلول متكاملة",
    titleKey: "sm_why_integrated_title",
    desc: "من أول فكرة حتى آخر بيكسل — نغطي كل احتياجاتك الإبداعية في مكان واحد بدون تشتيت.",
    descKey: "sm_why_integrated_desc",
  },
  {
    key: "impact",
    icon: <IconWhyQuality color="#364127" />,
    accent: "#364127",
    title: "نتائج قابلة للقياس",
    titleKey: "sm_why_impact_title",
    desc: "محتوى لا يُنتَج للجمال فقط — يُقاس بالأرقام ويُحقق أهدافك التجارية بوضوح.",
    descKey: "sm_why_impact_desc",
  },
];
