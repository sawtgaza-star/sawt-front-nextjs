// @ts-nocheck
/* eslint-disable */
import { MAIN_LINKS_FIRST_COLUMN } from "./footer-data";

/* Mobile footer links — two titled sections side by side. Same two groups the
   desktop columns render (FooterMainSections / FooterQuickLinks), laid out for
   the narrow screen: the main sections in two columns, اقسام صوت in one.
   Titles and labels come from GET /layout/footer — see ./footer-data. */
export default function FooterLinksMobile({ main, quick }) {
  const mainColumns = [
    main.links.slice(0, MAIN_LINKS_FIRST_COLUMN),
    main.links.slice(MAIN_LINKS_FIRST_COLUMN),
  ];

  return (
    <div className="col-12 footer-links-mobile">
      {" "}
      {/*  القسم الأول: الأقسام الرئيسية (عمودان)  */}{" "}
      <div className="footer-links-section footer-links-section-main">
        {" "}
        <h5 className="footer-links-mobile-title">{main.title}</h5>{" "}
        <div className="footer-links-mobile-grid footer-links-mobile-two">
          {" "}
          {mainColumns.map((column, columnIndex) => (
            <ul className="list-unstyled footer-links" key={columnIndex}>
              {" "}
              {column.map((link, index) => (
                <li key={index}>
                  {" "}
                  <a href={link.url} className="text-white text-decoration-none">
                    {" "}
                    <span>{link.label}</span>
                  </a>{" "}
                </li>
              ))}{" "}
            </ul>
          ))}{" "}
        </div>{" "}
      </div>{" "}
      {/*  القسم الثاني: اقسام صوت (عمود واحد)  */}{" "}
      <div className="footer-links-section footer-links-section-quick">
        {" "}
        <h5 className="footer-links-mobile-title">{quick.title}</h5>{" "}
        <ul className="list-unstyled footer-links footer-links-mobile-single">
          {" "}
          {quick.links.map((link, index) => (
            <li key={index}>
              {" "}
              <a href={link.url} className="text-white text-decoration-none">
                {" "}
                <span>{link.label}</span>
              </a>{" "}
            </li>
          ))}{" "}
        </ul>{" "}
      </div>{" "}
    </div>
  );
}
