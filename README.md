# Sawt — Next.js + TypeScript + Bootstrap

نسخة Next.js من موقع "صوت غزة" — منقولة من مشروع HTML/CSS/JS الأصلي مع الحفاظ على الديزاين كما هو.

## التشغيل

```bash
npm install
npm run dev
```

ثم افتح: http://localhost:3000

للبناء النهائي:

```bash
npm run build
npm start
```

## خريطة الصفحات

| الصفحة القديمة | المسار الجديد |
|---|---|
| index.html | `/` |
| about.html | `/about` |
| content.html | `/content` |
| login.html | `/login` |
| register.html | `/register` |
| forgot_your_password.html | `/forgot-password` |
| code_verification.html | `/code-verification` |
| set_new_password.html | `/set-new-password` |

## بنية المشروع

- `src/app/` — الصفحات (App Router). مجموعة `(main)` تحمّل style.css، ومجموعة `(auth)` تحمّل password.css، و`content` لها content.css — تماماً مثل توزيع الـ CSS في الموقع الأصلي.
- `src/lib/translations.ts` — نظام الترجمة عربي/إنجليزي منقول حرفياً (نفس data-i18n).
- `src/lib/legacy-*.ts` — كل ملفات الـ JS القديمة منقولة بنفس المنطق.
- `src/lib/sliders.ts` — سلايدرات الصفحة الرئيسية (كانت Owl Carousel، صارت Swiper بنفس الإعدادات والشكل).
- `src/components/LegacyInit.tsx` — يشغّل السكربتات المناسبة لكل صفحة (مثل وسوم script القديمة).
- `public/assets/` — الصور والفيديو والخطوط كما هي.
- `src/styles/legacy/` — ملفات CSS الأصلية بدون تعديل (فقط مسارات الصور صارت مطلقة).

## بنية الكومبوننتس (بعد إعادة الهيكلة)

- `src/components/site/SiteNav.tsx` — شريط علوي + قائمة + بحث موبايل، موحّد للصفحات الثلاث الرئيسية. الرابط النشط (active) يُحسب بـ `usePathname()`، والتنقل بين `/` و`/about` صار بـ `<Link>` (فوري بدون reload).
- `src/components/site/SiteFooter.tsx` — الفوتر المشترك (الرئيسية + من نحن)، خاصية `mobileNewsletter` لبطاقة النشرة على الموبايل (الرئيسية فقط).
- `src/components/site/JoinModal.tsx` — نافذة "انضم إلينا".
- `src/components/home/` — الرئيسية مقسمة لـ 10 سيكشنات: HeroHeader, SoutSection, LatestNews, ContentCreators, PlatformSections, MidBanner, RealStories, TeamSection, JoinUs, Reviews.
- صفحة الرئيسية `page.tsx` صارت تركيبة نظيفة من الكومبوننتس (~40 سطر بدل 100+ ألف حرف).

ملاحظة: رابط "محتوانا" ما زال `<a>` عادي (تحديث كامل) لأن صفحة المحتوى تستخدم ملف CSS مختلف يتعارض مع style.css — سيتحول لـ Link بعد توحيد الـ CSS.

## أهم التغييرات

1. **Owl Carousel → Swiper**: السلايدرات الأربعة في الرئيسية أعيد بناؤها بـ Swiper بنفس الإعدادات (rtl، loop، عدد العناصر لكل شاشة). صفحة المحتوى كانت تستخدم Swiper أصلاً فبقيت كما هي.
2. **إزالة jQuery**: كل استخدامات jQuery حُوّلت لـ vanilla JS.
3. **إزالة AOS وFancybox**: كانت محمّلة في الأصل لكن غير مستخدمة فعلياً.
4. **الروابط**: `about.html` صارت `/about` وهكذا، وتم إصلاح روابط بصيغة `/xxx.html` كانت مكسورة.
5. **توحيد النافبار**: كانت هناك 3 نسخ غير متطابقة من النافبار في الأصل (أيقونات الشريط العلوي في صفحة المحتوى كانت نسخة أقدم) — تم توحيدها على النسخة الأحدث.

## ملاحظات للتجربة

جرّب هذه الأشياء وقارنها بالموقع القديم:
- زر تبديل اللغة (AR/EN) واتجاه الصفحة
- السلايدرات الأربعة في الرئيسية (خصوصاً على الموبايل)
- نافذة "انضم إلينا" (join modal) بخطواتها
- التعليقات والإعجابات في قسم القصص
- إظهار/إخفاء كلمة المرور وخانات رمز التحقق (OTP)
