/* The one piece of page chrome /stories and /stories/{uuid} still carry.

   Everything else the two pages used to keep here — the hero copy, the "قصص
   ذات صلة" headings and the "عرض جميع القصص" label — now comes from
   GET /pages/stories, so holding a second copy of it here would only be
   something to go stale. The breadcrumb tail stays because no payload sends a
   crumb for the listing itself; it is site chrome, and keeps its `data-i18n`
   key so the DOM translator owns it. */

export const STORIES_PARENT = {
  href: "/stories",
  titleKey: "story_breadcrumb",
  title: "قصص النجاح",
};
