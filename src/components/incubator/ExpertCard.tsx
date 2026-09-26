import { IconChainLink, IconLinkedIn } from "@/components/ui/icons";
import type { Expert } from "./experts-data";

/* One "فريق خبراء متخصص" card. The LinkedIn action, the dark photo tint and
   the olive border only appear while hovering — pure CSS, see the
   .inc-expert-card:hover rules in incubator.css. An action the API gives no
   url for is left out rather than linked to nowhere. */
export default function ExpertCard({ expert }: { expert: Expert }) {
  const hasActions = expert.profileHref || expert.linkedinHref;

  return (
    <article className="inc-expert-card">
      <div className="inc-expert-media">
        <img src={expert.image} alt="" />
        {hasActions ? (
          <div className="inc-expert-actions">
            {expert.profileHref ? (
              <a
                className="inc-expert-action"
                href={expert.profileHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={expert.name}
              >
                <IconChainLink />
              </a>
            ) : null}
            {expert.linkedinHref ? (
              <a
                className="inc-expert-action inc-expert-action-linkedin"
                href={expert.linkedinHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <IconLinkedIn />
              </a>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className="inc-expert-body">
        <div className="inc-expert-head">
          <h3 className="inc-expert-name">{expert.name}</h3>
          {expert.badge ? <span className="inc-expert-badge">{expert.badge}</span> : null}
        </div>
        <p className="inc-expert-desc">{expert.desc}</p>
      </div>
    </article>
  );
}
