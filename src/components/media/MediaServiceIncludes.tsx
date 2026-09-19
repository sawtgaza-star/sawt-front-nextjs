import { localized } from "@/lib/api/pages";
import { localizedList } from "@/lib/api/media-page";
import type { MediaServiceIncludesContent } from "@/lib/api/media-service";
import { IconCircleCheck } from "@/components/ui/icons";
import MediaProjectHead from "./MediaProjectHead";

/* "ماذا تشمل الخدمة" — the paragraph the design reuses from the service's own
   description, then the points of the scope, each a chip with the design's
   olive circle-check. Heading, paragraph and points are all the API's
   `includes` block, so the section is skipped entirely when it is empty. */
export default function MediaServiceIncludes({
  data,
  lang = "ar",
}: {
  data?: MediaServiceIncludesContent;
  lang?: string;
}) {
  const title = localized(data?.title, lang);
  const body = localized(data?.body, lang);
  const items = localizedList(data?.items, lang);

  if (!title && !body && !items.length) return null;

  return (
    <section className="sm-sv-includes">
      {title ? <MediaProjectHead title={title} dot="orange" /> : null}
      {body ? <p className="sm-sv-text">{body}</p> : null}

      {items.length ? (
        <div className="sm-sv-features">
          {items.map((item, index) => (
            <span className="sm-sv-feature" key={index}>
              <IconCircleCheck />
              <span>{item}</span>
            </span>
          ))}
        </div>
      ) : null}
    </section>
  );
}
