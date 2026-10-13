import SkeletonText from "@/components/ui/SkeletonText";
import { IconChevronDownBold, IconHeartOutline } from "@/components/ui/icons";
import { Leaf, SkImg, SkSectionHead } from "./parts";
import { ALBUM, EXPERTS, FAQ } from "./skeleton-data";

/* IncubatorAlbum, ExpertsTeam (+ ExpertCard) and IncubatorFaq while loading —
   their markup, copy swapped for filler. The album's captions only show on
   hover, so its cards are bare photo blocks. */

export function AlbumSkeleton() {
  return (
    <section className="inc-album">
      <Leaf className="inc-album-leaf" />

      <div className="container">
        <SkSectionHead title={ALBUM.head[0]} sub={ALBUM.head[1]} />

        <div className="inc-album-grid">
          {ALBUM.areas.map((area) => (
            <figure className={`inc-album-card inc-album-card-${area}`} key={area}>
              <SkImg className="inc-album-photo" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ExpertsSkeleton() {
  return (
    <section className="inc-experts">
      <div className="container">
        <SkSectionHead title={EXPERTS.head[0]} sub={EXPERTS.head[1]} />

        <div className="inc-expert-row">
          {EXPERTS.cards.map((card, index) => (
            <article className="inc-expert-card" key={index}>
              <div className="inc-expert-media incskel-media"></div>
              <div className="inc-expert-body">
                <div className="inc-expert-head">
                  <h3 className="inc-expert-name">
                    <SkeletonText chars={card.name} />
                  </h3>
                  <span className="inc-expert-badge incskel-media">
                    <SkeletonText chars={card.badge} />
                  </span>
                </div>
                <p className="inc-expert-desc">
                  <SkeletonText chars={card.desc} />
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FaqSkeleton() {
  return (
    <section className="inc-faq">
      <Leaf className="inc-faq-leaf" />

      <div className="container">
        <SkSectionHead title={FAQ.head[0]} sub={FAQ.head[1]} />

        <div className="inc-faq-row">
          <div className="inc-faq-visual">
            <SkImg ratio={FAQ.image} />
          </div>

          <div className="inc-faq-col">
            {FAQ.questions.map((chars, index) => {
              const isOpen = index === FAQ.open;
              return (
                <div className={"inc-faq-item" + (isOpen ? " inc-faq-open" : "")} key={index}>
                  <button type="button" className="inc-faq-q" tabIndex={-1}>
                    <span>
                      <SkeletonText chars={chars} />
                    </span>
                    <span className="inc-faq-chevron">
                      <IconChevronDownBold />
                    </span>
                  </button>
                  {isOpen ? (
                    <div className="inc-faq-a">
                      <span className="inc-faq-a-bar" aria-hidden="true"></span>
                      <p className="inc-faq-a-text">
                        <SkeletonText chars={FAQ.answer} />
                      </p>
                    </div>
                  ) : null}
                </div>
              );
            })}

            <div className="inc-faq-more">
              <span className="inc-faq-more-icon incskel-media" aria-hidden="true">
                <IconHeartOutline />
              </span>
              <h3 className="inc-faq-more-title">
                <SkeletonText chars={FAQ.moreTitle} />
              </h3>
              <p className="inc-faq-more-desc">
                <SkeletonText chars={FAQ.moreDesc} />
              </p>
              <a className="inc-btn-green incskel-media">
                <span>
                  <SkeletonText chars={FAQ.contact} />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
