/* Parks a snap track on its opening slide while the page is still parsing.

   The hook that drives these tracks can only place them once React has
   hydrated, and the browser paints the server-rendered markup well before
   that — so the section is first seen at its own start and then jumps. This
   runs as the parser reaches it, right after the track's own markup, so the
   very first paint is already the resting state.

   The maths is the same as `useSnapSlider`'s `measure`: the offset the slide
   needs to reach the middle, clamped into the track's own scroll range (0 →
   max in an LTR track, 0 → -max in an RTL one). Reading layout here is safe —
   the frames size themselves from `flex-basis` + `aspect-ratio`, so nothing
   waits on the images. */
export default function SnapSliderPlacer({
  trackId,
  slide,
}: {
  trackId: string;
  slide: number;
}) {
  const src = `(function(){try{
var el=document.getElementById(${JSON.stringify(trackId)});if(!el)return;
var kid=el.children[${slide}];if(!kid)return;
var max=el.scrollWidth-el.clientWidth;
var mid=el.getBoundingClientRect().left+el.clientWidth/2;
var r=kid.getBoundingClientRect();
var raw=el.scrollLeft+(r.left+r.width/2-mid);
el.scrollLeft=Math.round(getComputedStyle(el).direction==="rtl"
?Math.min(0,Math.max(-max,raw)):Math.max(0,Math.min(max,raw)));
}catch(e){}})();`;

  return <script dangerouslySetInnerHTML={{ __html: src }} />;
}
