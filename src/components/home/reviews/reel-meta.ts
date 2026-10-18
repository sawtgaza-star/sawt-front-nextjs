/* Pure helpers for <ReviewReel />'s caption. */

import type { HomeReelCollaborator } from "@/lib/api/home";

/** An Instagram caption is a post body: tabs, blank lines, a credit line and
    a run of hashtags. The card shows its first real line as the title; the
    whole text (whitespace tidied) rides along as the hover tooltip. */
export function reelCaption(raw: string | null | undefined): {
  title: string;
  full: string;
} {
  const lines = (raw || "")
    .split(/\r?\n/)
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter(Boolean);
  return { title: lines[0] || "", full: lines.join("\n") };
}

/** The accounts that co-posted the reel: accepted invites only (a pending one
    hasn't agreed to appear on the post yet), without the posting account
    itself, de-duplicated. */
export function reelCollaborators(
  list: (string | HomeReelCollaborator)[] | undefined,
  owner: string,
): string[] {
  if (!Array.isArray(list)) return [];
  const seen = new Set<string>([owner.toLowerCase()]);
  const names: string[] = [];
  for (const entry of list) {
    let name: string;
    if (typeof entry === "string") {
      name = entry.trim();
    } else {
      if (!entry || (entry.invite_status && entry.invite_status !== "Accepted")) continue;
      name = (entry.username || "").trim();
    }
    if (!name || seen.has(name.toLowerCase())) continue;
    seen.add(name.toLowerCase());
    names.push(name);
  }
  return names;
}
