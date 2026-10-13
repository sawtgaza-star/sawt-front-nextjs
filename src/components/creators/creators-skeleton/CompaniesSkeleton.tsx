import SkeletonText from "@/components/ui/SkeletonText";
import { blank, times } from "./sk-utils";

/* PartnerCompanies while GET /pages/creators is in flight: the same panel,
   heading and company cards, with each name swapped for a <SkeletonText />
   (~1.25x the current copy). The logo and the avatars are blank <img>s with
   the real classes, so they take the real boxes (the avatars keep their own
   grey circle from creators.css). Keep it in step with PartnerCompanies. */

/** Character counts (~1.25x) of the current `partners` copy, and each company's name
    length and collaborator count, in the editor's order. */
const LEN = { title: 48, description: 58 };
const COMPANIES = [
  { name: 6, avatars: 4 },
  { name: 8, avatars: 2 },
  { name: 13, avatars: 2 },
  { name: 14, avatars: 3 },
  { name: 14, avatars: 2 },
  { name: 4, avatars: 2 },
  { name: 19, avatars: 2 },
  { name: 5, avatars: 7 },
];

export default function CompaniesSkeleton() {
  return (
    <section className="cr-companies-section">
      <div className="container">
        <div className="cr-companies-panel">
          <div className="cr-section-head" style={{ marginBottom: 0 }}>
            <h2 className="cr-section-title">
              <SkeletonText chars={LEN.title} />
            </h2>
            <p className="cr-section-sub">
              <SkeletonText chars={LEN.description} />
            </p>
          </div>
          <div className="cr-companies-grid">
            {COMPANIES.map((company, index) => (
              <div className="cr-company-card" key={index}>
                <img className="cr-company-logo sk-shimmer" src={blank()} alt="" />
                <div className="cr-company-name">
                  <SkeletonText chars={company.name} />
                </div>
                <div className="cr-company-avatars">
                  {times(company.avatars).map((i) => (
                    <img key={i} src={blank()} alt="" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
