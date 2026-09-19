import { localized } from "@/lib/api/pages";
import { localizedList, sortItems, type MediaServicesContent } from "@/lib/api/media-page";
import { SERVICE_THEMES, cycle } from "./media-page-view";
import MediaSectionHead from "./MediaSectionHead";
import MediaServicesSlider from "./MediaServicesSlider";
import type { ServiceCard } from "./MediaServiceCard";

/* "حلول إعلامية متكاملة" — the service cards, each in its own palette with the
   photo alternating sides, shown one at a time as a bottom-to-top slider with
   the scroll rail down the section's left edge.

   The cards are resolved here, once, and handed to the slider as plain view
   models: the slider is a client component and has no business knowing about
   { ar, en } pairs. The palette and the photo's side come from the card's
   position, not from the payload — see ./media-page-view. */
export default function MediaServices({
  data,
  lang = "ar",
}: {
  data?: MediaServicesContent;
  lang?: string;
}) {
  const ctaLabel = localized(data?.cta?.label, lang);

  const cards: ServiceCard[] = sortItems(data?.items).map((item, index) => ({
    number: item.number || "",
    title: localized(item.title, lang),
    tagline: localized(item.tagline, lang),
    description: localized(item.description, lang),
    tags: localizedList(item.tags, lang),
    imageUrl: item.image_url || null,
    href: item.path || (item.slug ? "/media/services/" + item.slug : "#"),
    ctaLabel,
    theme: cycle(SERVICE_THEMES, index),
  }));

  if (!data || !cards.length) return null;

  return (
    <section className="sm-services" id="sm-services">
      <div className="container">
        <MediaSectionHead
          pill={localized(data.eyebrow, lang)}
          title={localized(data.title, lang)}
          sub={localized(data.subtitle, lang)}
        />

        <MediaServicesSlider cards={cards} />
      </div>
    </section>
  );
}
