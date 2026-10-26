/* "عرض المزيد" under the grid's preview rows, with how many reels are still
   hidden. */
export default function ContentGridMore({
  hidden,
  onMore,
}: {
  hidden: number;
  onMore: () => void;
}) {
  return (
    <div className="ct-grid-more-wrap">
      <button type="button" className="ct-grid-more" onClick={onMore}>
        <span data-i18n="view_more">عرض المزيد</span>
        <span className="ct-grid-more-count">+{hidden}</span>
        <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
      </button>
    </div>
  );
}
