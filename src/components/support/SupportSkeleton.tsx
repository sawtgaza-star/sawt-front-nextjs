import SkeletonText from "@/components/ui/SkeletonText";
import { IconCoinBitcoin, IconHandsGive, IconPayCard } from "@/components/ui/icons";
import AllocationSkeleton from "./skeleton/AllocationSkeleton";
import { BannerSkeleton, CommunitySkeleton } from "./skeleton/BannerCommunitySkeleton";
import DonateSkeleton from "./skeleton/DonateSkeleton";
import { CoursesSkeleton, PartnersSkeleton } from "./skeleton/PartnersCoursesSkeleton";
import SkeletonHead from "./skeleton/SkeletonHead";
import { FaqSkeleton, StoriesSkeleton } from "./skeleton/StoriesFaqSkeleton";
import "@/styles/support-skeleton.css";

/* What /support and /support/methods show while their request is in flight.
   Rendered on the server as well: `loading` starts true on both sides, so
   this is what ships in the prerendered HTML and what hydration expects.

   Every part is the real component's markup — same elements, same classes —
   with each text swapped for a <SkeletonText /> of the current copy's length
   (the counts live next to each part). So every heading, paragraph, card and
   margin is the one the content arrives into, at every breakpoint, and the
   page doesn't move when it lands. Glyphs and pictures keep their boxes;
   support-skeleton.css only stops them being drawn.

   Keep each part in step with its component when that markup changes. */

/** The hero's title and description (both pages' heroes send the same copy),
    inside the real .cr-hero container. */
export function SupportHeroSkeleton() {
  return (
    <>
      <h1 className="cr-hero-title" aria-busy="true" aria-hidden="true">
        <SkeletonText chars={8} />
      </h1>
      <p className="cr-hero-desc" aria-hidden="true">
        <SkeletonText chars={94} />
      </p>
    </>
  );
}

/** GET /support/methods' categories: icon, title and description lengths. */
const METHODS = [
  { Icon: IconPayCard, title: 12, desc: 105 },
  { Icon: IconHandsGive, title: 11, desc: 111 },
  { Icon: IconCoinBitcoin, title: 11, desc: 99 },
];

/** /support/methods' section head plus the method cards (PaymentMethods /
    PaymentMethodCard). The brand marks are three blank boxes of their size. */
export function PaymentMethodsSkeleton() {
  return (
    <section className="sp-section sp-sk" aria-busy="true" aria-hidden="true">
      <div className="container">
        <SkeletonHead title={28} />
        <div className="sp-methods-row">
          {METHODS.map(({ Icon, title, desc }, i) => (
            <div className="sp-method" key={i}>
              <div className="sp-method-card">
                <input type="radio" className="sp-method-input" disabled tabIndex={-1} />
                <span className="sp-method-head">
                  <span className="sp-method-marks">
                    <span className="sp-method-icon">
                      <Icon />
                    </span>
                    <span className="sp-method-brands">
                      <svg viewBox="0 0 30 22" />
                      <svg viewBox="0 0 30 22" />
                      <svg viewBox="0 0 30 22" />
                    </span>
                  </span>
                  <span className="sp-method-dot"></span>
                </span>
                <h3 className="sp-method-title">
                  <SkeletonText chars={title} />
                </h3>
                <p className="sp-method-desc">
                  <SkeletonText chars={desc} />
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** /support's body: the eight sections of <SupportContent />, in order. The
    wrapper is display:contents so the sections stay <main>'s own children:
    on phones main is a flex column that moves the banner first (order: -1),
    and their margins must not collapse through a block parent. */
export function SupportBodySkeleton() {
  return (
    <div className="sp-sk" style={{ display: "contents" }} aria-busy="true" aria-hidden="true">
      <DonateSkeleton />
      <BannerSkeleton />
      <CommunitySkeleton />
      <AllocationSkeleton />
      <PartnersSkeleton />
      <CoursesSkeleton />
      <StoriesSkeleton />
      <FaqSkeleton />
    </div>
  );
}
