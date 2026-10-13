import SkeletonText from "@/components/ui/SkeletonText";
import { IconArrowUpLeft } from "@/components/ui/icons";
import { blank } from "./sk-utils";

/* CollaborationSteps while the page's payload is in flight — on /creators and
   at the foot of /creators/{id}, whose payload carries the same block. It is
   the real section: the flow panel (its icon tiles, dotted arrows and centre
   circle are chrome and stay), the divider, the three step cards and the CTA,
   with each text swapped for a <SkeletonText /> (sized ~1.25x the current copy,
   since the filler bars run narrower than real Arabic text).
   Keep it in step with CollaborationSteps. */

/** Character counts (~1.25x) of the current `collaboration` copy. */
const LEN = {
  title: 44,
  description: 71,
  brands: { title: 21, sub: 24 },
  media: { title: 11, sub: 26 },
  creators: { title: 15, sub: 21 },
  stepsTitle: 16,
  cta: 33,
};
const STEPS = [
  { title: 13, text: 81 },
  { title: 15, text: 103 },
  { title: 10, text: 78 },
];

function FlowArrow({ dir }: { dir: "left" | "right" }) {
  const dots = dir === "left" ? [5, 4, 3, 2, 1, 0] : [0, 1, 2, 3, 4, 5];
  const head = <svg key="head" className="cr-flow-head" width="18" height="18" viewBox="0 0 24 24" />;
  const dotEls = dots.map((i) => <span key={i} className={`cr-flow-dot cr-flow-dot-${i}`} />);
  return (
    <div className={`cr-flow-arrow cr-flow-arrow-${dir}`}>
      {dir === "left" ? [...dotEls, head] : [head, ...dotEls]}
    </div>
  );
}

function FlowNode({ title, sub }: { title: number; sub: number }) {
  return (
    <div className="cr-flow-node">
      <div className="cr-flow-icon cr-flow-orange"></div>
      <h3 className="cr-flow-node-title">
        <SkeletonText chars={title} />
      </h3>
      <p className="cr-flow-node-sub">
        <SkeletonText chars={sub} />
      </p>
    </div>
  );
}

export default function CollabStepsSkeleton() {
  return (
    <section className="cr-collab-section">
      <div className="container position-relative ">
        <img
          src="/assets/images/leaf_cutout.png"
          className="olive-branch branch-right-top-CollaborationSteps-section"
          alt=""
        />
        <div className="cr-section-head">
          <h2 className="cr-section-title">
            <SkeletonText chars={LEN.title} />
          </h2>
          <p className="cr-section-sub">
            <SkeletonText chars={LEN.description} />
          </p>
        </div>

        <div className="cr-flow-outer">
          <div className="cr-flow-panel">
            <FlowNode title={LEN.brands.title} sub={LEN.brands.sub} />
            <FlowArrow dir="left" />
            <div className="cr-flow-center">
              <div className="cr-flow-center-circle">
                <img src={blank()} alt="" />
                <span>
                  <SkeletonText chars={LEN.media.title} />
                </span>
              </div>
              <span className="cr-flow-badge">
                <SkeletonText chars={LEN.media.sub} />
              </span>
            </div>
            <FlowArrow dir="right" />
            <FlowNode title={LEN.creators.title} sub={LEN.creators.sub} />
          </div>
        </div>

        <div className="cr-steps-divider">
          <span>
            <SkeletonText chars={LEN.stepsTitle} />
          </span>
        </div>

        <div className="cr-steps-grid">
          {STEPS.map((step, i) => (
            <div className="cr-step-card" key={i}>
              <span className="cr-step-num"></span>
              <span className="cr-step-title">
                <SkeletonText chars={step.title} />
              </span>
              <span className="cr-step-text">
                <SkeletonText chars={step.text} />
              </span>
            </div>
          ))}
        </div>

        <div className="cr-collab-cta">
          <a>
            <span>
              <SkeletonText chars={LEN.cta} />
            </span>
            <IconArrowUpLeft />
          </a>
        </div>
      </div>
    </section>
  );
}
