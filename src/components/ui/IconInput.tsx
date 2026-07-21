// @ts-nocheck
"use client";
/* eslint-disable */

/* Auth form input with a leading icon and optional trailing toggle icon
   (password eye — wired by lib/legacy-login via its id). */
export default function IconInput({
  icon,
  toggleId,
  className = "mb-3",
  ...inputProps
}: {
  icon: React.ReactNode;
  toggleId?: string;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={`input-group-custom ${className}`.trim()}>
      <i className="input-icon-main">{icon}</i>
      <input className="form-control" {...inputProps} />
      {toggleId && (
        <i className="fas fa-eye input-icon-left" id={toggleId} style={{ cursor: "pointer" }}></i>
      )}
    </div>
  );
}
