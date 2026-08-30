import "@/styles/legacy/password.css";

/* Signed-in visitors have no business on login / register / password-reset:
   they have to use the nav's logout button first. `output: 'export'` rules out
   middleware, so the bounce is an inline pre-paint script — the same idiom the
   root layout uses for `.sawt-authed`, and it reads the very same key.

   It sits above {children} in document order, so the browser runs it while the
   form markup is still being parsed: the redirect happens instead of the first
   paint, not after a flash of the login card. `replace`, not `href`, keeps the
   auth page out of history so Back doesn't bounce the visitor a second time.

   The `pageshow` binding covers the one path the initial run misses: signing in
   sends the visitor to `/`, and pressing Back can restore this page from the
   bfcache without ever re-executing scripts. */
const GUARD = `try{var g=function(){if(localStorage.getItem("sawt_auth")==="1"){location.replace("/")}};g();addEventListener("pageshow",g)}catch(e){}`;

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: GUARD }} />
      {children}
    </>
  );
}
