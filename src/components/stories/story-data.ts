/* Content for /stories/[slug] — the page behind the arrow on a `.rs-card`
   (home "هل لديك صوت يستحق أن يُسمع؟" slider and the support page's
   "أصوات لم نقدر على توصيلها" slider).

   The page is the news article page: it renders the very same
   NewsHero / NewsArticleHead / NewsGallery / NewsBody / NewsShareCard /
   RelatedNews components against the same news.css, so a story reads exactly
   like /news/[id] on desktop and mobile. Only the copy differs, so a story is
   modelled as a NewsArticle plus the card fields the sliders already use.

   Like the news mock there is no feed behind this yet — the two stories are
   the ones the design ships (كاسة الشاي، سمير). Replace getStory() when a real
   API arrives and nothing in the components has to change.

   Gallery/body photos: the story poster plus the content-creator stock shots
   already in public/assets/images — the same set the news article uses. */

import type { NewsArticle } from "@/components/news/detail/news-article-data";

export type Story = {
  /* the /stories/{slug} segment */
  slug: string;
  /* poster used by the slider card and the listing card */
  image: string;
  titleKey: string;
  title: string;
  article: NewsArticle;
};

/* One `.rs-card` on /stories or in the "قصص ذات صلة" strip — see StoryCard. */
export type StoryCardItem = {
  id: number;
  href: string;
  image: string;
  titleKey: string;
  title: string;
  /* the long copy that slides up on hover */
  fullKey: string;
  full: string;
};

/* shared stock shots (same files the news article pulls from) */
const SHOT_A = "/assets/images/27b38b38a6fe04f1e0f06a188549a9cc7508ab4f.jpg";
const SHOT_B = "/assets/images/042ae163aa0d78003024d720046b35cdf2cea552.jpg";
const SHOT_C = "/assets/images/bac7442160787c37131e5f9a31e3703041164e49.jpg";
const SHOT_D = "/assets/images/939948c90beeea5448d93e57769396241090bb08.jpg";

