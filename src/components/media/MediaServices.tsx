import MediaSectionHead from "./MediaSectionHead";
import MediaServicesSlider from "./MediaServicesSlider";

/* "حلول إعلامية متكاملة" — the five service cards, each in its own palette
   with the photo alternating sides, shown one at a time as a bottom-to-top
   slider with the scroll rail down the section's left edge. */
export default function MediaServices() {
  return (
    <section className="sm-services" id="sm-services">
      <div className="container">
        <MediaSectionHead
          pill="خدماتنا"
          pillKey="sm_services_pill"
          title="حلول إعلامية متكاملة"
          titleKey="sm_services_title"
          sub="اكتشف خدماتنا خطوة بخطوة — اسحب للأسفل"
          subKey="sm_services_sub"
        />

        <MediaServicesSlider />
      </div>
    </section>
  );
}
