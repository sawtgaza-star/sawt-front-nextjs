/* Where a phone number / email address takes the visitor. Shared by the
   footer's contact row and the cards on /media/contact, so both land in the
   same place. */

/* wa.me wants the number in full international form and nothing else — no
   "+", spaces or dashes, or WhatsApp answers with "phone number shared via
   url is invalid" — hence the strip. */
export function whatsappUrl(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return digits ? `https://wa.me/${digits}` : "";
}

/* Gmail's compose window, by request, rather than a mailto: — clicking the
   address should land the visitor in Gmail with the To: field filled, not in
   whatever mail client their OS happens to have registered (often none, and
   then a mailto: click does nothing). Someone not signed in gets Google's
   login first and arrives at the same compose box. No /u/0 in the path: that
   pins the FIRST signed-in account, which is the wrong one for anyone using
   more than one. */
export function gmailComposeUrl(email: string): string {
  if (!email) return "";
  const to = encodeURIComponent(email);
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${to}`;
}
