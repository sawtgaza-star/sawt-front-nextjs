"use client";
/* "احجز مقعدك" — an event card's CTA, wired to
   POST /pages/incubator/events/{uuid}/reserve.

   The seat belongs to the signed-in account, so a guest gets the "sign in
   first" dialog; its link comes back to this page scrolled to this very card
   (the login page's `?next=` + IncubatorContent's hash jump), where the card
   now knows — the page is fetched with the session — whether the seat is
   already theirs. A 401 on the way means the stored session is stale: it is
   dropped and the same dialog asks them to sign in again.

   The button reads the payload's `cta` / `reserved_by_me` / `seats`:
     · already reserved            → "تم الحجز", inert
     · ended / full / closed        → the API's own label ("انتهت الفعالية"), inert
     · anything else                → pressable
   What the API answers is shown in the site's floating notice (the same
   panel as the newsletter / logout ones): its confirmation (and the card
   flips to reserved), or its refusal — already booked, full,
   ended, not found, too many tries — word for word, and the plain network
   message when the request never got there. */

import { useCallback, useMemo, useRef, useState } from "react";
import { ApiError } from "@/lib/api/client";
import {
  reserveIncubatorEvent,
  type IncubatorEvent,
} from "@/lib/api/incubator-page";
import { localized } from "@/lib/api/pages";
import { clearSession, getToken } from "@/lib/auth-state";
import { useLang } from "@/lib/use-lang";
import LoginRequiredDialog from "@/components/site/LoginRequiredDialog";
import NewsletterToast, { type NewsletterNotice } from "@/components/site/NewsletterToast";

/** cta keys that mean "no reservation can be made" */
const CLOSED_KEYS = new Set(["past", "ended", "full", "closed", "cancelled"]);
/** cta keys that mean "this visitor already holds a seat" */
const RESERVED_KEYS = new Set(["reserved", "booked"]);

/* The server's sentence as it came (re-translated on every render, so the
   language button reaches it) — or, when it sent none, one of ours by key. */
type Note = { ok: boolean; text?: string; key?: string } | null;

export default function EventReserveButton({
  event,
  anchorId,
}: {
  event: IncubatorEvent;
  /** The card's id — where sign-in brings the visitor back to. */
  anchorId: string;
}) {
  const { lang, tr } = useLang();
  const [pending, setPending] = useState(false);
  const [needsLogin, setNeedsLogin] = useState(false);
  const [note, setNote] = useState<Note>(null);
  /* what the API said about the seat after a press, over the page payload */
  const [override, setOverride] = useState<Partial<IncubatorEvent>>({});
  const inFlight = useRef(false);

  const current = { ...event, ...override };
  const key = (current.cta?.key || "").toLowerCase();
  const reserved = !!current.reserved_by_me || RESERVED_KEYS.has(key);
  const full = current.seats?.available === 0;
  const closed = CLOSED_KEYS.has(key) || (full && !reserved);
  const apiLabel = localized(current.cta?.label, lang);

  const returnTo = () => {
    const { pathname, search } = window.location;
    return `${pathname}${search}#${anchorId}`;
  };

  const reserve = async () => {
    if (inFlight.current || reserved || closed) return;
    if (!event.uuid) {
      setNote({ ok: false, key: "inc_event_unavailable" });
      return;
    }
    const token = getToken();
    if (!token) {
      setNeedsLogin(true);
      return;
    }

    inFlight.current = true;
    setPending(true);
    setNote(null);
    try {
      const result = await reserveIncubatorEvent(event.uuid, token);
      setOverride({
        ...(result?.data || {}),
        // a 2xx is a held seat, whatever else the body leaves out
        reserved_by_me: true,
      });
      setNote({ ok: true, text: result?.message, key: "inc_event_reserved_msg" });
    } catch (caught) {
      if (caught instanceof ApiError && caught.isUnauthorized) {
        clearSession();
        setNeedsLogin(true);
        return;
      }
      if (!(caught instanceof ApiError)) console.error(caught);
      /* 422's top-level message is the first field's — the same sentence a
         field note would carry, and there are no fields on this card */
      setNote({
        ok: false,
        text: caught instanceof ApiError ? caught.message : undefined,
        key: "inc_event_reserve_failed",
      });
    } finally {
      inFlight.current = false;
      setPending(false);
    }
  };

  /* the toast runs the server's sentence through apiMessage() itself; our own
     fallback is read per language here, so either follows the language button */
  const notice = useMemo<NewsletterNotice | null>(
    () =>
      note
        ? { kind: note.ok ? "success" : "error", message: note.text || tr(note.key || "") }
        : null,
    // `tr` is a new function every render; `lang` is what actually changes it
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [note, lang],
  );
  const closeNote = useCallback(() => setNote(null), []);

  let label: string;
  if (pending) label = tr("inc_event_reserving");
  else if (reserved) label = tr("inc_event_reserved");
  else if (closed) label = apiLabel || tr(full ? "inc_event_full" : "inc_event_closed");
  else label = apiLabel || tr("inc_event_book");

  const inert = reserved || closed;

  return (
    <div className="inc-event-cta">
      <button
        type="button"
        className={
          "inc-event-book" +
          (reserved ? " is-reserved" : "") +
          (closed && !reserved ? " is-closed" : "")
        }
        onClick={reserve}
        disabled={pending || inert}
        aria-busy={pending || undefined}
      >
        {reserved ? <i className="fa-solid fa-check" aria-hidden="true"></i> : null}
        <span>{label}</span>
      </button>

      {notice ? <NewsletterToast notice={notice} onClose={closeNote} /> : null}

      {needsLogin && (
        <LoginRequiredDialog
          onClose={() => setNeedsLogin(false)}
          next={returnTo()}
          titleKey="inc_event_login_title"
          messageKey="inc_event_login_required"
        />
      )}
    </div>
  );
}
