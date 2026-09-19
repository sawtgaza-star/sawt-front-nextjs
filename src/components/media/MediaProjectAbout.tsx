import { localized } from "@/lib/api/pages";
import { localizedList, sortItems } from "@/lib/api/media-page";
import type {
  MediaWorkAboutContent,
  MediaWorkGallery,
  MediaWorkNote,
  MediaWorkResults,
} from "@/lib/api/media-work";
import MediaProjectHead from "./MediaProjectHead";
import { galleryLayout } from "./media-page-view";

/* "عن المشروع" panel — the brief, the challenges/solutions pair (orange card on
   the right, olive on the left, each with the design's quarter-circle notch in
   its top-left corner), the result figures and the frames of the project.

   All three headings are the API's: the tab's own label opens the panel, then
   `results.title` and `gallery.title`. */
function Note({
  note,
  lang,
  tone,
}: {
  note?: MediaWorkNote;
  lang: string;
  tone: "orange" | "olive";
}) {
  const title = localized(note?.title, lang);
  const items = localizedList(note?.items, lang);
  if (!title && !items.length) return null;

  return (
    <section className={"sm-pj-note sm-pj-note-" + tone}>
      <span className="sm-pj-note-notch" aria-hidden="true" />
      <h3 className="sm-pj-note-head">
        <span
          className={"sm-pj-dot" + (tone === "olive" ? " sm-pj-dot-olive" : "")}
          aria-hidden="true"
        />
        <span>{title}</span>
      </h3>
      <ul className="sm-pj-note-list">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

export default function MediaProjectAbout({
  title,
  data,
  results,
  gallery,
  lang = "ar",
}: {
  /** The tab's own label — the heading the panel opens with. */
  title: string;
  data?: MediaWorkAboutContent;
  results?: MediaWorkResults;
  gallery?: MediaWorkGallery;
  lang?: string;
}) {
  const body = localized(data?.body, lang);
  const figures = sortItems(results?.items);
  const shots = sortItems(gallery?.items)
    .map((shot) => shot.url)
    .filter((url): url is string => Boolean(url));
  /* the artboard's block of five, repeated to cover however many frames the
     payload carries — see galleryLayout */
  const frames = galleryLayout(shots.length);

  return (
    <div className="sm-pj-panel">
      {title ? <MediaProjectHead title={title} /> : null}
      {body ? <p className="sm-pj-text">{body}</p> : null}

      <div className="sm-pj-duo">
        <Note note={data?.challenges} lang={lang} tone="orange" />
        <Note note={data?.solutions} lang={lang} tone="olive" />
      </div>

      {figures.length ? (
        <>
          <MediaProjectHead title={localized(results?.title, lang)} />
          <div className="sm-pj-results">
            {figures.map((figure, index) => (
              <div className="sm-pj-result" key={index}>
                {/* counted up on scroll — see MediaProjectIntro */}
                <b className="sm-pj-result-value">{figure.value}</b>
                <span className="sm-pj-result-label">
                  {localized(figure.label, lang)}
                </span>
              </div>
            ))}
          </div>
        </>
      ) : null}

      {shots.length ? (
        <>
          <MediaProjectHead title={localized(gallery?.title, lang)} />
          <div className="sm-pj-gallery">
            {shots.map((src, i) => (
              <figure
                className={
                  "sm-pj-frame " +
                  (frames[i] === "full"
                    ? "sm-pj-frame-wide"
                    : "sm-pj-frame-" + frames[i])
                }
                key={i}
              >
                <img src={src} alt="" />
              </figure>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
