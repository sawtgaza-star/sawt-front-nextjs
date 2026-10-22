import type { ElementType, HTMLAttributes } from "react";

type RichTextProps = HTMLAttributes<HTMLElement> & {
  /** inline-safe HTML from `localizedHtml` / `richInline` */
  html: string;
  /** the element the design already uses for this text (default <span>) */
  as?: ElementType;
};

/* A CMS prose field rendered with its formatting (bold, line breaks, links)
   inside the design's own element and className. The HTML has already been
   reduced to inline tags by lib/rich-text, so it is valid inside a <p> or a
   heading as well as a <div>. */
export default function RichText({ html, as: Tag = "span", ...rest }: RichTextProps) {
  return <Tag {...rest} dangerouslySetInnerHTML={{ __html: html }} />;
}
