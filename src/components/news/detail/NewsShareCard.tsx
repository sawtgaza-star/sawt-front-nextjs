"use client";
import { useEffect, useState } from "react";
import {
  IconTrainerFacebook,
  IconTrainerTwitter,
  IconTrainerLinkedIn,
  IconTrainerInstagram,
  IconCopy,
} from "@/components/ui/icons";
import { IconHeartFilled, IconBubbleTail } from "./news-icons";

/* The aside of the news detail page: the olive "شارك الخبر" bubble (its tail
   points at the article beside it) and the dark "ادعم صوت" card under it.

   The page URL is read on mount, client-only, so the share targets always
   point at the article being read — same approach as CourseShare. Instagram
   has no web share endpoint, so that one opens the profile, as elsewhere on
   the site. */
export default function NewsShareCard() {
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const enc = encodeURIComponent(url);

  const copyLink = () => {
    if (url) navigator.clipboard?.writeText(url);
  };

  return (
    <>
      <div className="nws-share">
        <span className="nws-share-tail" aria-hidden="true">
          <IconBubbleTail />
        </span>
        <h2 className="nws-share-title" data-i18n="nws_share_title">
          شارك الخبر
        </h2>
        <div className="nws-share-actions">
          <a
            className="nws-share-btn"
            href={`https://www.facebook.com/sharer/sharer.php?u=${enc}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <IconTrainerFacebook />
          </a>
          <a
            className="nws-share-btn"
            href={`https://twitter.com/intent/tweet?url=${enc}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <IconTrainerTwitter />
          </a>
          <a
            className="nws-share-btn"
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${enc}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <IconTrainerLinkedIn />
          </a>
          <a
            className="nws-share-btn"
            href="https://www.instagram.com/sawtgaza"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <IconTrainerInstagram />
          </a>
          <button
            type="button"
            className="nws-share-btn nws-share-copy"
            onClick={copyLink}
            aria-label="نسخ الرابط"
            title="نسخ الرابط"
            data-i18n-title="nws_share_copy"
          >
            <IconCopy />
          </button>
        </div>
      </div>

      <a className="nws-support" href="/support">
        <span className="nws-support-head">
          <IconHeartFilled />
          <span data-i18n="nws_support_title">ادعم صوت</span>
        </span>
        <span className="nws-support-desc" data-i18n="nws_support_desc">
          تبرعك يساعد صانعي المحتوى في غزة على مواصلة إيصال قصصهم للعالم.
        </span>
      </a>
    </>
  );
}
