/* The only words in /media's "تعاون مع صنّاع المحتوى" section that the
   payload doesn't carry: the reel's button labels for screen readers and
   the picker arrow's. Everything on screen comes from GET /pages/media's
   `creators` block; these are picked by the page's `lang` like the rest of
   /media (no `data-i18n` — see MediaSectionHead). */

type Copy = { ar: string; en: string };

export const pick = (copy: Copy, lang: string) => (lang === "en" ? copy.en : copy.ar);

export const CC_COPY = {
  next: { ar: "صانع المحتوى التالي", en: "Next creator" },
  prev: { ar: "صانع المحتوى السابق", en: "Previous creator" },
  save: { ar: "حفظ", en: "Save" },
  like: { ar: "إعجاب", en: "Like" },
  share: { ar: "مشاركة", en: "Share" },
  play: { ar: "تشغيل", en: "Play" },
  watch: { ar: "شاهد على إنستغرام", en: "Watch on Instagram" },
  profile: { ar: "الحساب على إنستغرام", en: "Instagram profile" },
  emptyTitle: { ar: "لا توجد فيديوهات بعد", en: "No videos yet" },
  emptyTextNamed: {
    ar: "لم يُضف أي فيديو تعاون حتى الآن، تابعونا قريباً.",
    en: "hasn't added a collaboration video yet — stay tuned.",
  },
  emptyText: {
    ar: "لم يُضف هذا الصانع أي فيديو تعاون حتى الآن.",
    en: "This creator hasn't added a collaboration video yet.",
  },
  follow: { ar: "تابِع على إنستغرام", en: "Follow on Instagram" },
  more: { ar: "عرض المزيد", en: "Show more" },
  less: { ar: "عرض أقل", en: "Show less" },
} satisfies Record<string, Copy>;
