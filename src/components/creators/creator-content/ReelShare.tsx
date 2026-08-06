"use client";
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/use-lang";
import { useSheetDismiss } from "./useSheetDismiss";
import { IconClose, IconX } from "./reel-icons";

type ShareTarget = {
  key: string;
  cls: string;
  href: (url: string) => string;
  /* Font Awesome class, or an inline glyph where FA 6.2.1 has none */
  icon?: string;
  Icon?: (props: { className?: string }) => React.JSX.Element;
};

/* the networks the sheet offers — each takes the reel's link as a query param */
const TARGETS: ShareTarget[] = [
  {
    key: "reel_share_whatsapp",
    icon: "fa-brands fa-whatsapp",
    cls: "is-whatsapp",
    href: (url: string) => `https://wa.me/?text=${encodeURIComponent(url)}`,
  },
  {
    key: "reel_share_facebook",
    icon: "fa-brands fa-facebook-f",
    cls: "is-facebook",
    href: (url: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    key: "reel_share_x",
    Icon: IconX,
    cls: "is-x",
    href: (url: string) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
  },
  {
    key: "reel_share_telegram",
    icon: "fa-brands fa-telegram",
    cls: "is-telegram",
    href: (url: string) =>
      `https://t.me/share/url?url=${encodeURIComponent(url)}`,
  },
];

/* Share sheet for one reel: the OS share dialog where the browser offers one,
   the four networks, and a copy-link row. The link is the page the reel is on
   plus its id — there are no per-reel routes yet, so nothing reads the id back,
   but the shared URL is at least specific to the video. */
export default function ReelShare({
  reelId,
  onClose,
}: {
  reelId: string | number;
  onClose: () => void;
}) {
  const { tr } = useLang();
  const { sheetRef, dismissHandlers } = useSheetDismiss(onClose);
  const [url, setUrl] = useState("");
  const [canNativeShare, setCanNativeShare] = useState(false);
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<number | null>(null);

  useEffect(() => {
    const { origin, pathname } = window.location;
    setUrl(`${origin}${pathname}?reel=${reelId}`);
    setCanNativeShare(typeof navigator.share === "function");
  }, [reelId]);

  useEffect(
    () => () => {
      if (copyTimer.current) window.clearTimeout(copyTimer.current);
    },
    [],
  );

  const flagCopied = () => {
    setCopied(true);
    if (copyTimer.current) window.clearTimeout(copyTimer.current);
    copyTimer.current = window.setTimeout(() => setCopied(false), 2000);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      flagCopied();
    } catch {
      // clipboard API is unavailable (or blocked on an insecure origin) —
      // fall back to selecting the field the sheet already shows
      const input = document.getElementById(
        "cr-reel-share-url",
      ) as HTMLInputElement | null;
      input?.select();
      if (document.execCommand("copy")) flagCopied();
    }
  };

  const nativeShare = () => {
    navigator.share({ url }).catch(() => {});
  };

  return (
    <div
      className="cr-reel-panel cr-reel-share"
      ref={sheetRef}
      onClick={(e) => e.stopPropagation()}
      {...dismissHandlers}
    >
      <span className="cr-reel-panel-grip" aria-hidden="true" />
      <div className="cr-reel-panel-head">
        <span className="cr-reel-panel-title">{tr("reel_share_title")}</span>
        <button
          type="button"
          className="cr-reel-panel-close"
          onClick={onClose}
          aria-label={tr("reel_close")}
        >
          <IconClose />
        </button>
      </div>

      <div className="cr-reel-share-targets">
        {TARGETS.map((target) => (
          <a
            key={target.key}
            className={"cr-reel-share-target " + target.cls}
            href={target.href(url)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="cr-reel-share-icon">
              {target.Icon ? <target.Icon /> : <i className={target.icon} />}
            </span>
            <span className="cr-reel-share-label">{tr(target.key)}</span>
          </a>
        ))}
        {canNativeShare && (
          <button
            type="button"
            className="cr-reel-share-target is-native"
            onClick={nativeShare}
          >
            <span className="cr-reel-share-icon">
              <i className="fa-solid fa-ellipsis" />
            </span>
            <span className="cr-reel-share-label">{tr("reel_share_native")}</span>
          </button>
        )}
      </div>

      <div className="cr-reel-share-copy">
        <input id="cr-reel-share-url" type="text" value={url} readOnly />
        <button type="button" onClick={copy}>
          <i className={copied ? "fa-solid fa-check" : "fa-solid fa-link"} />
          <span>{tr(copied ? "reel_share_copied" : "reel_share_copy")}</span>
        </button>
      </div>
    </div>
  );
}
