"use client";
import { useEffect, useState } from "react";
import {
  IconLinkStroke,
  IconTelegramCircle,
  IconLinkedInSolid,
} from "@/components/ui/icons";

/* "شارك علي" — peach share card under the registration card. The page URL is
   read on mount (client-only), so the share targets always point at the
   current course page. */
export default function CourseShare() {
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const enc = encodeURIComponent(url);

  const copyLink = () => {
    if (url) navigator.clipboard?.writeText(url);
  };

  return (
    <div className="crs-share">
      <h3 className="crs-share-title" data-i18n="crs_share_title">
        شارك علي
      </h3>
      <p className="crs-share-desc" data-i18n="crs_share_desc">
        ادع أصدقاءك للأشتراك في الكورس .
      </p>

      <div className="crs-share-actions">
        <button
          type="button"
          className="crs-share-btn crs-share-copy"
          onClick={copyLink}
          aria-label="نسخ الرابط"
        >
          <IconLinkStroke />
        </button>
        <a
          className="crs-share-btn crs-share-facebook"
          href={`https://www.facebook.com/sharer/sharer.php?u=${enc}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
        >
          <i className="fab fa-facebook"></i>
        </a>
        <a
          className="crs-share-btn crs-share-telegram"
          href={`https://t.me/share/url?url=${enc}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Telegram"
        >
          <IconTelegramCircle />
        </a>
        <a
          className="crs-share-btn crs-share-whatsapp"
          href={`https://wa.me/?text=${enc}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
        >
          <i className="fab fa-whatsapp"></i>
        </a>
        <a
          className="crs-share-btn crs-share-linkedin"
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${enc}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <IconLinkedInSolid />
        </a>
      </div>
    </div>
  );
}