export const STORIES: Story[] = [
  {
    slug: "tea",
    image: "/assets/images/tea.png",
    titleKey: "rs_card1_title",
    title: "أغلي كاسة شاي",
    article: {
      categoryKey: "nws_cat_gaza",
      category: "غزة",
      sectionKey: "story_cat_section",
      section: "قصص نجاح - قصص من الواقع",
      titleKey: "story_tea_title",
      title: "أغلي كاسة شاي: حين صار كوب الشاي رمزاً للصمود",
      descKey: "rs_card1_full",
      desc: "من قلب غزة المحاصرة، حوّل صانع المحتوى كوب الشاي البسيط إلى رمزٍ للصمود وسط الحصار. التقطت منصة صوت حكايته وأوصلتها إلى العالم، لتتحوّل كاسة شاي إلى رسالة أملٍ وإصرار.",
      viewsKey: "story_tea_views",
      views: "٣٢١٠ مشاهدة",
      readTimeKey: "story_read_4",
      readTime: "4 دقائق قراءة",
      dateKey: "story_tea_date",
      date: "12 فبراير 2026",
      authorKey: "nws_meta_author",
      author: "فريق منصة صوت",
      gallery: [
        { src: "/assets/images/tea.png", alt: "أغلي كاسة شاي" },
        { src: SHOT_A, alt: "صانع المحتوى في غزة" },
        { src: SHOT_B, alt: "فريق تصوير أثناء العمل" },
        { src: SHOT_C, alt: "استوديو تصوير المحتوى" },
      ],
      bodyImages: [
        { src: SHOT_D, alt: "جلسة عمل لصناع المحتوى" },
        { src: SHOT_C, alt: "استوديو تصوير المحتوى" },
      ],
      body: [
        {
          type: "p",
          key: "story_tea_p1",
          text: "في زاويةٍ صغيرة من مخيمٍ للنازحين، وعلى نارٍ أُشعلت من بقايا خشب البيوت المهدّمة، كان يغلي إبريق شاي. لم يكن مشهداً عادياً: كان صانع المحتوى يصوّره بهاتفٍ شبه فارغ من الشحن، ليقول للعالم إن الحياة هنا لم تتوقف بعد.",
        },
        {
          type: "quote",
          key: "story_tea_quote",
          text: "\"كاسة الشاي هي آخر ما تبقّى لنا من طقوس الحياة الطبيعية — ولذلك هي أغلى كاسة في العالم\"",
          byKey: "story_tea_quote_by",
          by: "— صاحب القصة",
        },
        {
          type: "p",
          key: "story_tea_p2",
          text: "التقطت منصة صوت المقطع وأعادت روايته بلغةٍ يفهمها العالم: ترجمة، وتحرير، وتوزيع على المنصات. خلال أيام تجاوزت القصة حدود القطاع، ووصلت إلى ملايين المتابعين الذين رأوا في كوب الشاي البسيط صورةً كاملة عن الصمود.",
        },
        {
          type: "h2",
          key: "story_tea_h2",
          text: "من لقطة عابرة إلى رسالة عالمية",
        },
        {
          type: "p",
          key: "story_tea_p3",
          text: "ما بدأ كلقطةٍ عابرة تحوّل إلى مادة صحفية تناقلتها وسائل إعلام عربية ودولية، وفتح الباب أمام صاحب القصة ليكمل طريقه في صناعة المحتوى بدعمٍ من فريق المنصة: تدريب على أدوات الإنتاج، ومعدّات بديلة، ومساحة نشر دائمة. هكذا تعمل صوت — نلتقط الصوت، ونصنع له طريقاً إلى العالم.",
        },
      ],
    },
  },
  {
    slug: "samir",
    image: "/assets/images/boy.png",
    titleKey: "rs_card2_title",
    title: "سمير البطل",
    article: {
      categoryKey: "nws_cat_gaza",
      category: "غزة",
      sectionKey: "story_cat_section",
      section: "قصص نجاح - قصص من الواقع",
      titleKey: "story_samir_title",
      title: "سمير البطل: من غزة إلى الأردن وأملٌ أن يمشي مجدداً",
      descKey: "rs_card2_full",
      desc: "في وسط دمار غزة، اختُطف صانع المحتوى سمير وأُصيبت يده بوحشية، واضطر إلى الهجرة إلى الأردن بحثاً عن الأمان. منصة صوت التقطت صورته ونقلت قصته للعالم، فصار صوته أعلى من القنابل وحمل رسالة الأمل لآلاف الفلسطينيين.",
      viewsKey: "story_samir_views",
      views: "٥٨٤٠ مشاهدة",
      readTimeKey: "story_read_6",
      readTime: "6 دقائق قراءة",
      dateKey: "story_samir_date",
      date: "27 يناير 2026",
      authorKey: "nws_meta_author",
      author: "فريق منصة صوت",
      gallery: [
        { src: "/assets/images/boy.png", alt: "سمير البطل" },
        { src: SHOT_B, alt: "فريق تصوير أثناء العمل" },
        { src: SHOT_D, alt: "جلسة عمل لصناع المحتوى" },
        { src: SHOT_A, alt: "صانع المحتوى في غزة" },
      ],
      bodyImages: [
        { src: SHOT_A, alt: "صانع المحتوى في غزة" },
        { src: SHOT_B, alt: "فريق تصوير أثناء العمل" },
      ],
      body: [
        {
          type: "p",
          key: "story_samir_p1",
          text: "لم يكن سمير يحمل سوى هاتفه حين خرج ليوثّق ما جرى في حيّه. عاد بعد أيامٍ من الغياب وقد فقد يده اليمنى وقدمه اليسرى، لكنه لم يفقد الرغبة في أن يروي. من سرير المستشفى سجّل أول مقطع له بعد الإصابة، وقال فيه جملةً واحدة: ما زلت هنا.",
        },
        {
          type: "quote",
          key: "story_samir_quote",
          text: "\"أخذوا يدي، لكنهم لم يأخذوا صوتي — وسأكمل الحكاية بما تبقّى منّي\"",
          byKey: "story_samir_quote_by",
          by: "— سمير",
        },
        {
          type: "p",
          key: "story_samir_p2",
          text: "نقلت منصة صوت قصته كاملة: التوثيق، والشهادات، ورحلة العلاج التي انتهت به في الأردن. تحوّل المقطع إلى حملة تضامنٍ واسعة، وفتح أمامه باب علاجٍ متخصص وأطرافٍ صناعية بعد أشهر من الانتظار.",
        },
        {
          type: "h2",
          key: "story_samir_h2",
          text: "الأمل بأن يمشي مجدداً",
        },
        {
          type: "p",
          key: "story_samir_p3",
          text: "اليوم يواصل سمير جلسات التأهيل، ويعود تدريجياً إلى الكاميرا التي أحبّها. يعمل فريق المنصة معه على سلسلةٍ توثّق رحلته خطوة بخطوة، لأن قصته لم تعد قصته وحده: صارت رسالة أملٍ لآلاف الفلسطينيين الذين يرون فيها أن الصوت أعلى من القنابل.",
        },
      ],
    },
  },
];

/* Full, paginated listing behind "عرض جميع القصص" — the same shape /news uses:
   placeholder rows repeating the design's two stories, 9 per page over 10
   pages, until a real feed is wired up. Ids start at 1 and alternate between
   the two stories; /stories/{id} resolves through getStory() below, exactly
   the way /news/{id} resolves through getArticle(). */
export const STORIES_PER_PAGE = 9;

export const ALL_STORIES: StoryCardItem[] = Array.from({ length: 90 }, (_, i) => {
  const story = STORIES[i % STORIES.length];
  return {
    id: i + 1,
    href: `/stories/${i + 1}`,
    image: story.image,
    titleKey: story.titleKey,
    title: story.title,
    /* the article's standfirst is the slider's long copy — the same text the
       home card reveals on hover */
    fullKey: story.article.descKey,
    full: story.article.desc,
  };
});

/* Six cards close the article — three per view, so the strip's nav buttons
   have somewhere to scroll (same count as the news strip). */
export const RELATED_STORIES: StoryCardItem[] = ALL_STORIES.slice(0, 6);

/* Every segment /stories/[id] has to pre-render for `output: 'export'`: the
   two named slugs (the sliders' arrows link to those) plus every listing id. */
export const STORY_PARAMS: string[] = [
  ...STORIES.map((s) => s.slug),
  ...ALL_STORIES.map((s) => String(s.id)),
];

/* Accepts a named slug ("tea") or a listing id ("7"). Unknown values fall back
   to the first story rather than 404-ing, matching getArticle()'s behaviour. */
export function getStory(idOrSlug: string): Story {
  const bySlug = STORIES.find((s) => s.slug === idOrSlug);
  if (bySlug) return bySlug;

  const id = Number(idOrSlug);
  if (Number.isInteger(id) && id > 0) {
    return STORIES[(id - 1) % STORIES.length];
  }
  return STORIES[0];
}
