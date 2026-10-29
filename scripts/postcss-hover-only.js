/* PostCSS plugin: hover effects only on devices that can really hover.
   On phones a tap fires :hover and it sticks until the next tap elsewhere,
   so every :hover rule — ours, the legacy CSS, Bootstrap's — is moved into
   @media (hover: hover) and (pointer: fine) at build time. The source CSS stays
   untouched (pixel parity on desktop); a rule that mixes selectors
   (".a:hover, .a:focus") keeps its non-hover part where it was.
   Rules already under a hover/pointer media query are left alone. */

const QUERY = "(hover: hover) and (pointer: fine)";

/* ":not(:hover)" means "while not hovered" — true on phones too, so a
   :hover that only sits inside :not(...) doesn't count. */
const hasHover = (selector) =>
  /:hover\b/.test(selector.replace(/:not\((?:[^()]|\([^()]*\))*\)/g, ""));

function inHoverMedia(node) {
  for (let p = node.parent; p; p = p.parent) {
    if (p.type === "atrule" && /^media$/i.test(p.name) && /hover|pointer/.test(p.params)) {
      return true;
    }
  }
  return false;
}

module.exports = () => ({
  postcssPlugin: "postcss-hover-only",
  Once(root, { AtRule }) {
    root.walkRules((rule) => {
      if (!hasHover(rule.selector) || inHoverMedia(rule)) return;
      if (rule.parent.type === "atrule" && /keyframes$/i.test(rule.parent.name)) return;

      const hover = rule.selectors.filter(hasHover);
      const rest = rule.selectors.filter((s) => !hasHover(s));

      const media = new AtRule({ name: "media", params: QUERY });
      media.append(rule.clone({ selectors: hover }));
      rule.after(media);

      if (rest.length) rule.selectors = rest;
      else rule.remove();
    });
  },
});
module.exports.postcss = true;
