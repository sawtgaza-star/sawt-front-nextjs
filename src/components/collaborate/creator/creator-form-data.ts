/* Static data behind the "صانع محتوى" collaboration wizard (/collaborate).
   Glyphs are JSX, so they live in the components — this file stays plain .ts. */

/* ---- the three steps of the progress rail ---- */

export type CreatorStepValue = "personal" | "content" | "social";

export interface CreatorStep {
  value: CreatorStepValue;
  label: string;
  labelKey: string;
}

export const CREATOR_STEPS: CreatorStep[] = [
  {
    value: "personal",
    label: "المعلومات الشخصية",
    labelKey: "collab_step_personal",
  },
  { value: "content", label: "تفاصيل المحتوى", labelKey: "collab_step_content" },
  { value: "social", label: "مواقع التواصل", labelKey: "collab_step_social" },
];

/* ---- step 2: "نوع المحتوى الذي تنتجه" ----
   Chip order is the mock's, right to left — including "أخرى" sitting fourth
   rather than last. */

export interface ContentCategory {
  value: string;
  label: string;
  labelKey: string;
}

export const CONTENT_CATEGORIES: ContentCategory[] = [
  { value: "sports", label: "رياضة واحتراف", labelKey: "collab_cat_sports" },
  { value: "health", label: "صحة ورفاهية", labelKey: "collab_cat_health" },
  { value: "news", label: "إخبارية وتوعوية", labelKey: "collab_cat_news" },
  { value: "other", label: "أخرى", labelKey: "collab_cat_other" },
  { value: "culture", label: "ثقافة وفنون", labelKey: "collab_cat_culture" },
  { value: "art", label: "فن وإبداع", labelKey: "collab_cat_art" },
  { value: "politics", label: "سياسة", labelKey: "collab_cat_politics" },
  { value: "comedy", label: "كوميدي و ترفيه", labelKey: "collab_cat_comedy" },
  { value: "social", label: "اجتماعية", labelKey: "collab_cat_social" },
  { value: "tech", label: "تقنية وتكنولوجيا", labelKey: "collab_cat_tech" },
];

/* ---- step 3: the social-link rows ----
   `icon` is the Font Awesome brand class; FA is loaded globally in the root
   layout, same as everywhere else on the site. */

export interface SocialPlatform {
  value: string;
  label: string;
  labelKey: string;
  icon: string;
  placeholder: string;
  placeholderKey: string;
}

export const SOCIAL_PLATFORMS: SocialPlatform[] = [
  {
    value: "instagram",
    label: "انستقرام",
    labelKey: "collab_sp_instagram",
    icon: "fa-brands fa-instagram",
    placeholder: "رابط انستقرام",
    placeholderKey: "collab_sp_instagram_link",
  },
  {
    value: "facebook",
    label: "فيسبوك",
    labelKey: "collab_sp_facebook",
    icon: "fa-brands fa-facebook-f",
    placeholder: "رابط فيس بوك",
    placeholderKey: "collab_sp_facebook_link",
  },
  {
    value: "tiktok",
    label: "تيك توك",
    labelKey: "collab_sp_tiktok",
    icon: "fa-brands fa-tiktok",
    placeholder: "رابط تيك توك",
    placeholderKey: "collab_sp_tiktok_link",
  },
  {
    value: "youtube",
    label: "يوتيوب",
    labelKey: "collab_sp_youtube",
    icon: "fa-brands fa-youtube",
    placeholder: "رابط يوتيوب",
    placeholderKey: "collab_sp_youtube_link",
  },
  {
    value: "x",
    label: "إكس",
    labelKey: "collab_sp_x",
    icon: "fa-brands fa-x-twitter",
    placeholder: "رابط إكس",
    placeholderKey: "collab_sp_x_link",
  },
  {
    value: "linkedin",
    label: "لينكدإن",
    labelKey: "collab_sp_linkedin",
    icon: "fa-brands fa-linkedin-in",
    placeholder: "رابط لينكدإن",
    placeholderKey: "collab_sp_linkedin_link",
  },
  {
    value: "snapchat",
    label: "سناب شات",
    labelKey: "collab_sp_snapchat",
    icon: "fa-brands fa-snapchat",
    placeholder: "رابط سناب شات",
    placeholderKey: "collab_sp_snapchat_link",
  },
  {
    value: "telegram",
    label: "تيليجرام",
    labelKey: "collab_sp_telegram",
    icon: "fa-brands fa-telegram",
    placeholder: "رابط تيليجرام",
    placeholderKey: "collab_sp_telegram_link",
  },
];

/* the two rows the mock ships with */
export const DEFAULT_SOCIAL_ROWS = ["instagram", "facebook"];

/* ---- limits printed on the form ---- */
export const NOTE_MAX = 500;
export const VIDEO_MAX_BYTES = 5 * 1024 * 1024;
export const VIDEO_TYPES = ["image/png", "image/jpeg", "application/pdf"];
export const VIDEO_ACCEPT = ".png,.jpg,.jpeg,.pdf";
