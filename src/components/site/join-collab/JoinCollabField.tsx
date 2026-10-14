/* "تعاونات سابقة" — step 2 of the join modal: one row per past collaboration
   (company + field), a delete button per row and "اضافة تعاون" to add another,
   the same shape as step 3's social links. Sent as `collaborations`.

   Plain markup on purpose: like the social rows, the rows are cloned, cleared,
   collected and reset by lib/legacy-home (bindCollabRows), so the classes and
   the `#joinCollabList` / `#joinAddCollab` ids below are what it queries.
   They deliberately avoid the .join-social-row / .join-link-wrap names — the
   socials code queries those across the whole modal. */

import "@/styles/join-collab.css";
import { IconBriefcase, IconBuilding } from "@/components/ui/icons";

function IconTrash() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24">
      <path d="M0 0h24v24H0z" fill="none"></path>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
        d="m19.5 5.5l-.62 10.025c-.158 2.561-.237 3.842-.88 4.763a4 4 0 0 1-1.2 1.128c-.957.584-2.24.584-4.806.584c-2.57 0-3.855 0-4.814-.585a4 4 0 0 1-1.2-1.13c-.642-.922-.72-2.205-.874-4.77L4.5 5.5M9 11.735h6m-4.5 3.919h3M3 5.5h18m-4.945 0l-.682-1.408c-.454-.936-.68-1.403-1.071-1.695a2 2 0 0 0-.275-.172C13.594 2 13.074 2 12.034 2c-1.065 0-1.598 0-2.039.234a2 2 0 0 0-.278.18c-.396.303-.617.788-1.059 1.757L8.053 5.5"
      ></path>
    </svg>
  );
}

export default function JoinCollabField() {
  return (
    <div className="join-field">
      <label className="join-label" data-i18n="jm_collabs">
        تعاونات سابقة (اختياري)
      </label>
      <div className="join-collab-list" id="joinCollabList">
        <div className="join-collab-row">
          <div className="join-input-wrap join-collab-wrap">
            <i className="join-input-icon join-collab-icon">
              <IconBuilding />
            </i>
            <input
              type="text"
              className="join-input"
              data-collab="company_name"
              placeholder="اسم الشركة أو الجهة"
              data-i18n-placeholder="jm_collab_company_ph"
            />
          </div>
          <div className="join-input-wrap join-collab-wrap">
            <i className="join-input-icon join-collab-icon">
              <IconBriefcase />
            </i>
            <input
              type="text"
              className="join-input"
              data-collab="field"
              placeholder="مجال التعاون"
              data-i18n-placeholder="jm_collab_field_ph"
            />
          </div>
          <button type="button" className="join-row-del" aria-label="حذف">
            <IconTrash />
          </button>
        </div>
      </div>
      <button type="button" className="join-add-platform" id="joinAddCollab">
        <span data-i18n="jm_add_collab">اضافة تعاون</span>
        <i className="fa-solid fa-plus"></i>
      </button>
    </div>
  );
}
