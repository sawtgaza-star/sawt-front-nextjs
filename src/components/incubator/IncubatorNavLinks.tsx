import type { MouseEvent } from "react";
import type { IncubatorNavLink } from "./incubator-nav-data";

/* The incubator navbar's link list. The picked section carries the highlight —
   olive label + rule in the bar (see .inc-nav-links a.is-active in
   incubator.css); the pick and the scroll are use-incubator-section's, owned by
   IncubatorNav so the phone drawer shares them.

   The labels are GET /layout/incubator/navbar's (see ./incubator-nav-data);
   while it is in flight the row is drawn as skeleton bars. */

export default function IncubatorNavLinks({
  links,
  loading,
  active,
  onLinkClick,
}: {
  links: IncubatorNavLink[];
  loading: boolean;
  active: string;
  onLinkClick: (event: MouseEvent<HTMLAnchorElement>, id: string) => void;
}) {
  if (loading) {
    return (
      <ul className="inc-nav-links">
        {["86px", "52px", "56px"].map((width, index) => (
          <li key={index}>
            <span className="nsk-line" style={{ width }} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="inc-nav-links">
      {links.map((link, index) => (
        <li key={link.key || index}>
          <a
            className={link.id && active === link.id ? "is-active" : undefined}
            href={link.href}
            onClick={(event) => onLinkClick(event, link.id)}
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
