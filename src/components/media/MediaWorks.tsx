import MediaSectionHead from "./MediaSectionHead";
import MediaWorksCard from "./MediaWorksCard";
import { WORK_COLUMNS } from "./media-works-data";

/* "أبرز أعمالنا" — three columns of stills drifting vertically inside one
   rounded panel (outer columns up, middle one down). Every tile carries its
   own project card inside `.sm-works-shot`, so the card scrolls along with its
   photo; hovering a tile reveals its card and pauses that column (media.css).
   Each column's list is rendered twice so the CSS loop has no seam. */
export default function MediaWorks() {
  return (
    <section className="sm-works" id="sm-works">
      <div className="container">
        <MediaSectionHead
          pill="أعمالنا"
          pillKey="sm_works_pill"
          title="أبرز أعمالنا"
          titleKey="sm_works_title"
          sub="نستعرض أبرز مشاريعنا في الإنتاج والتصوير والتصميم والتسويق. نتائج قابلة للقياس تتحدث عن نفسها."
          subKey="sm_works_sub"
        />

        <div className="sm-works-wall">
          {WORK_COLUMNS.map((col, c) => (
            <div className={"sm-works-col sm-works-col-" + (c + 1)} key={c}>
              <div className="sm-works-loop">
                {[0, 1].map((pass) =>
                  col.map((work) => (
                    <span className="sm-works-shot" key={`${pass}-${work.key}`}>
                      <img src={work.photo} alt="" aria-hidden={pass === 1 || undefined} />
                      <MediaWorksCard work={work} duplicate={pass === 1} />
                    </span>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="sm-works-more">
          <a className="sm-btn-green sm-btn-lg" href="/media/works">
            <span data-i18n="sm_works_more">شاهد المزيد من اعمالنا</span>
            <i className="fa-solid fa-angle-left"></i>
          </a>
        </div>
      </div>
    </section>
  );
}
