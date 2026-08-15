"use client";
import { useState } from "react";
import { IconChevronDownBold, IconCloudUpload } from "@/components/ui/icons";
import {
  CURRENCIES,
  PROOF_ACCEPT,
  PROOF_MAX_BYTES,
  PROOF_TYPES,
} from "./currencies-data";

/* "إثبات تبرعك" — amount + currency + the receipt drop zone. Client leaf: it
   owns the field values and the drag-and-drop state. Nothing is submitted yet
   (same as the other forms on the site). */
export default function DonationProof() {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  /* Both the file input and a drop share this: reject anything outside the
     rules printed under the zone, otherwise keep the file. */
  function accept(picked: File | undefined) {
    if (!picked) return;
    if (!PROOF_TYPES.includes(picked.type)) {
      setFile(null);
      setError("type");
      return;
    }
    if (picked.size > PROOF_MAX_BYTES) {
      setFile(null);
      setError("size");
      return;
    }
    setError(null);
    setFile(picked);
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
            className="sp-proof-input"
            placeholder="0000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
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
              className={"sp-proof-select" + (currency ? "" : " is-empty")}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
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
        </div>
      </div>

      {/* a <label> wrapper makes the whole panel open the picker without an
          onClick handler; the input stays focusable for keyboard users */}
      <label
        className={"sp-drop" + (dragging ? " is-dragging" : "")}
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
          onChange={(e) => accept(e.target.files?.[0])}
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
            onClick={() => setFile(null)}
            data-i18n="checkout_proof_remove"
          >
            إزالة
          </button>
        </div>
      )}
    </div>
  );
}
