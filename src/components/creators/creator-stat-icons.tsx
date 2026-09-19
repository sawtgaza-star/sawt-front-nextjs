/* The four glyphs of the /creators figures strip, lifted from the legacy
   markup (components/ui/icons).

   The API sends each figure with a `key` — active_creators / collaborations /
   support / reach — and that key picks the icon here. An unknown key falls
   back to the creator glyph rather than leaving a hole in the row. */

import { IconMoney, IconNews, IconTwoUsers, IconUser } from "../ui/icons";

const STAT_ICONS: Record<string, () => React.ReactElement> = {
  active_creators: IconUser,
  collaborations: IconNews,
  support: IconMoney,
  reach: IconTwoUsers,
};

export function CreatorStatIcon({ statKey }: { statKey?: string }) {
  const Icon = (statKey && STAT_ICONS[statKey]) || IconUser;
  return <Icon />;
}
