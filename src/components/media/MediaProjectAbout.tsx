import { localized, localizedHtml } from "@/lib/api/pages";
import { localizedList, sortItems } from "@/lib/api/media-page";
import type {
  MediaWorkAboutContent,
  MediaWorkGallery,
  MediaWorkNote,
  MediaWorkResults,
} from "@/lib/api/media-work";
import MediaProjectHead from "./MediaProjectHead";
import MediaProjectGallery from "./MediaProjectGallery";
import RichText from "@/components/ui/RichText";

/* "عن المشروع" panel — the brief, the challenges/solutions pair (orange card on
   the right, olive on the left, each with the design's quarter-circle notch in
   its top-left corner), the result figures and the frames of the project.

   All three headings are the API's: the tab's own label opens the panel, then
   `results.title` and `gallery.title`. */
function hasNote(note: MediaWorkNote | undefined, lang: string) {
  return Boolean(localized(note?.title, lang) || localizedList(note?.items, lang).length);
}

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
  const body = localizedHtml(data?.body, lang);
  const figures = sortItems(results?.items);
  const shots = sortItems(gallery?.items)
    .map((shot) => shot.url)
    .filter((url): url is string => Boolean(url));

  return (
    <div className="sm-pj-panel">
      {title ? <MediaProjectHead title={title} /> : null}
      {body ? <RichText as="p" className="sm-pj-text" html={body} /> : null}

      {hasNote(data?.challenges, lang) || hasNote(data?.solutions, lang) ? (
        <div className="sm-pj-duo">
          <Note note={data?.challenges} lang={lang} tone="orange" />
          <Note note={data?.solutions} lang={lang} tone="olive" />
        </div>
      ) : null}

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
        <MediaProjectGallery title={localized(gallery?.title, lang)} shots={shots} />
      ) : null}
    </div>
  );
}
