import { IconCircleCheck } from "@/components/ui/icons";

/* What a wizard shows once the application is in: the panel all four flows end
   with. The sentence under the title is the server's own ("تم استلام طلب
   التعاون، سنتواصل معك خلال 3–5 أيام عمل.") — already translated by
   useCollaborateForm, which is why it carries no [data-i18n] key; the built-in
   line below stands in only if a 201 ever arrives without one. */
export default function WizardDone({ message }: { message?: string | null }) {
  return (
    <div className="cl-done">
      <span className="cl-done-icon" aria-hidden="true">
        <IconCircleCheck />
      </span>
      <h3 className="cl-done-title" data-i18n="collab_done_title">
        تم استلام طلبك بنجاح
      </h3>
      {message ? (
        <p className="cl-done-desc">{message}</p>
      ) : (
        <p className="cl-done-desc" data-i18n="collab_done_desc">
          سيتم التواصل معك خلال 3-5 أيام عمل بعد استلام الطلب.
        </p>
      )}
    </div>
  );
}
