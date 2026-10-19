import NewsletterForm from "./NewsletterForm";
import { TitleStroke } from "./footer-ornaments";

type Newsletter = { title: string; description: string; placeholder: string };

/* Phrases that get the brush stroke when the title contains them — the
   slogan's key phrase in each language. A title with none of them falls back
   to its last word, so an editor's new copy still gets a stroke. */
const HIGHLIGHTS = ["من لا صوت له", "those who have no voice"];

/** The title split around the part the brush stroke sits under:
    [before, highlighted, after]. */
export function splitHighlight(title: string): [string, string, string] {
  const trimmed = title.trim();
  for (const phrase of HIGHLIGHTS) {
    const at = trimmed.toLowerCase().indexOf(phrase.toLowerCase());
    if (at !== -1) {
      const end = at + phrase.length;
      return [trimmed.slice(0, at), trimmed.slice(at, end), trimmed.slice(end)];
    }
  }
  const cut = trimmed.lastIndexOf(" ");
  return cut === -1
    ? ["", trimmed, ""]
    : [trimmed.slice(0, cut + 1), trimmed.slice(cut + 1), ""];
}

/* The newsletter row across the top of the footer, on desktop and mobile
   alike: title + blurb on one side, the form on the other. The copy is
   GET /layout/footer's `newsletter` block; the form keeps the site's own
   input and send button (./NewsletterForm) and posts to /newsletter. */
export default function FooterNewsletter({ newsletter }: { newsletter: Newsletter }) {
  const [lead, highlight, tail] = splitHighlight(newsletter.title);

  return (
    <section className="ft-newsletter" aria-labelledby="ft-nl-title">
      <div className="ft-newsletter__text">
        <h2 id="ft-nl-title">
          {lead}
          {highlight ? (
            <span className="ft-brush">
              {highlight}
              <TitleStroke />
            </span>
          ) : null}
          {tail}
        </h2>
        <p>{newsletter.description}</p>
      </div>
      <NewsletterForm
        placeholder={newsletter.placeholder}
        className="custom-newsletter-input ft-form"
      />
    </section>
  );
}
