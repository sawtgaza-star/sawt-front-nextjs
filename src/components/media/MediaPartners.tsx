import MediaSectionHead from "./MediaSectionHead";
import { GRADUATE_LOGOS } from "@/components/incubator/graduates-logos-data";

/* "شركاء النجاح" — the same client logos the incubator strip carries, on the
   site-wide automatic .marquee (its animation lives in style.css, which the
   (main) layout already loads). */
export default function MediaPartners() {
  return (
    <section className="sm-partners">
      <div className="container">
        <MediaSectionHead
          pill="صوت ميديا  في ارقام"
          pillKey="sm_stats_pill"
          title="شركاء النجاح"
          titleKey="sm_partners_title"
          sub="أرقام تعكس ثقة عملائنا وجودة عملنا"
          subKey="sm_stats_sub"
        />
      </div>

      <div className="marquee sm-partners-marquee">
        <div className="marquee-group">
          {GRADUATE_LOGOS.map((logo) => (
            <img src={logo.src} alt={logo.alt} key={logo.src} />
          ))}
        </div>
        <div className="marquee-group" aria-hidden="true">
          {GRADUATE_LOGOS.map((logo) => (
            <img src={logo.src} alt={logo.alt} key={logo.src} />
          ))}
        </div>
      </div>
    </section>
  );
}
