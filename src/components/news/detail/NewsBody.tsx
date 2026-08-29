import type { NewsArticle, NewsBodyBlock } from "./news-article-data";

/* One authored block — same elements the news prose below uses, so a story
   article renders through the identical CSS. */
function Block({ block }: { block: NewsBodyBlock }) {
  if (block.type === "h2") {
    return (
      <h2 className="nws-h2" data-i18n={block.key}>
        {block.text}
      </h2>
    );
  }
  if (block.type === "quote") {
    return (
      <blockquote className="nws-quote">
        <p className="nws-quote-text" data-i18n={block.key}>
          {block.text}
        </p>
        <cite className="nws-quote-by" data-i18n={block.byKey}>
          {block.by}
        </cite>
      </blockquote>
    );
  }
  return (
    <p className="nws-p" data-i18n={block.key}>
      {block.text}
    </p>
  );
}

/* The article itself: opening paragraph, pull quote, the platform paragraph,
   then the "برامج دعم صانعي المحتوى" block with its photo pair.

   The news mock's copy stays inline (it is the design's own text); an article
   that carries `body` — /stories/[slug] does — renders that instead, then the
   same photo pair. */
export default function NewsBody({ article }: { article: NewsArticle }) {
  if (article.body) {
    return (
      <div className="nws-body">
        {article.body.map((block, i) => (
          <Block key={block.key + i} block={block} />
        ))}

        <div className="nws-body-images">
          {article.bodyImages.map((img) => (
            <img key={img.src} src={img.src} alt={img.alt} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="nws-body">
      <p className="nws-p" data-i18n="nws_p_intro">
        في قلب الأحداث، يقف صانعو المحتوى الغزيون بكاميراتهم وهواتفهم، يوثّقون
        لحظات لن يراها العالم إلا من خلال عدساتهم. هؤلاء الشباب الذين آمنوا بقوة
        الكلمة والصورة، يحملون رسالة إنسانية نبيلة — إيصال الحقيقة كاملة إلى كل
        زاوية في العالم.
      </p>

      <blockquote className="nws-quote">
        <p className="nws-quote-text" data-i18n="nws_quote">
          &quot;الصورة أقوى من ألف كلمة، ونحن نؤمن أن كل لقطة نلتقطها هي شهادة
          للتاريخ&quot;
        </p>
        <cite className="nws-quote-by" data-i18n="nws_quote_by">
          — أحد صانعي المحتوى في منصة صوت
        </cite>
      </blockquote>

      <p className="nws-p" data-i18n="nws_p_platform">
        تأسست منصة صوت لتكون المظلة الجامعة لهؤلاء المبدعين، توفر لهم الأدوات
        والتدريب والدعم اللازم لإيصال صوتهم بأعلى جودة ممكنة. من خلال برامج
        الحاضنة المتخصصة، تتلقى مجموعات من الشباب تدريبات احترافية في مجال إنتاج
        المحتوى الرقمي والتصوير والمونتاج وإدارة وسائل التواصل الاجتماعي.
      </p>

      <h2 className="nws-h2" data-i18n="nws_h2_programs">
        برامج دعم صانعي المحتوى
      </h2>
      <p className="nws-p" data-i18n="nws_p_programs">
        يشمل برنامج منصة صوت لدعم صانعي المحتوى عدة محاور رئيسية: التدريب التقني
        على أدوات الإنتاج، وورش العمل الإبداعية، وجلسات التوجيه مع خبراء الإعلام
        الرقمي، فضلاً عن توفير منصة لنشر المحتوى وتوزيعه على نطاق واسع.
      </p>

      <div className="nws-body-images">
        {article.bodyImages.map((img) => (
          <img key={img.src} src={img.src} alt={img.alt} />
        ))}
      </div>
    </div>
  );
}
