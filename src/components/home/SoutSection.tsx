// @ts-nocheck
/* eslint-disable */
import Link from "next/link";
import { localized } from "@/lib/api/pages";
import type { HomeWhoWeAre } from "@/lib/api/home";
import { bySortOrder } from "./home-text";

/* The API's `who_we_are` block. The section keeps its two layouts — a mobile
   one (image first, 2x2 feature grid) and the desktop row — but they now draw
   on the same fields, where the legacy markup carried a separate, shorter set
   of strings for the phone. One block in the payload, one set of words.

   Feature icons are uploads (`icon_url`) rather than the bundled SVGs, so a
   feature shows an icon only once an editor uploads one — as on /about. They
   are sized in `em` so the tile's own font-size still decides how big they
   draw: 1.5rem on desktop, 1.1rem inside `.sout-mobile-features`. */

function FeatureIcon({ url }: { url?: string | null }) {
  if (!url) return null;
  return (
    <img
      src={url}
      alt=""
      style={{ width: "1.2em", height: "1.2em", objectFit: "contain" }}
    />
  );
}

export default function SoutSection({
  data,
  lang = "ar",
}: {
  data?: HomeWhoWeAre;
  lang?: string;
}) {
  const sectionTitle = localized(data?.section_title, lang);
  const sectionSubtitle = localized(data?.section_subtitle, lang);
  const lead = localized(data?.lead, lang);
  const title = localized(data?.title, lang);
  const description = localized(data?.description, lang);
  const cta = localized(data?.cta?.label, lang);
  const image = data?.image_url;
  const features = bySortOrder(data?.features).map((feature) => ({
    title: localized(feature.title, lang),
    iconUrl: feature.icon_url,
  }));

  if (!sectionTitle && !title && !description && !features.length) return null;

  return (
    <>
      <section className="sout-section py-5">
        {" "}
        <div className="container">
          {" "}
          <div className="text-center" style={{ marginBottom: "70px" }}>
            {" "}
            {sectionTitle ? (
              <h1 className="fw-bold who-us font-42">{sectionTitle}</h1>
            ) : null}{" "}
            {sectionSubtitle ? (
              <p
                className="mt-2 font-24 d-none d-md-block"
                style={{ color: "rgba(72, 72, 72, 1)" }}
              >
                {sectionSubtitle}
              </p>
            ) : null}{" "}
            {lead || sectionSubtitle ? (
              <p
                className="mt-2 sout-mobile-lead d-md-none"
                style={{ color: "rgba(72, 72, 72, 1)" }}
              >
                {lead || sectionSubtitle}
              </p>
            ) : null}{" "}
          </div>{" "}
          {/*  نسخة الجوال: الصورة أولاً ثم النص وشبكة مزايا 2×2  */}{" "}
          <div className="sout-mobile d-md-none">
            {" "}
            {image ? <img className="image-swat" src={image} alt="" /> : null}{" "}
            {title ? (
              <h3 className="sout-mobile-title fw-bold text-center">{title}</h3>
            ) : null}{" "}
            {description ? (
              <p className="sout-mobile-desc text-center">{description}</p>
            ) : null}{" "}
            <div className="row sout-mobile-features">
              {" "}
              {features.map((feature, index) => (
                <div
                  className="col-6 feature-item d-flex align-items-center"
                  key={index}
                >
                  {" "}
                  <div className="icon-box">
                    {" "}
                    <i>
                      <FeatureIcon url={feature.iconUrl} />
                    </i>{" "}
                  </div>{" "}
                  <span className="ms-2 text-bold fw-bold">{feature.title}</span>{" "}
                </div>
              ))}{" "}
            </div>{" "}
            {cta ? (
              <Link
                href="/about"
                className="btn btn-dark-green rounded-pill w-100 text-bold fw-bold sout-mobile-btn"
              >
                {" "}
                <span>{cta}</span>{" "}
                <i className="fa-solid fa-angle-left me-2 font-14 text-bold arrow"></i>{" "}
              </Link>
            ) : null}{" "}
          </div>{" "}
          <div className="row d-none d-md-flex">
            {" "}
            <div className="col-lg-6 mt-2 order-lg-2">
              {" "}
              {image ? (
                <img className="image-swat" src={image} alt="" />
              ) : null}{" "}
            </div>{" "}
            <div
              className="col-lg-6 position-relative mt-5 order-lg-1"
              style={{ textAlign: "start" }}
            >
              {" "}
              {title ? (
                <h3 className="main-title text-bold fw-bold">{title}</h3>
              ) : null}{" "}
              {description ? (
                <p
                  className="description text-secondary font-18 lh-lg"
                  style={{ color: "rgba(90, 90, 90, 1) !important" }}
                >
                  {description}
                </p>
              ) : null}{" "}
              <div className="features-grid row gap-2 my-4">
                {" "}
                {/* The legacy grid alternates col-6 / col down the pairs —
                    kept so the two columns keep their widths. */}{" "}
                {features.map((feature, index) => (
                  <div
                    className={
                      (index % 2 === 0 ? "col-6" : "col") +
                      " feature-item d-flex align-items-center"
                    }
                    key={index}
                  >
                    {" "}
                    <div className="icon-box">
                      {" "}
                      <i>
                        <FeatureIcon url={feature.iconUrl} />
                      </i>{" "}
                    </div>{" "}
                    <span className="me-md-1 ms-2 text-bold font-18 fw-bold">
                      {feature.title}
                    </span>{" "}
                  </div>
                ))}{" "}
              </div>{" "}
              {cta ? (
                <Link
                  href="/about"
                  className="btn btn-dark-green rounded-pill px-4 py-2 font-16 text-bold fw-bold"
                  style={{ borderRadius: "18px !important" }}
                >
                  {" "}
                  <span className="">{cta}</span>{" "}
                  <i className="fa-solid fa-angle-left me-2 font-14 text-bold arrow"></i>{" "}
                </Link>
              ) : null}{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </section>
    </>
  );
}
