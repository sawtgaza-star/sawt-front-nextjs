import SkeletonText from "@/components/ui/SkeletonText";
import { IconCheckMark } from "@/components/ui/icons";
import { SkTile } from "./MediaSkeletonParts";
import "@/styles/media-skeleton.css";

/* The sidebar and the project grid while GET /pages/media/works is in flight —
   MediaWorksBrowser's own `.sm-wp-layout`, both MediaWorksFilterPanel cards
   and one MediaWorksTile per project, with the copy swapped for
   <SkeletonText /> and the stills left as empty frames. The counts are the
   current payload's, so the grid is already as long as the one that lands.
   The banner's own bars live in <MediaWorksHero />, which always renders its
   shell (see the note there). */
const PANELS = [
  { title: 5, options: [17, 16, 17, 13, 19] },
  { title: 6, options: [5] },
];
const PROJECTS = 15;

function Panel({ title, options }: { title: number; options: number[] }) {
  return (
    <section className="sm-wp-panel">
      <div className="sm-wp-panel-head">
        <h2 className="sm-wp-panel-title">
          <SkeletonText chars={title} />
        </h2>
        <button type="button" className="sm-wp-panel-toggle" tabIndex={-1}>
          —
        </button>
      </div>
      <ul className="sm-wp-opts">
        {options.map((chars, i) => (
          <li key={i}>
            <label className="sm-wp-opt">
              <span className="sm-wp-box" aria-hidden="true">
                <IconCheckMark />
              </span>
              <span>
                <SkeletonText chars={chars} />
              </span>
            </label>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function MediaWorksSkeleton() {
  return (
    <section className="sm-wp-body" aria-busy="true" aria-hidden="true">
      <div className="container">
        <div className="sm-wp-layout">
          <aside className="sm-wp-side">
            {PANELS.map((panel, i) => (
              <Panel key={i} {...panel} />
            ))}
          </aside>
          <div className="sm-wp-grid">
            {Array.from({ length: PROJECTS }, (_, i) => (
              <SkTile key={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
