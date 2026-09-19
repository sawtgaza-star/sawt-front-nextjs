// @ts-nocheck
/* eslint-disable */
import { socialMark } from "./social-icons";

/* The "وسائل التواصل الاجتماعي" label + the brand marks, from
   GET /layout/navbar (topbar.socials_label / topbar.socials) and nothing else:
   no built-in accounts stand behind them, so a row the editor empties renders
   empty — see ./navbar-data.

   Rendered twice: on ≥lg by NavTopBar (that bar is hidden on phones) and, at
   the bottom of the collapsed phone menu, by SiteNav's `.nav-mobile-social`
   row. Markup is identical in both places — the row styling lives in CSS.

   WHICH accounts appear is the editor's; how each one is DRAWN is not — the
   mark comes from the platform slug the payload sends (./social-icons, shared
   with the footer's bottom bar). The marks paint in currentColor, and
   `.social-links a svg` in style.css gives this row its olive. */

export default function NavSocialLinks({ label, socials, loading }) {
  return (
    <div className="social-links">
      <span
        className="font-18 ms-2"
        style={{
          color: "rgba(127, 127, 127, 1)",
          fontWeight: "bold",
          fontSize: "16px",
        }}
      >
        {loading ? (
          <span className="nsk-line" style={{ width: "150px" }} />
        ) : label ? (
          `${label} :`
        ) : (
          ""
        )}
      </span>
      {loading
        ? [0, 1, 2, 3, 4, 5].map((index) => (
            <span className="nsk-circle" key={index} />
          ))
        : socials.map((social, index) => {
            const Icon = socialMark(social.platform);
            return (
              <a
                href={social.url}
                className="text-white ms-2"
                key={index}
                target={social.external ? "_blank" : undefined}
                rel={social.external ? "noopener noreferrer" : undefined}
              >
                {Icon ? <Icon /> : <i className={social.icon + " font-18"}></i>}
              </a>
            );
          })}
    </div>
  );
}
