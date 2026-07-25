// @ts-nocheck
/* eslint-disable */
import NavTopBar from "./NavTopBar";
import NavLinks from "./NavLinks";
import MobileSearchPanel from "./MobileSearchPanel";

/* Shared top bar + navbar + mobile search (canonical version, unified across pages). */
export default function SiteNav() {
  return (
    <>
      <NavTopBar />
      <nav className="navbar navbar-expand-lg py-1">
        {" "}
        <div className="container bg-white py-1">
          {" "}
          <button
            className="btn mobile-nav-search d-lg-none p-0"
            type="button"
            aria-label="بحث"
          >
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.5em"
              height="1.5em"
              viewBox="0 0 24 24"
            >
              {" "}
              <path d="M0 0h24v24H0z" fill="none"></path>{" "}
              <path
                fill="none"
                stroke="rgba(76, 92, 55, 1)"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="m17 17l4 4m-2-10a8 8 0 1 0-16 0a8 8 0 0 0 16 0"
              ></path>{" "}
            </svg>{" "}
          </button>{" "}
          <a
            className="navbar-brand"
            href="#"
            style={{ marginRight: "0 !important" }}
          >
            {" "}
            <img
              src="/assets/images/صوت 1.png"
              alt="Sawt Logo"
              height="60"
            />{" "}
          </a>{" "}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNav"
          >
            {" "}
            <span className="navbar-toggler-icon d-none d-lg-inline-block"></span>{" "}
            <svg
              className="navbar-toggler-svg d-lg-none"
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              {" "}
              <path d="M0 0h24v24H0z" fill="none"></path>{" "}
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M10 5h10M4 12h16M4 19h10"
              ></path>{" "}
            </svg>{" "}
          </button>{" "}
          <div
            className="collapse navbar-collapse flex-column flex-lg-row align-items-start align-items-lg-center"
            id="mainNav"
          >
            {" "}
            <NavLinks />{" "}
            <div className="d-flex gap-2 nav-search-div">
              {" "}
              <div className="position-relative nav-search-div">
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  className="fa fa-search position-absolute top-50 end-0 translate-middle-y me-3"
                >
                  {" "}
                  <path d="M0 0h24v24H0z" fill="none"></path>{" "}
                  <path
                    fill="none"
                    stroke="rgba(145, 145, 145, 1)"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="m17 17l4 4m-2-10a8 8 0 1 0-16 0a8 8 0 0 0 16 0"
                  ></path>{" "}
                </svg>{" "}
                <input
                  type="text"
                  className="form-control custom-placeholder py-2 search-input"
                  placeholder="ابحث هنا..."
                  data-i18n-placeholder="search_placeholder"
                />{" "}
              </div>{" "}
            </div>{" "}
            <div className="contact-info-nav small d-flex">
              {" "}
              <div className="register-btn">
                {" "}
                <a href="/register" data-i18n="register_account">
                  أنشئ حساب
                </a>{" "}
              </div>{" "}
              <div className="sign-in-btn">
                {" "}
                <a href="/login" data-i18n="sign_in">
                  تسجيل الدخول
                </a>{" "}
              </div>{" "}
            </div>{" "}
            <div className="searchDiv d-flex align-items-center gap-2">
              {" "}
              <button className="btn rounded-nav nav-bttn">
                {" "}
                <i className="ri-moon-line"></i>{" "}
              </button>{" "}
              <button className="btn rounded-nav language-btn nav-bttn">
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="2em"
                  height="3em"
                  viewBox="0 0 24 24"
                >
                  {" "}
                  <path d="M0 0h24v24H0z" fill="none"></path>{" "}
                  <g fill="none" stroke="currentColor" strokeWidth="1.5">
                    {" "}
                    <circle cx="12" cy="12" r="10"></circle>{" "}
                    <path
                      strokeLinejoin="round"
                      d="M8 12c0 6 4 10 4 10s4-4 4-10s-4-10-4-10s-4 4-4 10Z"
                    ></path>{" "}
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 15H3m18-6H3"
                    ></path>{" "}
                  </g>{" "}
                </svg>{" "}
              </button>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </nav>
      <MobileSearchPanel />
    </>
  );
}
