// @ts-nocheck
/* eslint-disable */
import { localized } from "@/lib/api/pages";
import type {
  CreatorsPartnerCompany,
  CreatorsPartnersContent,
} from "@/lib/api/creators-page";
import { bySortOrder, splitEnds } from "./creators-text";

/* "شركات إعلانية تعاونت مع صناع محتوى صوت" — the API's `partners` block.

   Each card is one company: its logo, its name, and the avatars of the
   creators it worked with, in the order the editor arranged them. All of them
   are drawn — the row overlaps by 8px per avatar (creators.css), so a company
   with seven collaborators stays inside the card.

   `url` comes with every company and is NOT used: the legacy card is a plain
   <div>, and turning it into a link would change the design. The heading's
   accents are the legacy markup's — orange on the second word, green on the
   brand at the end. */
function CompanyCard({
  company,
  lang,
}: {
  company: CreatorsPartnerCompany;
  lang: string;
}) {
  const name = localized(company.name, lang);
  const creators = bySortOrder(company.creators);

  return (
    <div className="cr-company-card">
      {company.logo_url ? (
        <img className="cr-company-logo" src={company.logo_url} alt="" />
      ) : null}
      <div className="cr-company-name">{name}</div>
      <div className="cr-company-avatars">
        {creators.map((creator, i) =>
          creator.avatar_url ? (
            <img key={creator.uuid || i} src={creator.avatar_url} alt="" />
          ) : null,
        )}
      </div>
    </div>
  );
}

export default function PartnerCompanies({
  data,
  lang = "ar",
}: {
  data?: CreatorsPartnersContent;
  lang?: string;
}) {
  const title = localized(data?.title, lang);
  // "شركات · إعلانية · تعاونت مع صناع محتوى · صوت"
  const [pair, titleMid, brand] = splitEnds(title, 2, 1);
  const [titlePre, , titleHl] = splitEnds(pair, 1, 1);
  const description = localized(data?.description, lang);
  const companies = bySortOrder(data?.companies);

  if (!title && !description && !companies.length) return null;

  return (
    <section className="cr-companies-section">
      <div className="container">
        <div className="cr-companies-panel">
          <div className="cr-section-head" style={{ marginBottom: 0 }}>
            {title ? (
              <h2 className="cr-section-title">
                <span>{titlePre}</span>{" "}
                <span className="cr-title-orange">{titleHl}</span>{" "}
                <span>{titleMid}</span>{" "}
                <span className="cr-highlight">{brand}</span>
              </h2>
            ) : null}
            {description ? (
              <p className="cr-section-sub">{description}</p>
            ) : null}
          </div>
          <div className="cr-companies-grid">
            {companies.map((company, i) => (
              <CompanyCard
                key={company.uuid || i}
                company={company}
                lang={lang}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
