"use client";

/* What the reel column shows when it has nothing to play.

   Two cases, told apart by the API's `reels_status`:
   - "ok" (or no status) with an empty list → nothing published yet: a calm
     "no reels" note.
   - anything else ("api_error", "token_expired", …) or no payload at all →
     the Instagram feed failed: an error note with a retry.

   `reels_message` is NOT shown to visitors: it is the raw Graph API error
   ("Unsupported get request. Object with ID … does not exist …"), written
   for whoever maintains the integration. It goes to the console instead. */
export default function ReelsEmpty({ error }: { error: boolean }) {
  return (
    <div className={"reels-empty" + (error ? " is-error" : "")} role="status">
      <span className="reels-empty-icon" aria-hidden="true">
        {error ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M12 8v5m0 3.5h.01M10.24 3.96L2.4 17.5A2 2 0 0 0 4.13 20.5h15.74a2 2 0 0 0 1.73-3L13.76 3.96a2 2 0 0 0-3.52 0"></path>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6">
              <rect width="18" height="18" x="3" y="3" rx="5"></rect>
              <path d="M10 9.2v5.6l4.6-2.8z"></path>
            </g>
          </svg>
        )}
      </span>

      {error ? (
        <>
          <h3 className="reels-empty-title" data-i18n="reels_error_title">
            تعذّر تحميل المقاطع
          </h3>
          <p className="reels-empty-text" data-i18n="reels_error_text">
            حدث خلل مؤقت أثناء جلب المقاطع، حاول مرة أخرى بعد قليل.
          </p>
          <button
            type="button"
            className="reels-empty-retry"
            onClick={() => window.location.reload()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 11a8 8 0 1 0-2.34 5.66M20 4v7h-7"></path>
            </svg>
            <span data-i18n="reels_retry">إعادة المحاولة</span>
          </button>
        </>
      ) : (
        <>
          <h3 className="reels-empty-title" data-i18n="reels_empty_title">
            لا توجد مقاطع حالياً
          </h3>
          <p className="reels-empty-text" data-i18n="reels_empty_text">
            ترقّبوا أحدث أعمالنا هنا قريباً.
          </p>
        </>
      )}
    </div>
  );
}
