/* =========================================================
   The four "تعاون معنا" applications (base + error shape: ./client).

     POST /pages/collaborate/creator      → صانع محتوى
     POST /pages/collaborate/sponsorship  → رعاية أو تمويل  (/collaborate/funding)
     POST /pages/collaborate/partnership  → شراكة استراتيجية
     POST /pages/collaborate/other        → تعاون آخر

   All four answer 201 with { message, data } and reject with the site's usual
   422 { message, errors } — so the wizards show what comes back rather than
   ruling on anything themselves.

   SENT AS MULTIPART, always: each endpoint takes an optional `attachment`
   file, which is what the drop zone at the end of every flow uploads. Laravel
   reads `key[]` for a list and `socials[i][…]` for the creator's rows, so that
   is how they are written; an empty field is left out entirely rather than
   sent blank.

   THE API'S VOCABULARY IS NOT THE FORMS' — the chips and tick boxes carry the
   values the mock gave them, and the maps below translate each one on the way
   out. Two of them lose something, and the backend is where that is fixed:
     - `snapchat` is not in the API's platform list, so such a row goes as
       `other`; `x` is `twitter` there.
     - `content_types` is the one list the API does not validate, so the slugs
       below are this site's reading of its two known values (`culture_arts`,
       `comedy`) and should be confirmed against the backend's own list.
   ========================================================= */

import { apiFetch } from "./client";

/** What a 201 answers with; `message` is the sentence the done panel shows. */
export type CollaborateResult = {
  message?: string;
  data?: { uuid?: string; type?: string; status?: string };
};

export type SocialLink = { platform: string; url: string };

/* --------------------------------------- the forms' values → the API's */

/** "نوع المحتوى الذي تنتجه" (creator step 2). Unvalidated by the API. */
const CONTENT_TYPE: Record<string, string> = {
  sports: "sports_professional",
  health: "health_wellness",
  news: "news_awareness",
  culture: "culture_arts",
  art: "art_creativity",
  politics: "politics",
  comedy: "comedy",
  social: "social",
  tech: "technology",
  other: "other",
};

/** "نوع الدعم الذي ترغبون بتقديمه" (funding step 2). */
const SUPPORT_TYPE: Record<string, string> = {
  cash: "direct_financial",
  inkind: "in_kind",
  marketing: "marketing_media",
  other: "other",
};

/** "نوع الشراكة الذي تقترحونها" (partnership step 2). */
const PARTNER_TYPE: Record<string, string> = {
  content: "content_exchange",
  ads: "advertising_sponsorship",
  events: "event_collaboration",
  other: "other",
};

/** The social rows' platform list. `x` is `twitter` to the API, and it has no
    `snapchat` — that row goes as `other` rather than being dropped. */
const SOCIAL_PLATFORM: Record<string, string> = {
  instagram: "instagram",
  facebook: "facebook",
  tiktok: "tiktok",
  youtube: "youtube",
  x: "twitter",
  linkedin: "linkedin",
  snapchat: "other",
  telegram: "telegram",
};

function translate(values: string[], table: Record<string, string>): string[] {
  return values.map((value) => table[value] || value);
}

/** The API validates a social link as a URL, but the boxes ask for "رابط
    انستقرام" and people type the host alone. A bare host is given the same
    https:// the backend adds to `website` itself; anything else is sent as
    typed, so the API's own message is what answers it. */
function withScheme(url: string): string {
  const value = url.trim();
  if (!value || /^[a-z][a-z0-9+.-]*:\/\//i.test(value)) return value;
  return /^[\w-]+(\.[\w-]+)+/.test(value) ? "https://" + value : value;
}

/* --------------------------------------- the request itself */

type Field = string | number | boolean | string[] | SocialLink[] | null | undefined;

/** One field of the multipart body. Blanks are left out — an empty `website`
    or `additional_notes` is "not answered", not "answered with nothing". */
function append(form: FormData, key: string, value: Field): void {
  if (value === null || value === undefined) return;

  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      if (typeof item === "string") {
        if (item) form.append(key + "[]", item);
        return;
      }
      // the creator's social rows: socials[0][platform], socials[0][url]
      const url = withScheme(item.url);
      if (!url) return;
      form.append(key + "[" + index + "][platform]", item.platform);
      form.append(key + "[" + index + "][url]", url);
    });
    return;
  }

  if (typeof value === "boolean") {
    form.append(key, value ? "1" : "0");
    return;
  }

  const text = String(value).trim();
  if (text) form.append(key, text);
}

