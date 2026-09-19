/* What the API rejected an application with, above the wizard's own footer.

   Every message at once, not just the first: a 422 flags every box it found
   wrong, and those boxes are spread over steps the visitor has already left —
   the wizard moves back to the earliest of them, and this says what the rest
   of them are. Plain text rather than [data-i18n] markup: useCollaborateForm
   re-translates these on the language button, after the DOM translator's
   walk. */
export default function WizardAlert({ messages }: { messages: string[] }) {
  if (!messages.length) return null;

  return (
    <div className="cl-alert" role="alert">
      {messages.map((message, index) => (
        <p key={index}>{message}</p>
      ))}
    </div>
  );
}
