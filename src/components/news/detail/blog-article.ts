/* GET /pages/blogs/{uuid} → the NewsArticle the detail components already
   render. Nothing in NewsArticleHead / NewsGallery / NewsBody changes shape:
   the payload is poured into the same fields the mock article filled, minus
   the `*Key`s, because this copy is already in the reader's language.

   Three fields have no direct counterpart in the payload:

     - the two category pills become `tags` — the API sends a list, and this
       article has two, but an editor may tag one or five.
     - `bodyImages` (the photo pair under the last heading) stays empty: the
       payload has one image list, and it is the gallery. NewsBody renders
       nothing rather than an empty grid.
     - `views` / `read_time_minutes` arrive as numbers and are worded here —
       they are values, not chrome, so they cannot go through the DOM
       translator's fixed `nws_meta_*` strings. */

import { localized, localizedRich, localizedHtml } from "@/lib/api/pages";
import { formatDate } from "@/components/home/home-text";
import type { Blog } from "@/lib/api/blogs";
import type { NewsArticle, NewsArticleImage } from "./news-article-data";

/** The editor pads its HTML with blank lines: empty paragraphs
    (`<p><br></p>`) and runs of `<br>` closing a paragraph. Each of those
    renders as a tall gap in the article, so they are dropped; a `<br>`
    between two sentences of a paragraph is the editor's own line break and
    stays. */
function tidyEditorHtml(html: string): string {
  return html
    .replace(/(?:\s|&nbsp;|<br\s*\/?>)+(<\/(?:p|h[1-6]|li|blockquote)>)/gi, "$1")
    .replace(/<(p|h[1-6])\b[^>]*>(?:\s|&nbsp;)*<\/\1>/gi, "")
    .trim();
}

function viewsLabel(views: number | null | undefined, lang: string): string {
  if (typeof views !== "number") return "";
  return lang === "en" ? `${views} views` : `${views} مشاهدة`;
}

function readTimeLabel(minutes: number | null | undefined, lang: string): string {
  if (typeof minutes !== "number") return "";
  if (lang === "en") return `${minutes} min read`;
  // Arabic counts one and two as their own forms before the plural
  if (minutes === 1) return "دقيقة قراءة";
  if (minutes === 2) return "دقيقتان قراءة";
  return `${minutes} دقائق قراءة`;
}

/** The gallery's frames: `lead` (the article's `hero_url`, then its cover),
    then the editor's own in the order they arranged them. A URL that appears twice is shown once. Every frame is
    captioned with the headline — the payload has no per-image alt. */
export function galleryFrames(
  lead: (string | null | undefined)[],
  images: Blog["images"],
  title: string,
): NewsArticleImage[] {
  const sorted = Array.isArray(images) ? [...images] : [];
  sorted.sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));

  const srcs = new Set<string>();
  for (const src of [...lead, ...sorted.map((image) => image.image_url)]) {
    if (src) srcs.add(src);
  }
  return [...srcs].map((src) => ({ src, alt: title }));
}

export function blogArticle(blog: Blog, lang: string): NewsArticle {
  const title = localized(blog.title, lang);
  const quoteText = localizedHtml(blog.quote?.text, lang);
  const quoteBy = localized(blog.quote?.author, lang);

  return {
    // the pills come from `tags`; these two stay empty for the same reason the
    // keys do — nothing renders them once `tags` is set
    category: "",
    section: "",
    tags: (Array.isArray(blog.categories) ? blog.categories : [])
      .map((category) => localized(category.name, lang))
      .filter(Boolean),
    title,
    desc: localizedHtml(blog.excerpt, lang),
    views: viewsLabel(blog.views, lang),
    readTime: readTimeLabel(blog.read_time_minutes, lang),
    date: formatDate(blog.published_at, lang),
    author: localized(blog.author, lang),
    gallery: galleryFrames([blog.hero_url, blog.cover_url], blog.images, title),
    bodyImages: [],
    // the editor's rich text, tags kept — `localized` would flatten it to
    // plain lines (headings, paragraphs and bold all lost)
    html: tidyEditorHtml(localizedRich(blog.content, lang)),
    quote: quoteText ? { text: quoteText, by: quoteBy } : undefined,
  };
}
