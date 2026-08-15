// @ts-nocheck
"use client";
/* eslint-disable */

import { IconEyeAuth, IconEyeSlashAuth } from "@/components/ui/icons";

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
      {/* fa-eye/fa-eye-slash toggled by legacy-login.ts — CSS shows the matching eye state */}
      {toggleId && (
        <i className="fa-eye input-icon-left" id={toggleId} style={{ cursor: "pointer" }}>
          <span className="eye-open"><IconEyeAuth /></span>
          <span className="eye-slash"><IconEyeSlashAuth /></span>
        </i>
      )}
    </div>
  );
}
