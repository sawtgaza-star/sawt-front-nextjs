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

/* The design opens with one paragraph, then the pull quote, then the rest of
   the article (see the mock's own prose below). The payload keeps the quote in
   a field of its own, so the body is cut after its first block and the quote
   is rendered into the gap. A body that is one block long — or none the regex
   recognises — leaves `rest` empty and the quote simply closes the article. */
const LEAD_END = /<\/(p|h1|h2|h3|h4|h5|blockquote|ul|ol|figure|table|div)>/i;

function splitAfterLead(html: string): [string, string] {
  const match = LEAD_END.exec(html);
  if (!match) return [html, ""];
  const cut = match.index + match[0].length;
  return [html.slice(0, cut), html.slice(cut)];
}

/* The photo pair that closes the body. An API article whose editor uploaded
   none renders nothing at all rather than an empty grid. */
function BodyImages({ article }: { article: NewsArticle }) {
  if (!article.bodyImages.length) return null;
  return (
    <div className="nws-body-images">
      {article.bodyImages.map((img) => (
        <img key={img.src} src={img.src} alt={img.alt} />
      ))}
    </div>
  );
}

/* The article itself: opening paragraph, pull quote, the platform paragraph,
   then the "برامج دعم صانعي المحتوى" block with its photo pair.

   The news mock's copy stays inline (it is the design's own text); an article
   that carries `body` — /stories/[slug] does — renders that instead, then the
   same photo pair. */
export default function NewsBody({ article }: { article: NewsArticle }) {
  /* API article: the editor's rich text, with the pull quote the payload
     carries beside it dropped into the slot the design gives it — after the
     opening paragraph, not at the end. The HTML is the CMS's own output —
     trusted the same way the rest of the payload is — and its bare tags are
     styled by the .nws-html rules in news.css, so it reads exactly like the
     authored prose below. */
  if (article.html !== undefined) {
    const [lead, rest] = splitAfterLead(article.html);
    return (
      <div className="nws-body">
        <div className="nws-html" dangerouslySetInnerHTML={{ __html: lead }} />
        {article.quote ? (
          <blockquote className="nws-quote">
            <p className="nws-quote-text">{article.quote.text}</p>
            <cite className="nws-quote-by">{article.quote.by}</cite>
          </blockquote>
        ) : null}
        {rest ? (
          <div className="nws-html" dangerouslySetInnerHTML={{ __html: rest }} />
        ) : null}
        <BodyImages article={article} />
      </div>
    );
  }

  if (article.body) {
    return (
      <div className="nws-body">
        {article.body.map((block, i) => (
          <Block key={block.key + i} block={block} />
        ))}

        <BodyImages article={article} />
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

      <BodyImages article={article} />
    </div>
  );
}
