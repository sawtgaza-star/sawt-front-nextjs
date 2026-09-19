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

import { localized } from "@/lib/api/pages";
import { formatDate } from "@/components/home/home-text";
import type { Blog } from "@/lib/api/blogs";
import type { NewsArticle, NewsArticleImage } from "./news-article-data";

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

/** Cover first, then the gallery in the order the editor arranged it. Every
    frame is captioned with the headline — the payload has no per-image alt. */
function gallery(blog: Blog, title: string): NewsArticleImage[] {
  const images = Array.isArray(blog.images) ? [...blog.images] : [];
  images.sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));

  const frames: NewsArticleImage[] = [];
  if (blog.cover_url) frames.push({ src: blog.cover_url, alt: title });
  for (const image of images) {
    if (image.image_url) frames.push({ src: image.image_url, alt: title });
  }
  return frames;
}

export function blogArticle(blog: Blog, lang: string): NewsArticle {
  const title = localized(blog.title, lang);
  const quoteText = localized(blog.quote?.text, lang);
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
    desc: localized(blog.excerpt, lang),
    views: viewsLabel(blog.views, lang),
    readTime: readTimeLabel(blog.read_time_minutes, lang),
    date: formatDate(blog.published_at, lang),
    author: localized(blog.author, lang),
    gallery: gallery(blog, title),
    bodyImages: [],
    html: localized(blog.content, lang),
    quote: quoteText ? { text: quoteText, by: quoteBy } : undefined,
  };
}
