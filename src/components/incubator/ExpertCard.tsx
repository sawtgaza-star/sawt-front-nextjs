import { IconChainLink, IconLinkedIn } from "@/components/ui/icons";
import type { Expert } from "./experts-data";

/* One "فريق خبراء متخصص" card. The LinkedIn action, the dark photo tint and
   the olive border only appear while hovering — pure CSS, see the
   .inc-expert-card:hover rules in incubator.css. */
export default function ExpertCard({ expert }: { expert: Expert }) {
  return (
    <article className="inc-expert-card">
      <div className="inc-expert-media">
        <img src={expert.image} alt="" />
        <div className="inc-expert-actions">
          <a
            className="inc-expert-action"
            href={expert.profileHref}
            aria-label={expert.name}
          >
            <IconChainLink />
          </a>
          <a
            className="inc-expert-action inc-expert-action-linkedin"
            href={expert.linkedinHref}
            aria-label="LinkedIn"
          >
            <IconLinkedIn />
          </a>
        </div>
      </div>

      <div className="inc-expert-body">
        <div className="inc-expert-head">
          <h3 className="inc-expert-name" data-i18n={expert.nameKey}>
            {expert.name}
          </h3>
          <span className="inc-expert-badge" data-i18n={expert.badgeKey}>
            {expert.badge}
          </span>
        </div>
        <p className="inc-expert-desc" data-i18n={expert.descKey}>
          {expert.desc}
        </p>
      </div>
    </article>
  );
}
