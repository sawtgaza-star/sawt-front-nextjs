/* The four section links صوت ميديا's own navbar carries. Shared by the desktop
   bar (MediaNav) and the phone drawer (MediaNavMobile), which renders the same
   list in reverse — the design stacks منهجيتنا first and عن صوت ميديا last. */
export type MediaNavLink = {
  href: string;
  key: string;
  text: string;
};

export const MEDIA_NAV_LINKS: MediaNavLink[] = [
  { href: "#sm-about", key: "sm_nav_about", text: "عن صوت ميديا" },
  { href: "#sm-works", key: "sm_nav_works", text: "أعمالنا" },
  { href: "#sm-services", key: "sm_nav_services", text: "خدماتنا" },
  { href: "#sm-process", key: "sm_nav_process", text: "منهجيتنا" },
];
