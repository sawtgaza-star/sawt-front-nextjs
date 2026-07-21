// @ts-nocheck
"use client";
/* eslint-disable */

/* "شركات إعلانية تعاونت مع صناع محتوى صوت" — partner company cards. */
const COMPANIES = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  name: "شركة الإبداع",
}));

const AV = [
  "/assets/images/محمود زعيتر 2.png",
  "/assets/images/boy.png",
  "/assets/images/person.png",
];

function CompanyCard({ item }: { item: (typeof COMPANIES)[number] }) {
  return (
    <div className="cr-company-card">
      <img className="cr-company-logo" src="/assets/images/صوت 8.png" alt="" />
      <div className="cr-company-name" data-i18n="creators_company_name">
        {item.name}
      </div>
      <div className="cr-company-avatars">
        {AV.map((src, i) => (
          <img key={i} src={src} alt="" />
        ))}
      </div>
    </div>
  );
}

export default function PartnerCompanies() {
  return (
    <section className="cr-companies-section">
      <div className="container">
        <div className="cr-companies-panel">
          <div className="cr-section-head" style={{ marginBottom: 0 }}>
            <h2 className="cr-section-title">
              <span data-i18n="creators_companies_title_pre">شركات</span>{" "}
              <span className="cr-title-orange" data-i18n="creators_companies_title_hl">
                إعلانية
              </span>{" "}
              <span data-i18n="creators_companies_title_post">
                تعاونت مع صناع محتوى
              </span>{" "}
              <span className="cr-highlight" data-i18n="brand_sawt">
                صوت
              </span>
            </h2>
            <p className="cr-section-sub" data-i18n="creators_companies_sub">
              شكراً للشركات التي حملت صوت أهل غزة إلى العالم
            </p>
          </div>
          <div className="cr-companies-grid">
            {COMPANIES.map((c) => (
              <CompanyCard key={c.id} item={c} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
