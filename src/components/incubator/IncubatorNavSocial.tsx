import { socialIcon, socialMark } from "@/components/site/social-icons";
import type { SocialLink } from "@/lib/api/layout";

/* The incubator navbar's "وسائل التواصل الاجتماعي" label + the brand marks,
   from GET /layout/incubator/navbar (see ./incubator-nav-data) — a row the
   editor empties renders empty. Rendered twice: on ≥lg by the bar's top
   utility row (hidden on phones) and, at the bottom of the collapsed phone
   menu, by the drawer's `.inc-nav-mobile-social` row. Markup is identical in
   both places — the row styling lives in incubator.css.

   Marks come from the platform slug (site/social-icons, shared with the site
   bar and the footer) and paint in currentColor, so `.inc-nav-social a` keeps
   giving them the olive. */
export default function IncubatorNavSocial({
  label,
  socials,
  loading,
}: {
  label: string;
  socials: SocialLink[];
  loading: boolean;
}) {
  return (
    <div className="inc-nav-social">
      <span className="inc-nav-social-label">
        {loading ? (
          <span className="nsk-line" style={{ width: "150px" }} />
        ) : label ? (
          `${label} :`
        ) : null}
      </span>
      {loading
        ? [0, 1, 2, 3, 4].map((index) => <span className="nsk-circle" key={index} />)
        : socials.map((social, index) => {
            const Mark = socialMark(social.platform);
            return (
              <a
                key={index}
                href={social.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.platform || undefined}
              >
                {Mark ? <Mark /> : <i className={socialIcon(social.platform)}></i>}
              </a>
            );
          })}
    </div>
  );
}
