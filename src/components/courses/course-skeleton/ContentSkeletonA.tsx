import SkeletonText from "@/components/ui/SkeletonText";
import {
  IconChevronWide,
  IconGoalUsers,
  IconLessonPlay,
  IconLockClosed,
  IconOutcomeDoc,
  IconPerkCheck,
} from "@/components/ui/icons";
import { SkLeaf, SkSecHead } from "./parts";
import { GOALS, HEADS, MODULES, OUTCOMES, PERKS } from "./skeleton-data";

/* CourseGoals, CourseModules, CourseOutcomes and CoursePerks while loading —
   their markup, copy swapped for filler. The decorative branches are left
   out: they are absolutely placed and take no room. */

export function GoalsSkeleton() {
  return (
    <section className="crs-section crs-goals-section">
      <SkLeaf className="crs-goals-leaf" size={[178, 235]} />
      <SkSecHead chars={HEADS.goals} />
      <div className="crs-goals-grid">
        {GOALS.map(([title, desc], index) => (
          <article className="crs-goal-card" key={index}>
            <span className="crs-goal-icon" aria-hidden="true">
              <IconGoalUsers />
            </span>
            <h3 className="crs-goal-title">
              <SkeletonText chars={title} />
            </h3>
            <p className="crs-goal-desc">
              <SkeletonText chars={desc} />
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ModulesSkeleton() {
  const firstLocked = MODULES.titles.length - MODULES.locked;
  return (
    <section className="crs-section crs-modules-section">
      <SkLeaf className="crs-modules-leaf" size={[152, 232]} />
      <SkSecHead chars={HEADS.modules} />
      <div className="crs-modules">
        {MODULES.titles.map((chars, index) => {
          const isLocked = index >= firstLocked;
          const isOpen = index === 0;
          return (
            <div
              className={
                "crs-module" +
                (isOpen ? " crs-module-open" : "") +
                (isLocked ? " crs-module-locked" : "")
              }
              key={index}
            >
              <button type="button" className="crs-module-head" tabIndex={-1} disabled={isLocked}>
                <span className="crs-module-title">
                  <SkeletonText chars={chars} />
                </span>
                {isLocked ? (
                  <span className="crs-module-lock">
                    <IconLockClosed />
                  </span>
                ) : (
                  <span className="crs-module-chevron" aria-hidden="true">
                    <IconChevronWide />
                  </span>
                )}
              </button>
              {isOpen ? (
                <ul className="crs-module-lessons">
                  {MODULES.lessons.map((lesson, j) => (
                    <li className="crs-lesson" key={j}>
                      <span className="crs-lesson-icon" aria-hidden="true">
                        <IconLessonPlay />
                      </span>
                      <span>
                        <SkeletonText chars={lesson} />
                      </span>
                      <span className="crs-lesson-duration">
                        <SkeletonText chars={8} />
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function OutcomesSkeleton() {
  const cards = [
    { theme: "gray", items: OUTCOMES.before },
    { theme: "olive", items: OUTCOMES.after },
  ];
  return (
    <section className="crs-section crs-outcomes-section">
      <SkLeaf className="crs-outcomes-leaf" size={[144, 217]} />
      <SkSecHead chars={HEADS.outcomes} />
      <div className="crs-outcomes-grid">
        {cards.map((card) => (
          <div className={`crs-outcome crs-outcome-${card.theme}`} key={card.theme}>
            <article className="crs-outcome-card">
              <span className="crs-outcome-icon" aria-hidden="true">
                <IconOutcomeDoc />
              </span>
              <h3 className="crs-outcome-title">
                <SkeletonText chars={OUTCOMES.title} />
              </h3>
              <ul className="crs-outcome-list">
                {card.items.map((chars, index) => (
                  <li key={index}>
                    <span className="crs-outcome-dot" aria-hidden="true"></span>
                    <span>
                      <SkeletonText chars={chars} />
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}

export function PerksSkeleton() {
  return (
    <section className="crs-section">
      <SkSecHead chars={HEADS.perks} />
      <ul className="crs-perks-grid">
        {PERKS.map((chars, index) => (
          <li className="crs-perk" key={index}>
            <span className="crs-perk-icon" aria-hidden="true">
              <IconPerkCheck />
            </span>
            <span>
              <SkeletonText chars={chars} />
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
