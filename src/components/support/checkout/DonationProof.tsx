"use client";
import { useState } from "react";
import { IconChevronDownBold, IconCloudUpload } from "@/components/ui/icons";
import { checkAttachment } from "@/lib/attachment";
import { CURRENCIES, PROOF_ACCEPT } from "./currencies-data";
import type { ProofErrors, ProofValues } from "./checkout-flow";

/* "إثبات تبرعك" — amount + currency + the receipt drop zone. The values and
   errors live in the wizard (they are what POST /support/requests/{uuid}/proof
   sends), so they survive going back; this leaf only owns the drag state. */
export default function DonationProof({
  proof,
  onChange,
  onFileError,
  errors,
}: {
  proof: ProofValues;
  /** `clear` names the error the edit makes stale */
  onChange: (patch: Partial<ProofValues>, clear: keyof ProofErrors) => void;
  /** a picked file broke the rules — the wizard drops it and shows why */
  onFileError: (reason: "type" | "size") => void;
  errors: ProofErrors;
}) {
  const { amount, currency, file } = proof;
  const error = errors.file;
  const [dragging, setDragging] = useState(false);

  /* Both the file input and a drop share this: reject anything outside the
     rules printed under the zone (checked by content, see lib/attachment),
     otherwise keep the file. */
  async function accept(picked: File | undefined) {
    if (!picked) return;
    const problem = await checkAttachment(picked);
    if (problem) {
      onFileError(problem);
      return;
    }
    onChange({ file: picked }, "file");
  }

  return (
    <div className="sp-proof">
      <h2 className="sp-pay-title" data-i18n="checkout_proof_title">
        إثبات تبرعك
      </h2>

      <div className="sp-proof-fields">
        <div className="sp-proof-field">
          <label className="sp-proof-label" htmlFor="proof-amount">
            <span data-i18n="checkout_proof_amount">مبلغ التبرع</span>
          </label>
          <input
            id="proof-amount"
            type="number"
            min={1}
            className={"sp-proof-input" + (errors.amount ? " is-invalid" : "")}
            placeholder="0000"
            aria-invalid={errors.amount ? true : undefined}
            value={amount}
            onChange={(e) => onChange({ amount: e.target.value }, "amount")}
          />
          {errors.amount && (
            <p className="sp-contact-error" data-i18n="checkout_proof_amount_required">
              الرجاء إدخال مبلغ التبرع.
            </p>
          )}
        </div>

        <div className="sp-proof-field">
          <label className="sp-proof-label" htmlFor="proof-currency">
            <span data-i18n="checkout_proof_currency">
              نوع العملة المراد التبرع بيها
            </span>
          </label>
          <div className="sp-proof-select-wrap">
            <select
              id="proof-currency"
              className={
                "sp-proof-select" +
                (currency ? "" : " is-empty") +
                (errors.currency ? " is-invalid" : "")
              }
              aria-invalid={errors.currency ? true : undefined}
              value={currency}
              onChange={(e) => onChange({ currency: e.target.value }, "currency")}
            >
              <option value="" data-i18n="checkout_proof_currency_placeholder">
                اختر عملة التبرع
              </option>
              {CURRENCIES.map((c) => (
                <option key={c.value} value={c.value} data-i18n={c.labelKey}>
                  {c.label}
                </option>
              ))}
            </select>
            <span className="sp-proof-select-arrow" aria-hidden="true">
              <IconChevronDownBold />
            </span>
          </div>
          {errors.currency && (
            <p className="sp-contact-error" data-i18n="checkout_proof_currency_required">
              الرجاء اختيار عملة التبرع.
            </p>
          )}
        </div>
      </div>

      {/* a <label> wrapper makes the whole panel open the picker without an
          onClick handler; the input stays focusable for keyboard users */}
      <label
        className={
          "sp-drop" +
          (dragging ? " is-dragging" : "") +
          (error === "required" ? " is-invalid" : "")
        }
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          accept(e.dataTransfer.files?.[0]);
        }}
      >
        <input
          type="file"
          className="sp-drop-input"
          accept={PROOF_ACCEPT}
          onChange={(e) => {
            accept(e.target.files?.[0]);
            e.target.value = ""; // the same file can be picked again
          }}
        />
        <span className="sp-drop-icon" aria-hidden="true">
          <IconCloudUpload />
        </span>
        <span className="sp-drop-title" data-i18n="checkout_proof_drop_title">
          اسحب و أفلت الصورة هنا
        </span>
        <span className="sp-drop-browse">
          <span data-i18n="checkout_proof_browse_pre">أو</span>{" "}
          <span className="sp-drop-link" data-i18n="checkout_proof_browse_link">
            اضغط للتصفح
          </span>{" "}
          <span data-i18n="checkout_proof_browse_post">من جهازك</span>
        </span>
        <span className="sp-drop-hint" data-i18n="checkout_proof_hint">
          الحد الأقصى لحجم الملف المسموح به هو 5 ميجابايت، وتشمل الصيغ المدعومة
          png, jpg, pdf
        </span>
      </label>

      {error === "type" && (
        <p className="sp-drop-error" data-i18n="checkout_proof_error_type">
          الصيغة غير مدعومة، الرجاء رفع ملف png أو jpg أو pdf.
        </p>
      )}
      {error === "required" && (
        <p className="sp-drop-error" data-i18n="checkout_proof_error_required">
          الرجاء إرفاق صورة إيصال التحويل.
        </p>
      )}
      {error === "size" && (
        <p className="sp-drop-error" data-i18n="checkout_proof_error_size">
          حجم الملف أكبر من 5 ميجابايت.
        </p>
      )}

      {file && (
        <div className="sp-drop-file">
          <span className="sp-drop-file-name">
            {file.name}{" "}
            <span className="sp-drop-file-size">
              ({Math.max(1, Math.round(file.size / 1024))} KB)
            </span>
          </span>
          <button
            type="button"
            className="sp-drop-remove"
            onClick={() => onChange({ file: null }, "file")}
            data-i18n="checkout_proof_remove"
          >
            إزالة
          </button>
        </div>
      )}
    </div>
  );
}
