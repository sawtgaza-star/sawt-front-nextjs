"use client";
import { useEffect, useState } from "react";

/* The orange half of "…صوت ميديا تقدم" cycles through the agency's services.
   Client leaf on purpose — the rest of the hero stays a Server Component.

   Each word carries its own data-i18n key, so a language switch mid-cycle
   still translates: initTranslate() runs on the node that happens to be
   mounted, and the next tick remounts an already-correct one. */
const WORDS = [
  { key: "sm_hero_word_consult", text: "الاستشارات" },
  { key: "sm_hero_word_video", text: "إنتاج الفيديوهات" },
  { key: "sm_hero_word_photo", text: "التصوير الاحترافي" },
  { key: "sm_hero_word_design", text: "التصميم الجرافيكي" },
  { key: "sm_hero_word_content", text: "صناعة المحتوى" },
];

export default function MediaHeroWord() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % WORDS.length), 2600);
    return () => clearInterval(id);
  }, []);

  const w = WORDS[i];
  return (
    /* keyed so React swaps the node and the fade-up animation replays */
    <span className="sm-hero-word" key={w.key} data-i18n={w.key}>
      {w.text}
    </span>
  );
}
