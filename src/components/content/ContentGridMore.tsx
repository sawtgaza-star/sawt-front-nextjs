/* "عرض المزيد" under the grid's preview rows. */
export default function ContentGridMore({ onMore }: { onMore: () => void }) {
  return (
    <div className="ct-grid-more-wrap">
      <button type="button" className="ct-grid-more" onClick={onMore}>
        <span data-i18n="view_more">عرض المزيد</span>
        <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
      </button>
    </div>
  );
}