function post(
  path: string,
  fields: Record<string, Field>,
  attachment: File | null,
): Promise<CollaborateResult> {
  const form = new FormData();
  for (const [key, value] of Object.entries(fields)) append(form, key, value);
  if (attachment) form.append("attachment", attachment);

  return apiFetch<CollaborateResult>("/pages/collaborate/" + path, {
    method: "POST",
    body: form,
  });
}

/* --------------------------------------- the four applications */

/** Whoever is applying, in the boxes every flow opens with. */
type Contact = {
  email: string;
  phone: string;
  countryCode: string;
};

export type CreatorApplication = Contact & {
  fullName: string;
  /** CONTENT_CATEGORIES values (creator-form-data). */
  contentTypes: string[];
  followersCount: string;
  contentBio: string;
  socials: SocialLink[];
  additionalNotes: string;
  termsAccepted: boolean;
  attachment: File | null;
};

export function submitCreatorApplication(
  application: CreatorApplication,
): Promise<CollaborateResult> {
  return post(
    "creator",
    {
      full_name: application.fullName,
      email: application.email,
      phone: application.phone,
      country_code: application.countryCode,
      content_types: translate(application.contentTypes, CONTENT_TYPE),
      followers_count: application.followersCount,
      content_bio: application.contentBio,
      socials: application.socials.map((row) => ({
        platform: SOCIAL_PLATFORM[row.platform] || row.platform,
        url: row.url,
      })),
      additional_notes: application.additionalNotes,
      terms_accepted: application.termsAccepted,
    },
    application.attachment,
  );
}

/** The organisation behind a sponsorship or a partnership. */
type Organisation = Contact & {
  companyName: string;
  website: string;
  additionalNotes: string;
  attachment: File | null;
};

export type SponsorshipApplication = Organisation & {
  /** SUPPORT_TYPES values (funding-form-data). */
  supportTypes: string[];
  organizationBio: string;
  conditionsNotes: string;
};

export function submitSponsorshipApplication(
  application: SponsorshipApplication,
): Promise<CollaborateResult> {
  return post(
    "sponsorship",
    {
      company_name: application.companyName,
      email: application.email,
      phone: application.phone,
      country_code: application.countryCode,
      website: application.website,
      support_types: translate(application.supportTypes, SUPPORT_TYPE),
      organization_bio: application.organizationBio,
      conditions_notes: application.conditionsNotes,
      additional_notes: application.additionalNotes,
    },
    application.attachment,
  );
}

export type PartnershipApplication = Organisation & {
  /** PARTNER_TYPES values (partnership-form-data). */
  partnershipTypes: string[];
  partnershipGoal: string;
};

export function submitPartnershipApplication(
  application: PartnershipApplication,
): Promise<CollaborateResult> {
  return post(
    "partnership",
    {
      company_name: application.companyName,
      email: application.email,
      phone: application.phone,
      country_code: application.countryCode,
      website: application.website,
      partnership_types: translate(application.partnershipTypes, PARTNER_TYPE),
      partnership_goal: application.partnershipGoal,
      additional_notes: application.additionalNotes,
    },
    application.attachment,
  );
}

export type OtherApplication = Contact & {
  name: string;
  collaborationIdea: string;
  additionalNotes: string;
  attachment: File | null;
};

export function submitOtherApplication(
  application: OtherApplication,
): Promise<CollaborateResult> {
  return post(
    "other",
    {
      name: application.name,
      email: application.email,
      phone: application.phone,
      country_code: application.countryCode,
      collaboration_idea: application.collaborationIdea,
      additional_notes: application.additionalNotes,
    },
    application.attachment,
  );
}
