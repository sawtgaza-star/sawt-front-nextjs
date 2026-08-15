/* Static data for the Team page (الفريق): the member roster + the filter pills.
   Placeholder content mirrors the mock (repeated "سمير البطل / UI/UX Designer")
   while spreading members across the four teams so the filter is meaningful. */

export type TeamCategory = "design" | "marketing" | "management" | "montage";

export type TeamMember = {
  id: number;
  photo: string;
  /** Portrait framed inside the microphone on the member detail page. */
  micPhoto: string;
  nameKey: string;
  name: string;
  roleKey: string;
  role: string;
  category: TeamCategory;
};

const PLACEHOLDER_PHOTO = "/assets/images/team.png";
const PLACEHOLDER_MIC_PHOTO = "/assets/images/team-member.png";

/* Social links shown on the member detail page ("تابعنا على :"). Placeholder
   hrefs mirror the mock while the real profiles don't exist yet. */
export type TeamSocial = { icon: string; label: string; href: string };

export const TEAM_SOCIALS: TeamSocial[] = [
  { icon: "fa-instagram", label: "Instagram", href: "#" },
  { icon: "fa-twitter", label: "Twitter", href: "#" },
  { icon: "fa-linkedin-in", label: "LinkedIn", href: "#" },
  { icon: "fa-facebook-f", label: "Facebook", href: "#" },
];

const CATEGORY_LAYOUT: TeamCategory[] = [
  "design",
  "design",
  "design",
  "marketing",
  "marketing",
  "management",
  "montage",
];

export const TEAM_MEMBERS: TeamMember[] = CATEGORY_LAYOUT.map(
  (category, i) => ({
    id: i,
    photo: PLACEHOLDER_PHOTO,
    micPhoto: PLACEHOLDER_MIC_PHOTO,
    nameKey: "team_card_name",
    name: "سمير البطل",
    roleKey: "team_card_role",
    role: "UI/UX Designer",
    category,
  }),
);

/** Look up a member by its `id` (from the /team/[id] route param). */
export function getTeamMember(id: number): TeamMember | undefined {
  return TEAM_MEMBERS.find((m) => m.id === id);
}

export type TeamFilterValue = "all" | TeamCategory;

export type TeamFilter = {
  value: TeamFilterValue;
  key: string; // i18n key
  label: string; // Arabic fallback text
};

export const TEAM_FILTERS: TeamFilter[] = [
  { value: "all", key: "team_cat_all", label: "الكل" },
  { value: "design", key: "team_cat_design", label: "فريق التصميم" },
  { value: "marketing", key: "team_cat_marketing", label: "فريق التسويق" },
  { value: "management", key: "team_cat_management", label: "فريق الإدارة" },
  { value: "montage", key: "team_cat_montage", label: "فريق المونتاج" },
];
