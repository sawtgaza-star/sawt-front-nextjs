import { IconArrowUpLeftSolid } from "@/components/ui/icons";
import TestimonialsSlider from "./TestimonialsSlider";

/* "شهادات وتجارب خريجينا" — eleventh (last) section of /incubator: a rounded
   olive canvas with the shared pattern.png scatter showing through a
   translucent inner panel; the copy + "عرض الكل" button sit on the start side
   and the testimonial card strip (TestimonialsSlider) on the end side. */
export default function IncubatorTestimonials() {
  return (
    <section className="inc-testi">
      <div className="container">
        <div className="inc-testi-wrap">
          <div className="inc-testi-panel">
            <div className="inc-testi-copy">
              <h2 className="inc-testi-title">
                <span data-i18n="inc_testi_title_pre">شهادات وتجارب</span>
                <br />
                <span className="inc-highlight" data-i18n="inc_testi_title_hl">
                  خريجينا
                </span>
              </h2>
              <p className="inc-testi-sub" data-i18n="inc_testi_sub">
                اكتشف كيف غيّرت حاضنة صوت حياة المئات من الطلاب الذين بدأوا
                رحلتهم من الصفر وأصبحوا اليوم محترفين مطلوبين في سوق العمل.
              </p>
              <a className="inc-testi-btn" href="#">
                <span data-i18n="view_all">عرض الكل</span>
                <IconArrowUpLeftSolid />
              </a>
            </div>

            <TestimonialsSlider />
          </div>
        </div>
      </div>
    </section>
  );
}
