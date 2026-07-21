// @ts-nocheck
"use client";
/* eslint-disable */

type Variant = "primary" | "readMore" | "viewProfile";
const VARIANT_CLASS: Record<Variant, string> = {
  primary: "btn-submit-green",       // auth submit buttons
  readMore: "read-more-btn text-white",
  viewProfile: "btn-view-profile",
};

/* Reusable button. Renders <a> when `href` is provided, otherwise <button>. */
export default function Button({
  variant = "primary",
  href,
  className = "",
  children,
  ...rest
}: {
  variant?: Variant;
  href?: string;
  className?: string;
  children: React.ReactNode;
} & Record<string, any>) {
  const cls = `${VARIANT_CLASS[variant]} ${className}`.trim();
  if (href) return <a href={href} className={cls} {...rest}>{children}</a>;
  return <button className={cls} {...rest}>{children}</button>;
}
