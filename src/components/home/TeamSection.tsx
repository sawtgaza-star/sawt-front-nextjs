// @ts-nocheck
/* eslint-disable */
import { localized } from "@/lib/api/pages";
import type { HomeTeam } from "@/lib/api/home";
import { splitHeading } from "./home-text";
import MicCutouts from "./MicCutouts";

/* The API's `team` block. Each card shows the member's `mic_image` (the photo
   already composited inside the mic) — or, when it is null, the bare `image`
   behind the local mic frame — and their name — the design has no room for the role, so `role` /
   `major` are carried in the payload but not drawn here.

   The scattered photos behind the section used to point at member1..4.jpg,
   paths that were broken in the ORIGINAL site too; they are the same uploads
   as the cards now, so the backdrop finally resolves.

   Plain <a>, not <Link>: /team loads its own CSS group, like the navbar's
   الفريق link. The profile is /team/{uuid} — the identifier
   GET /pages/team/{uuid} resolves, and the segment team/[id] is exported
   under (see lib/api/team). */

function TeamCard({ member, profileCta }) {
  return (
    <div className="item">
      <div className="mic-container">
        {member.mic ? (
          <div className="mic-composed-box">
            {/* src is filled in by <MicCutouts> once the backdrop is cut away */}
            <img data-mic-src={member.mic} className="mic-frame-composed" alt="" />
          </div>
        ) : (
          <>
            <div className="member-photo-box">
              {member.photo ? <img loading="lazy" decoding="async" src={member.photo} alt={member.name} /> : null}
            </div>
            <img loading="lazy" decoding="async" src="/assets/images/مايك عوض 6.png" className="mic-frame" alt="" />
          </>
        )}
        <div className="member-name-tag">{member.name}</div>
      </div>
      {profileCta ? (
        <div className="btn-profile-wrapper">
          <a href={member.href} className="btn-view-profile">
            <span>{profileCta}</span>
            <i className="fa-solid fa-angle-left"></i>
          </a>
        </div>
      ) : null}
    </div>
  );
}

export default function TeamSection({
  data,
  lang = "ar",
}: {
  data?: HomeTeam;
  lang?: string;
}) {
  const title = localized(data?.title, lang);
  const [titleHead, titleTail] = splitHeading(title, 1);
  const subtitle = localized(data?.subtitle, lang);
  const profileCta = localized(data?.profile_cta, lang);

  const members = (Array.isArray(data?.items) ? data.items : []).map((item) => ({
    key: item.uuid || item.id,
    name: localized(item.name, lang),
    photo: item.image,
    mic: item.mic_image,
    href: item.uuid ? `/team/${item.uuid}` : "#",
  }));

  if (!title && !subtitle && !members.length) return null;

  /* Owl disables the arrows while it has no more items than it shows (4 on
     desktop), so a short roster is repeated until there are enough slides to
     scroll through. */
  const MIN_SLIDES = 5;
  const slides = [];
  while (members.length && slides.length < MIN_SLIDES) {
    members.forEach((member) => slides.push({ ...member, key: `${member.key}-${slides.length}` }));
  }

  /* The blurred backdrop takes the first four portraits it is given. */
  const backdrop = members.slice(0, 4).filter((member) => member.photo);

  return (
    <section className="team-section text-center">
      <div className="bg-scattered-photos">
        {backdrop.map((member, index) => (
          <img loading="lazy" decoding="async" key={member.key ?? index} src={member.photo} className={`pic-${index + 1}`} alt="" />
        ))}
      </div>
      <img loading="lazy" decoding="async" src="/assets/images/leaf_cutout.png" className="olive-branch branch-left-top" alt="Olive Branch" />
      <img loading="lazy" decoding="async" src="/assets/images/leaf_cutout.png" className="olive-branch branch-right-bottom" alt="Olive Branch" />
      <div className="container font-42">
        {title ? (
          <h1 className="title">
            <span>{titleHead}</span>{" "}
            <span><span className="who-us">{titleTail}</span></span>
          </h1>
        ) : null}
        {subtitle ? <p className="mb-5 describ-p">{subtitle}</p> : null}
        <div className="owl-carousel owl-theme team-carousel">
          {slides.map((member, index) => (
            <TeamCard key={member.key ?? index} member={member} profileCta={profileCta} />
          ))}
        </div>
        <MicCutouts urls={members.map((member) => member.mic).filter(Boolean)} />
      </div>
    </section>
  );
}
