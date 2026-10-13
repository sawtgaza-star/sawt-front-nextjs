import SkeletonText from "@/components/ui/SkeletonText";
import { IconReqUser, IconSelDoc } from "@/components/ui/icons";
import { SkImg } from "@/components/incubator/incubator-skeleton/parts";
import { SkLeaf, SkSecHead } from "./parts";
import { HEADS, REGISTER, REQS, SELECTION, TRAINER } from "./skeleton-data";

/* CourseRequirements, CourseSelection, CourseTrainer and the aside
   (CourseRegisterCard + CourseCountdown + CourseShare) while loading — their
   markup, copy swapped for filler, photo and buttons as grey blocks. */

export function RequirementsSkeleton() {
  return (
    <section className="crs-section crs-reqs-section">
      <SkLeaf className="crs-reqs-leaf" size={[177, 241]} />
      <SkSecHead chars={HEADS.reqs} />
      <ul className="crs-reqs-grid">
        {REQS.map((chars, index) => (
          <li className="crs-req-card" key={index}>
            <span className="crs-req-icon" aria-hidden="true">
              <IconReqUser />
            </span>
            <p className="crs-req-text">
              <SkeletonText chars={chars} />
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function SelectionSkeleton() {
  return (
    <section className="crs-section crs-sel-section">
      <SkLeaf className="crs-sel-leaf" size={[150, 189]} />
      <SkSecHead chars={HEADS.selection} />
      <ul className="crs-sel-grid">
        {SELECTION.map(([title, desc], index) => (
          <li className="crs-sel-step" key={index}>
            <span className="crs-sel-icon" aria-hidden="true">
              <IconSelDoc />
            </span>
            <div>
              <h3 className="crs-sel-title">
                <SkeletonText chars={title} />
              </h3>
              <p className="crs-sel-desc">
                <SkeletonText chars={desc} />
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function TrainerSkeleton() {
  return (
    <section className="crs-section crs-trainer-section">
      <SkSecHead chars={HEADS.trainer} />
      <div className="crs-trainer-card">
        <SkImg className="crs-trainer-photo" />
        <div className="crs-trainer-info">
          <h3 className="crs-trainer-name">
            <SkeletonText chars={TRAINER.name} />
          </h3>
          <p className="crs-trainer-role">
            <SkeletonText chars={TRAINER.role} />
          </p>
          <p className="crs-trainer-bio">
            <SkeletonText chars={TRAINER.bio} />
          </p>
        </div>
      </div>
    </section>
  );
}

export function AsideSkeleton() {
  return (
    <aside className="crs-aside">
      <div className="crs-reg">
        <div className="crs-reg-card">
          <p className="crs-reg-kicker">
            <SkeletonText chars={REGISTER.kicker} />
          </p>
          <p className="crs-reg-title">
            <SkeletonText chars={REGISTER.title} />
          </p>
          <div className="crs-countdown">
            {[0, 1, 2, 3].map((index) => (
              <div className="crs-countdown-cell" key={index}>
                {index > 0 && (
                  <span className="crs-countdown-sep" aria-hidden="true">
                    :
                  </span>
                )}
                <div className="crs-countdown-box">
                  <b>00</b>
                  <span>
                    <SkeletonText chars={REGISTER.unit} />
                  </span>
                </div>
              </div>
            ))}
          </div>
          <ul className="crs-reg-meta">
            {REGISTER.meta.map(([label, value], index) => (
              <li key={index}>
                <span>
                  <SkeletonText chars={label} />
                </span>
                <b>
                  <SkeletonText chars={value} />
                </b>
              </li>
            ))}
          </ul>
          <a className="crs-btn-green incskel-media">
            <span>
              <SkeletonText chars={REGISTER.cta} />
            </span>
            <i className="fa-solid fa-angle-left"></i>
          </a>
        </div>
      </div>

      <div className="crs-share">
        <h3 className="crs-share-title">
          <SkeletonText chars={REGISTER.shareTitle} />
        </h3>
        <p className="crs-share-desc">
          <SkeletonText chars={REGISTER.shareDesc} />
        </p>
        <div className="crs-share-actions">
          {Array.from({ length: REGISTER.shareButtons }, (_, index) => (
            <span className="crs-share-btn incskel-media" key={index}></span>
          ))}
        </div>
      </div>
    </aside>
  );
}
