// @ts-nocheck
/* eslint-disable */
/* Desktop "اقسام صوت" column — the `quick` group of GET /layout/footer, and
   nothing else: an empty group renders an empty column (see ./footer-data). */
export default function FooterQuickLinks({ quick }) {
  return (
    <div
      className="col col-lg-3 col-md-6 text-white"
      style={{ textAlign: "start" }}
    >
      {" "}
      <h5 className="fw-bold mb-4 text-white">{quick.title}</h5>{" "}
      <ul className="list-unstyled p-0 footer-links">
        {" "}
        {quick.links.map((link, index) => (
          <li className="mb-4" key={index}>
            {" "}
            <a href={link.url} className="text-white text-decoration-none small">
              {" "}
              <span>{link.label}</span>
            </a>{" "}
          </li>
        ))}{" "}
      </ul>{" "}
    </div>
  );
}
