/* The fallback page behind every dynamic detail route (/team/[id],
   /creators/[id], /news/[id], /stories/[id], /courses/[id],
   /media/services/[slug], /media/works/[slug]).

   `output: 'export'` writes one HTML file per segment generateStaticParams()
   listed at build time, so a member / article / course added from the
   dashboard after the deploy has no file and the host would 404 it. Each of
   those routes therefore also exports FALLBACK_SEGMENT (→ out/team/_.html,
   …), and the .htaccess next to it (public/<route>/.htaccess) rewrites any
   segment that has no file of its own to that page. The URL in the address
   bar stays /team/<uuid>, so the page reads the real segment from it (see
   ./use-route-segment).

   Every page already fetches its content in the browser, so the fallback
   renders exactly what a prebuilt page would — only <title> is generic until
   the payload arrives. */

export const FALLBACK_SEGMENT = "_";

/** Appends the fallback page to a route's generateStaticParams() list. */
export function withFallback<K extends string>(
  key: K,
  params: Record<K, string>[],
): Record<K, string>[] {
  return [...params, { [key]: FALLBACK_SEGMENT } as Record<K, string>];
}
