/* GET /pages/stories/{uuid} → the NewsArticle the detail components render.

   A story is a blog in every field the article page reads — the two category
   pills, the author, the read time, the views, the date, the HTML body and the
   pull quote all arrive under the same names, and the gallery opens the same
   way (`hero_url`, then `cover_url`, then the editor's frames) — so the
   mapping itself is `blogArticle`, not a second copy of it that could drift
   from the news page's wording of "3 دقائق قراءة" and "2 مشاهدة".

   `badge` ("قصة نجاح") — the poster card's pill — leads the article's pills
   too (NewsArticleHead's `.nws-tag-badge`). */

import { localized } from "@/lib/api/pages";
import { blogArticle } from "@/components/news/detail/blog-article";
import type { Story } from "@/lib/api/stories";
import type { NewsArticle } from "@/components/news/detail/news-article-data";

export function storyArticle(story: Story, lang: string): NewsArticle {
  return {
    ...blogArticle(story, lang),
    badge: localized(story.badge, lang) || undefined,
  };
}
