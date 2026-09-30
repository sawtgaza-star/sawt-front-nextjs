"use client";
import { useState } from "react";
import { IconCloudUpload } from "@/components/ui/icons";
import { checkAttachment } from "@/lib/attachment";
import DonationAmountFields from "./DonationAmountFields";
import { PROOF_ACCEPT } from "./currencies-data";
import type { ProofErrors, ProofValues } from "./checkout-flow";

/* "إثبات تبرعك" — amount + currency + the receipt drop zone. The values and
   errors live in the wizard (they are what POST /support/requests/{uuid}/proof
   sends), so they survive going back; this leaf only owns the drag state.
   `withAmount: false` — the electronic flow asks for the amount + currency on
   screen 1 instead, so this screen is just the receipt. */
export default function DonationProof({
  proof,
  onChange,
  onFileError,
  errors,
  withAmount = true,
}: {
  proof: ProofValues;
  /** `clear` names the error the edit makes stale */
  onChange: (patch: Partial<ProofValues>, clear: keyof ProofErrors) => void;
  /** a picked file broke the rules — the wizard drops it and shows why */
  onFileError: (reason: "type" | "size") => void;
  errors: ProofErrors;
  withAmount?: boolean;
}) {
  const { file } = proof;
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

      {withAmount && (
        <DonationAmountFields proof={proof} onChange={onChange} errors={errors} />
      )}

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
