"use client";
import { useState } from "react";
import { localized, localizedHtml } from "@/lib/api/pages";
import { sortItems, type MediaCreatorItem, type MediaCreatorsContent } from "@/lib/api/media-page";
import RichText from "@/components/ui/RichText";
import CreatorSpotlight from "./CreatorSpotlight";
import CreatorReelCard from "./CreatorReelCard";
import CreatorPicker from "./CreatorPicker";
import CreatorSteps from "./CreatorSteps";

/* "تعاون مع صنّاع المحتوى" on /media, after the packages — GET /pages/media's
   `creators` block: a soft panel with the pitch on the start side, the picked
   creator's featured reel and their card beside it, and the creator picker
   under those two; then the collaboration steps and the CTA. Without any
   creators the section is not shown. */
export default function MediaCreators({
  data,
  lang = "ar",
}: {
  data?: MediaCreatorsContent;
  lang?: string;
}) {
  const [selected, setSelected] = useState(0);
  // creators with a featured reel lead the picker (and open first); the
  // editor's order holds within each group — sort() is stable
  const hasReel = (c: MediaCreatorItem) => (c.reel?.video_url || c.reel?.media_url ? 0 : 1);
  const creators = sortItems(data?.items)
    .filter((c) => c.name)
    .sort((a, b) => hasReel(a) - hasReel(b));
  const creator = creators[selected] ?? creators[0];
  if (!data || !creator) return null;

  const labels = {
    videos: localized(data.stats_labels?.videos, lang),
    followers: localized(data.stats_labels?.followers, lang),
    views: localized(data.stats_labels?.views, lang),
  };
  const eyebrow = localized(data.eyebrow, lang);
  const title = localized(data.title, lang);
  const description = localizedHtml(data.description, lang);

  return (
    <section className="sm-cc" id="sm-creators">
      <div className="container">
        <div className="sm-cc-panel">
          <div className="sm-cc-intro">
            {eyebrow ? <span className="sm-pill">{eyebrow}</span> : null}
            {title ? <h2 className="sm-cc-title">{title}</h2> : null}
            {description ? <RichText as="p" className="sm-cc-sub" html={description} /> : null}
          </div>

          <CreatorReelCard key={`reel-${creator.uuid}`} creator={creator} labels={labels} lang={lang} />
          <CreatorSpotlight creator={creator} labels={labels} lang={lang} />
          <CreatorPicker
            creators={creators}
            selected={creators.indexOf(creator)}
            onSelect={setSelected}
            followersLabel={labels.followers}
            lang={lang}
          />
        </div>

        <CreatorSteps data={data} lang={lang} />
      </div>
    </section>
  );
}
