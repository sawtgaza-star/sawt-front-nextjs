import { localized, localizedHtml } from "@/lib/api/pages";
import type { HomeHero } from "@/lib/api/home";
import { splitHeading } from "../home-text";
import { splitHeroTitle } from "./hero-copy";
import RichText from "@/components/ui/RichText";

/* The hero's text column, all of it the API's `hero` block: kicker, the
   two-line title (the second line in the brand green over the site's
   peach brush stroke, as under the section titles), the description, the two buttons and the tagline. What
   the editor leaves empty renders empty. Static — its entrance is pure CSS
   (home-hero.css), staggered through --hh-delay.

   While the payload is on its way the column holds its place with bars. */
export default function HeroCopy({
  hero,
  lang,
  loading,
}: {
  hero?: HomeHero;
  lang: string;
  loading: boolean;
}) {
  if (loading) {
    return (
      <div className="hh-copy" aria-busy="true" aria-hidden="true">
        <span className="hh-sk" style={{ width: "40%" }}></span>
        <span className="hh-sk hh-sk-title" style={{ width: "85%" }}></span>
        <span className="hh-sk hh-sk-title" style={{ width: "70%" }}></span>
        <span className="hh-sk" style={{ width: "95%" }}></span>
        <span className="hh-sk" style={{ width: "75%" }}></span>
      </div>
    );
  }

  const kicker = localized(hero?.kicker, lang);
  const [titleLead, titleAccent] = splitHeroTitle(localized(hero?.title, lang), lang);
  // the stroke runs under the accent line's last three words
  const [accentHead, accentMark] = splitHeading(titleAccent, 3);
  const description = localizedHtml(hero?.description, lang);
  const tagline = localized(hero?.tagline, lang);
  const support = localized(hero?.buttons?.support?.label, lang);
  const collaborate = localized(hero?.buttons?.collaborate?.label, lang);

  return (
    <div className="hh-copy">
      {kicker ? <p className="hh-eyebrow hh-rise">{kicker}</p> : null}
      {titleLead || titleAccent ? (
        <h1 className="hh-title">
          {titleLead ? (
            <span className="hh-line">
              <span className="hh-line-text">{titleLead}</span>
            </span>
          ) : null}
          {titleAccent ? (
            <span className="hh-line">
              <span className="hh-line-text hh-accent">
                {accentHead ? `${accentHead} ` : null}
                <span className="hh-mark">{accentMark}</span>
              </span>
            </span>
          ) : null}
        </h1>
      ) : null}
      {description ? <RichText as="p" className="hh-lead hh-rise" html={description} /> : null}
      {support || collaborate ? (
        <div className="hh-actions hh-rise">
          {support ? (
            <a href="/support" className="hh-btn hh-btn-primary">
              <span>{support}</span>
              <i className="fa-solid fa-angle-left" aria-hidden="true"></i>
            </a>
          ) : null}
          {collaborate ? (
            <a href="/collaborate" className="hh-btn hh-btn-ghost">
              {collaborate}
            </a>
          ) : null}
        </div>
      ) : null}
      {tagline ? (
        <p className="hh-tagline hh-rise">
          <span className="hh-pulse" aria-hidden="true"></span>
          {tagline}
        </p>
      ) : null}
    </div>
  );
}
