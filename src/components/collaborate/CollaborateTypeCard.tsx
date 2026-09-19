import {
  IconCreator,
  IconFunding,
  IconOther,
  IconPartnership,
} from "./collaborate-icons";
import type { CollaborateType } from "./collaborate-types-data";

const COLLAB_ICON = {
  creator: IconCreator,
  funding: IconFunding,
  partnership: IconPartnership,
  other: IconOther,
};

/* One option of "اختر نوع التعاون". Presentational — the pick lives in
   CollaborateTypes, and the copy comes resolved from collaborate-types-data:
   the API's own, which carries no `data-i18n` key because it arrives in both
   languages, or the built-in four behind it, which do. The card is a <label>, so the whole panel is the radio's
   hit area; the native input stays in the DOM for keyboard + a11y and is
   visually replaced by .cl-type-dot, which CSS fills on :checked. */
export default function CollaborateTypeCard({
  type,
  checked,
  onSelect,
}: {
  type: CollaborateType;
  checked: boolean;
  onSelect: () => void;
}) {
  const Icon = COLLAB_ICON[type.icon];

  return (
    <label className={"cl-type" + (checked ? " is-selected" : "")}>
      <input
        type="radio"
        name="collaborate-type"
        className="cl-type-input"
        value={type.value}
        checked={checked}
        onChange={onSelect}
      />
      <span className="cl-type-head">
        {/* the design's glyph unless an editor uploaded one for this type */}
        <span className="cl-type-icon" aria-hidden="true">
          {type.iconUrl ? <img src={type.iconUrl} alt="" /> : <Icon />}
        </span>
        <span className="cl-type-dot" aria-hidden="true"></span>
      </span>

      <h3 className="cl-type-title" data-i18n={type.titleKey}>
        {type.title}
      </h3>
      <p className="cl-type-desc" data-i18n={type.descKey}>
        {type.desc}
      </p>
    </label>
  );
}
