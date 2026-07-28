"use client";
import { useEffect, useRef, useState } from "react";
import {
  IconCopy,
  IconFlash,
  IconInfoCircle,
} from "@/components/ui/icons";
import { TRANSFER_FIELDS } from "./transfer-details-data";

/* "بيانات التحويل" — the bank rows the donor transfers to, each with a copy
   button, then the confirmation note and the orange reminder panel.
   Client leaf: the copy buttons need the clipboard + a short "copied" state. */
export default function TransferDetails() {
  const [copied, setCopied] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  async function copy(value: string) {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      return; // no clipboard permission — leave the button untouched
    }
    setCopied(value);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(null), 2000);
  }

  return (
    <div className="sp-transfer">
      <h2 className="sp-pay-title" data-i18n="checkout_transfer_title">
        بيانات التحويل
      </h2>

      <dl className="sp-transfer-list">
        {TRANSFER_FIELDS.map((field) => (
          <div className="sp-transfer-row" key={field.labelKey}>
            <dt className="sp-transfer-label" data-i18n={field.labelKey}>
              {field.label}
            </dt>
            <dd className="sp-transfer-field">
              <span className="sp-transfer-value">{field.value}</span>
              <button
                type="button"
                className={
                  "sp-transfer-copy" +
                  (copied === field.value ? " is-copied" : "")
                }
                onClick={() => copy(field.value)}
                title="نسخ"
                data-i18n-title="checkout_copy"
              >
                <IconCopy />
                {/* the label is text (not aria-label) so it gets translated */}
                <span className="sp-sr-only" data-i18n="checkout_copy">
                  نسخ
                </span>
              </button>
            </dd>
          </div>
        ))}
      </dl>

      <p className="sp-transfer-note">
        <span className="sp-transfer-note-icon" aria-hidden="true">
          <IconFlash />
        </span>
        <span data-i18n="checkout_transfer_note">
          سيتم تأكيد تبرعك خلال 1-3 أيام بعد استلام الإيصال
        </span>
      </p>

      <aside className="sp-notes sp-notes--slim">
        <p className="sp-notes-line">
          <span className="sp-notes-icon" aria-hidden="true">
            <IconInfoCircle />
          </span>
          <span data-i18n="checkout_transfer_banner">
            بعد اتمام التحويل ، يرجى الاحتفاظ بصورة الايصال أو رسالة التأكيد
            لارفاقها في الخطوة التالية
          </span>
        </p>
      </aside>
    </div>
  );
}
