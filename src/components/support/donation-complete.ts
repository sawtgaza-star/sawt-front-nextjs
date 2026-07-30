/* Hand-off between the wizard's last screen and /support: "اتمام العملية"
   raises this flag, then leaves for ادعم صوت, where <DonationToast /> takes it
   down again and shows the confirmation. sessionStorage (not a query string)
   keeps the URL clean and makes the notice one-shot — a reload of /support
   won't show it twice. */

export const DONATION_DONE_KEY = "sawt-donation-complete";

export function markDonationComplete() {
  try {
    sessionStorage.setItem(DONATION_DONE_KEY, "1");
  } catch {
    /* private mode / storage disabled — the donation still went through */
  }
}

/* Reads the flag and clears it in the same breath, so the caller is the only
   one that ever sees it. */
export function consumeDonationComplete() {
  try {
    if (sessionStorage.getItem(DONATION_DONE_KEY) !== "1") return false;
    sessionStorage.removeItem(DONATION_DONE_KEY);
    return true;
  } catch {
    return false;
  }
}
