/* Three headings on this page paint their last word(s) in the accent colour —
   the legacy markup hard-codes the split with a <span>, e.g.

     أهم القيم التي<span class="core-values-highlight">نركز عليها</span>

   The API sends the heading as one string, so the split has to be recreated:
   the accent falls on the last `tailWords` words, which is where the designer
   put it in all three headings, in Arabic and in English. Any heading whose
   accent should fall elsewhere would need the API to send the two halves. */
export function splitHeading(text: string, tailWords: number): [string, string] {
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (words.length <= tailWords) return ["", words.join(" ")];
  return [
    words.slice(0, words.length - tailWords).join(" "),
    words.slice(words.length - tailWords).join(" "),
  ];
}
