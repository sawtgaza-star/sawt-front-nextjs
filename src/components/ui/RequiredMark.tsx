import "@/styles/required-mark.css";

/** Red asterisk after a required field's label. It sits beside the label's
    data-i18n span, never inside it — the translator swaps that span's text
    and would wipe the star. Hidden from screen readers: "star" says nothing,
    and the field's own error message is what announces a missing value. */
export default function RequiredMark() {
  return (
    <span className="required-mark" aria-hidden="true">
      *
    </span>
  );
}
