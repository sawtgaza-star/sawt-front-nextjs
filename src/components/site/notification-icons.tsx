import type { ReactElement } from "react";
import type { NotificationKind } from "@/lib/notifications";

/* One 20px glyph per notification kind, drawn in the item's round chip, plus
   the larger bell of the empty state. All `currentColor` (olive). */

const ICONS: Record<NotificationKind, ReactElement> = {
  // shield — "تسجيل دخول إلى حسابك"
  login: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M12 2.75 4.75 5.5v5.62c0 4.6 3.08 8.79 7.25 10.13 4.17-1.34 7.25-5.53 7.25-10.13V5.5L12 2.75Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M12 8v4.5M12 15.5v.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  // person + plus — "متابعة جديدة"
  follow: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="10" cy="7.5" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 20.25c0-3.45 3.13-6.25 7-6.25 1.2 0 2.34.27 3.33.75M18.5 14v6M15.5 17h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  // newspaper — "تابع آخر المستجدات"
  updates: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M17 20.25H6.5A2.75 2.75 0 0 1 3.75 17.5V5.25c0-.83.67-1.5 1.5-1.5h10.5c.83 0 1.5.67 1.5 1.5V17.5a2.75 2.75 0 0 0 2.75 2.75 2.75 2.75 0 0 0 2.25-2.75V9.75h-5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M7.5 8h6M7.5 12h6M7.5 16h3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  // phone — "دعم صوت"
  support: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M8.6 3.75H6.1A2.35 2.35 0 0 0 3.75 6.1c0 7.7 6.45 14.15 14.15 14.15a2.35 2.35 0 0 0 2.35-2.35v-2.5l-3.9-1.56-1.76 1.76a11.8 11.8 0 0 1-6.19-6.19l1.76-1.76L8.6 3.75Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  ),
};

export function NotificationIcon({ kind }: { kind: NotificationKind }) {
  return ICONS[kind] ?? ICONS.updates;
}

/* The empty state's bell — from the design handoff. */
export function IconEmptyBell() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M16.9629 23.8105C17.3436 23.5134 17.8929 23.5805 18.1904 23.9609C18.4878 24.3417 18.4207 24.8919 18.04 25.1895C16.9538 26.0379 15.5362 26.542 14.001 26.542C12.4658 26.542 11.049 26.0378 9.96289 25.1895C9.58205 24.892 9.51405 24.3418 9.81152 23.9609C10.109 23.5803 10.6593 23.5131 11.04 23.8105C11.8114 24.413 12.8472 24.792 14.001 24.792C15.1549 24.792 16.1914 24.4131 16.9629 23.8105ZM14 1.45801C19.3042 1.45801 23.6543 5.62544 23.6543 10.8262C23.6544 12.0245 23.7378 12.918 24.2998 13.7227C24.4027 13.8679 24.5115 14.0126 24.6309 14.1709C24.6619 14.2121 24.694 14.2545 24.7266 14.2979C24.8797 14.5017 25.0446 14.7258 25.1992 14.9609C25.5057 15.427 25.8088 15.9938 25.9131 16.6572C26.254 18.8265 24.6814 20.2119 23.1562 20.8252C17.7403 23.0028 10.2607 23.0028 4.84473 20.8252C3.31955 20.212 1.74694 18.8266 2.08789 16.6572C2.19216 15.9939 2.49433 15.427 2.80078 14.9609C2.95544 14.7257 3.12119 14.5018 3.27441 14.2979C3.30694 14.2546 3.33907 14.2121 3.37012 14.1709C3.48944 14.0126 3.59825 13.8679 3.70117 13.7227C4.26315 12.918 4.34656 12.0244 4.34668 10.8262C4.34672 5.62559 8.69599 1.45819 14 1.45801ZM14 3.20801C9.60731 3.20819 6.09668 6.6463 6.09668 10.8262C6.09657 12.0541 6.03361 13.4411 5.13379 14.7275L5.13086 14.7324C5.0108 14.902 4.88136 15.0741 4.75977 15.2354C4.73055 15.2741 4.70187 15.3123 4.67383 15.3496C4.52383 15.5493 4.38637 15.7362 4.26367 15.9229C4.0155 16.3003 3.86464 16.6221 3.81641 16.9287C3.66119 17.9163 4.3064 18.7223 5.49707 19.2012C10.4941 21.2104 17.5059 21.2103 22.5029 19.2012C23.6939 18.7223 24.3398 17.9164 24.1846 16.9287C24.1364 16.6221 23.9854 16.3002 23.7373 15.9229C23.6146 15.7363 23.4771 15.5492 23.3271 15.3496C23.2991 15.3123 23.2704 15.2741 23.2412 15.2354C23.1196 15.0742 22.9902 14.9019 22.8701 14.7324L22.8672 14.7275C21.9673 13.4411 21.9044 12.0541 21.9043 10.8262C21.9043 6.64619 18.3928 3.20801 14 3.20801Z" fill="#4C5C37" />
    </svg>
  );
}
