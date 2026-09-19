/* GET /pages/stories/{uuid} → the NewsArticle the detail components render.

   A story is a blog in every field the article page reads — the two category
   pills, the author, the read time, the views, the date, the HTML body and the
   pull quote all arrive under the same names — so the mapping itself is
   `blogArticle`, not a second copy of it that could drift from the news page's
   wording of "3 دقائق قراءة" and "2 مشاهدة".

   Only the pictures differ. A blog opens its gallery with `cover_url`; a story
   has two images, and the wide `hero_url` is the one the article is written
   around, while `cover_url` is the poster the listing card shows. So the
   gallery is rebuilt here: hero first, then the editor's own frames, with the
   cover standing in when no hero was uploaded.

   `badge` ("قصة نجاح") is not mapped — it belongs to the poster card, and the
   article page has no slot for it. */

import { blogArticle } from "@/components/news/detail/blog-article";
import type { Story } from "@/lib/api/stories";
import type { NewsArticle, NewsArticleImage } from "@/components/news/detail/news-article-data";

/** Hero first, then the gallery in the order the editor arranged it. Every
    frame is captioned with the headline — the payload has no per-image alt. */
function gallery(story: Story, title: string): NewsArticleImage[] {
  const images = Array.isArray(story.images) ? [...story.images] : [];
  images.sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));

  const frames: NewsArticleImage[] = [];
  const lead = story.hero_url || story.cover_url;
  if (lead) frames.push({ src: lead, alt: title });
  for (const image of images) {
    if (image.image_url) frames.push({ src: image.image_url, alt: title });
  }
  return frames;
}

export function storyArticle(story: Story, lang: string): NewsArticle {
  const article = blogArticle(story, lang);
  return { ...article, gallery: gallery(story, article.title) };
}
