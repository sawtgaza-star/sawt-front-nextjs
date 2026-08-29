/* Page chrome shared by /stories and /stories/[id] — the breadcrumb parent,
   the hero copy, and the headings of the "قصص ذات صلة" strip. Kept here so the
   listing and the article page cannot drift apart. */

export const STORIES_PARENT = {
  href: "/stories",
  titleKey: "story_breadcrumb",
  title: "قصص النجاح",
};

export const STORIES_HERO = {
  titleKey: "story_hero_title",
  title: "قصص نجاح.. أصوات من غزة وصلت إلى العالم",
  descKey: "story_hero_desc",
  desc: "قصص حقيقية وثّقتها منصة صوت ونقلتها إلى العالم، لتكون صوتاً لمن لا صوت له.",
};

export const STORIES_RELATED_HEADING = {
  preKey: "story_related_title_pre",
  pre: "قصص ذات",
  highlightKey: "story_related_title_highlight",
  highlight: "صلة",
  subKey: "story_related_sub",
  sub: "قصص حقيقية من غزة نقلتها منصة صوت إلى العالم",
};

export const STORIES_RELATED_MORE = {
  href: "/stories",
  key: "view_all_stories",
  label: "عرض جميع القصص",
};
