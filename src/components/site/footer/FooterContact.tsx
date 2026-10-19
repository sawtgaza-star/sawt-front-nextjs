import type { ReactNode } from "react";
import { HeadingStroke } from "./footer-ornaments";
import type { FooterView } from "./footer-data";

const IconPhone = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#D9713C" strokeWidth="1.7" strokeLinejoin="round">
    <path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z" />
  </svg>
);

const IconMail = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#D9713C" strokeWidth="1.7" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="M3.5 7l8.5 6 8.5-6" />
  </svg>
);

/* Contact column: phone (opens WhatsApp) and email (opens Gmail compose) —
   both values from GET /layout/footer, the links derived from them in
   ./footer-data. The heading is the site's own string (the payload has no
   title for this row), passed in already translated by SiteFooter. */
export default function FooterContact({
  title,
  contact,
}: {
  title: string;
  contact: FooterView["contact"];
}) {
  const row = (icon: ReactNode, value: string, url: string) =>
    value ? (
      <li>
        {url ? (
          <a href={url} target="_blank" rel="noopener noreferrer">
            {icon}
            <span>{value}</span>
          </a>
        ) : (
          <span className="ft-contact-row">
            {icon}
            <span>{value}</span>
          </span>
        )}
      </li>
    ) : null;

  return (
    <div className="ft-col--contact">
      <h3 className="ft-heading">
        {title}
        <HeadingStroke variant={2} />
      </h3>
      <ul className="ft-list ft-list--contact">
        {row(<IconPhone />, contact.phone, contact.phoneUrl)}
        {row(<IconMail />, contact.email, contact.emailUrl)}
      </ul>
    </div>
  );
}
