import { unfollow, type FollowedCreator } from "@/lib/follows";
import { useLang } from "@/lib/use-lang";
import { fill } from "./account-user";
import FollowedCreatorCard from "./FollowedCreatorCard";

/* "صناع المحتوى المتابعون": every creator followed from their profile page
   (CreatorProfileHero → lib/follows), newest first, in a sideways-scrolling
   row; an empty state pointing at /creators when there are none. */
export default function CreatorsTab({ creators }: { creators: FollowedCreator[] }) {
  const { lang, tr } = useLang();
  const count = creators.length;

  return (
    <section className="acc-panel">
      <h1 className="acc-title">{tr("acc_creators_title")}</h1>
      {count > 0 ? (
        <>
          <p className="acc-desc">
            {count === 1
              ? tr("acc_creators_count_one")
              : fill(tr("acc_creators_count"), { count })}
          </p>
          <div className="acc-creators-row">
            {creators.map((creator) => (
              <FollowedCreatorCard
                key={creator.uuid}
                creator={creator}
                lang={lang}
                tr={tr}
                onUnfollow={() => unfollow(creator.uuid)}
              />
            ))}
          </div>
          <p className="acc-note">{tr("acc_creators_note")}</p>
        </>
      ) : (
        <div className="acc-empty">
          <p className="acc-empty-title">{tr("acc_creators_empty_title")}</p>
          <p className="acc-empty-desc">{tr("acc_creators_empty_desc")}</p>
          <a href="/creators" className="acc-btn-primary">
            {tr("acc_creators_browse")}
          </a>
        </div>
      )}
    </section>
  );
}
