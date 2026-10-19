import { socialMark } from "../social-icons";
import type { FooterSocialLink } from "./footer-data";

/* Brand column: logo, about blurb and the social accounts. All three come from
   GET /layout/footer and nothing else (see ./footer-data). With no logo in
   the payload the <img> is skipped rather than rendered with an empty src.

   WHICH accounts appear is the editor's; how each one is DRAWN is not — the
   mark comes from the platform slug (../social-icons, the same marks the
   navbar's top bar uses), painted in currentColor. A link the editor points
   off-site opens in a new tab. */
export default function FooterBrand({
  logoUrl,
  about,
  socials,
}: {
  logoUrl: string;
  about: string;
  socials: FooterSocialLink[];
}) {
  return (
    <div className="ft-col--brand">
      <a href="/" className="ft-logo">
        {logoUrl ? <img src={logoUrl} alt="صوت" width="100" /> : null}
      </a>
      <p className="ft-about">{about}</p>
      <nav className="ft-social" aria-label="social">
        {socials.map((social, index) => {
          const Icon = socialMark(social.platform);
          return (
            <a
              href={social.url}
              key={index}
              aria-label={social.platform}
              target={social.external ? "_blank" : undefined}
              rel={social.external ? "noopener noreferrer" : undefined}
            >
              {Icon ? <Icon /> : <i className={social.icon}></i>}
            </a>
          );
        })}
      </nav>
    </div>
  );
}
