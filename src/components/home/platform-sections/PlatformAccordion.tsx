import { Fragment } from "react";
import { SECTION_ICONS } from "./platform-icons";
import PlatformTapWiring from "./PlatformTapWiring";
import RichText from "@/components/ui/RichText";

const SAWT_LOGO = encodeURI("/assets/images/شعار صوت اخضر.svg");

export type PlatformItem = {
  image: string | null | undefined;
  iconUrl: string | null | undefined;
  title: string;
  desc: string;
  cta: string;
  href: string;
  stats: string[];
};

/* "+500 محتوى إبداعي" → ["+500", "محتوى إبداعي"]. The API sends each stat
   as one string; the design puts the figure (accent) above its label. A stat
   with no figure renders as a label only. */
function splitStat(text: string): [string, string] {
  const words = text.trim().split(/\s+/);
  const i = words.findIndex((w) => /\d/.test(w));
  if (i === -1) return ["", text];
  return [words[i], words.filter((_, j) => j !== i).join(" ")];
}

/* Three equal pills; hovering (or focusing) one grows it and slides up its
   glass panel — all in platform-accordion.css; on touch screens a tap
   toggles it instead (PlatformTapWiring). The title links to the section. */
export default function PlatformAccordion({
  items,
  moreLabel,
}: {
  items: PlatformItem[];
  moreLabel: string;
}) {
  return (
    <div className="ps-accordion">
      {items.map((item, index) => {
        const Icon = SECTION_ICONS[index] || SECTION_ICONS[0];
        // منصة صوت (first card) always carries the Sawt wordmark.
        const icon = index === 0 ? (
          <img src={SAWT_LOGO} alt="" className="ps-logo-sawt" />
        ) : item.iconUrl ? (
          <img src={item.iconUrl} alt="" loading="lazy" decoding="async" />
        ) : (
          <Icon />
        );

        return (
          <div key={index} className="ps-item">
            {item.image ? (
              <img className="ps-bg" src={item.image} alt="" loading="lazy" decoding="async" />
            ) : null}

            {/* collapsed pill */}
            <div className="ps-pill">
              <span className="ps-pill-icon">{icon}</span>
              <span className="ps-pill-title">{item.title}</span>
            </div>

            {/* expanded glass panel */}
            <div className="ps-panel">
              <div className="ps-head">
                <span className="ps-head-icon">{icon}</span>
                <h3 className="ps-title">
                  <a href={item.href}>{item.title}</a>
                </h3>
                <a href={item.href} className="ps-more">
                  <span className="ps-more-label">{moreLabel}</span>
                  <span className="ps-more-arrow" aria-hidden="true">
                    <i className="fa-solid fa-arrow-left"></i>
                  </span>
                </a>
              </div>
              <RichText as="p" className="ps-desc" html={item.desc} />
              <div className="ps-foot">
                {item.stats.length ? (
                  <div className="ps-stats">
                    {item.stats.map((text, i) => {
                      const [num, label] = splitStat(text);
                      return (
                        <Fragment key={i}>
                          {i > 0 ? <div className="ps-divider" /> : null}
                          <div className="ps-stat">
                            {num ? <strong>{num}</strong> : null}
                            <span>{label}</span>
                          </div>
                        </Fragment>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        );
      })}
      <PlatformTapWiring />
    </div>
  );
}
