// @ts-nocheck
/* eslint-disable */
import { MAIN_LINKS_FIRST_COLUMN } from "./footer-data";

/* Desktop "الأقسام الرئيسية" column (two link lists, 3 + the rest). Title and
   labels come from GET /layout/footer; the column order is the design's, not
   the payload's — see MAIN_LINK_ORDER in ./footer-data. */
export default function FooterMainSections({ main }) {
  const first = main.links.slice(0, MAIN_LINKS_FIRST_COLUMN);
  const second = main.links.slice(MAIN_LINKS_FIRST_COLUMN);

  const item = (link, index) => (
    <li className="mb-4" key={index}>
      {" "}
      <a
        href={link.url}
        className="text-white text-decoration-none small"
      >
        {" "}
        <span>{link.label}</span>
      </a>{" "}
    </li>
  );

  return (
    <div
      className="col col-lg-3 col-md-6 text-white"
      style={{ textAlign: "start" }}
    >
      {" "}
      <h5 className="fw-bold mb-4 text-white">{main.title}</h5>{" "}
      <div className="row">
        {" "}
        <div className="col col-lg-6">
          {" "}
          <ul className="list-unstyled footer-links">
            {" "}
            {first.map(item)}{" "}
          </ul>{" "}
        </div>{" "}
        <div className="col-lg-6 main-links">
          {" "}
          <ul className="list-unstyled p-0 footer-links">
            {" "}
            {second.map(item)}{" "}
          </ul>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
