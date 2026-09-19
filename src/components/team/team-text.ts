/* Text shaping the team pages share. Pure functions, no DOM.

   The same helper the home, about and content pages keep locally —
   deliberately not imported across pages, so an edit meant for one heading
   can't change another's. */

/* The "اعضاء الفريق" heading paints its last word in the accent colour; the
   legacy markup hard-codes the split with a <span>:

     <span>اعضاء</span> <span class="team-members-highlight">الفريق</span>

   The API sends it as one string, so the split has to be recreated: the accent
   falls on the last `tailWords` words, in Arabic and in English alike. */
export function splitHeading(text: string, tailWords: number): [string, string] {
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (words.length <= tailWords) return ["", words.join(" ")];
  return [
    words.slice(0, words.length - tailWords).join(" "),
    words.slice(words.length - tailWords).join(" "),
  ];
}
