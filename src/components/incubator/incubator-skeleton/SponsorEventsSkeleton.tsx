import SkeletonText from "@/components/ui/SkeletonText";
import {
  IconCalendarWeeks,
  IconClockCheck,
  IconHourglass,
  IconLocationPin,
  IconUser,
} from "@/components/ui/icons";
import { Leaf, SkImg, SkSectionHead } from "./parts";
import { EVENTS, SPONSOR } from "./skeleton-data";

/* SponsorStudents and LatestEvents (+ EventsExplorer, EventCard) while
   loading — their markup, copy swapped for filler. */

export function SponsorSkeleton() {
  return (
    <section className="inc-sponsor">
      <Leaf className="inc-sponsor-leaf" />

      <div className="container">
        <SkSectionHead title={SPONSOR.head[0]} sub={SPONSOR.head[1]} />

        <div className="inc-sponsor-grid">
          <div className="inc-sponsor-tracks">
            {SPONSOR.packages.map((pack, index) => (
              <article className="inc-sponsor-card" key={index}>
                <h3 className="inc-sponsor-card-title">
                  <SkeletonText chars={pack.title} />
                </h3>
                <p className="inc-sponsor-card-desc">
                  <SkeletonText chars={pack.desc} />
                </p>
                <div className="inc-sponsor-meta">
                  <span className="inc-sponsor-meta-item">
                    <IconCalendarWeeks />
                    <span>
                      <SkeletonText chars={SPONSOR.duration} />
                    </span>
                  </span>
                  <span>
                    <SkeletonText chars={SPONSOR.seats} />
                  </span>
                </div>
                <a className="inc-sponsor-cta incskel-media">
                  <span>
                    <SkeletonText chars={pack.cta} />
                  </span>
                </a>
              </article>
            ))}
          </div>

          <aside className="inc-sponsor-side">
            <div className="inc-sponsor-waiting">
              <h3 className="inc-sponsor-side-title">
                <SkeletonText chars={SPONSOR.waitingTitle} />
              </h3>
              <ul className="inc-sponsor-students">
                {SPONSOR.students.map(([name, meta], index) => (
                  <li className="inc-sponsor-student" key={index}>
                    <span className="inc-sponsor-avatar incskel-media" aria-hidden="true">
                      <IconUser />
                    </span>
                    <span className="inc-sponsor-student-body">
                      <b className="inc-sponsor-student-name">
                        <SkeletonText chars={name} />
                      </b>
                      <span className="inc-sponsor-student-meta">
                        <SkeletonText chars={meta} />
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="inc-sponsor-more">
                <SkeletonText chars={SPONSOR.more} />
              </p>
            </div>

            <div className="inc-sponsor-impact">
              <h3 className="inc-sponsor-side-title inc-sponsor-impact-title">
                <SkeletonText chars={SPONSOR.impactTitle} />
              </h3>
              <ul className="inc-sponsor-impact-list">
                {SPONSOR.impact.map(([value, label], index) => (
                  <li className="inc-sponsor-impact-row" key={index}>
                    <b className="inc-sponsor-impact-value">
                      <SkeletonText chars={value} />
                    </b>
                    <span className="inc-sponsor-impact-label">
                      <SkeletonText chars={label} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export function EventsSkeleton() {
  return (
    <section className="inc-events">
      <div className="container">
        <SkSectionHead title={EVENTS.head[0]} sub={EVENTS.head[1]} />

        <div className="inc-events-filters">
          {EVENTS.filters.map((chars, index) => (
            <button
              type="button"
              className={"inc-events-filter incskel-media" + (index === 0 ? " is-active" : "")}
              tabIndex={-1}
              key={index}
            >
              <SkeletonText chars={chars} />
            </button>
          ))}
        </div>

        <div className="inc-event-row">
          {EVENTS.cards.map((card, index) => (
            <article className="inc-event-card" key={index}>
              <div className="inc-event-media">
                <SkImg />
                <span className="inc-event-badge incskel-media">
                  <b>
                    <SkeletonText chars={2} />
                  </b>
                  <span>
                    <SkeletonText chars={4} />
                  </span>
                </span>
              </div>

              <div className="inc-event-body">
                <div className="inc-event-meta">
                  <span className="inc-event-chip">
                    <IconClockCheck />
                    <span>
                      <SkeletonText chars={card.date} />
                    </span>
                  </span>
                  <span className="inc-event-chip">
                    <IconHourglass />
                    <span>
                      <SkeletonText chars={card.time} />
                    </span>
                  </span>
                </div>
                <h3 className="inc-event-title">
                  <SkeletonText chars={card.title} />
                </h3>
                <p className="inc-event-desc">
                  <SkeletonText chars={card.desc} />
                </p>
                <div className="inc-event-type">
                  <IconLocationPin />
                  <b>
                    <SkeletonText chars={card.tags} />
                  </b>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
