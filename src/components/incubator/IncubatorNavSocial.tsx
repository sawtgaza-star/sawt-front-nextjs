/* The incubator navbar's "وسائل التواصل الاجتماعي" label + the five brand
   marks. Rendered twice: on ≥lg by the bar's top utility row (hidden on
   phones) and, at the bottom of the collapsed phone menu, by the drawer's
   `.inc-nav-mobile-social` row. Markup is identical in both places — the row
   styling lives in incubator.css. */
export default function IncubatorNavSocial() {
  return (
    <div className="inc-nav-social">
      <span className="inc-nav-social-label" data-i18n="follow_us">
        وسائل التواصل الاجتماعي :
      </span>
      <a href="#" aria-label="LinkedIn">
        <i className="fab fa-linkedin-in"></i>
      </a>
      <a href="#" aria-label="Facebook">
        <i className="fab fa-facebook-f"></i>
      </a>
      <a href="#" aria-label="Telegram">
        <i className="fa-solid fa-paper-plane"></i>
      </a>
      <a href="#" aria-label="X">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.1em"
          height="1.1em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M19.57 4.488a.75.75 0 0 0-1.14-.976l-5.368 6.274l-5.224-5.938a1.8 1.8 0 0 0-1.357-.598H5.007c-.68 0-1.264.352-1.56.885a1.55 1.55 0 0 0 .204 1.795l6.286 7.147l-5.507 6.435a.75.75 0 1 0 1.14.976l5.368-6.274l5.224 5.938c.345.392.85.598 1.357.598h1.474c.681 0 1.264-.352 1.56-.885a1.55 1.55 0 0 0-.203-1.795l-6.287-7.146z"
          ></path>
        </svg>
      </a>
      <a href="#" aria-label="Instagram">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.1em"
          height="1.1em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M9.367 2.25c-1.092 0-1.958 0-2.655.057c-.714.058-1.317.18-1.868.46a4.75 4.75 0 0 0-2.076 2.077c-.281.55-.403 1.154-.461 1.868c-.057.697-.057 1.563-.057 2.655v5.266c0 1.092 0 1.958.057 2.655c.058.714.18 1.317.46 1.869a4.75 4.75 0 0 0 2.077 2.075c.55.281 1.154.403 1.868.461c.697.057 1.563.057 2.655.057h5.266c1.092 0 1.958 0 2.655-.057c.714-.058 1.317-.18 1.869-.46a4.75 4.75 0 0 0 2.075-2.076c.281-.552.403-1.155.461-1.869c.057-.697.057-1.563.057-2.655V9.367c0-1.092 0-1.958-.057-2.655c-.058-.714-.18-1.317-.46-1.868a4.75 4.75 0 0 0-2.076-2.076c-.552-.281-1.155-.403-1.869-.461c-.697-.057-1.563-.057-2.655-.057zM16.25 6.5a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 0 1.5H17a.75.75 0 0 1-.75-.75m-6.207 1.728a4.25 4.25 0 1 1 3.914 7.544a4.25 4.25 0 0 1-3.914-7.544"
          ></path>
        </svg>
      </a>
    </div>
  );
}
