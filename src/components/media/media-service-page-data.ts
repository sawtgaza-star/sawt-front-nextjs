import { MEDIA_PHOTOS } from "./media-photos";
import { MEDIA_SERVICES, type MediaService } from "./media-services-data";
import { ALL_WORKS, type MediaPageWork } from "./media-works-page-data";

/* Data behind /media/services/[slug] — the page "استكشف المزيد" opens from every
   card of the services deck on /media. The service already carries its identity
   (number, title, description, photo, theme) in media-services-data.ts, so this
   file only adds the body the design lays out: the stills the coverflow pages
   through, the three "ماذا تشمل الخدمة" points, and which projects of the
   portfolio stand as its "نماذج من أعمالنا".

   The design reuses the service's own description as the paragraph under
   "ماذا تشمل الخدمة", so nothing new is written for it here. */

export type ServiceFeature = { key: string; text: string };

export type ServiceDetail = {
  /* the coverflow opens on the service's own still, then the rest of the deck */
  gallery: string[];
  features: ServiceFeature[];
  /* keys into ALL_WORKS — the three tiles under "نماذج من أعمالنا" */
  works: string[];
};

/* the stills every gallery draws from; each service leads with its own photo
   and the list is filled out from here, so the coverflow always has neighbours */
const STILLS = [
  MEDIA_PHOTOS.studio,
  MEDIA_PHOTOS.crew,
  MEDIA_PHOTOS.desk,
  MEDIA_PHOTOS.hall,
  MEDIA_PHOTOS.field,
  MEDIA_PHOTOS.stage,
];

const galleryFor = (photo: string) => [photo, ...STILLS.filter((s) => s !== photo)];

const SERVICE_DETAILS: Record<string, ServiceDetail> = {
  photography: {
    gallery: galleryFor(MEDIA_PHOTOS.studio),
    features: [
      { key: "sm_sv_photography_f1", text: "جلسة تصوير كاملة مع إعداد الإضاءة والديكور" },
      { key: "sm_sv_photography_f2", text: "تصوير المنتجات والفعاليات بعدسات احترافية" },
      { key: "sm_sv_photography_f3", text: "معالجة وتنقيح الصور وتسليمها بدقة عالية" },
    ],
    works: ["catalog", "field", "launch"],
  },
  video: {
    gallery: galleryFor(MEDIA_PHOTOS.desk),
    features: [
      { key: "sm_sv_video_f1", text: "كتابة السكربت والتخطيط المسبق للمشروع بالكامل" },
      { key: "sm_sv_video_f2", text: "تصوير احترافي بمعدات وإضاءة سينمائية" },
      { key: "sm_sv_video_f3", text: "مونتاج احترافي وتصحيح ألوان وإضافة موشن جرافيك" },
    ],
    works: ["film", "conference", "podcast"],
  },
  graphics: {
    gallery: galleryFor(MEDIA_PHOTOS.crew),
    features: [
      { key: "sm_sv_graphics_f1", text: "تصميم الهوية البصرية ودليل استخدامها" },
      { key: "sm_sv_graphics_f2", text: "قوالب السوشيال ميديا والمطبوعات الرسمية" },
      { key: "sm_sv_graphics_f3", text: "تسليم ملفات المصدر بصيغ جاهزة للطباعة والنشر" },
    ],
    works: ["identity", "store", "rubana"],
  },
  content: {
    gallery: galleryFor(MEDIA_PHOTOS.stage),
    features: [
      { key: "sm_sv_content_f1", text: "خطة محتوى شهرية مبنية على تحليل الجمهور" },
      { key: "sm_sv_content_f2", text: "كتابة النصوص الإعلانية وسيناريوهات الريلز" },
      { key: "sm_sv_content_f3", text: "جدولة النشر ومتابعة الأداء وتقارير دورية" },
    ],
    works: ["podcast", "campaign", "launch"],
  },
  coverage: {
    gallery: galleryFor(MEDIA_PHOTOS.field),
    features: [
      { key: "sm_sv_coverage_f1", text: "تغطية المؤتمرات والفعاليات بفريق ميداني" },
      { key: "sm_sv_coverage_f2", text: "إعداد التقارير الإعلامية والمواد الصحفية" },
      { key: "sm_sv_coverage_f3", text: "تدريب على الظهور الإعلامي واستشارات الحضور" },
    ],
    works: ["launch", "field", "conference"],
  },
};

export type MediaServicePage = MediaService &
  Omit<ServiceDetail, "works"> & { works: MediaPageWork[] };

export const SERVICE_SLUGS = MEDIA_SERVICES.map((s) => s.key);

export function getService(slug: string): MediaServicePage | null {
  const service = MEDIA_SERVICES.find((s) => s.key === slug);
  const detail = SERVICE_DETAILS[slug];
  if (!service || !detail) return null;

  return {
    ...service,
    ...detail,
    works: detail.works
      .map((key) => ALL_WORKS.find((w) => w.key === key))
      .filter((w): w is MediaPageWork => Boolean(w)),
  };
}
