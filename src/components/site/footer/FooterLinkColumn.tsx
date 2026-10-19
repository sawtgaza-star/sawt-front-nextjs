import { HeadingStroke } from "./footer-ornaments";
import type { FooterNavLink } from "./footer-data";

/* One titled link column — used for both الأقسام الرئيسية and اقسام صوت.
   Title and labels come from GET /layout/footer; the hrefs are the site's own
   routes (ROUTE_BY_KEY in ./footer-data). */
export default function FooterLinkColumn({
  title,
  links,
  stroke,
}: {
  title: string;
  links: FooterNavLink[];
  /** which hand-drawn underline the heading gets */
  stroke: number;
}) {
  return (
    <nav className="ft-col--links" aria-label={title || undefined}>
      <h3 className="ft-heading">
        {title}
        <HeadingStroke variant={stroke} />
      </h3>
      <ul className="ft-list">
        {links.map((link, index) => (
          <li key={index}>
            <a href={link.url}>{link.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
