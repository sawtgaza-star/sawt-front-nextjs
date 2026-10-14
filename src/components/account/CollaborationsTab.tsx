import { useEffect, useRef, useState, type FormEvent } from "react";
import { localized, type Localized } from "@/lib/api/pages";
import type { Collaboration } from "@/lib/api/profile";
import { ApiError } from "@/lib/api/client";
import { apiMessage } from "@/lib/api/messages";
import { handleAuthError } from "@/lib/follows";
import NewsletterToast from "@/components/site/NewsletterToast";
import { IconBriefcase, IconBuilding } from "@/components/ui/icons";
import { useAccountToast } from "./use-account-toast";

/* "ابرز التعاونات": a content creator's past collaborations as editable rows —
   company + field, the same pair the join modal sends — prefilled from
   GET /auth/profile (user.collaborations), with "اضافة تعاون" / a delete per
   row, and "حفظ التغييرات" sending the whole list (it replaces the saved one)
   through POST /auth/profile/collaborations (account-user's
   saveCollaborations). Only offered to a creator
   (AccountContent). Empty rows are dropped; a row with only one of its two
   boxes filled is refused before anything is sent. */

type Row = { id: number; company: string; field: string };
export type CollabRow = { company_name: string; field: string };

/** The join form sends plain strings; a {ar, en} pair is read in the page's language. */
function text(value: Localized | string, lang: string): string {
  return typeof value === "string" ? value.trim() : localized(value, lang);
}

function rowsOf(list: Collaboration[], lang: string): Row[] {
  const rows = list.map((item, i) => ({
    id: i,
    company: text(item.companyName, lang),
    field: text(item.field, lang),
  }));
  // nothing saved yet: one empty row to start typing in
  return rows.length ? rows : [{ id: 0, company: "", field: "" }];
}

function errorsOf(error: unknown): string[] {
  if (error instanceof ApiError) {
    const fields = Object.values(error.errors).flat();
    const list = fields.length ? fields : [error.message];
    return list.map((m) => apiMessage(m) || m);
  }
  return [apiMessage("حدث خطأ غير متوقع. حاول مرة أخرى.") || ""];
}

export default function CollaborationsTab({
  collaborations,
  lang,
  tr,
  onSave,
}: {
  collaborations: Collaboration[];
  lang: string;
  tr: (key: string) => string;
  /** Resolves to the API's confirmation ("" if it sent none). */
  onSave: (rows: CollabRow[]) => Promise<string>;
}) {
  const [rows, setRows] = useState<Row[]>(() => rowsOf(collaborations, lang));
  const [saving, setSaving] = useState(false);
  const toast = useAccountToast();
  // row ids only have to be unique within this list
  const nextId = useRef(rows.length);

  // the stored list changed (first fetch, a save, another tab) — start over from it
  useEffect(() => {
    const fresh = rowsOf(collaborations, lang);
    setRows(fresh);
    nextId.current = fresh.length;
  }, [collaborations, lang]);

  function change(id: number, patch: Partial<Row>) {
    setRows((list) => list.map((row) => (row.id === id ? { ...row, ...patch } : row)));
  }

  function add() {
    setRows((list) => [...list, { id: nextId.current++, company: "", field: "" }]);
  }

  // the last row left is emptied rather than removed, like the join modal
  function remove(id: number) {
    setRows((list) =>
      list.length > 1
        ? list.filter((row) => row.id !== id)
        : list.map((row) => ({ ...row, company: "", field: "" })),
    );
  }

  function reset() {
    setRows(rowsOf(collaborations, lang));
    toast.close();
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (saving) return;
    const trimmed = rows.map((row) => ({ company: row.company.trim(), field: row.field.trim() }));
    if (trimmed.some((row) => !row.company !== !row.field)) {
      toast.error([tr("jm_err_collab")]);
      return;
    }
    const list = trimmed
      .filter((row) => row.company && row.field)
      .map((row) => ({ company_name: row.company, field: row.field }));
    setSaving(true);
    toast.close();
    try {
      const message = await onSave(list);
      toast.success((message && apiMessage(message)) || message || tr("acc_saved"));
    } catch (error) {
      if (!handleAuthError(error)) toast.error(errorsOf(error));
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="acc-panel">
      <h1 className="acc-title">{tr("acc_collabs_title")}</h1>
      <p className="acc-desc">{tr("acc_collabs_desc")}</p>

      <form className="acc-card" onSubmit={submit} noValidate>
        <div className="acc-collab-rows">
          {rows.map((row) => (
            <div className="acc-collab-row" key={row.id}>
              <label className="acc-collab-input">
                <span className="acc-collab-input-icon" aria-hidden="true">
                  <IconBuilding />
                </span>
                <input
                  className="acc-input"
                  value={row.company}
                  onChange={(e) => change(row.id, { company: e.target.value })}
                  placeholder={tr("jm_collab_company_ph")}
                  aria-label={tr("jm_collab_company_ph")}
                />
              </label>
              <label className="acc-collab-input">
                <span className="acc-collab-input-icon" aria-hidden="true">
                  <IconBriefcase />
                </span>
                <input
                  className="acc-input"
                  value={row.field}
                  onChange={(e) => change(row.id, { field: e.target.value })}
                  placeholder={tr("jm_collab_field_ph")}
                  aria-label={tr("jm_collab_field_ph")}
                />
              </label>
              <button
                type="button"
                className="acc-collab-del"
                onClick={() => remove(row.id)}
                aria-label={tr("acc_collabs_delete")}
              >
                <i className="fa-regular fa-trash-can" aria-hidden="true"></i>
              </button>
            </div>
          ))}
        </div>

        <button type="button" className="acc-collab-add" onClick={add}>
          <span>{tr("jm_add_collab")}</span>
          <i className="fa-solid fa-plus" aria-hidden="true"></i>
        </button>

        {toast.notice ? <NewsletterToast notice={toast.notice} onClose={toast.close} /> : null}

        <div className="acc-actions">
          <button type="submit" className="acc-btn-primary" disabled={saving} aria-busy={saving}>
            {tr("acc_save")}
          </button>
          <button type="button" className="acc-btn-text" onClick={reset} disabled={saving}>
            {tr("acc_cancel")}
          </button>
        </div>
      </form>
    </section>
  );
}
