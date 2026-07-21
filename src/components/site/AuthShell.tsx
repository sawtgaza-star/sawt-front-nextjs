// @ts-nocheck
"use client";
/* eslint-disable */

/* Shared auth layout: promo side (identical on all 5 auth pages) + form column shell. */
export default function AuthShell({
  children,
  topContent,
}: {
  children: React.ReactNode;
  topContent?: React.ReactNode;
}) {
  return (
    <div className="container-fluid p-0 full-screen-container">
      <div className="row g-0 w-100 h-100">
<div className="col-md-6 right-design-section d-none d-md-block"> <div className="promo-container"> <img src="/assets/images/Promo image.png" alt="احنا صوتكم" className="promo-img main-circle" /> <img src="/assets/images/Promo image (1).png" alt="شعار صوت" className="promo-img logo-circle" /> <img src="/assets/images/Experience banner.png" alt="10 سنوات خبرة" className="promo-img badge-cloud" /> <div className="bottom-text-wrapper count"> <h2 className="promo-title">
                صوت من لا <span className="sawt-lh">صوت له</span> </h2> </div> </div> </div>
        <div className="col-md-6 left-form-section col-12">
          {topContent}
          <div className="form-wrapper postion-relative">
            <img src="/assets/images/leaf_cutout.png" className="olive-branch branch-left-top-content-section" alt="Olive Branch" />
            <img src="/assets/images/leaf_cutout.png" className="olive-branch branch-right-bottom-content-section" alt="Olive Branch" />
            <div className="text-center mobile-logo d-md-none">
              <img src="/assets/images/صوت 1.png" alt="Sawt Logo" />
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
