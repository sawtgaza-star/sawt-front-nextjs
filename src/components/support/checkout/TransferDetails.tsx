"use client";
import { useEffect, useRef, useState } from "react";
import {
  IconCopy,
  IconFlash,
  IconInfoCircle,
} from "@/components/ui/icons";
import type { SupportMethod } from "@/lib/api/support-methods";
import { TRANSFER_FIELDS } from "./transfer-details-data";
import { methodRows, methodSteps } from "./method-details";

/* "بيانات التحويل" — the rows the donor transfers to, each with a copy
   button, then the confirmation note and the orange reminder panel.
   Client leaf: the copy buttons need the clipboard + a short "copied" state.
   With a platform from the API (GET /support/methods/{uuid}) the rows are its
   account + `fields`, followed by its QR code and instructions; without one,
   the built-in bank rows stand in. */
export default function TransferDetails({
  method = null,
  lang = "ar",
}: {
  method?: SupportMethod | null;
  lang?: string;
}) {
  const rows = method ? methodRows(method, lang) : TRANSFER_FIELDS;
  const steps = method ? methodSteps(method, lang) : [];
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
        {rows.map((field, i) => (
          <div className="sp-transfer-row" key={field.labelKey || i}>
            <dt
              className="sp-transfer-label"
              data-i18n={field.labelKey || undefined}
            >
              {field.label}
            </dt>
            <dd className="sp-transfer-field">
              <span className="sp-transfer-value">{field.value}</span>
              {field.copyable !== false && (
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
              )}
            </dd>
          </div>
        ))}
      </dl>

      {method && !rows.length && !steps.length && (
        <p className="sp-transfer-empty" data-i18n="checkout_transfer_empty">
          لم تتم إضافة بيانات التحويل لهذه الوسيلة بعد، سيتواصل معك الفريق
          لتزويدك بها.
        </p>
      )}

      {method?.qr_image_url && (
        <img
          src={method.qr_image_url}
          alt="QR"
          className="sp-transfer-qr"
          width={180}
          height={180}
        />
      )}

      {steps.length > 0 && (
        <ol className="sp-transfer-steps">
          {steps.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ol>
      )}

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
